import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { apiStaff } from "../../../../config/api";
import {
  AddNhanVien,
  SetListStaff,
} from "../../../app/reducers/StaffSlice.reducer";

import "../../../../styles/modalDetailStaff.css";

const ModalDetailStaff = ({ isModalVisible, handleCancel, id }) => {
  const [chucVu, setChucVu] = useState(0);
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [ma, setMa] = useState("");
  const [trangThai, setTrangThai] = useState(0);
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
      axios.get(apiStaff + "/find-by-id/" + id).then((response) => {
        setChucVu(response.data.data.role);
        setTen(response.data.data.name);
        setDiaChi(response.data.data.address);
        setEmail(response.data.data.email);
        setMa(response.data.data.code);
        setTrangThai(response.data.data.status);
        setSdt(response.data.data.phoneNumber);
        console.log(sdt);
      });
    }
  }, [isModalVisible, id]);

  return (
    <Modal
      visible={isModalVisible}
      title="Thông tin"
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item name="position">
          <div className="inline-field">
            <span className="label">Chức vụ: </span>
            <span className="value">
              {chucVu === 0 ? "Nhân viên" : "Quản lý"}
            </span>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="inline-field">
            <span className="label">Mã: </span>
            <span className="value">{ma}</span>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="inline-field">
            <span className="label">Tên: </span>
            <span className="value">{ten}</span>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="inline-field">
            <span className="label">Sdt: </span>
            <span className="value">{sdt}</span>
          </div>
        </Form.Item>
        <Form.Item name="code">
          <div className="inline-field">
            <span className="label">Email: </span>
            <span className="value">{email}</span>
          </div>
        </Form.Item>
        <Form.Item name="code">
          <div className="inline-field">
            <span className="label">Địa chỉ: </span>
            <span className="value">{diaChi}</span>
          </div>
        </Form.Item>
        <Form.Item name="code">
          <div className="inline-field">
            <span className="label">Trạng thái: </span>
            <span className="value">
              {trangThai === 0 ? "Đang làm" : "Đã nghỉ"}
            </span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailStaff;
