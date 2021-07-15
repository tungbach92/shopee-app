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
let customer;
app.get("/create-setup-intent", async (request, response) => {
  customer = await stripe.customers.create();
  const intent = await stripe.setupIntents.create({
    customer: customer.id,
  });
  response
    .status(201)
    .send({ clientSecret: intent.client_secret, customer: customer });
});

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment created", total);

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "vnd",
    payment_method: paymentMethods.data[0].id,
    customer: customer.id,
    off_session: true,
    confirm: true,
  });

  // OK - Create
  response.status(201).send({
    succeeded: true,
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen command
exports.api = functions.https.onRequest(app);
