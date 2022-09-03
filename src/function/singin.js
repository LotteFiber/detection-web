import axios from "axios";
import { url } from "../key";

export async function SignInFunc(username, password) {
  try {
    let data = {
      user_name: username,
      pass_word: password,
    };
    const result = await axios({
      method: "POST",
      url: `${url}/api/signin`,
      data,
    })
      .then(async (data) => {
        console.log(data);
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
