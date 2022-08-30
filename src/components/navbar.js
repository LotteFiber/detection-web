import React from "react";
import { Button } from "antd";
import { useHistory, useParams, Route } from "react-router-dom";

function NavbarComponent() {
  // let { id } = useParams();

  return (
    <div className="nu-navbar-container">
      <Route path="/:id" children={<Child />} />
    </div>
  );
}
function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let history = useHistory();
  return (
    <>
      <div className="nu-navbar-container-1">
        {id === "home" ? (
          <Button
            className="nu-navbar-btn"
            onClick={() => {
              history.push("/home");
            }}
          >
            ผลสรุปผู้ไม่สวมหมวกนิรภัย
          </Button>
        ) : (
          <Button
            className="nu-navbar-btn-white"
            onClick={() => {
              history.push("/home");
            }}
          >
            ผลสรุปผู้ไม่สวมหมวกนิรภัย
          </Button>
        )}
      </div>
      <div className="nu-navbar-container-1">
        {id === "data" ? (
          <Button
            className="nu-navbar-btn"
            onClick={() => {
              history.push("/data");
            }}
          >
            ข้อมูลทั้งหมด
          </Button>
        ) : (
          <Button
            className="nu-navbar-btn-white"
            onClick={() => {
              history.push("/data");
            }}
          >
            ข้อมูลทั้งหมด
          </Button>
        )}
      </div>
      <div className="nu-navbar-container-1">
        {id === "datastudent" ? (
          <Button
            className="nu-navbar-btn"
            onClick={() => {
              history.push("/datastudent");
            }}
          >
            จัดการข้อมูลนิสิต
          </Button>
        ) : (
          <Button
            className="nu-navbar-btn-white"
            onClick={() => {
              history.push("/datastudent");
            }}
          >
            จัดการข้อมูลนิสิต
          </Button>
        )}
      </div>
      <div className="nu-navbar-container-1">
        {id === "uploadvideo" ? (
          <Button
            className="nu-navbar-btn"
            onClick={() => {
              history.push("/uploadvideo");
            }}
          >
            อัพโหลดวิดีโอ
          </Button>
        ) : (
          <Button
            className="nu-navbar-btn-white"
            onClick={() => {
              history.push("/uploadvideo");
            }}
          >
            อัพโหลดวิดีโอ
          </Button>
        )}
      </div>
    </>
  );
}
export default NavbarComponent;