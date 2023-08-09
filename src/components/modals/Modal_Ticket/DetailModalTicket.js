import { Modal, Button, Form, Input, Space } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiTicket } from "../../../config/api";
import {
  GetDetailTicket,
  SetDetailTicket,
} from "../../app/reducers/TicketSlice.reducer";
import "../../../styles/TicketStyle.css";
const ModalDetailTicket = ({ visible, handleCancelModalDetailTicket, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible && id) {
      axios
        .get(apiTicket + "/get-one/" + id)
        .then((response) => {
          dispatch(SetDetailTicket(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi getOne ticket:", error);
        });
    }
  }, [visible, id, dispatch]);

  const { code, showTime, qrCode, chair, bookingMethod, price } =
    useSelector(GetDetailTicket) || {};

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
          <Form.Item>
            Mã vé: <span>{code}</span>
          </Form.Item>
          {showTime && (
            <Form.Item label="Xuất chiếu">
              <span>{showTime.time}</span>
            </Form.Item>
          )}
          {chair && (
            <Form.Item label="Phòng">
              <span>{chair.room.name}</span>
            </Form.Item>
          )}
        </div>
        <div className="modal-detail-ticket-div-right">
          <Form.Item>
            Phương thức đặt vé:{" "}
            <span>{bookingMethod === 1 ? "Offline" : "online"}</span>
          </Form.Item>
          <Form.Item label="Giá: ">
            <span>{price}</span>
          </Form.Item>
          {chair && (
            <Form.Item label="Ghế">
              <span>{chair.name}</span>
            </Form.Item>
          )}
          {showTime && (
            <Form.Item label="Phim">
              <span>{showTime.movie.name}</span>
            </Form.Item>
          )}
        </div>

        {/* <Form.Item label="Loại ghế">
          <span>{chair.chairTypeName}</span>
        </Form.Item> */}
        <div className="modal-detail-ticket-div-center">
          <Form.Item label="Mã QR">
            {qrCode && (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
            )}
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalDetailTicket;
