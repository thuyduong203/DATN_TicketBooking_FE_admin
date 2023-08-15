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
      onChange={onDateChange}
    />
  );
};

export default DateRangeSearch;
