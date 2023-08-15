// import React, { useState } from "react";
// import CancelOrderModal from "./CancelOrderModal";
// import axios from "axios";
// import { apiOrder } from "../../../config/api";
// const OrderActions = ({
//   id,
//   orderDetail,
//   onShowCancelModal,
//   onShowDetails,
// }) => {
//   const buttonStyle = {
//     height: "50px",
//     width: "150px",
//     borderRadius: "10px",
//     border: "none",
//   };
//   const [cancelReason, setCancelReason] = useState("");
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const handleCancelOrder = () => {
//     const requestBody = {
//       cancelReason: cancelReason,
//     };
//     // Tạo apiHuy
//     axios
//       .put(apiOrder + `/huy/${id}`, requestBody)
//       .then((response) => {
//         // Thành công
//         console.log("Order cancelled successfully:", response.data);
//       })
//       .catch((error) => {
//         // Thất bại
//         console.error("Error cancelling order:", error);
//       });

//     setShowCancelModal(false); // Close the modal after request is sent
//   };
//   return (
//     <div className="row">
//       <div className="col-md-6 d-flex justify-content-start">
//         <span>
//           {orderDetail.status === 1 && (
//             <button
//               className="btn btn-danger"
//               style={{ ...buttonStyle, color: "#fff" }}
//               onClick={() => setShowCancelModal(true)}
//             >
//               <i className="fe fe-15 fe-archive" style={{ height: "10px" }}></i>
//               Hủy Đơn
//             </button>
//           )}

//           {(orderDetail.status === 2 || orderDetail.status === 3) && (
//             <button style={{ ...buttonStyle, color: "#fff" }}>
//               <i className="fe fe-15 fe-archive" style={{ height: "10px" }}></i>
//               Hủy Đơn
//             </button>
//           )}
//         </span>
//       </div>
//       <div className="col-md-6 d-flex justify-content-end">
//         <button
//           type="button"
//           style={{
//             backgroundColor: "#c5fdee",
//             height: "50px",
//             width: "150px",
//             color: "rgb(48, 48, 48)",
//             borderRadius: "10px",
//             border: "none",
//             fontWeight: "bolder",
//           }}
//           onClick={() => onShowDetails(orderDetail.id)}
//         >
//           Chi tiết
//         </button>
//       </div>
//       <CancelOrderModal
//         show={showCancelModal}
//         onHide={() => setShowCancelModal(false)}
//         onConfirm={handleCancelOrder}
//       />
//     </div>
//   );
// };

// export default OrderActions;
