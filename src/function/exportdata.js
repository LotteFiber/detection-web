import axios from "axios";
import xl from "excel4node";

import { url } from "../key";

export const exportData = async (res) => {
  try {
    console.log("test");
    const result = await axios({
      method: "get",
      url: `${url}/api/export`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then(async (data) => {
        return data;
      })
      .catch((error) => {
        return error.response;
      });
    return result;
  } catch {
    return "error";
  }
};
