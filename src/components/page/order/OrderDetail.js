// OrderDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  apiOrder,
  apiSalePayMent,
  apiOrderSnack,
  apiOrderTicket,
} from "../../../config/api";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import {
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import "./OrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentHistory from "./PaymentHistory";
import OrderSnacks from "./OrderSnacks";
import OrderTicket from "./OrderTicket";
const OrderDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [orderDetail, setOrderDetail] = useState(null);
  const [listSalePayment, setSalePayment] = useState([]);
  const [listOrderSnacks, setOrderSnacks] = useState([]);
  const [listOrderTicket, setOrderTicket] = useState([]);
  useEffect(() => {
    axios
      .get(apiOrder + `/get-one/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get order by ID:", error);
      });

    axios
      .get(apiSalePayMent + `/list-sale-payment-by-order/${id}`)
      .then((response) => {
        console.log(response.data);
        setSalePayment(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get salePayMent by ID:", error);
      });

    //snacks
    axios
      .get(apiOrderSnack + `/list-order-snack/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrderSnacks(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi api order snack");
      });
    //ticket
    axios
      .get(apiOrderTicket + `/list-order-ticket/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrderTicket(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi api order ticket");
      });
  }, [id]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }
  //
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
  //
  let buttonStyle = {
    height: "50px",
    width: "150px",
    borderRadius: "10px",
    backgroundColor: orderDetail.status === 1 ? "" : "rgb(249, 188, 188)",
    border: "none",
  };
  return (
    <div>
      <div className="row" style={{ marginBottom: "20px" }}>
        <div>
          <span style={{ color: "rgb(85, 172, 238)", fontWeight: "bold" }}>
            Danh sách hóa đơn
          </span>{" "}
          /{" "}
          <span style={{ fontWeight: "bold" }}>
            {" "}
            Hóa đơn : {""}
            {orderDetail.code}
          </span>
        </div>
      </div>
      {/* Phần Timeline */}
      <div className="timeline-container">
        <Timeline minEvents={5} placeholder>
          <TimelineEvent
            color="#00CC00"
            icon={FaRegFileAlt}
            title="Em rascunho"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#00CC00"
            icon={FaRegCalendarCheck}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#9c2919"
            icon={FaTrash}
            title="Erro"
            subtitle="26/03/2019 09:51"
          />
          {/* Thêm các sự kiện TimelineEvent khác tại đây */}
          {/* ... */}
        </Timeline>
        {/*  */}
        <div class="row">
          <div class="col-md-6 d-flex justify-content-start">
            <span>
              {orderDetail.status === 1 && (
                <button
                  className="btn btn-danger"
                  style={{ ...buttonStyle, color: "#fff" }}
                  // onClick={showSweetAlert}
                >
                  <i
                    className="fe fe-15 fe-archive"
                    style={{ height: "10px" }}
                  ></i>
                  Hủy Đơn
                </button>
              )}

              {(orderDetail.status === 2 || orderDetail.status === 3) && (
                <button style={{ ...buttonStyle, color: "#fff" }}>
                  <i
                    className="fe fe-15 fe-archive"
                    style={{ height: "10px" }}
                  ></i>
                  Hủy Đơn
                </button>
              )}
            </span>
          </div>
          <div class="col-md-6 d-flex justify-content-end">
            <button
              type="button"
              style={{
                backgroundColor: "#c5fdee",
                height: "50px",
                width: "150px",
                color: "rgb(48, 48, 48)",
                borderRadius: "10px",
                border: "none",
                fontƯeight: "bolder",
              }}
              ng-click="openFrame()"
            >
              Chi tiết
            </button>
          </div>
        </div>
        {/*  */}
      </div>
      {/* Thông tin chi tiết */}
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
            <span style={{ color: "#555555" }}>Mã code:</span>{" "}
            {orderDetail.code}
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
        </div>
      </div>

      {/* Phần Lịch sử thanh toán */}
      <PaymentHistory salePayment={listSalePayment} />
      {/* Phần orderTicket */}
      <OrderTicket orderTicket={listOrderTicket}></OrderTicket>
      {/* Phần orderSnacks */}
      <OrderSnacks orderSnack={listOrderSnacks}></OrderSnacks>
      {/* Phần thông tin chi tiết đơn hàng */}
      <hr />
      <div class="container">
        <div style={{ width: "500px", float: "right", marginTop: "20px" }}>
          <h6>Tiền vé:</h6>
          <h6>Tiền bỏng nước:</h6>
          <hr />
          <h6 style={{ fontWeight: "bold" }}>Tổng tiền:</h6>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default OrderDetail;
