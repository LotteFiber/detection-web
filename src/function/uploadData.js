import axios from "axios";
import { url } from "../key";

export const uploadData = async (image, top, center, bottom) => {
    try {
        var formData = new FormData();
        console.log(image);

        formData.append("top", top)
        formData.append("province", center)
        formData.append("image", image)
        formData.append("bottom", bottom)

        console.log(formData);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const result = await axios({
            method: "post",
            data: formData,
            url: `${url}/api/insertdatabyweb`,
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

export const updateData = async (image, top, center, bottom, _id) => {
    try {
        var formData = new FormData();
        console.log(image);

        formData.append("image", image)
        formData.append("top", top)
        formData.append("province", center)
        formData.append("bottom", bottom)
        formData.append("_id", _id)

        console.log(formData);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const result = await axios({
            method: "put",
            data: formData,
            url: `${url}/api/data/updatedatabyweb`,
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

export const uploadCSV = async (file) => {
    try {
        var formData = new FormData();
        console.log(file);

        formData.append("file", file)

        console.log(formData);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const result = await axios({
            method: "post",
            data: formData,
            url: `${url}/api/importcsv`,
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