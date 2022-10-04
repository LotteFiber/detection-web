import axios from "axios";
import { url } from "../key";

export const getVideoAll = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/video/getAll`,
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

export const uploadVideo = async (file) => {
  try {
    var formData = new FormData();
    console.log(file);

    formData.append("file", file);
    console.log(formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const result = await axios({
      method: "post",
      data: formData,
      url: `${url}/api/upload-file`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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

export const uploadListImage = async (file) => {
  try {
    var formData = new FormData();
    console.log(file);

    for (let i = 0; i < file.length; i++) {
      formData.append(`uploadedImages`, file[i]);
    }

    console.log(formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const result = await axios({
      method: "post",
      data: formData,
      url: `${url}/api/upload-file-image`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const getStatusProgram = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/programstatus/get`,
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

export const getStatusProgramImage = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${url}/api/programstatus/getStatusImage`,
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

export const startProgramDetection = async (data) => {
  try {
    console.log(data);
    const result = await axios({
      method: "post",
      url: `${url}/api/video/startProgram`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
      .then(async (data) => {
        window.location.reload();
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

export const startProgramImageDetection = async () => {
  try {
    const result = await axios({
      method: "post",
      url: `${url}/api/video/startProgramImage`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then(async (data) => {
        window.location.reload();
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

export const DeleteVideo = async (id) => {
  try {
    let data = {
      id: id,
    };
    const result = await axios({
      method: "delete",
      url: `${url}/api/video/delete`,
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
