// OrderInfo.js
import React from "react";

const OrderInfo = ({ orderDetail }) => {
  const getStatusClass = () => {
    if (orderDetail.status === 1) {
      return "btn btn-warning";
    } else if (orderDetail.status === 2) {
      return "btn btn-success";
    } else if (orderDetail.status === 3) {
      return "btn btn-danger";
    }
    return "";
  };

  const getOrderType = () => {
    return orderDetail.customerName === null ? "Tại quầy" : "Đơn online";
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <div className="mt-3">
        <div
          className="d-flex bg-secondary-subtle p-2"
          style={{ borderRadius: "10px" }}
        >
          <div className="flex-grow-1">
            <h6 className="text-uppercase" style={{ marginTop: "13px" }}>
              Thông tin đơn hàng
            </h6>
          </div>
          <div className="">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: "rgb(85, 172, 238)",
                color: "rgb(255, 255, 255)",
                borderRadius: "10px",
                width: "100px",
                height: "40px",
                boxShadow: "rgb(183, 183, 183) 5px 6px;",
                border: "none",
                float: "right",
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
        <h6 style={{ marginTop: "10px" }}>
          <span style={{ color: "#555555" }}>Mã code:</span> {orderDetail.code}
        </h6>
        <h6>
          <span style={{ color: "#555555" }}>Trạng Thái:</span>{" "}
          <span className={getStatusClass()} style={{ borderRadius: "10px" }}>
            {orderDetail.status === 1
              ? "Chờ thanh toán"
              : orderDetail.status === 2
              ? "Đã thanh toán"
              : orderDetail.status === 3
              ? "Hủy"
              : ""}
          </span>
        </h6>
        <h6>
          <span style={{ color: "#555555" }}>Họ Và Tên:</span>{" "}
          {orderDetail.customerName}
        </h6>
        <h6>
          <span style={{ color: "#555555" }}>Loại đơn:</span>{" "}
          <button
            style={{
              backgroundColor: "#55acee",
              color: "#fff",
              borderRadius: "20px",
              borderStyle: "none",
              width: "120px",
              height: "30px",
            }}
          >
            {getOrderType()}
          </button>
        </h6>
      </div>
    </div>
  );
};

export default OrderInfo;
