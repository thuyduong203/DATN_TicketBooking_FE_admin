import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";

const Food = () => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);
  let [list, setList] = useState([]);
  var [listTypeFood, setlistTypeFood] = useState([]);
  const [idTypeFood, setIdTypeFood] = useState();
  let [name, setName] = useState("");
  let [price, setPrice] = useState();
  let [unit, setUnit] = useState("");
  let [quantity, setQuantity] = useState();
  let [idFood, setIdFood] = useState();
  let idTypeFoodUpdate;

  useEffect(() => {
    loadFood(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   loadTypeFood();
  // }, []);
  const loadTypeFood = () => {
    axios
      .get("http://localhost:8080/snack-type")
      .then((response) => {
        setlistTypeFood(response.data.data);
        setIdTypeFood(listTypeFood[0].id);
      })
      .catch((error) => {});
  };
  if (idTypeFood === undefined) {
    loadTypeFood();
  }
  const loadFood = (page) => {
    axios.get("http://localhost:8080/snack?page=" + page).then((response) => {
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

  const remove = (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (confirmed === true) {
      axios.put("http://localhost:8080/snack/remove/" + id).then((response) => {
        if (response.data.statusCode === "success") {
          alert(response.data.data);
          loadFood(0);
        }
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
      title: "Loại đồ ăn",
      dataIndex: "snackType",
      sorter: (a, b) => a.snackType.name.localeCompare(b.snackType.name), // Hỗ trợ sắp xếp theo cột 'Loại đồ ăn'
      sortDirections: ["ascend", "descend"],
      key: "snackType",
      render: (s) => {
        return <span>{s.name}</span>;
      },
    },
    {
      title: "Tên đồ ăn",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo cột 'Tên đồ ăn'
      sortDirections: ["ascend", "descend"],
      // defaultSortOrder: "ascend",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price, // Hỗ trợ sắp xếp theo cột 'STT'
      sortDirections: ["ascend", "descend"],
      render: (price) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 0) {
          return <span>Đang áp dụng</span>;
        } else {
          return <span>Ngưng áp dụng</span>;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          {/* Thêm các hành động tương ứng với từng hàng */}
          <Button onClick={() => showDetailModal(record)}>Detail</Button>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
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
  // modal detail
  const showDetailModal = (record) => {
    setSelectedDetail(record);
    setDetailModalVisible(true);
  };

  //modal thêm
  const Food = () => {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi nhấn OK trong modal
    let obj = {
      name: name,
      price: parseFloat(price),
      unit: unit,
      quantity: parseInt(quantity),
      snackType: idTypeFood + "",
    };
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (confirmed === true) {
      axios.post("http://localhost:8080/snack/add", obj).then((response) => {
        if (response.data.statusCode === "success") {
          alert(response.data.data);
          loadFood(0);
        }
      });
      console.log(obj);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleQuickAdd = () => {};

  const numericValidator = (rule, value, callback) => {
    if (isNaN(value)) {
      callback("Vui lòng nhập giá trị là số!");
    } else {
      callback();
    }
  };

  const greaterThanValidator = (minValue) => (rule, value, callback) => {
    if (value > minValue) {
      callback();
    } else {
      callback(`Giá trị phải lớn hơn ${minValue}!`);
    }
  };
  // đến đây mới hết

  //modal update
  const showEditModal = (record) => {
    axios
      .get("http://localhost:8080/snack/find-by-id/" + record.id)
      .then((response) => {
        if (response.data.statusCode === "OK") {
          idTypeFoodUpdate = response.data.data.snackType.id;
          setName(response.data.data.name);
          setPrice(response.data.data.price);
          setQuantity(response.data.data.quantity);
          setUnit(response.data.data.unit);
          console.log(idTypeFoodUpdate);
        }
      });
    setEditModalVisible(true);
  };

  const handleEditOk = () => {
    // Thực hiện xử lý chỉnh sửa dữ liệu
    let obj = {
      name: name,
      price: parseFloat(price),
      unit: unit,
      quantity: parseInt(quantity),
      snackType: idTypeFood + "",
    };
    console.log(obj);
    console.log(idFood);
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    // if (confirmed === true) {
    //   axios.post("http://localhost:8080/snack/add", obj).then((response) => {
    //     if (response.data.statusCode === "success") {
    //       alert(response.data.data);
    //       loadFood(0);
    //     }
    //   });
    //   console.log(obj);
    // }
    setEditModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={showModal}>
          Thêm đồ ăn
        </Button>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      <Modal
        title="Thêm đồ ăn"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="Loại đồ ăn" rules={[{ required: true }]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                defaultValue={
                  listTypeFood.length > 0 ? listTypeFood[0].id : undefined
                }
                onChange={(e) => {
                  setIdTypeFood(e);
                }}
              >
                {listTypeFood.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
              <Button type="button">Thêm nhanh</Button>
            </div>
          </Form.Item>
          <Form.Item
            label="Tên đồ ăn"
            name="tenDoAn"
            rules={[{ required: true, message: "Vui lòng nhập tên đồ ăn!" }]}
          >
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="gia"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="soLuong"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            rules={[
              { required: true, message: "Vui lòng nhập số lượng!" },
              { validator: numericValidator },
              { validator: greaterThanValidator(1) },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Đơn vị tính"
            name="donVi"
            onChange={(e) => {
              setUnit(e.target.value);
            }}
            rules={[{ required: true, message: "Vui lòng nhập đơn vị tính!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thông tin chi tiết"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
      >
        {selectedDetail && (
          <div>
            <p>
              <strong>Loại đồ ăn:</strong> {selectedDetail.snackType.name}
            </p>
            <p>
              <strong>Tên đồ ăn:</strong> {selectedDetail.name}
            </p>
            <p>
              <strong>Giá:</strong>{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(selectedDetail.price)}
            </p>
            <p>
              <strong>Số lượng:</strong> {selectedDetail.quantity}
            </p>
            <p>
              <strong>Đơn vị:</strong> {selectedDetail.unit}
            </p>
          </div>
        )}
      </Modal>
      <Modal
        title="Chỉnh sửa đồ ăn"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditOk}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="Loại đồ ăn" rules={[{ required: true }]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                defaultValue={
                  // listTypeFood === idTypeFood ? idTypeFood : undefined?
                  idTypeFoodUpdate
                }
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    snackType: { ...editingItem.snackType, id: e },
                  });
                }}
              >
                {listTypeFood.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
              <Button type="button">Thêm nhanh</Button>
            </div>
          </Form.Item>
          <Form.Item
            label="Tên đồ ăn"
            rules={[{ required: true, message: "Vui lòng nhập tên đồ ăn!" }]}
          >
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber value={price} />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            rules={[
              { required: true, message: "Vui lòng nhập số lượng!" },
              { validator: numericValidator },
              { validator: greaterThanValidator(1) },
            ]}
          >
            <InputNumber value={quantity} />
          </Form.Item>
          <Form.Item
            label="Đơn vị tính"
            onChange={(e) => {
              setUnit(e.target.value);
            }}
            rules={[{ required: true, message: "Vui lòng nhập đơn vị tính!" }]}
          >
            <Input value={unit} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Food;
