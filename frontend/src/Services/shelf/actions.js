import { FETCH_PRODUCTS } from "./actionTypes";
import axios from "../../actions/axios";

export const fetchProducts = (callback) => (dispatch) => {
  return axios.get("/service").then((res) => {
    let products = res.data;

    if (!!callback) {
      callback();
    }
    return dispatch({
      type: FETCH_PRODUCTS,
      payload: products,
    });
  });
};
