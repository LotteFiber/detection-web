import axios from "axios";
import { url } from "../key";

export async function SignUpFunc(
  first_name,
  last_name,
  faculty,
  student_id,
  licensepartone,
  licenseparttwo,
  licensepartthree
) {
  try {
    let data = {
      first_name: first_name,
      last_name: last_name,
      faculty: faculty,
      student_id: student_id,
      licensepartone: licensepartone,
      licenseparttwo: licenseparttwo,
      licensepartthree: licensepartthree,
    };
    console.log("3");
    const result = await axios({
      method: "POST",
      url: `${url}/api/insertstudent`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
      .then(async (data) => {
        return data;
      })
      .catch(async (error) => {
        return error.response;
      });
    return result;
  } catch {
    return "error";
  }
}

export const getDataStudent = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/getdatastudent`,
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

export const DeleteDataStudent = async (id) => {
  try {
    let data = {
      id: id,
    };
    const result = await axios({
      method: "delete",
      url: `${url}/api/deletestudent`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
      .then((dataStudent) => {
        console.log(dataStudent);
        window.location.reload(false);
        return dataStudent;
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

export const putUpdateDataStudent = async (
  id,
  first_name,
  last_name,
  faculty,
  student_id,
  licensepartone,
  licenseparttwo,
  licensepartthree
) => {
  try {
    let data = {
      id,
      first_name: first_name,
      last_name: last_name,
      faculty: faculty,
      student_id: student_id,
      licensepartone: licensepartone,
      licenseparttwo: licenseparttwo,
      licensepartthree: licensepartthree,
    };
    const result = await axios({
      method: "put",
      url: `${url}/api/updatestudent`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
      .then(async (data) => {
        window.location.reload(false);
        return data;
      })
      .catch(async (error) => {
        return error.response;
      });
    return result;
  } catch {
    return "error";
  }
};
