import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Pagination,
} from "antd";
import axios from "axios";
import ModalCreateStaff from "./modalAddStaff";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { apiStaff } from "../../../../config/api";
import ModalUpdateStaff from "./modalUpdate";
import {
  SetListStaff,
  GetListStaff,
} from "../../../app/reducers/StaffSlice.reducer";
import ModalDetailStaff from "./modalDetailStaff";

const Staff = () => {
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);
  const dispatch = useAppDispatch();
  const [searchText, setSearchTet] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    loadStaff(currentPage);
  }, [currentPage]);

  const loadStaff = (page) => {
    axios
      .get("http://localhost:8080/employee?page=" + page)
      .then((response) => {
        dispatch(SetListStaff(response.data.content));
        // setList(response.data.content);
        setCurrentPage(response.data.number);
        setToTalPages(response.data.totalPages);
      });
  };

  //search
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    axios
      .get(apiStaff + "/search?search=" + searchText + "&page=" + 0)
      .then((response) => {
        dispatch(SetListStaff(response.data.content));
        // setList(response.data.content);
        setCurrentPage(0);
        setToTalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API search ticket:", error);
      });
  };

  //lọc
  useEffect(() => {
    findByStatusAndRole();
  }, [status, role]);

  const findByStatusAndRole = () => {
    //cả 2 đều là all
    if (status === "all" && role === "all") {
      console.log("Không vào đâu");
      loadStaff(currentPage);
      // status = số
      // role = chữ

      ////////////////////////////////////////////////////////////////////////////////////////////////
    } else if (status !== "all" && role === "all") {
      console.log("Trạng thái");
      axios
        .get(apiStaff + "/find-by-status?status=" + status + "&page=" + 0)
        .then(function (response) {
          dispatch(SetListStaff(response.data.content));
          // setList(response.data.content);
          setCurrentPage(0);
          setToTalPages(response.data.totalPages);
        });
      // status = chữ
      // role = số
    } else if (status === "all" && role !== "all") {
      console.log("role");
      axios
        .get(apiStaff + "/find-by-role?role=" + role + "&page=" + 0)
        .then(function (response) {
          dispatch(SetListStaff(response.data.content));
          // setList(response.data.content);
          setCurrentPage(0);
          setToTalPages(response.data.totalPages);
        });
      // cả 2 cbb đều là số
    } else {
      axios
        .get(
          apiStaff +
            "/find-by-status-and-role?status=" +
            status +
            "&role=" +
            role +
            "&page=" +
            0
        )
        .then(function (response) {
          dispatch(SetListStaff(response.data.content));
          // setList(response.data.content);
          setCurrentPage(0);
          setToTalPages(response.data.totalPages);
        });
    }
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
          <Button onClick={() => showModalDetail(record.id)}>Detail</Button>
          <Button onClick={() => showModalUpdate(record.id)}>Edit</Button>
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
      axios.put(apiStaff + "/remove/" + id).then((response) => {
        if (response.data.statusCode === "success") {
          alert(response.data.data);
          loadStaff(0);
        }
      });
    }
  };

  const [isModalCreate, setIsModalCreate] = useState(false);

  //modal thêm
  const showModal = () => {
    setIsModalCreate(true);
  };

  const handleCancel = () => {
    setIsModalCreate(false);
  };

  const [isModalDetail, setIsModalDetail] = useState(false);
  const [idDetail, setIdDetail] = useState(null);
  //modal detail
  const showModalDetail = (id) => {
    setIsModalDetail(true);
    setIdDetail(id);
  };

  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };

  //modal update
  const [isModalUpdate, setIsModalUpdate] = useState(false);

  //modal update
  const showModalUpdate = (id) => {
    setIsModalUpdate(true);
    setIdDetail(id);
  };

  const handleCancelUpdate = () => {
    setIsModalUpdate(false);
  };

  const listStaff = useAppSelector(GetListStaff);

  return (
    <div>
      <h2>Nhân viên</h2>
      <div className="search-select-wrapper">
        <Input
          value={searchText}
          onChange={(e) => setSearchTet(e.target.value)}
          className="ticket-input-search"
          placeholder="Mã/ tên/ sdt/ email/ địa chỉ"
        />
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select">
            Trạng thái:
          </label>
          <Select
            id="ticket-select-trangThai"
            defaultValue="all"
            style={{ width: 150 }}
            // onChange={findByStatusAndRole}
            onChange={(e) => {
              setStatus(e);
            }}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "0", label: "Đang làm" },
              { value: "1", label: "Đã nghỉ" },
            ]}
          />
        </div>
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select-2">
            Chức vụ:
          </label>
          <Select
            id="ticket-select-loaiVe"
            defaultValue="all"
            style={{ width: 150 }}
            // onChange={findByStatusAndRole}
            onChange={(e) => {
              setRole(e);
            }}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "0", label: "Nhân viên" },
              { value: "1", label: "Quản lý" },
            ]}
          />
        </div>
      </div>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          Thêm nhân viên
        </Button>
      </div>
      <Table
        dataSource={listStaff}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <div className="pagination-wrapper">
        <Pagination
          simple
          current={currentPage + 1}
          onChange={(value) => setCurrentPage(value - 1)}
          total={totalPages * 10}
        />
      </div>
      <ModalCreateStaff
        isModalVisible={isModalCreate}
        handleCancel={handleCancel}
      />
      <ModalDetailStaff
        isModalVisible={isModalDetail}
        handleCancel={handleCancelDetail}
        id={idDetail}
      />
      <ModalUpdateStaff
        isModalVisible={isModalUpdate}
        handleCancel={handleCancelUpdate}
        id={idDetail}
      />
    </div>
  );
};

export default Staff;
