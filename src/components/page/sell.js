import { Button, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import "../../styles/SellStyle.css";
import axios from "axios";
import { apiURL } from "../../config/api";

const { Option } = Select;

const Sell = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [filmList, setFilmList] = useState([]);
  const [selectedFilmId, setSelectedFilmId] = useState(1);
  let [detailPhim, setDetailPhim] = useState({});
  const [listXuatChieuTheoPhim, setListXuatChieuTheoPhim] = useState([]);
  const [selectedXuatChieu, setSelectedXuatChieu] = useState(null);
  const [selectedPhongChieu, setSelectedPhongChieu] = useState(null);
  const [listGhe, setListGhe] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách phim từ backend
    axios
      .get("http://localhost:8080/employee/movie/get-all")
      .then((response) => {
        if (Array.isArray(response.data.listObject)) {
          setFilmList(response.data.listObject);
        } else {
          console.error("Dữ liệu từ API không phải là mảng:", response.data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách phim:", error);
      });
  }, []);
  useEffect(() => {
    handleSelectPhim(selectedFilmId);
    getXuatChieuByPhim(selectedFilmId);
  }, [selectedFilmId]);
  //get one phim
  const handleSelectPhim = (selectedFilmId) => {
    axios
      .get(
        "http://localhost:8080/employee/movie/get-one-by-id/" + selectedFilmId
      )
      .then((response) => {
        setDetailPhim(response.data);
        console.log(detailPhim);
      })
      .catch((error) => {
        console.error(
          "Lỗi khi gọi API search cbb status & booking method:",
          error
        );
      });
  };

  //get xuất chiếu theo phim
  const getXuatChieuByPhim = (selectedFilmId) => {
    axios
      .get(apiURL + "/sell/get-show-time-by-movie/" + selectedFilmId)
      .then((response) => {
        setListXuatChieuTheoPhim(response.data);
        console.log(response.data);
        console.log("Xuât chieu theo phim: ");
        console.log(listXuatChieuTheoPhim);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get xuat chieu theo phim", error);
      });
  };
  const handleXuatChieuClick = (xuatChieu) => {
    setSelectedXuatChieu(xuatChieu);
    setSelectedPhongChieu(xuatChieu.room);

    // Gọi API để lấy danh sách ghế của phòng
    axios
      .get(apiURL + "/chair/get-chair-by-room-id/" + xuatChieu.room.id)
      .then((response) => {
        setListGhe(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API lấy danh sách ghế", error);
      });
  };

  return (
    <div>
      <h3>Bán hàng</h3>
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-5">
          <Input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="customer-input-search"
            placeholder="Tên phim"
          />
        </div>
      </div>
      <div className="man-ban-hang">
        <div className="man-ban-hang-1">
          <label className="select-label" style={{ marginRight: "25px" }}>
            Phim đang chiếu:
          </label>
          <Select
            value={selectedFilmId}
            onChange={(e) => {
              setSelectedFilmId(e);
            }}
            style={{ width: 150 }}
            // onChange={handleChange}
          >
            {filmList.map((film) => (
              <Option key={film.id} value={film.id}>
                {film.name}
              </Option>
            ))}
          </Select>
          <br />
          <br />
          <div className="man-ban-hang-1-detail-phim">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://img.hoidap247.com/picture/question/20200729/large_1596034545558.jpg"
                  alt="Hình ảnh"
                  width="170"
                  height="150"
                />
              </div>
              <div className="col-1"></div>
              <div className="col-4">
                <h4>{detailPhim.name}</h4>
                <br />- Thời lượng: {detailPhim.time} phút
                <br />- Tuổi gh: {detailPhim.ageLimit} tuổi
                <br />
                <br />
                <h5>Xuất chiếu:</h5>
                <div>
                  {listXuatChieuTheoPhim.map((xuatChieu) => (
                    <Button
                      key={xuatChieu.id}
                      className="xuat-chieu-button"
                      style={{
                        backgroundColor: "#e6f7ff",
                        marginBottom: "5px",
                      }}
                      onClick={() => handleXuatChieuClick(xuatChieu)}
                    >
                      {xuatChieu.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="man-ban-hang-2">
          {selectedXuatChieu && selectedPhongChieu && (
            <div>
              <h4>Phòng: {selectedPhongChieu.name}</h4>
              Xuất chiếu: {selectedXuatChieu.time} - Phim:{" "}
              {selectedXuatChieu.movie.name}
              <h6>Danh sách ghế:</h6>
              <div>
                {listGhe.map((ghe) => (
                  <Button
                    key={ghe.id}
                    className="ghe-button"
                    style={{
                      backgroundColor: ghe.status === 1 ? "#FF5733" : "#66CC99",
                      marginBottom: "10px", // Khoảng cách giữa các nút ghế
                      color: "#fff",
                      cursor: ghe.status === 1 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (ghe.status !== 1) {
                        // Thêm xử lý khi click vào ghế (nếu cần)
                      }
                    }}
                  >
                    {ghe.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="man-ban-hang-3">alo</div>
        <div className="man-ban-hang-4">alo</div>
      </div>
    </div>
  );
};

export default Sell;
