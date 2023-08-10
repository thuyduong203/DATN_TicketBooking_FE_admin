import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

const ModalCreateStaff = ({ isModalVisible, handleCancel }) => {
  const [chucVu, setChucVu] = useState(0);
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const handleOk = () => {
    const obj = {
      name: ten,
      password: matKhau,
      phoneNumber: sdt,
      email: email,
      role: chucVu,
      address: diaChi,
    };
    console.log(obj);
    axios
      .post("http://localhost:8080/employee/add", obj)
      .then((response) => {
        if (response.data.statusCode === "success") {
          alert(response.data.data);
          handleCancel();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Perform actions to add new staff member here
  };

  return (
    <Modal
      title="Thêm nhân viên"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item
          label="Chức vụ"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
        >
          <Select
            defaultValue={0}
            onChange={(e) => {
              setChucVu(e);
            }}
          >
            <Select.Option value={0}>Nhân viên</Select.Option>
            <Select.Option value={1}>Quản lý</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên nhân viên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
        >
          <Input
            value={ten}
            onChange={(e) => {
              setTen(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="SĐT"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input
            value={sdt}
            onChange={(e) => {
              setSdt(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            value={matKhau}
            onChange={(e) => {
              setMatKhau(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateStaff;
