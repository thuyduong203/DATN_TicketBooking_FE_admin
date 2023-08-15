import Modal from "react-bootstrap/Modal";
// import Table from "react-bootstrap/Table";
import "./OrderDetail.css";
const OrderTimeLineDetail = ({ show, onClose, orderTimeline }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="div" style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>Loại</th>
                <th>Ghi Chú</th>
                <th>Ngày giờ</th>
                <th>Nhân Viên Xác Nhận </th>
              </tr>
            </thead>
            <tbody>
              {orderTimeline.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button className={item.type}>{item.type}</button>
                  </td>
                  <td>{item.note}</td>
                  <td>{item.createdTime}</td>
                  <td>{item.order.employee.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default OrderTimeLineDetail;
