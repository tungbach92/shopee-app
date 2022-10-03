import axios from "../axios";
import getCustomerID from "./getCustomerID";

export const detachPaymentMethodID = async (user, paymentMethodID) => {
  const customerID = await getCustomerID(user);
  if (!customerID || !paymentMethodID) {
    return;
  }
  try {
    await axios({
      method: "POST",
      url: "/detach-payment-method",
      data: { paymentMethodID: paymentMethodID, customerID: customerID },
    });
  } catch (error) {
    alert(error.message);
  }
};
