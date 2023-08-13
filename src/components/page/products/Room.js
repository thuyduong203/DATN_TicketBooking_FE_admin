import { Button, Modal, Pagination, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetRoom, setListRoom } from "../../app/reducers/RoomSlice.reducer";
import LoadingIndicator from "../loading";
import { apiRoom } from "../../../config/api";
import React from "react";
import AddRoomModal from "../../modals/Modal_Room/AddModalRoom";
import DetailRoomModal from "../../modals/Modal_Room/DetailModelRoom";
import { deleteRoom } from "../../app/reducers/RoomSlice.reducer";

const Room = () => {
  const dispatch = useAppDispatch();
  const listRoom = useAppSelector(GetRoom);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]); // Dữ liệu bảng

  const [isLoading, setIsLoading] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const updateTableData = (updatedData) => {
    // Cập nhật dữ liệu bảng
    setTableData(updatedData);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // detail
  const [selectedRow, setSelectedRow] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = (record) => {
    setSelectedRow(record);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRoomData(currentPage);
  }, [currentPage]);

  const fetchRoomData = async (currentPage) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        apiRoom + "/get-all?pageNo=" + currentPage
      );
      console.log("API Response:", response.data);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
      dispatch(setListRoom(response.data.content));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Chairs",
      dataIndex: "totalChair",
      key: "totalChair",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 1) {
          return <span>Đang chiếu</span>;
        } else if (status === 2) {
          return <span>Đang trống</span>;
        } else if (status === 3) {
          return <span>Đang dọn dẹp</span>;
        } else {
          return <span>Không xác định</span>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Detail
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
    // State cho modal chi tiết phòng
  ];
  const handleDelete = async (roomId) => {
    try {
      // Gọi API để xóa phòng
      const response = await axios.delete(apiRoom + "/delete/" + roomId);

      // Nếu xóa thành công, cập nhật lại danh sách phòng trong Redux store
      if (response.data.success) {
        dispatch(deleteRoom(response.data.content)); // Gọi action setListRoom
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      <Button type="primary" onClick={showModal}>
        Add Room
      </Button>
      <AddRoomModal visible={isModalVisible} onCancel={handleCancel} />
      <div className="table-wrapper">
        <Table
          dataSource={listRoom}
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
      <DetailRoomModal
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        record={selectedRow} // Truyền dữ liệu của dòng được chọn vào modal
        updateTableData={updateTableData}
      />
    </div>
  );
};

export default Room;
