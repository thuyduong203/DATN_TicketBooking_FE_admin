import { Modal, Button, Form, Input, InputNumber, DatePicker } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import {
  AddNhanVien,
  SetListStaff,
} from "../../../app/reducers/StaffSlice.reducer";

import { apiCombo } from "../../../../config/api";
import { AddCombo } from "../../../app/reducers/ComboSlice.reducer";

const ModalCreateCombo = ({ isModalVisible, handleCancel }) => {
  const [ten, setTen] = useState("");
  const [gia, setgia] = useState(0);
  const [ngayBatDau, setngayBatDau] = useState(null);
  const [ngayKetThuc, setngayKetThuc] = useState(null);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    const obj = {
      name: ten,
      price: gia,
      endDate: ngayKetThuc,
      startDate: ngayBatDau,
    };
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thực hiện hành động này?"
    );
    if (confirmed === true) {
      axios
        .post(apiCombo + "/add", obj)
        .then((response) => {
          console.log(obj);
          if (response.data.statusCode === "success") {
            let data = response.data.data;
            dispatch(AddCombo(data));
            alert("Thêm thành công");
            handleCancel();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Perform actions to add new staff member here
  };

  const handleDateChangeStartDate = (date) => {
    setngayBatDau(date);
  };

  const handleDateChangeEndDate = (date1) => {
    setngayKetThuc(date1);
  };

  return (
    <Modal
      title="Thêm combo"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item
          label="Tên combo"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên combo!" }]}
        >
          <Input
            value={ten}
            onChange={(e) => {
              setTen(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Giá"
          onChange={(e) => {
            setgia(e.target.value);
          }}
          rules={[
            { required: true, message: "Vui lòng nhập giá!" },
            { type: "number", message: "Vui lòng nhập một số!" },
            { min: 10001, message: "Giá phải lớn hơn 10000!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu!" }]}
        >
          <DatePicker
            defaultValue={ngayBatDau}
            onChange={handleDateChangeStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Vui lòng nhập Ngày kết thúc!" }]}
        >
          <DatePicker
            defaultValue={ngayKetThuc}
            onChange={handleDateChangeEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateCombo;
