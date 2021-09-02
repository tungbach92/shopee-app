/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JB5XCLveZMOamkEt6qU1zYlcBboclEZDyzfkxzsJuxzJuBsNgMi4KWSYU5cOoSmqsADJd9YjQQmoy6HGHFHL6cr00kkVQeWfV"
);

// API

// App configuration
const app = express();

// Middleware configuration
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
// Create setup Intent => return client secret

app.post("/detach-payment-method", async (req, res) => {
  try {
    const paymentMethodID = req.body.paymentMethodID;
    const paymentMethodResult = await stripe.paymentMethods.detach(
      paymentMethodID
    );
    res.send({
      paymentMethod: paymentMethodResult,
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

app.post("/update-customer-payment-method", async (req, res) => {
  try {
    const customerID = req.body.customerID;
    const paymentMethodID = req.body.paymentMethodID;
    const customerResult = await stripe.customers.update(customerID, {
      invoice_settings: {
        default_payment_method: paymentMethodID,
      },
    });
    res.send({ customer: customerResult });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

app.post("/retrieve-customer-by-id", async (req, res) => {
  try {
    const customerID = req.body.customerID;
    // retrieve customer object
    const customerResult = await stripe.customers.retrieve(customerID);

    res.send({ customer: customerResult });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

app.post("/get-payment-method-list", async (req, res) => {
  try {
    const customerID = req.body.customerID;
    // List the customer's payment methods to find one to charge
    const paymentMethodListResult = await stripe.paymentMethods.list({
      customer: customerID,
      type: "card",
    });
    res.send({
      paymentMethodList: paymentMethodListResult.data,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      error: error.message,
    });
  }
});

app.post("/create-token-server-side", async (request, response) => {
  try {
    const tokenClientSideID = request.body.tokenClientSideID;
    const tokenResult = await stripe.tokens.retrieve(tokenClientSideID);
    response.send({
      tokenResult: tokenResult,
    });
  } catch (error) {
    response.send({
      error: error.message,
    });
  }
});

app.post("/create-setup-intent", async (request, response) => {
  // Since we are using test cards, create a new Customer here
  // You would do this in your payment flow that saves cards
  try {
    const name = request.body.name;
    const email = request.body.email;
    const customerID = request.body.customerID;
    let customer;
    if (!customerID) {
      customer = await stripe.customers.create({
        name: name,
        email: email,
      });
    }
    const intent = await stripe.setupIntents.create({
      customer: customerID ? customerID : customer.id,
    });

    response.status(201).send({
      setUpIntentSecret: intent.client_secret,
      customerID: intent.customer,
    });
  } catch (error) {
    console.log(error.message);
    response.send({
      error: error.message,
    });
  }
});

// Charge by creating payment Intent
app.post("/charge-card-off-session", async (request, response) => {
  let total;
  try {
    total = request.query.total;
    const paymentMethodID = request.body.paymentMethodID;
    const customerID = request.body.customerID;
    const email = request.body.email;
    // no need cause paymentmethod will auto attach to provide customer above
    // const paymentMethodID = request.body.paymentMethodID;
    // const paymentMethod = await stripe.paymentMethods.attach(paymentMethodID, {
    //   customer: customer.id,
    // });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "vnd",
      // using first payment method in list
      // payment_method: paymentMethods.data[0].id,
      payment_method: paymentMethodID,
      customer: customerID,
      receipt_email: email,
      off_session: true, // indicate that the customer is not in your checkout flow during this payment attempt.
      // This causes the PaymentIntent to throw an error if authentication is required.
      confirm: true,
    });

    // OK - Card Succeeded
    response.send({
      succeeded: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    if (error.code === "authentication_required") {
      // Bring the customer back on-session to authenticate the purchase
      // You can do this by sending an email or app notification to let them know
      // the off-session purchase failed
      // Use the PM ID and client_secret to authenticate the purchase
      // without asking your customers to re-enter their details
      response.send({
        error: "authentication_required",
        paymentMethod: error.raw.payment_method.id,
        clientSecret: error.raw.payment_intent.client_secret,
        paymentIntentID: error.raw.payment_intent.id,
        amount: total,
        card: {
          brand: error.raw.payment_method.card.brand,
          last4: error.raw.payment_method.card.last4,
        },
      });
    } else if (error.code) {
      // The card was declined for other reasons (e.g. insufficient funds)
      // Bring the customer back on-session to ask them for a new payment method
      response.send({
        error: error.code,
        clientSecret: error.raw.payment_intent.client_secret,
      });
    } else {
      console.log("Unknown error occurred", error);
    }
  }
});
// Charge card on season

// Web hook copy code
app.post("/webhook", async (req, res) => {
  // Check if webhook signing is configured.
  let data;
  let eventType;
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("⚠️  Webhook signature verification failed.");
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }
  if (eventType === "payment_intent.succeeded") {
    // The payment was complete
    // Fulfill any orders, e-mail receipts, etc
    console.log(
      "💰 Payment succeeded with payment method " + data.object.payment_method
    );
  } else if (eventType === "payment_intent.payment_failed") {
    // The payment failed to go through due to decline or authentication request
    const error = data.object.last_payment_error.message;
    console.log("❌ Payment failed with error: " + error);
  } else if (eventType === "payment_method.attached") {
    // A new payment method was attached to a customer
    console.log("💳 Attached " + data.object.id + " to customer");
  }
  res.sendStatus(200);
});
// Listen command
exports.api = functions.https.onRequest(app);
