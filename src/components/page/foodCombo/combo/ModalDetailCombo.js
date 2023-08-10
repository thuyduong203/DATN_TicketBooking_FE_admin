import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { apiCombo } from "../../../../config/api";
import {
  AddNhanVien,
  SetListStaff,
} from "../../../app/reducers/StaffSlice.reducer";

import "../../../../styles/modalDetailCombo.css";

const ModalDetailCombo = ({ isModalVisible, handleCancel, id }) => {
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState(0);
  const [ngayBatDau, setngayBatDau] = useState(null);
  const [ngayKetThuc, setngayKetThuc] = useState(null);
  const dispatch = useAppDispatch();

  //   const detail = () => {
  //     axios.post(apiStaff + "/find-by-id/" + id).then((response) => {
  //       setChucVu(response.data.chucVu.id);
  //       setTen(response.data.name);
  //       setDiaChi(response.data.address);
  //       setEmail(response.data.email);
  //       setMa(response.data.code);
  //       setTrangThai(response.data.status);
  //       setSdt(response.data.phoneNumber);
  //     });
  //   };

  useEffect(() => {
    if (isModalVisible && id) {
      axios.get(apiCombo + "/find-by-id/" + id).then((response) => {
        setTen(response.data.data.name);
        setGia(response.data.data.price);
        setngayBatDau(response.data.data.startDate);
        setngayKetThuc(response.data.data.endDate);
      });
    }
  }, [isModalVisible, id]);

  //fomat giá
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

  const formattedGia = formatCurrency(gia);

  return (
    <Modal
      visible={isModalVisible}
      title="Thông tin"
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item>
          <div className="inline-field">
            <span className="label">Tên: </span>
            <span className="value">{ten}</span>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="inline-field">
            <span className="label">Giá: </span>
            <span className="value">{formattedGia}</span>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="inline-field">
            <span className="label">Ngày bắt đầu: </span>
            <span className="value">{ngayBatDau}</span>
          </div>
        </Form.Item>
        <Form.Item name="code">
          <div className="inline-field">
            <span className="label">Ngày kết thúc: </span>
            <span className="value">{ngayKetThuc}</span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailCombo;
