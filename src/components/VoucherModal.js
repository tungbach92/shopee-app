import React from "react";
import ReactDOM from "react-dom";
export default function VoucherModal(props) {
  const { isShowing, toggleModal } = props;
  const handleClick = (e) => {
    toggleModal(!isShowing);
  };

  return ReactDOM.createPortal(
    <>
      <div>Hello Modal</div>
      <div onClick={handleClick} className="modal-close-btn">
        Close
      </div>
    </>,
    document.body
  );
}
