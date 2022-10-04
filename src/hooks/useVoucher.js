import React from "react";
import { useState } from "react";

const voucherList = [
  { code: "FREE", discount: "100%" },
  { code: "SALE50", discount: "50%" },
  { code: "SALE100000", discount: "100000" },
];
const useVoucher = () => {
  const [voucher, setVoucher] = useState({});

  const updateVoucher = (text) => {
    const voucher = voucherList.find((item) => item.code === text);
    if (voucher) {
      setVoucher(voucher);
    }
  };

  const resetVoucher = () => {
    setVoucher({});
  };
  
  return { voucher, updateVoucher, resetVoucher };
};

export default useVoucher;
