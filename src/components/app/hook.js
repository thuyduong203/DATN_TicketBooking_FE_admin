import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch(); // kích hoạt / thực hiện 1 actions trong reducer
export const useAppSelector = useSelector; // lấy liệu của state trong reducer
