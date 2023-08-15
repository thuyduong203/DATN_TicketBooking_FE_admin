// Component PriceRangeSearch
import React, { useState, useEffect } from "react";
import { Slider } from "antd";

const PriceRangeSearch = ({ defaultPriceRange, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState(defaultPriceRange);

  useEffect(() => {
    setPriceRange(defaultPriceRange);
  }, [defaultPriceRange]);

  const handlePriceChange = (values) => {
    setPriceRange(values);
    onPriceChange(values);
  };

  return (
    <div>
      <h6 style={{ marginTop: "18px", color: "#696969" }}>Khoảng giá</h6>
      <Slider
        range
        min={0}
        max={1000}
        value={priceRange}
        onChange={handlePriceChange}
      />
    </div>
  );
};

export default PriceRangeSearch;
