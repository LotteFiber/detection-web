import React, { useEffect, useState } from "react";
import LoadingComponent from "../components/loading";
import { columns, columns_processing } from "../data/dataVideo";
import { getVideoAll, getStatusProgram, uploadVideo } from "../function/getVideo"
import { Table, Input, Button, Spin, Modal, notification } from "antd";
import { PlusOutlined, LoadingOutlined, CheckOutlined } from "@ant-design/icons";

const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#f1f1f1" }} spin />;
const readyIcon = <CheckOutlined style={{ fontSize: 24, color: "#f1f1f1" }} />;

function UploadVideo() {
  const [isLoading, setisLoading] = useState(false);
  const [dataVideo, setDataVideo] = useState([]);
  const [status_program, setStatus_program] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadingData = async () => {
      const result = await getVideoAll();
      console.log(result);
      if (result.status === 200) {
        const result_status = await getStatusProgram();
        console.log(result_status)
        if (result.status === 200) {
          setStatus_program(result_status.data.status_program_ai)
          setDataVideo(result.data);
          setisLoading(true);
        }
      }
    }
    loadingData();
  }, [])

  const uploadHandles = async () => {
    if (!loading) {
      setLoading(true)
      if (!fileUpload) {
        setLoading(false);
        openNotificationNofileError("error");
        return console.log("ไม่มีไฟล์")
      }
      const result = await uploadVideo(fileUpload);
      console.log(result)
      if (result.status === 200) {
        openNotificationSucess('success');
        setLoading(false);
        setVisible(false);
        setisLoading(false);
        const loadingData = async () => {
          const result = await getVideoAll();
          console.log(result);
          if (result.status === 200) {
            const result_status = await getStatusProgram();
            console.log(result_status)
            if (result.status === 200) {
              setFileUpload();
              setStatus_program(result_status.data.status_program_ai)
              setDataVideo(result.data);
              setisLoading(true);
            }
          }
        }
        loadingData();
      } else {
        openNotificationError('error');
        setLoading(false);
        setVisible(false);
      }
    }
  }

  const openNotificationSucess = type => {
    notification[type]({
      message: 'อัพโหลดวิดีโอสำเร็จ',
      description:
        'ตอนนี้วิดีโอพร้อมที่จะทำการประมวลผลเพื่อเก็บข้อมูลแล้ว',
    });
  };

  const openNotificationError = type => {
    notification[type]({
      message: 'อัพโหลดวิดีโอไม่สำเร็จสำเร็จ',
      description:
        'มีปัญหาเกิดขึ้นเกี่ยวกับการอัพวิดีโอกรุณาตรวจสอบไฟล์ว่าถูกต้องไหม',
    });
  };

  const openNotificationNofileError = type => {
    notification[type]({
      message: 'กรุณาเพิ่มไฟล์',
      description:
        'ไม่พบไฟล์ที่ต้องการอัพโหลด',
    });
  };


  if (isLoading) {
    return (
      <div className="nu-body-ctn-4">
        <LoadingComponent isLoading={isLoading} />
        <div className="nu-student-header">
          <div className="nu-student-header-1" >
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setVisible(true)}
            >
              เพิ่มวิดีโอ
          </Button>
            <Modal
              title="อัพโหลดวิดีโอ"
              centered
              visible={visible}
              onOk={uploadHandles}
              onCancel={() => loading ? null : setVisible(false)}
              width={1000}
              cancelText={loading ? 'กำลังอัพโหลด' : 'ย้อนกลับ'}
              okText={loading ? 'กำลังอัพโหลด' : 'อัพโหลด'}
            >
              <Spin spinning={loading} tip="กำลังอัพโหลด กรุณาห้ามกดออก">
                <input type="file" id="myFile" name="filename" onChange={(e) => setFileUpload(e.target.files[0])} />
              </Spin>
            </Modal>
            {status_program ?
              <div className="nu-video-status">
                <Spin indicator={antIcon} />
                <h3 className="nu-data-search-text" style={{ color: "white" }}>โปรแกรมกำลังทำงาน</h3>
              </div>
              :
              <div className="nu-video-status-1">
                <Spin indicator={readyIcon} />
                <h3 className="nu-data-search-text" style={{ color: "white" }}>โปรแกรมพร้อมทำงาน</h3>
              </div>
            }
          </div>
          <div className="nu-data-search" >
            <h3 className="nu-data-search-text">ชื่อ-วิดีโอ</h3>
            <Search
              placeholder="ชื่อ-วิดีโอ"
              onSearch={(value) => console.log(value)}
              style={{ width: 200 }}
              className="nu-data-search-ip"
            />
          </div>

        </div>
        <div className="nu-data-table">
          {
            status_program ?
              <Table
                className="nu-data-table-table"
                pagination={{ pageSize: 8 }}
                columns={columns_processing}
                dataSource={dataVideo}
              />
              :
              <Table
                className="nu-data-table-table"
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={dataVideo}
              />
          }

        </div>
      </div>
    );
  } else {
    return null
  }

}

export default UploadVideo;
