import React, { useState } from "react";
import { Input } from "antd";

const TextSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Input
      placeholder="Search...."
      allowClear
      size="large"
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ marginTop: "20px" }}
    />
  );
};

export default TextSearch;
