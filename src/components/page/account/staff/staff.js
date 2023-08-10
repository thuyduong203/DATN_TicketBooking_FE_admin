import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import ModalCreateStaff from "./modalAddStaff";

const Staff = () => {
  let [list, setList] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);

  useEffect(() => {
    loadStaff(currentPage);
  }, [currentPage]);

  const loadStaff = (page) => {
    axios
      .get("http://localhost:8080/employee?page=" + page)
      .then((response) => {
        setList(
          response.data.content.map((item, index) => ({
            ...item,
            stt: index + 1,
          }))
        );
        // setList(response.data.content);
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
      title: "Mã",
      dataIndex: "code",
      //   sorter: (a, b) => a.snackType.name.localeCompare(b.snackType.name), // Hỗ trợ sắp xếp theo cột 'Loại đồ ăn'
      //   sortDirections: ["ascend", "descend"],
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo cột 'Tên đồ ăn'
      sortDirections: ["ascend", "descend"],
      // defaultSortOrder: "ascend",
    },
    {
      title: "Sdt",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      //   sorter: (a, b) => a.phoneNumber - b.price, // Hỗ trợ sắp xếp theo cột 'STT'
      //   sortDirections: ["ascend", "descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role === 0) {
          return <span>Nhân viên</span>;
        } else {
          return <span>Quản lý</span>;
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 0) {
          return <span>Đang làm</span>;
        } else {
          return <span>Đã nghỉ</span>;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          {/* Thêm các hành động tương ứng với từng hàng */}
          <Button>Detail</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </span>
      ),
    },
  ];

  const [isModalCreate, setIsModalCreate] = useState(false);

  //modal thêm
  const showModal = () => {
    setIsModalCreate(true);
  };

  const handleCancel = () => {
    setIsModalCreate(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          Thêm nhân viên
        </Button>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <ModalCreateStaff
        isModalVisible={isModalCreate}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Staff;
