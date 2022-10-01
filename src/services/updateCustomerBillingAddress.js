import axios from "axios";

export const updateCustomerBillingAddress = (
  customerID,
  paymentMethodList,
  defaultPaymentMethodID,
  shipInfos
) => {
  if (customerID && paymentMethodList && defaultPaymentMethodID) {
    let defaultshipInfo;
    let cardName = "";

    paymentMethodList.forEach((item) => {
      if (item.id === defaultPaymentMethodID) {
        cardName = item.billing_details.name;
      }
    });

    shipInfos.forEach((item) => {
      if (item.isDefault) {
        defaultshipInfo = { ...item };
      }
    });

    axios({
      method: "POST",
      url: "/update-customer-billing-address",
      data: {
        customerID: customerID,
        userName: cardName.length > 0 ? cardName : defaultshipInfo.name,
        shipName: defaultshipInfo.name,
        phone: defaultshipInfo.phone,
        province: defaultshipInfo.province.name,
        district: defaultshipInfo.district.name,
        ward: defaultshipInfo.ward.name,
        street: defaultshipInfo.street,
      },
    }).catch((err) => {
      alert(err.message);
    });
  }
};
