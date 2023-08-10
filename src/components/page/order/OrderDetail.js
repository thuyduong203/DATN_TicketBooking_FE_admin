// OrderDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiOrder } from "../../../config/api";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import {
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import "./OrderDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderDetail = () => {
  //lấy id
  const { id } = useParams();
  //tạo biến
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    axios
      .get(apiOrder + `/get-one/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get order by ID:", error);
      });
  }, [id]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="timeline-container">
        <Timeline minEvents={5} placeholder>
          <TimelineEvent
            color="#52c41a"
            icon={FaRegFileAlt}
            title="Em rascunho"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#52c41a"
            icon={FaRegCalendarCheck}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#ffd700"
            icon={FaPencilAlt}
            title="Agendado"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color="#9c2919"
            icon={FaTrash}
            title="Erro"
            subtitle="26/03/2019 09:51"
          />
        </Timeline>
      </div>
      <h2>Thông tin chi tiết đơn hàng</h2>

      <p>Mã đơn hàng: {orderDetail.code}</p>
      <p>Tên khách hàng: {orderDetail.customerName}</p>
      {/* ... hiển thị các thông tin khác */}
    </div>
  );
};

export default OrderDetail;
