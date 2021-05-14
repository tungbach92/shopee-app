import React from "react";
import ReactDOM from "react-dom";
export default function VoucherModal(props) {
  const { toggleModal } = props;
  return ReactDOM.createPortal(
    <>
      <div>Hello Modal</div>
      <div onClick={toggleModal} className="modal-close-btn">
        Close
      </div>
    </>,
    document.body
  );
}
