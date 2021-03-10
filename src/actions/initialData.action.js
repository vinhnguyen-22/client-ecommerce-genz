import axiosIntance from "../helper/axios";
import { categoryConstants, productConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/initialdata");
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      console.log(res);
    }
  };
};
