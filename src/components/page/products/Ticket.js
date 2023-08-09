import React, { useEffect, useState } from "react";
import { Input, Button, Table, Select, Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import axios from "axios";
import { apiTicket } from "../../../config/api";
import "../../../styles/TicketStyle.css";
import {
  GetListTicket,
  SetListTikcet,
} from "../../app/reducers/TicketSlice.reducer";
import ModalDetailTicket from "../../modals/Modal_Ticket/DetailModalTicket";
const Ticket = () => {
  const dispatch = useAppDispatch();
  // let [listTicket, setListTicket] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  let [inputSearch, setInputSearch] = useState("");
  const [isModalDetailTicket, setIsModalDetailTicket] = useState(false);
  const [detailTicketId, setDetailTicketId] = useState(null);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      // render: (text, record) => <span>{record.room}</span>,
    },
    {
      title: "Loại ghế - Ghế",
      dataIndex: "chair",
      key: "chair",
      render: (text, record) => (
        <span>
          {record.chairTypeName} - {record.chairName}
        </span>
      ),
    },
    {
      title: "Phim",
      dataIndex: "movie",
      key: "movie",
    },
    {
      title: "Giờ chiếu",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === 1 ? "Vé đã in" : "Vé chưa in"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleClickModalDetailTicket(record.id)}
            type="primary"
          >
            Detail
          </Button>
          {/* <Button onClick={() => handleDeleteCategory(record.id)} type="primary">
            Delete
          </Button> */}
        </div>
      ),
    },
  ];
  //effect load data khi chuyển trang
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  //effect load data inpute search
  useEffect(() => {
    if (!inputSearch) {
      fetchData(currentPage);
    }
    handleTypeInputSearch(inputSearch);
  }, [inputSearch]);
  //redux
  const handleCancelModalDetailTicket = () => {
    setIsModalDetailTicket(false);
  };
  const listTicketRedux = useAppSelector(GetListTicket);
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = () => {
    axios
      .get(apiTicket + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        dispatch(SetListTikcet(response.data.content));

        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickModalDetailTicket = (id) => {
    setIsModalDetailTicket(true);
    setDetailTicketId(id);
  };

  //redux search ô input
  const handleTypeInputSearch = (inputSearch) => {
    axios
      .get(apiTicket + "/search-ticket?pageNo=0&inputSearch=" + inputSearch)
      .then((response) => {
        dispatch(SetListTikcet(response.data.content));
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API search ticket:", error);
      });
  };

  return (
    <div className="div-ticket">
      <div className="search-select-wrapper">
        <Input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="ticket-input-search"
          placeholder="Mã NV/ Mã KH/ Sđt KH"
        />
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select">
            Trạng thái:
          </label>
          <Select
            id="ticket-select-trangThai"
            defaultValue="-1"
            style={{ width: 150 }}
            // onChange={handleChange}
            options={[
              { value: "1", label: "Vé đã in" },
              { value: "2", label: "Vé chưa in" },
              { value: "-1", label: "Tất cả" },
            ]}
          />
        </div>
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select-2">
            Loại vé:
          </label>
          <Select
            id="ticket-select-loaiVe"
            defaultValue="all"
            style={{ width: 150 }}
            // onChange={handleChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "ticket-online", label: "Vé đặt online" },
              { value: "ticket-offline", label: "Vé mua tại rạp" },
            ]}
          />
        </div>
      </div>

      <h3>Ticket</h3>
      {/* table */}
      <div className="table-wrapper">
        <Table
          dataSource={listTicketRedux}
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
      <ModalDetailTicket
        visible={isModalDetailTicket}
        handleCancelModalDetailTicket={handleCancelModalDetailTicket}
        id={detailTicketId}
      ></ModalDetailTicket>
    </div>
  );
};

export default Ticket;
