export const getSavedPrice = (voucher, checkoutItems) => {
  if (Object.keys(voucher).length > 0) {
    let result = voucher.discount.includes("%")
      ? (this.getItemsPriceTotal(checkoutItems) *
          Number(voucher.discount.slice(0, -1))) /
        100
      : voucher.discount;
    return result;
  } else {
    return 0;
  }
};
