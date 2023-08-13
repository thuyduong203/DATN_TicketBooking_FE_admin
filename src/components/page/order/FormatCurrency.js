const FormatCurrency = ({ value }) => {
  const formattedValue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
  return <span>{formattedValue}</span>;
};
export default FormatCurrency;
