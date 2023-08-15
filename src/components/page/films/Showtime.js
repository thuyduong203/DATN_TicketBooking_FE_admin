import React, { useEffect, useState } from "react";
import { Table, Pagination, Tooltip, DatePicker } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import axios from "axios";
import { apiShowTime, apiTicket } from "../../../config/api";
import "../../../styles/TicketStyle.css";
import {} from "../../app/reducers/TicketSlice.reducer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  GetListShowTime,
  SetListShowTime,
} from "../../app/reducers/ShowTimeSlice.reducer";
const ShowTime = () => {
  const dispatch = useAppDispatch();
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  dayjs.extend(customParseFormat);
  const listShowTimeRedux = useAppSelector(GetListShowTime);

  //hàm tạo chạy 1 lần duy nhất:
  useEffect(() => {}, []);

  const itemsPerPage = 10; // Số phần tử trên mỗi trang

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1 + currentPage * itemsPerPage, // Tính toán giá trị STT
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      align: "center",
      render: (text, record) => <span>{record.room.name}</span>,
    },
    {
      title: "Phim",
      dataIndex: "movie",
      key: "movie",
      align: "center",
      render: (text, record) => <span>{record.movie.name}</span>,
    },
    {
      title: "Giờ chiếu",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div>
          <Tooltip title="Chi tiết">
            <EyeOutlined style={{ color: "#C0C0C0" }} />
          </Tooltip>
        </div>
      ),
    },
  ];

  //effect load data khi chuyển trang
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  //redux
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = () => {
    axios
      .get(apiShowTime + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
        dispatch(SetListShowTime(response.data.content));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="div-ticket">
      <h2>Xuất chiếu</h2>
      {/* table */}
      <div className="table-wrapper">
        <Table
          dataSource={listShowTimeRedux}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
      <div className="pagination-wrapper">
        <Pagination
          simple
          current={currentPage + 1}
          onChange={(value) => setCurrentPage(value - 1)}
          total={totalPages * 10}
        />
      </div>
    </div>
  );
};

export default ShowTime;
