import React, { useEffect, useState } from "react";
import { Table, Pagination, Tooltip, Input, Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import axios from "axios";
import { apiCustomer } from "../../../config/api";
import "../../../styles/TicketStyle.css";
import "../../../styles/CustomerStyle.css";
import {
  GetListCustomer,
  SetListCustomer,
} from "../../app/reducers/CustomerSlice.reducer";
import ModalDetailCustomer from "../../modals/Modal_Customer/ModaldetailCustomer";
import AddCustomerModal from "../../modals/Modal_Customer/ModalAddCustomer";
import UpdateCustomerModal from "../../modals/Modal_Customer/ModalUpdateCustomer";
const Customer = () => {
  const dispatch = useAppDispatch();
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5; // Số phần tử trên mỗi trang
  const [isModalDetailCustomer, setIsModalDetailCustomer] = useState(false);
  const [detailCustomerId, setDetailCustomerId] = useState(null);
  let [inputSearch, setInputSearch] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // State để lưu trạng thái hiển thị của modal cập nhật
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleClickModalDetailTicket = (id) => {
    setIsModalDetailCustomer(true);
    setDetailCustomerId(id);
  };
  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1 + currentPage * itemsPerPage, // Tính toán giá trị STT
    },
    {
      title: "Mã KH",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên KH",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
            <EyeOutlined
              onClick={() => handleClickModalDetailTicket(record.id)}
              style={{ color: "#C0C0C0", marginRight: "12px" }}
            />
          </Tooltip>
          <Tooltip title="Cập nhật">
            <EditOutlined
              onClick={() => handleClickUpdateCustomer(record.id)}
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
  const listCustomerRedux = useAppSelector(GetListCustomer);
  const fetchData = (currentPage) => {
    axios
      .get(apiCustomer + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
        dispatch(SetListCustomer(response.data.content));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!inputSearch) {
      fetchData(currentPage);
    } else {
      handleTypeInputSearch(inputSearch);
    }
  }, [inputSearch]);
  const handleTypeInputSearch = (inputSearch) => {
    axios
      .get(apiCustomer + "/search?pageNo=0&inputSearch=" + inputSearch)
      .then((response) => {
        dispatch(SetListCustomer(response.data.content));
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API search customer:", error);
      });
  };
  const handleCancelModalDetailCustomer = () => {
    setIsModalDetailCustomer(false);
  };
  // Hàm để mở modal cập nhật
  const handleClickUpdateCustomer = (id) => {
    setSelectedCustomerId(id);
    setIsUpdateModalVisible(true);
  };

  return (
    <div className="div-ticket">
      <h3>Khách hàng</h3>
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-5">
          <Input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="customer-input-search"
            placeholder="Mã KH/ Tên KH/ Sđt KH/ Địa chỉ/ Tên đăng nhập"
          />
        </div>
        <div className="col-3 customer-btn-themKH">
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
            onClick={showAddModal}
          >
            <span>+ Thêm khách hàng</span>
          </button>
        </div>
      </div>
      {/* table */}
      <div className="table-wrapper">
        <Table
          dataSource={listCustomerRedux}
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
      <ModalDetailCustomer
        visible={isModalDetailCustomer}
        handleCancelModalDetailCustomer={handleCancelModalDetailCustomer}
        id={detailCustomerId}
      ></ModalDetailCustomer>
      <AddCustomerModal visible={isAddModalVisible} onCancel={closeAddModal} />
      <UpdateCustomerModal
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        customerId={selectedCustomerId}
      />
    </div>
  );
};

export default Customer;
