import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, message } from "antd";
import { useDispatch } from "react-redux";
import { AddNewCustomer } from "../../app/reducers/CustomerSlice.reducer";
import axios from "axios";
import { apiCustomer } from "../../../config/api";

const AddCustomerModal = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCustomer = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();

      // Hiển thị confirm trước khi thêm
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắc muốn thêm khách hàng này?",
        onOk: async () => {
          // Gọi API để thêm khách hàng
          const response = await axios.post(apiCustomer + "/save", values);
          if (response.status === 200) {
            // Cập nhật danh sách khách hàng mới trong Redux
            dispatch(AddNewCustomer(response.data));
            onCancel(); // Đóng modal

            // Hiển thị thông báo sau khi thêm thành công
            message.success("Thêm khách hàng thành công");
          }
        },
        onCancel: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Thêm khách hàng mới"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="add"
          type="primary"
          onClick={handleAddCustomer}
          loading={isSubmitting}
        >
          Thêm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mã KH"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã KH" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên KH"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên KH" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
