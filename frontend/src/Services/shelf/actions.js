import { FETCH_PRODUCTS } from './actionTypes';
import axios from '../axios';
import baseUrl from './url';

const getProducts = `${baseUrl}api/service`;
export const fetchProducts = (callback) => (dispatch) => {
  return axios.get(getProducts).then((res) => {
    let { products } = res.data;

    if (!!callback) {
      callback();
    }

    return dispatch({
      type: FETCH_PRODUCTS,
      payload: products
    });
  });
};
