import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCustomer } from "../../app/reducers/CustomerSlice.reducer";
import axios from "axios";
import { apiCustomer } from "../../../config/api";

const UpdateCustomerModal = ({ visible, onCancel, customerId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showConfirm = () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật thông tin khách hàng?",
      onOk: handleUpdateCustomer,
      okText: "Cập nhật",
      cancelText: "Hủy",
    });
  };

  // Lấy thông tin khách hàng từ Redux state dựa trên customerId
  const customer = useSelector((state) =>
    state.customer.listCustomer.find((item) => item.id === customerId)
  );

  // Fill thông tin vào form khi customer thay đổi
  useEffect(() => {
    if (customer) {
      form.setFieldsValue({
        code: customer.code,
        name: customer.name,
        birthday: customer.birthday,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
      });
    }
  }, [customer, form]);

  const handleUpdateCustomer = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();

      // Gọi API để cập nhật thông tin khách hàng
      const response = await axios.put(
        apiCustomer + "/update/" + customerId,
        values
      );
      if (response.status === 200) {
        // Cập nhật thông tin khách hàng trong Redux
        dispatch(UpdateCustomer({ id: customerId, ...values }));
        onCancel(); // Đóng modal

        // Hiển thị thông báo sau khi cập nhật thành công
        message.success("Cập nhật thông tin khách hàng thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin khách hàng"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={showConfirm}
          loading={isSubmitting}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mã KH"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã KH" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tên KH"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên KH" }]}
        >
          <Input />
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

export default UpdateCustomerModal;
