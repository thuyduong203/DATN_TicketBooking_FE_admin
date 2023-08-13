import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { apiRoom } from "../../../config/api";
import { useAppDispatch } from "../../app/hook";
import { updateRoom } from "../../app/reducers/RoomSlice.reducer";

const DetailRoomModal = ({ visible, onCancel, record, updateTableData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // Tạo biến tạm để lưu giữ giá trị record ban đầu và record đã cập nhật
  const [initialRecord, setInitialRecord] = useState(record);
  const [updatedRecord, setUpdatedRecord] = useState(record);

  useEffect(() => {
    form.setFieldsValue(record);
    setUpdatedRecord(record); // Đặt lại trạng thái updatedRecord khi modal mở
  }, [record, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      const updatedData = {
        ...record,
        nameRoom: values.name,
        totalChair: values.totalChair, // Thêm trường "totalPage"
        status: values.status, // Thêm trường "status"
        // ...
      };
      const response = await axios.put(
        apiRoom + "/update/" + record.id, // Sử dụng record.id
        updatedData
      );

      console.log("Updated Values:", response.data);

      // Cập nhật dữ liệu trong Redux store
      // Đảm bảo cập nhật lại thuộc tính tên cho record và updatedRecord sau khi cập nhật thành công
      dispatch(updateRoom(response.data.content)); // Cập nhật dữ liệu trong Redux store

      onCancel();
      // Đặt lại trạng thái của modal
      setUpdatedRecord(initialRecord);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...record,
    });
    form.setFieldsValue(record); // Cập nhật giá trị cho Form khi record thay đổi
  }, [record]);
  const handleCancel = () => {
    onCancel();
    // Gọi hàm cập nhật bảng truyền từ component cha
    updateTableData(updatedRecord);
  };
  return (
    <Modal
      visible={visible}
      title="Room Detail"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}>
      <Form form={form} initialValues={record}>
        <Form.Item label="ID">{record?.id}</Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the room name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Total Chairs"
          name="totalChair"
          rules={[
            {
              required: true,
              message: "Please enter the total number of chairs",
            },
          ]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailRoomModal;
