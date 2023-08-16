import React from "react";
import { Select } from "antd";

const { Option } = Select;

const TypeOrderSearch = ({ onTypeOrderSearch }) => {
  const handleTypeOrderChange = (selectedType) => {
    onTypeOrderSearch(selectedType);
  };

  return (
    <Select
      placeholder="Chọn loại đơn"
      onChange={handleTypeOrderChange}
      defaultValue="all"
      style={{ width: "150px", marginRight: "10px" }}
    >
      <Option value="all">Tất cả</Option>
      <Option value="online">Đơn Online</Option>
      <Option value="offline">Đơn Tại Quầy</Option>
    </Select>
  );
};

export default TypeOrderSearch;
