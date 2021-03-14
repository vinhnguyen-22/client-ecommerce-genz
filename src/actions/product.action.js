import React from "react";
import axiosIntance from "../helper/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("product/create", form);

    if (res.status === 201) {
      return true;
    } else {
      console.log(res);
    }
  };
};
