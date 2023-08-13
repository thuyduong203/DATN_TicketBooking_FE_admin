import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { apiStaff } from "../../../../config/api";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  AddNhanVien,
  GetDetailStaff,
  SetDetailStaff,
  SetListStaff,
} from "../../../app/reducers/StaffSlice.reducer";

const ModalUpdateStaff = ({ isModalVisible, handleCancel, id }) => {
  const [chucVu, setChucVu] = useState(0);
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isModalVisible && id) {
      axios.get(apiStaff + "/find-by-id/" + id).then((response) => {
        dispatch(SetDetailStaff(response.data.data));
        // setChucVu(response.data.data.role);
        // setTen(response.data.data.name);
        // setDiaChi(response.data.data.address);
        // setEmail(response.data.data.email);
        // setSdt(response.data.data.phoneNumber);
        // setMatKhau(response.data.data.password);
      });
    }
  }, [isModalVisible, id]);

  const staff = useAppSelector(GetDetailStaff);
  const detail = () => {
    setChucVu(staff.role);
    setTen(staff.name);
    setDiaChi(staff.address);
    setEmail(staff.email);
    setSdt(staff.phoneNumber);
    setMatKhau(staff.password);
    console.log(ten);
  };

  const handleOk = () => {
    const obj = {
      name: ten,
      password: matKhau,
      phoneNumber: sdt,
      email: email,
      role: chucVu,
      address: diaChi,
    };
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (confirmed === true) {
      //   axios
      //     .post(apiStaff + "/update" + id, obj)
      //     .then((response) => {
      //       if (response.data.statusCode === "success") {
      //         alert("Sửa thành công");
      //         handleCancel();
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      console.log(obj);
    }
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
          rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
        >
          <Select
            defaultValue={chucVu}
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

export default ModalUpdateStaff;
