import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Select,
  Pagination,
  Tooltip,
  DatePicker,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import axios from "axios";
import { apiTicket } from "../../../config/api";
import "../../../styles/TicketStyle.css";
import {
  GetDetailTicket,
  GetListTicket,
  SetListTikcet,
} from "../../app/reducers/TicketSlice.reducer";
import ModalDetailTicket from "../../modals/Modal_Ticket/DetailModalTicket";
import { Link } from "react-router-dom";
import { format, startOfToday } from "date-fns";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
const Ticket = () => {
  const dispatch = useAppDispatch();
  // let [listTicket, setListTicket] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  let [inputSearch, setInputSearch] = useState("");
  let [valueCbbStatus, setValueCbbStatus] = useState(-1);
  let [valueCbbBookingMethod, setValueCbbBookingMethod] = useState(-1);
  let [chooseDay, setChooseDay] = useState(
    format(startOfToday(), "yyyy-MM-dd")
  );
  const [isModalDetailTicket, setIsModalDetailTicket] = useState(false);
  const [detailTicketId, setDetailTicketId] = useState(null);
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";

  //hàm tạo chạy 1 lần duy nhất:
  useEffect(() => {
    setValueCbbStatus("-1");
    setValueCbbBookingMethod("-1");
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
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
      render: (price) => (
        <span style={{ color: "black" }}>
          {new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(Number(price))}
        </span>
      ),
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
          <Tooltip title="Chi tiết">
            <EyeOutlined
              onClick={() => handleClickModalDetailTicket(record.id)}
              style={{ color: "#C0C0C0" }}
            />
          </Tooltip>
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
  let detailTicket = useAppSelector(GetDetailTicket);
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
  //redux search cbb status & booking method
  const handleCbbStatusOrBookingMethod = (status, bookingMethod, pageNo) => {
    axios
      .get(
        apiTicket +
          "/get-by-status-and-booking-method?status=" +
          valueCbbStatus +
          "&bookingMethod=" +
          valueCbbBookingMethod +
          "&pageNo=" +
          pageNo
      )
      .then((response) => {
        dispatch(SetListTikcet(response.data.content));
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(
          "Lỗi khi gọi API search cbb status & booking method:",
          error
        );
      });
  };
  useEffect(() => {
    handleCbbStatusOrBookingMethod(
      valueCbbStatus,
      valueCbbBookingMethod,
      currentPage
    );
  }, [valueCbbStatus]);
  useEffect(() => {
    handleCbbStatusOrBookingMethod(
      valueCbbStatus,
      valueCbbBookingMethod,
      currentPage
    );
  }, [valueCbbBookingMethod]);

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
            value={valueCbbStatus}
            onChange={(e) => {
              setValueCbbStatus(e);
            }}
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
            value={valueCbbBookingMethod}
            onChange={(e) => {
              setValueCbbBookingMethod(e);
            }}
            style={{ width: 150 }}
            // onChange={handleChange}
            options={[
              { value: "-1", label: "Tất cả" },
              { value: "2", label: "Vé đặt online" },
              { value: "1", label: "Vé mua tại rạp" },
            ]}
          />
        </div>
      </div>
      <div
        className="row"
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          padding: "20px 18px", // Khoảng cách bên trong đường viền (12px top-bottom, 10px left-right)
        }}
      >
        <div className="col-3">
          {/* searchNgay */}
          <RangePicker
            style={{ marginTop: "20px", height: "40px" }}
            defaultValue={[null, null]}
            format={dateFormat}
          />
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0", // Đường viền màu xám nhạt
            borderRadius: "8px", // Border radius
            padding: "20px 18px", // Khoảng cách bên trong đường viền (12px top-bottom, 10px left-right)
          }}
          className="col-9"
        >
          {/* search show time */}
          <Input
            value={chooseDay}
            onChange={(e) => setChooseDay(e.target.value)}
            className="ticket-search-chooseDay"
            type="date"
          />
          <label className="select-label" htmlFor="my-select">
            Xuất chiếu:
          </label>
          <Select
            id="ticket-select-trangThai"
            value={valueCbbStatus}
            onChange={(e) => {
              setValueCbbStatus(e);
            }}
            style={{ width: 150, marginRight: "10px" }}
            options={[
              { value: "1", label: "Vé đã in" },
              { value: "2", label: "Vé chưa in" },
              { value: "-1", label: "Tất cả" },
            ]}
          />
          <Button
            type="primary"
            style={{ marginLeft: "40px" }}
            // onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      <br></br>
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
