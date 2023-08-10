import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  SetListCombo,
  GetListCombo,
} from "../../../app/reducers/ComboSlice.reducer";
import { apiCombo } from "../../../../config/api";
import ModalCreateCombo from "./ModalComboAdd";
import ModalDetailCombo from "./ModalDetailCombo";

const Combo = () => {
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);
  let [inputSearch, setInputSearch] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    loadCombo(currentPage);
  }, [currentPage]);

  const loadCombo = (page) => {
    axios.get(apiCombo + "?page=" + page).then((response) => {
      dispatch(SetListCombo(response.data.content));
      console.log(response.data.content);
      setCurrentPage(0);
      setToTalPages(response.data.totalPages);
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "list.index",
      key: "list.index",
      // sorter: (a, b) => a.stt - b.stt, // Hỗ trợ sắp xếp theo cột 'STT'
      // sortDirections: ["ascend", "descend"],
    },
    {
      title: "Tên",
      dataIndex: "name",
      //   sorter: (a, b) => a.snackType.name.localeCompare(b.snackType.name), // Hỗ trợ sắp xếp theo cột 'Loại đồ ăn'
      //   sortDirections: ["ascend", "descend"],
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
      // sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo cột 'Tên đồ ăn'
      // sortDirections: ["ascend", "descend"],
      // defaultSortOrder: "ascend",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      //   sorter: (a, b) => a.phoneNumber - b.price, // Hỗ trợ sắp xếp theo cột 'STT'
      //   sortDirections: ["ascend", "descend"],
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 0) {
          return <span>Đang áp dụng</span>;
        } else {
          return <span>Ngừng áp dụng</span>;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          {/* Thêm các hành động tương ứng với từng hàng */}
          <Button onClick={() => showModalDetail(record.id)}>Detail</Button>
          {/* <Button onClick={() => showModalUpdate(record.id)}>Edit</Button> */}
          <Button
            onClick={() => {
              remove(record.id);
            }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  //remove
  const remove = (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (confirmed === true) {
      axios.put(apiCombo + "/remove/" + id).then((response) => {
        if (response.data.statusCode === "success") {
          alert(response.data.data);
          loadCombo(0);
        }
      });
    }
  };

  //modal thêm
  const [isModalCreate, setIsModalCreate] = useState(false);
  const showModal = () => {
    setIsModalCreate(true);
  };

  const handleCancel = () => {
    setIsModalCreate(false);
  };

  //modal detail
  const [idDetail, setIdDetail] = useState(null);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const showModalDetail = (id) => {
    setIsModalDetail(true);
    setIdDetail(id);
  };

  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };

  const listCombo = useAppSelector(GetListCombo);

  return (
    <div>
      <h2>Combo</h2>
      {/* <div className="search-select-wrapper">
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
      </div> */}
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          Thêm combo
        </Button>
      </div>
      <Table
        dataSource={listCombo}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <ModalCreateCombo
        isModalVisible={isModalCreate}
        handleCancel={handleCancel}
      />
      <ModalDetailCombo
        isModalVisible={isModalDetail}
        handleCancel={handleCancelDetail}
        id={idDetail}
      />
    </div>
  );
};

export default Combo;
