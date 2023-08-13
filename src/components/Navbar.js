import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

import Logo from "../assets/logo.png";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <div
        className="logo"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        <img src={Logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        <div style={{ color: "Highlight", fontSize: "20px", fontWeight: "" }}>
          Tuan's Cinema
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/dashboard" icon={<UserOutlined />}>
          Trang chủ
        </Menu.Item>
        <p className="title-note">Bán hàng & Hóa đơn</p>
        <Menu.Item key="/sell" icon={<VideoCameraOutlined />}>
          Bán hàng
        </Menu.Item>
        <Menu.Item key="/order" icon={<VideoCameraOutlined />}>
          Hóa đơn
        </Menu.Item>

        <p>Sản phẩm</p>
        <SubMenu icon={<UploadOutlined />} title="Phim">
          <Menu.Item key="/movie">Phim</Menu.Item>
          <Menu.Item key="/showTime">Lịch chiếu</Menu.Item>
          <Menu.Item key="/producer">Nhà sản xuất</Menu.Item>
          <Menu.Item key="/genre">Thể loại</Menu.Item>
          <Menu.Item key="/mainActor">Diễn viên chính</Menu.Item>
          <Menu.Item key="/directors">Đạo diễn</Menu.Item>
          <Menu.Item key="/trailer">Trailer</Menu.Item>
          <Menu.Item key="/image">Hình ảnh</Menu.Item>
        </SubMenu>

        <SubMenu icon={<UploadOutlined />} title="Sản phẩm">
          <Menu.Item key="/ticket">Vé</Menu.Item>
          <Menu.Item key="/typeTicket">Loại vé</Menu.Item>
          <Menu.Item key="/chair">Ghế</Menu.Item>
          <Menu.Item key="/room">Phòng</Menu.Item>
        </SubMenu>
        <SubMenu icon={<UploadOutlined />} title="Combo đồ ăn">
          <Menu.Item key="/food">Đồ ăn</Menu.Item>
          <Menu.Item key="/combo">Combo</Menu.Item>
        </SubMenu>
        <p>Tài khoản</p>
        <SubMenu icon={<UploadOutlined />} title="Tài khoản">
          <Menu.Item key="/staff">Nhân viên</Menu.Item>
          <Menu.Item key="/client">Khách hàng</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Navbar;
