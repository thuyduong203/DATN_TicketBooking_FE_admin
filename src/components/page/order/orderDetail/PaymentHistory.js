// PaymentHistory.js
import React from "react";
import FormatCurrency from "../FormatCurrency"; // Import FormatCurrency component
import FormatDate from "../FormatDate"; // Import FormatDate component

const PaymentHistory = ({ salePayment }) => {
  return (
    <div className="mt-3">
      <div
        className="d-flex bg-secondary-subtle p-2"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex-grow-1">
          <h6 className="text-uppercase" style={{ marginTop: "13px" }}>
            LỊCH SỬ THANH TOÁN
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
              width: "150px",
              height: "40px",
              border: "none",
              float: "right",
            }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless table-striped">
          <thead>
            <tr>
              <th scope="col">Số tiền</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Phương thức thanh toán</th>
              <th scope="col">Nhân viên xác nhận</th>
            </tr>
          </thead>
          <tbody>
            {salePayment.map((item, index) => (
              <tr key={index}>
                <td className="text-danger fw-semibold">
                  <FormatCurrency value={item.amount} />
                </td>
                <td>
                  <FormatDate date={item.paymentTime} />
                </td>
                {/* <td>{item.method === 0 ? "Tiền mặt" : "Chuyển khoản"}</td>
                <td>{item.note === null ? "Không có ghi chú" : item.note}</td>
                <td>{item.createBy}</td> */}
                <td>{item.description}</td>
                <td>{item.order.employee.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
