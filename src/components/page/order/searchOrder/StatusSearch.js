import React from "react";
import { Select } from "antd";

const { Option } = Select;

const StatusSearch = ({ onStatusSearch }) => {
  const handleStatusChange = (selectedStatus) => {
    onStatusSearch(selectedStatus);
  };

  return (
    <Select
      placeholder="Chọn trạng thái"
      onChange={handleStatusChange}
      style={{ width: "150px", marginRight: "10px" }}
    >
      <Option value={0}>Tất cả</Option>
      <Option value={1}>Chờ thanh toán</Option>
      <Option value={2}>Đã thanh toán</Option>
      <Option value={3}>Đã hủy</Option>
    </Select>
  );
};

export default StatusSearch;
