import React from "react";
import axios from "../helper/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post("product/create", form);

    if (res.status === 201) {
      return true;
    } else {
      console.log(res);
    }
  };
};
