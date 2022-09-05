import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Input, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
// import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../lotties/motor_bike.json";
import { useHistory } from "react-router-dom";
import { SignInFunc } from "../function/singin";

const SigninScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  useEffect(() => {
    localStorage.clear();
    // console.log(username);
  }, [username]);

  const ClickButton = async () => {
    if (!username || !password) {
      error("กรุณากรอกข้อมูลให้ครบ");
    } else {
      await console.log("Username", username, "Password", password);
      var result = await SignInFunc(username, password);
      await console.log(result);
      if (result.status === 200) {
        localStorage.setItem("jwt", result.data.token);
        localStorage.setItem("user", username);
        success("กำลังเข้าสู่ระบบ");
        history.push("/home");
      } else if (result.status === 422) {
        error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    }
  };

  const success = (text) => {
    message.success(text);
  };
  const error = (text) => {
    message.error(text);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="hd-container">
      <div className="hd-boxlogin">
        <div className="hd-logo">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
        <h2 className="nu-text">ชื่อผู้ใช้งาน</h2>
        <Input
          size="large"
          className="nu-input"
          placeholder="ชื่อผู้ใช้งาน"
          prefix={<UserOutlined />}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2 className="nu-text">รหัสผ่าน</h2>
        <Input.Password
          size="large"
          className="nu-input"
          placeholder="รหัสผ่าน"
          type="Password"
          prefix={<KeyOutlined />}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="nu-btn" type="primary" onClick={ClickButton}>
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
};

export default SigninScreen;
