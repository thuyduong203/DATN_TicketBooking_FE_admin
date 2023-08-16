import React, { useEffect } from "react";
import { theme, Layout } from "antd";
//Products
import Room from "./page/products/Room";
import Chair from "./page/products/Chair";
import Ticket from "./page/products/Ticket";
import TypeTicket from "./page/products/TypeTicket";
// Food Combo
import Combo from "./page/foodCombo/combo/Combo";
import Food from "./page/foodCombo/Food";
// Films
import Actor from "./page/films/Actor";
import Directors from "./page/films/Directors";
import Genre from "./page/films/Genre";
import Image from "./page/films/Image";
import Movie from "./page/films/Movie";
import Producer from "./page/films/Producer";
import Showtime from "./page/films/Showtime";
import Trailer from "./page/films/Trailer";
import MainActor from "./page/films/MainActor";
import { Routes, Route, useLocation } from "react-router-dom";
//account
import Staff from "./page/account/staff/staff";
//Order
import Order from "./page/order/Order";
import OrderDetail from "./page/order/OrderDetail";

import Sell from "./page/sell";

import { animateScroll as scroll } from "react-scroll";
import Customer from "./page/account/Customer";
const { Content } = Layout;

const CustomContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  // Hàm xử lý sự kiện khi chuyển đổi giữa các trang
  useEffect(() => {
    scroll.scrollToTop(); // Cuộn lên đầu trang khi chuyển đổi giữa các trang
  }, [location.pathname]);
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: "calc(100vh - 48px)",
        background: colorBgContainer,
      }}
    >
      <Routes>
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/room" element={<Room />} />
        <Route path="/chair" element={<Chair />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/typeTicket" element={<TypeTicket />} />

        <Route path="/combo" element={<Combo />} />
        <Route path="/food" element={<Food />} />

        <Route path="/actor" element={<Actor />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/showtime" element={<Showtime />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/mainActor" element={<MainActor />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/trailer" element={<Trailer />} />
        <Route path="/image" element={<Image />} />

        <Route path="/staff" element={<Staff />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Content>
  );
};

export default CustomContent;
