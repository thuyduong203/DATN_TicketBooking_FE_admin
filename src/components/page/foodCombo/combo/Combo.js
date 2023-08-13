import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  SetListCombo,
  GetListCombo,
} from "../../../app/reducers/ComboSlice.reducer";
import { apiCombo } from "../../../../config/api";
import ModalCreateCombo from "./ModalComboAdd";
import ModalDetailCombo from "./ModalDetailCombo";
import "../../../../styles/combo.css";

const Combo = () => {
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);
  let [inputSearch, setInputSearch] = useState("");
  const [searchText, setSearchTetx] = useState("");
  const [status, setStatus] = useState("all");
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [ngayBatDau, setngayBatDau] = useState(null);
  const [ngayKetThuc, setngayKetThuc] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    loadCombo(currentPage);
  }, [currentPage]);

  const loadCombo = (page) => {
    axios.get(apiCombo + "?page=" + page).then((response) => {
      dispatch(SetListCombo(response.data.content));
      setCurrentPage(0);
      setToTalPages(response.data.totalPages);
    });
  };

  //search tên
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    axios
      .get(apiCombo + "/search-text?search=" + searchText + "&page=" + 0)
      .then((response) => {
        dispatch(SetListCombo(response.data.content));
        // setList(response.data.content);
        setCurrentPage(0);
        setToTalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API search ticket:", error);
      });
  };

  //search giá
  useEffect(() => {
    handleSearchPrice();
  }, [minPrice, maxPrice]);

  const handleSearchPrice = () => {
    if (minPrice === "" || maxPrice === "") {
      loadCombo(currentPage);
    } else if (minPrice === 0 || maxPrice === 0) {
      loadCombo(currentPage);
    } else {
      axios
        .get(
          "http://localhost:8080/combo/search-price?min=" +
            minPrice +
            "&max=" +
            maxPrice +
            "&page=" +
            0
        )
        .then(function (response) {
          dispatch(SetListCombo(response.data.content));
          // setList(response.data.content);
          setCurrentPage(0);
          setToTalPages(response.data.totalPages);
        });
    }
  };

  //search date
  useEffect(() => {
    handleSearchDate();
    console.log(ngayBatDau);
    console.log(ngayKetThuc);
  }, [ngayBatDau, ngayKetThuc]);

  const handleDateChangeStartDate = (date) => {
    if (date != null) {
      setngayBatDau(date.$d);
    } else {
      setngayBatDau(null);
    }
  };

  const handleDateChangeEndDate = (date1) => {
    if (date1 != null) {
      setngayKetThuc(date1.$d);
    } else {
      setngayBatDau(null);
    }
  };

  const handleSearchDate = () => {
    if (ngayBatDau == null || ngayKetThuc == null) {
      loadCombo(currentPage);
    } else {
      axios
        .get(
          apiCombo +
            "/search-date?startDate=" +
            ngayBatDau +
            "&endDate=" +
            ngayKetThuc +
            "&page=" +
            0
        )
        .then(function (response) {
          dispatch(SetListCombo(response.data.content));
          // setList(response.data.content);
          setCurrentPage(0);
          setToTalPages(response.data.totalPages);
        });
    }
  };

  //lọc
  useEffect(() => {
    findByStatus();
  }, [status]);

  const findByStatus = () => {
    if (status === "all") {
      loadCombo(currentPage);
    } else {
      axios
        .get(apiCombo + "/find-by-status?status=" + status + "&page=" + 0)
        .then(function (response) {
          dispatch(SetListCombo(response.data.content));
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
      <div className="search-select-wrapper">
        <Input
          value={searchText}
          onChange={(e) => setSearchTetx(e.target.value)}
          className="ticket-input-search search"
          placeholder="Tên combo"
        />
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select">
            Giá nhỏ nhất:
          </label>
          <Input
            value={minPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value)) {
                // Kiểm tra nếu là số
                setMinPrice(value);
              }
            }}
            placeholder="Giá nhỏ nhất"
          />
        </div>
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select">
            Giá lớn nhất:
          </label>
          <Input
            value={maxPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value)) {
                // Kiểm tra nếu là số
                setMaxPrice(value);
              }
            }}
            placeholder="GIá lớn nhất"
          />
        </div>
      </div>
      <div className="search-select-wrapper dong-2">
        <div className="select-wrapper trang-thai">
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
              { value: "0", label: "Đang áp dụng" },
              { value: "1", label: "Ngừng áp dụng" },
            ]}
          />
        </div>
        <div className="select-wrapper ngay-bat-dau">
          <label className="select-label" htmlFor="my-select">
            Ngày bắt đầu tìm kiếm:
          </label>
          <DatePicker
            className="input-date-bd"
            defaultValue={ngayKetThuc}
            onChange={handleDateChangeStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div className="select-wrapper">
          <label className="select-label" htmlFor="my-select">
            Ngày kết thúc tìm kiếm:
          </label>
          <DatePicker
            className="input-date-kt"
            defaultValue={ngayKetThuc}
            onChange={handleDateChangeEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
      </div>
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
        className="centered-table"
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
