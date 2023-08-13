const FormatDate = ({ date }) => {
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(date));
  return <span>{formattedDate}</span>;
};
export default FormatDate;
