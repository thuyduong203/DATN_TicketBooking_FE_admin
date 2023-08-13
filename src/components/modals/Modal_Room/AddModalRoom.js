import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

import { useAppDispatch } from "../../app/hook";
import { addRoom } from "../../app/reducers/RoomSlice.reducer";
import axios from "axios";
import { apiRoom } from "../../../config/api";

const AddRoomModal = ({ visible, onCancel }) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleAddRoom = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      values.createdBy = "NV001"; // Add createdBy value
      const response = await axios.post(apiRoom + "/save", values);
      dispatch(addRoom(response.data)); // Dispatch the action to add the new room
      form.resetFields();
      setLoading(false);
      onCancel(); // Close the modal
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Add Room"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleAddRoom}>
          Add
        </Button>,
      ]}>
      <Form form={form}>
        <Form.Item
          name="nameRoom"
          label="Room Name"
          rules={[{ required: true, message: "Please enter the room name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="totalChair"
          label="Total Chairs"
          rules={[
            {
              required: true,
              message: "Please enter the total number of chairs",
            },
          ]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}>
          <Select placeholder="Select a status">
            <Option value={1}>Đang chiếu</Option>
            <Option value={2}>Đang trống</Option>
            <Option value={3}>Đang dọn dẹp</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
