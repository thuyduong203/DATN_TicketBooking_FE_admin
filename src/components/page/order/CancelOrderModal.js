import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const CancelOrderModal = ({ show, onHide, onConfirm }) => {
  const [cancelReason, setCancelReason] = useState("");

  const handleConfirm = () => {
    onConfirm(cancelReason);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn hủy đơn hàng này?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Vui lòng nhập lý do hủy!</label>
          <input
            type="text"
            className="form-control"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Hủy
        </button>
        <button className="btn btn-danger" onClick={handleConfirm}>
          Xác nhận hủy
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOrderModal;
