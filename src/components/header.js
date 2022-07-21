import React from "react";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         onClick={()=>useHistory.history.push}
//         //href="http://www.alipay.com/"
//       >
//         ออกจากระบบ
//       </a>
//     </Menu.Item>
//   </Menu>
// );

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
        <h1 className="nu-header-text">ข้อมูลของระบบผู้ไม่สวมหมวกนิรภัย</h1>
      </div>
      <div className="nu-header-container-2">
        {/*<PlusCircleOutlined style={{ fontSize: 35, marginRight: 18,margin:"auto 18px" }} />*/}
        <Avatar size={51} icon={<UserOutlined />} style={{ marginRight: 24 }} />
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
