// PaymentHistory.js
import React from "react";

const OrderTicket = ({ orderTicket }) => {
  return (
    <div className="mt-3">
      <div className="d-flex bg-secondary-subtle p-2">
        <div className="flex-grow-1">
          <h6 className="text-uppercase" style={{ marginTop: "13px" }}>
            VÉ
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
              <th scope="col">Tên Phim</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
            </tr>
          </thead>
          <tbody>
            {orderTicket.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.ticket.showTime.movie.name}</td>
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

export default OrderTicket;
