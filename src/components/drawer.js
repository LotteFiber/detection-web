import React from "react";
import { Input, Button, Drawer } from "antd";

function DrawerComponent({
  onClose,
  visible,
  setFirst_name,
  setLast_name,
  setStudent_id,
  setlicensepartone,
  setlicenseparttwo,
  setlicensepartthree,
  first_name,
  last_name,
  student_id,
  faculty,
  setFaculty,
  licensepartone,
  licenseparttwo,
  licensepartthree,
  ClickButton,
  setVisible,
  titletext,
}) {
  return (
    <Drawer
      title={titletext}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <div>
        <h3 className="nu-body-ctn-text-1">ชื่อ</h3>
        <Input
          value={first_name}
          placeholder="ชื่อ"
          onChange={(e) => setFirst_name(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">นามสกุล</h3>
        <Input
          value={last_name}
          placeholder="นามสกุล"
          onChange={(e) => setLast_name(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">รหัสนิสิต</h3>
        <Input
          value={student_id}
          placeholder="รหัสนิสิต"
          onChange={(e) => setStudent_id(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">คณะ</h3>
        <Input
          value={faculty}
          placeholder="คณะ"
          onChange={(e) => setFaculty(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนรถส่วนที่ 1</h3>
        <Input
          value={licensepartone}
          placeholder="ป้ายทะเบียนรถส่วนที่ 1"
          onChange={(e) => setlicensepartone(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนรถส่วนที่ 2</h3>
        <Input
          value={licenseparttwo}
          placeholder="ป้ายทะเบียนรถส่วนที่ 2"
          onChange={(e) => setlicenseparttwo(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนรถส่วนที่ 3</h3>
        <Input
          value={licensepartthree}
          placeholder="ป้ายทะเบียนรถส่วนที่ 3"
          onChange={(e) => setlicensepartthree(e.target.value)}
        />
      </div>
      <div>
        <Button
          size="large"
          className="nu-body-ctn-btn-1"
          type="primary"
          onClick={ClickButton}
        >
          เพิ่มข้อมูล
        </Button>
      </div>
    </Drawer>
  );
}

export default DrawerComponent;
