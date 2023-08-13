// PaymentHistory.js
import React from "react";

const OrderSnacks = ({ orderSnack }) => {
  return (
    <div className="mt-3">
      <div className="d-flex bg-secondary-subtle p-2">
        <div className="flex-grow-1">
          <h6 className="text-uppercase" style={{ marginTop: "13px" }}>
            ĐỒ ĂN
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
      <div className="table-responsive">
        <table className="table table-borderless table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên Snack</th>
              <th scope="col">Tên ComBo</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
            </tr>
          </thead>
          <tbody>
            {orderSnack.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.snacks === null ? " " : item.snacks.name}</td>
                <td>{item.combo === null ? " " : item.combo.name}</td>
                <td>{item.quanitty}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSnacks;
