import React from "react";
import { Input, Button, Drawer, Image } from "antd";

function DrawerComponent({
  onClose,
  visible,
  setPlateTop,
  setPlateCenter,
  setPlateBottom,
  setPlateImage,
  plateTop,
  plateCenter,
  plateBottom,
  plateImage,
  plateuploadby,
  titletext,
  uploadDataHandles,
  updateDataHandles,
  plateImageShow,
  setPlateImageShow,
  checkAddOrUpdate,
}) {
  return (
    <Drawer
      title={titletext}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนตำแหน่งบน</h3>
        <Input
          value={plateTop}
          placeholder="..."
          onChange={(e) => setPlateTop(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนตำแหน่งกลาง</h3>
        <Input
          value={plateCenter}
          placeholder="..."
          onChange={(e) => setPlateCenter(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">ป้ายทะเบียนตำแหน่งล่าง</h3>
        <Input
          value={plateBottom}
          placeholder="..."
          onChange={(e) => setPlateBottom(e.target.value)}
        />
      </div>
      <div>
        <h3 className="nu-body-ctn-text-1">รูปภาพ</h3>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => {
            setPlateImageShow(URL.createObjectURL(e.target.files[0]));
            setPlateImage(e.target.files[0]);
          }}
        />
      </div>
      <div>
        <Image width={200} src={plateImageShow} />
      </div>
      <div>
        {checkAddOrUpdate ? (
          <Button
            size="large"
            className="nu-body-ctn-btn-1"
            type="primary"
            onClick={uploadDataHandles}
          >
            บันทึกข้อมูล
          </Button>
        ) : (
          <Button
            size="large"
            className="nu-body-ctn-btn-1"
            type="primary"
            onClick={updateDataHandles}
          >
            บันทึกข้อมูล
          </Button>
        )}
      </div>
    </Drawer>
  );
}

export default DrawerComponent;
