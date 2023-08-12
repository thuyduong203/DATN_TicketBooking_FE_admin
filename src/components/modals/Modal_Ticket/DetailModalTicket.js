import { Modal, Button, Form, Input, Space } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiTicket } from "../../../config/api";
import {
  GetDetailTicket,
  PrintfTicket,
  SetDetailTicket,
} from "../../app/reducers/TicketSlice.reducer";
import "../../../styles/TicketStyle.css";
import { useState } from "react";
const ModalDetailTicket = ({ visible, handleCancelModalDetailTicket, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible && id) {
      axios
        .get(apiTicket + "/get-ticket-detail/" + id)
        .then((response) => {
          dispatch(SetDetailTicket(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi getOne ticket:", error);
        });
    }
  }, [visible, id, dispatch]);

  const {
    code,
    showTime,
    qrCode,
    room,
    chair,
    bookingMethod,
    price,
    movieName,
    customerName,
    time,
    status,
  } = useSelector(GetDetailTicket) || {};

  const handlePrintTicket = () => {
    if (id) {
      Modal.confirm({
        title: "Xác nhận in vé",
        content: "Bạn có chắc chắn muốn in vé?",
        onOk() {
          // Thực hiện in vé
          dispatch(PrintfTicket(id));

          // Xử lý sau khi in và đóng modal
          handleCancelModalDetailTicket();
        },
        onCancel() {
          // Đóng modal khi hủy
        },
      });
    }
  };

  return (
    <Modal
      title="Chi tiết vé"
      visible={visible}
      onCancel={handleCancelModalDetailTicket}
      footer={[
        <Button key="close" onClick={handleCancelModalDetailTicket}>
          Đóng
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <div className="modal-detail-ticket-div-left">
          <span> Mã vé:{code}</span> <br />
          <br />
          <span> Khách hàng: {customerName}</span> <br />
          <br />
          {showTime && <span>Xuất chiếu: {showTime}</span>}
          <br />
          <br />
          {room && <span>Phòng: {room}</span>}
          <br />
          <br />
          {<span>Trạng thái: {status === 1 ? "Đã in" : "Chưa in"}</span>}
          <br />
          <br />
        </div>
        <div className="modal-detail-ticket-div-right">
          Phương thức đặt vé:{" "}
          <span>{bookingMethod === 1 ? "Offline" : "Online"}</span>
          <br />
          <br />
          <span>Giá: {price}</span>
          <br />
          <br />
          {chair && <span>Ghế: {chair}</span>}
          <br />
          <br />
          {movieName && <span>Phim: {movieName}</span>} <br />
          <br />
          {<span>Thời lượng phim:: {time}</span>} phút
          <br />
          <br />
        </div>
        <div className="modal-detail-ticket-div-center">
          {/* <Form.Item label="Mã QR">
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
            )}
          </Form.Item>
          <br />
          <br /> */}
          <div style={{ textAlign: "center" }}>
            <Button
              className="ticket-button-print"
              disabled={status === 1}
              style={{
                cursor: status === 1 ? "not-allowed" : "pointer",
                backgroundColor:
                  status === 1 ? "rgb(85, 172, 238)" : "rgb(85, 172, 238)",
                width: "100%",
                borderRadius: "12px",
              }}
              onClick={handlePrintTicket}
            >
              <b> In vé</b>
            </Button>
          </div>
          <br />
          <br />
        </div>
      </Form>
    </Modal>
  );
};

export default ModalDetailTicket;
