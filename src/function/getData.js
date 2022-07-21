import axios from "axios";
import { url } from "../key";

export const getData = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/data/getalldata`,
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

export const DeleteData = async (id) => {
  try {
    let data = {
      id: id,
    };
    const result = await axios({
      method: "delete",
      url: `${url}/api/deletedata`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
      .then((data) => {
        console.log(data);
        window.location.reload(false);
        return data;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return result;
  } catch {
    return "error";
  }
};

export const getDataByDate = async (start, end) => {
  try {
    const data = {
      start_date: start,
      end_date: end,
    };
    const result = await axios({
      method: "post",
      data,
      url: `${url}/api/getDatafilter`,
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

export const getResult = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/data/getAmountPerson`,
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

export const updateVerify = async (id) => {
  try {
    const data = { _id: id };
    const result = await axios({
      method: "put",
      data,
      url: `${url}/api/dataverify`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    return result;
  } catch {
    return "error";
  }
};
