import axios from "axios";
import { api } from "../urlConfig";

import store from "../store/index";
import { authConstants } from "../actions/constants";
const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
/**
 * You can intercept requests or responses before
 *  they are handled by then or catch.
 */

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const { status } = error.response;
    if (status === 500) {
      store.dispatch({ type: authConstants.Lo });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
