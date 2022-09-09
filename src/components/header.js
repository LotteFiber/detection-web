import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Col, Row, Menu, Dropdown } from "antd";

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
      <Row>
        <Col xs={24} sm={12} md={12} lg={20} xl={20}>
          <div>
            <h1 className="nu-header-text">NUHelmetSys</h1>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4}>
          <div className="nu-header-container-2">
            <Dropdown overlay={menu}>
              <h2 className="ant-dropdown-link nu-header-text-dropdown">
                {localStorage.getItem("user")} <CaretDownOutlined />
              </h2>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
