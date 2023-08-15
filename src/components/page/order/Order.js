import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Button,
  Tooltip,
  Input,
  DatePicker,
  Slider,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiOrder } from "../../../config/api";
import dayjs from "dayjs";
import "./Order.css";
import { EyeOutlined } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
//
import { useAppDispatch, useAppSelector } from "../../../components/app/hook";
import {
  SetListOrder,
  GetListOrder,
} from "../../../components/app/reducers/OrderSlice.reducer";
import TextSearch from "./searchOrder/TextSearch";
import DateRangeSearch from "./searchOrder/DateRangeSearch";
import PriceRangeSearch from "./searchOrder/PriceRangeSearch";
//
const Order = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { Search } = Input;
  //taoDispatch
  const dispatch = useAppDispatch();
  //
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  //
  //formatNgay
  dayjs.extend(customParseFormat);
  // loadDataDungListOrderRedux
  const loadDataOrder = (currentPage) => {
    axios
      .get(apiOrder + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        console.log(response.data.content);
        dispatch(SetListOrder(response.data.content));
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get all order:", error);
      });
  };
  //cập nhật lại page
  useEffect(() => {
    loadDataOrder(currentPage);
  }, [currentPage]);
  //setListLayDuLieuTuRedux
  const listOrderr = useAppSelector(GetListOrder);

  //search
  const handleTextSearch = (query) => {
    setSearchQuery(query); // Lưu nội dung ô input tìm kiếm
    if (query.trim() === "") {
      // Kiểm tra xem query có chỉ chứa khoảng trắng và không có kí tự nào không
      axios
        .get(apiOrder + "/get-all?pageNo=" + currentPage)
        .then((response) => {
          dispatch(SetListOrder(response.data.content));
          setCurrentPage(response.data.number);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API get all order:", error);
        });
    } else {
      axios
        .get(apiOrder + "/searchOrder?pageNo=0&search=" + query)
        .then((response) => {
          dispatch(SetListOrder(response.data.content));
          setCurrentPage(response.data.number);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API tìm kiếm:", error);
        });
    }
  };

  const handleDateChange = (dates) => {
    // Handle date range change
  };

  const handlePriceChange = (values) => {
    // Handle price range change
  };
  //
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <Button
            style={{
              backgroundColor: "#ffd700",
              color: "#fff",
              borderRadius: "20px",
            }}
          >
            Chờ thanh toán
          </Button>
        );
      case 2:
        return (
          <Button
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              borderRadius: "20px",
            }}
          >
            Đã thanh toán
          </Button>
        );
      case 3:
        return (
          <Button
            style={{
              backgroundColor: "#f5222d",
              color: "#fff",
              borderRadius: "20px",
            }}
          >
            Đã hủy
          </Button>
        );
      default:
        return "";
    }
  };
  //
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
      title: "Tên Khách Hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => {
        if (customerName === null) {
          return "Khách lẻ";
        }
        return customerName;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => (
        <span style={{ color: "green" }}>
          {new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(Number(totalAmount))}
        </span>
      ),
    },
    {
      title: "Tổng tiền khi giảm",
      dataIndex: "totalAfterReduction",
      key: "totalAfterReduction",
      render: (totalAfterReduction) => (
        <span style={{ color: "red" }}>
          {new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(Number(totalAfterReduction))}
        </span>
      ),
    },
    {
      title: "Loại hóa đơn",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => {
        if (customerName === null) {
          return (
            <Button
              style={{
                backgroundColor: "#52c41a",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Tại Quầy
            </Button>
          );
        }
        if (customerName !== null) {
          return (
            <Button
              style={{
                backgroundColor: "#55acee",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Online
            </Button>
          );
        }
      },
    },

    {
      title: "Ngày tạo",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Tooltip title="Chi tiết">
          <span>
            <Link
              to={{
                pathname: `/order/${record.id}`,
                state: { orderId: record.id },
              }}
            >
              <EyeOutlined style={{ color: "#C0C0C0" }} />
              {/* Sử dụng EyeOutlined icon */}
            </Link>
          </span>
        </Tooltip>
      ),
    },
  ];
  //
  return (
    <div className="container">
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-3">
          <TextSearch onSearch={handleTextSearch} />
        </div>
        <div className="col-3">
          <DateRangeSearch onDateChange={handleDateChange} />
        </div>
        <div className="col-3">
          <PriceRangeSearch
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="col-3">
          {/* buutonAdd */}
          <button
            type="button"
            style={{
              backgroundColor: "rgb(85, 172, 238)",
              color: "rgb(255, 255, 255)",
              borderRadius: "10px",
              width: "150px",
              height: "48px",
              boxShadow: "rgb(183, 183, 183) 5px 6px;",
              border: "none",
              float: "right",
              marginTop: "20px",
            }}
          >
            <span>+ Thêm hóa đơn</span>
          </button>
        </div>
      </div>
      {/* table */}
      <div className="order-container">
        <Table
          dataSource={listOrderr}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          align="center"
        />
        <div className="pagination-container">
          <Pagination
            simple
            current={currentPage + 1}
            onChange={(value) => setCurrentPage(value - 1)}
            total={totalPages * 10}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
