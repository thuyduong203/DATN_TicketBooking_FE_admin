import React from "react";
import { DatePicker } from "antd";

const DateRangeSearch = ({ onDateChange }) => {
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";

  return (
    <RangePicker
      style={{ marginTop: "20px", height: "40px" }}
      defaultValue={[null, null]}
      format={dateFormat}
      onChange={onDateChange} // Truyền hàm onDateChange ở đây
    />
  );
};

export default DateRangeSearch;
