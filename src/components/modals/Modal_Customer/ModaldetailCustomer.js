import { Modal, Button, Form } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiCustomer } from "../../../config/api";
import "../../../styles/TicketStyle.css";
import {
  GetDetailCustomer,
  SetDetailCustomer,
} from "../../app/reducers/CustomerSlice.reducer";
import dayjs from "dayjs";
const ModalDetailCustomer = ({
  visible,
  handleCancelModalDetailCustomer,
  id,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible && id) {
      axios
        .get(apiCustomer + "/get-one-by-id/" + id)
        .then((response) => {
          // Chuyển đổi ngày sinh thành định dạng hợp lệ trước khi lưu vào state
          const validFormattedBirthDay = response.data.birthDay.replace(
            /(\d{2})\/(\d{2})\/(\d{4}).*/,
            "$2/$1/$3"
          );
          const updatedData = {
            ...response.data,
            birthDay: validFormattedBirthDay,
          };
          dispatch(SetDetailCustomer(updatedData));
        })
        .catch((error) => {
          console.error("Lỗi khi getOne customer:", error);
        });
    }
  }, [visible, id, dispatch]);

  let obj = useSelector(GetDetailCustomer) || {};

  return (
    <Modal
      title="Chi tiết khách hàng"
      visible={visible}
      onCancel={handleCancelModalDetailCustomer}
      footer={[
        <Button key="close" onClick={handleCancelModalDetailCustomer}>
          Đóng
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <div className="modal-detail-ticket-div-left">
          <span> Mã KH: {obj.code}</span> <br />
          <br />
          <span> Khách hàng: {obj.name}</span> <br />
          <br />
          <span> Số điện thoại: {obj.phoneNumber}</span> <br />
          <br />
        </div>
        <div className="modal-detail-ticket-div-right">
          <span> Tên đăng nhập: {obj.username}</span> <br />
          <br />
          <span>Địa chỉ: {obj.address}</span> <br />
          <br />
          <span>
            {" "}
            Ngày sinh: {dayjs(obj.birthDay).format("DD/MM/YYYY")}
          </span>{" "}
          <br />
          <br />
          <br />
        </div>
      </Form>
    </Modal>
  );
};

export default ModalDetailCustomer;
