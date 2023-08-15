// OrderDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  apiOrder,
  apiSalePayMent,
  apiOrderSnack,
  apiOrderTicket,
  apiOrderTimeline,
} from "../../../../config/api";
import "./OrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentHistory from "./PaymentHistory";
import OrderSnacks from "./OrderSnacks";
import OrderTicket from "./OrderTicket";
import OrderTimeLine from "./OrderTimeLine";
import CancelOrderModal from "./CancelOrderModal";
import OrderInfo from "./OrderInfo";
import OrderTimeLineDetail from "./OrderTimeLineDetail";
const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [listSalePayment, setSalePayment] = useState([]);
  const [listOrderSnacks, setOrderSnacks] = useState([]);
  const [listOrderTicket, setOrderTicket] = useState([]);
  const [listOrderTimeLine, setOrderTimeLine] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  // mở Modal timeLineDetail
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const handleTimelineModalOpen = () => {
    setShowTimelineModal(true);
  };
  const handleTimelineModalClose = () => {
    setShowTimelineModal(false);
  };
  //
  useEffect(() => {
    axios
      .get(apiOrder + `/get-one/${id}`)
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get order by ID:", error);
      });
    // timeline
    axios
      .get(apiOrderTimeline + `/get-one/${id}`)
      .then((response) => {
        // console.log("OrderTimeLine" + response.data);
        setOrderTimeLine(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get orderTimeline:", error);
      });
    //
    //  salePayment
    axios
      .get(apiSalePayMent + `/list-sale-payment-by-order/${id}`)
      .then((response) => {
        setSalePayment(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get salePayMent by ID:", error);
      });

    //snacks
    axios
      .get(apiOrderSnack + `/list-order-snack/${id}`)
      .then((response) => {
        setOrderSnacks(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi api order snack");
      });
    //ticket
    axios
      .get(apiOrderTicket + `/list-order-ticket/${id}`)
      .then((response) => {
        setOrderTicket(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi api order ticket");
      });
  }, [id]);
  if (!orderDetail) {
    return <div>Loading...</div>;
  }
  //hủy đơn
  const handleCancelOrder = async (cancelReason) => {
    const requestBody = {
      note: cancelReason,
    };
    console.log(requestBody);
    try {
      const response = await axios.put(apiOrder + `/huy/${id}`, requestBody);
      console.log("Order cancelled successfully:", response.data);
      // Cập nhật lại dữ liệu của orderTimeLine sau khi hủy đơn
      axios
        .get(apiOrderTimeline + `/get-one/${id}`)
        .then((response) => {
          setOrderTimeLine(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API get orderTimeline:", error);
        });
      // detail
      axios
        .get(apiOrder + `/get-one/${id}`)
        .then((response) => {
          setOrderDetail(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API get order by ID:", error);
        });
    } catch (error) {
      console.error("Error cancelling order:", error);
    }

    setShowCancelModal(false);
  };
  //detail
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
        <OrderTimeLine orderTimeLine={listOrderTimeLine} />
        {/*  */}
        <div class="row">
          <div class="col-md-6 d-flex justify-content-start">
            <span>
              {orderDetail.status === 1 && (
                <button
                  className="btn btn-danger"
                  style={{ ...buttonStyle, color: "#fff" }}
                  onClick={() => setShowCancelModal(true)}
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
              onClick={handleTimelineModalOpen}
            >
              Chi tiết
            </button>
          </div>
        </div>
        {/*  */}
      </div>
      {/* Thông tin chi tiết */}
      <OrderInfo orderDetail={orderDetail} />

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
      <CancelOrderModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        onCancelReasonChange={setCancelReason}
      />
      {/*  */}
      <OrderTimeLineDetail
        show={showTimelineModal}
        onClose={handleTimelineModalClose}
        orderTimeline={listOrderTimeLine}
      />
    </div>
  );
};

export default OrderDetail;
