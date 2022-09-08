import React from "react";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";

function Header() {
  let history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item>
        <button onClick={() => history.push("/")}>ออกจากระบบ</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="nu-header-container">
      <div>
        <h1 className="nu-header-text">NUHelmetSys</h1>
      </div>
      <div className="nu-header-container-2">
        {/* <Avatar size={20} icon={<UserOutlined />} style={{ marginRight: 24 }} /> */}
        <Dropdown overlay={menu}>
          <h2 className="ant-dropdown-link nu-header-text-dropdown">
            {localStorage.getItem("user")} <CaretDownOutlined />
          </h2>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
