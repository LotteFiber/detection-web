import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  Table,
  Input,
  DatePicker,
  Space,
  Select,
  Button,
  Modal,
  Spin,
  notification,
  Tag,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { url } from "../key";
import LoadingComponent from "../components/loading";
import { getData, updateVerify, getDataByDate } from "../function/getData";
import {
  getStatusProgramImage,
  uploadListImage,
  startProgramImageDetection,
} from "../function/getVideo";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import DrawerComponent from "../components/drawerdata";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { uploadData, updateData } from "../function/uploadData";

import { DeleteData } from "../function/getData";

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

function ShowData() {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [statusImage, setStatusImage] = useState(false);

  const [checkAddOrUpdate, setCheckAddOrUpdate] = useState(true);

  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [plateTop, setPlateTop] = useState("");
  const [plateCenter, setPlateCenter] = useState("");
  const [plateBottom, setPlateBottom] = useState("");
  const [plateImage, setPlateImage] = useState("");
  const [plateId, setPlateId] = useState("");
  const [plateuploadby, setPlateuploadby] = useState("");

  const [plateImageShow, setPlateImageShow] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchDate_start, setSearchDate_start] = useState("");
  const [searchDate_end, setSearchDate_end] = useState("");

  const [searchDate, setSearchDate] = useState([]);
  const [status_searchDate, setStatus_searchDate] = useState(false);
  const { confirm } = Modal;

  const UpdateDataStudent = (record) => {
    const plate = record.path_image;
    const card = record.image_card;
    const upload_by = record.upload_by;
    if (plate) {
      var str = plate.replaceAll("/", "-");
      if (upload_by === "video") {
        setPlateImageShow(`${url}/api/data/${str}`);
        setPlateImage(`${url}/api/data/${str}`);
      } else if (upload_by === "image") {
        setPlateImageShow(`${url}/api/data/image/${str}`);
        setPlateImage(`${url}/api/data/image/${str}`);
      } else if (upload_by === "web") {
        setPlateImageShow(`${url}/api/data/uploadbyweb/${str}`);
        setPlateImage(`${url}/api/data/uploadbyweb/${str}`);
      } else if (upload_by === "app") {
        setPlateImageShow(`${url}/api/data/uploadbyapp/${str}`);
        setPlateImage(`${url}/api/data/uploadbyapp/${str}`);
      }
    } else if (card) {
      var str_card = card.replaceAll("/", "-");
      if (upload_by === "web") {
        setPlateImageShow(`${url}/api/data/uploadbyweb/${str_card}`);
      }
    } else {
      str = "/";
      if (upload_by === "video") {
        setPlateImageShow(`${url}/api/data/${str}`);
        setPlateImage(`${url}/api/data/${str}`);
      } else if (upload_by === "image") {
        setPlateImageShow(`${url}/api/data/image/${str}`);
        setPlateImage(`${url}/api/data/image/${str}`);
      } else if (upload_by === "web") {
        setPlateImageShow(`${url}/api/data/uploadbyweb/${str}`);
        setPlateImage(`${url}/api/data/uploadbyweb/${str}`);
      } else if (upload_by === "app") {
        setPlateImageShow(`${url}/api/data/uploadbyapp/${str}`);
        setPlateImage(`${url}/api/data/uploadbyapp/${str}`);
      }
    }

    console.log("Update => ", record);
    setCheckAddOrUpdate(false);
    setPlateId(record._id);
    setPlateTop(record.licensepartone);
    setPlateCenter(record.licenseparttwo);
    setPlateBottom(record.licensepartthree);
    setPlateuploadby(record.upload_by);
    setVisibleDrawer(true);
  };

  const UploadDataStudent = () => {
    setPlateImageShow("");
    setPlateImage("");
    setCheckAddOrUpdate(true);
    setPlateId("");
    setPlateTop("");
    setPlateCenter("");
    setPlateBottom("");
    setPlateuploadby("");
    setVisibleDrawer(true);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => <>{filteredData.indexOf(record) + 1}</>,
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <>{record.first_name + " " + record.last_name}</>
      ),
    },
    {
      title: "รหัสนิสิต",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "คณะ",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "ป้ายทะเบียน",
      dataIndex: "licenseid",
      key: "licenseid",
      render: (text, record, index) => (
        <>
          {record.licensepartone +
            "-" +
            record.licenseparttwo +
            "-" +
            record.licensepartthree}
        </>
      ),
    },
    {
      title: "วันเดือนปี",
      dataIndex: "date",
      key: "date",
      render: (text, record, index) => (
        <>{moment(record.date_data).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "ข้อหา",
      dataIndex: "charge",
      key: "charge",
    },
    {
      title: "อัตราความถูกต้องของจังหวัด",
      dataIndex: "accuracy",
      key: "accuracy",
      render: (text, record, index) => {
        // console.log(text)
        // console.log("TEST => ", parseFloat(text) * 100)
        if (parseFloat(text) * 100 >= 80) {
          return (
            <>
              <Tag icon={<CheckCircleOutlined />} color="success">
                {(parseFloat(text) * 100) | 0}%
              </Tag>
            </>
          );
        } else if (parseFloat(text) * 100 >= 50) {
          return (
            <>
              <Tag icon={<ExclamationCircleOutlined />} color="warning">
                {(parseFloat(text) * 100) | 0}%
              </Tag>
            </>
          );
        } else {
          return (
            <>
              <Tag icon={<CloseCircleOutlined />} color="error">
                {(parseFloat(text) * 100) | 0}%
              </Tag>
            </>
          );
        }
      },
    },
    {
      title: "รูปถ่ายแผ่นป้ายทะเบียน",
      dataIndex: "image",
      key: "image",
      render: (res, record) => {
        console.log("TEST RECORD", record.path_image);
        const data = record.path_image;
        const upload_by = record.upload_by;
        if (data == null) {
          return <p>-</p>;
        }
        if (upload_by === "video") {
          var str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "image") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/image/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "web") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyweb/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "app") {
          console.log("TEST => ", data);
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyapp/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else {
          return <p>ไม่มีรูปตัวอย่าง</p>;
        }
      },
    },
    {
      title: "รูปถ่ายบัตรนิสิต",
      dataIndex: "cardimage",
      key: "cardimage",
      render: (res, record) => {
        console.log("TEST RECORD", record.image_card);
        const data = record.image_card;
        const upload_by = record.upload_by;
        if (data == null) {
          return <p>-</p>;
        }
        if (upload_by === "video") {
          var str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "image") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/image/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "web") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyweb/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "app") {
          console.log("TEST => ", data);
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyapp/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else {
          return <p>ไม่มีรูปตัวอย่าง</p>;
        }
      },
    },
    {
      title: "รูปถ่ายเหตุการณ์",
      dataIndex: "eventimage",
      key: "eventimage",
      render: (res, record) => {
        console.log("TEST RECORD", record.image_event);
        const data = record.image_event;
        const upload_by = record.upload_by;
        if (data == null) {
          return <p>-</p>;
        }
        if (upload_by === "video") {
          var str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "image") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/image/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "web") {
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyweb/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else if (upload_by === "app") {
          console.log("TEST => ", data);
          str = data.replaceAll("/", "-");
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${url}/api/data/uploadbyapp/${str}`}
            >
              ดูตัวอย่าง
            </a>
          );
        } else {
          return <p>ไม่มีรูปตัวอย่าง</p>;
        }
      },
    },
    {
      title: "ฟังก์ชัน",
      dataIndex: "Function",
      key: "Function",
      render: (res, record) => {
        if (record.verify_status) {
          return (
            <>
              <Button
                type="dashed"
                onClick={() => UpdateDataStudent(record)}
                style={{ marginRight: 5, marginBottom: 3 }}
              >
                แก้ไข
              </Button>
              <Button
                type="primary"
                disabled
                onClick={() => updateVerify(record._id)}
                style={{ marginRight: 5, marginBottom: 3 }}
              >
                สำเร็จ
              </Button>
              <Button
                type="primary"
                onClick={() => showDeleteConfirm(record._id)}
                danger
                style={{ marginBottom: 3, width: 61 }}
              >
                ลบ
              </Button>
            </>
          );
        } else {
          return (
            <>
              <Button
                type="dashed"
                onClick={() => UpdateDataStudent(record)}
                style={{ marginRight: 5, marginBottom: 3 }}
              >
                แก้ไข
              </Button>
              <Button
                type="primary"
                onClick={() => updateVerifyHandle(record._id)}
                style={{ marginRight: 5, marginBottom: 3 }}
              >
                ยืนยัน
              </Button>
              <Button
                type="primary"
                onClick={() => showDeleteConfirm(record._id)}
                danger
                style={{ marginBottom: 3, width: 61 }}
              >
                ลบ
              </Button>
            </>
          );
        }
      },
    },
  ];

  const updateVerifyHandle = async (id) => {
    setisLoading(false);
    const res = await updateVerify(id);
    if (res.status === 200) {
      window.location.reload(false);
    } else {
      openNotificationNofileErrorVerify("error");
      setisLoading(true);
    }
  };

  function showDeleteConfirm(id) {
    console.log(id);
    confirm({
      title: "แน่ใจไหมว่าต้องการลบข้อมูลนี้",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "ใช่",
      okType: "danger",
      cancelText: "ไม่ใช่",
      onOk() {
        const result = DeleteData(id);
        console.log("OK", result);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  // function onChange(value) {
  //   console.log(`selected ${value}`);
  // }
  function onBlur() {
    console.log("blur");
  }
  function onFocus() {
    console.log("focus");
  }
  function onSearch(val) {
    console.log("search:", val);
  }

  const loadingData = async () => {
    var result = await getData();
    var resultStatus = await getStatusProgramImage();
    console.log(resultStatus);
    setStatusImage(resultStatus.data.status_program_ai);
    console.log("loading", result.data);
    setData(result.data);
    setFilteredData(result.data);
    setisLoading(true);
  };

  const uploadHandles = async () => {
    if (!loading) {
      setLoading(true);
      if (!fileUpload) {
        setLoading(false);
        openNotificationNofileError("error");
        return console.log("ไม่มีไฟล์");
      }
      const result = await uploadListImage(fileUpload);
      console.log(result);
      if (result.status === 200) {
        const result1 = await startProgramImageDetection();
        console.log(result1);
        if (result1.status === 200) {
          openNotificationSucess("success");
          setLoading(false);
          setVisible(false);
        }
      } else {
        openNotificationError("error");
        setLoading(false);
        setVisible(false);
      }
    }
  };

  const uploadDataHandles = async () => {
    if (!loading) {
      setLoading(true);
      if (!plateImage || !plateTop || !plateCenter || !plateBottom) {
        setLoading(false);
        openNotificationNofileErrorUpload("error");
        return console.log("ไม่มีไฟล์");
      }
      const result = await uploadData(
        plateImage,
        plateTop,
        plateCenter,
        plateBottom
      );
      console.log(result);
      if (result.status === 200) {
        openNotificationSucess("success");
        setLoading(false);
        setVisible(false);
        window.location.reload(false);
      } else {
        openNotificationError("error");
        setLoading(false);
        setVisible(false);
      }
    }
  };

  const updateDataHandles = async () => {
    if (!loading) {
      setLoading(true);
      console.log(
        "image",
        plateImage,
        plateTop,
        plateCenter,
        plateBottom,
        plateId
      );
      if (!plateTop || !plateCenter || !plateBottom || !plateId) {
        setLoading(false);
        openNotificationNofileErrorUpload("error");
        return console.log("ไม่มีไฟล์");
      }
      const result = await updateData(
        plateImage,
        plateTop,
        plateCenter,
        plateBottom,
        plateId
      );
      console.log(result);
      if (result.status === 200) {
        openNotificationSucess("success");
        setLoading(false);
        setVisible(false);
        window.location.reload(false);
      } else {
        openNotificationError("error");
        setLoading(false);
        setVisible(false);
      }
    }
  };

  const openNotificationSucess = (type) => {
    notification[type]({
      message: "อัพโหลดสำเร็จ",
      description: "โปรแกรมกำลังเริ่มทำงาน",
    });
  };

  // const openNotificationSucessVerify = type => {
  //   notification[type]({
  //     message: 'อัพเดทสำเร็จ',
  //     description:
  //       'ข้อมูลถูกประมวลผลเรียบร้อย',
  //   });
  // };

  const openNotificationError = (type) => {
    notification[type]({
      message: "อัพโหลดวิดีโอไม่สำเร็จสำเร็จ",
      description:
        "มีปัญหาเกิดขึ้นเกี่ยวกับการอัพวิดีโอกรุณาตรวจสอบไฟล์ว่าถูกต้องไหม",
    });
  };

  const openNotificationNofileError = (type) => {
    notification[type]({
      message: "กรุณาเพิ่มไฟล์",
      description: "ไม่พบไฟล์ที่ต้องการอัพโหลด",
    });
  };

  const openNotificationNofileErrorUpload = (type) => {
    notification[type]({
      message: "กรุณากรอกข้อมูลให้ครบ",
      description: "กรุณากรอกข้อมูลให้ครบก่อนที่จะทำการบันทึกข้อมูล",
    });
  };

  const openNotificationNofileErrorVerify = (type) => {
    notification[type]({
      message: "เกิดข้อผิดพลาด",
      description: "กรุณาทำใหม่ในภายหลัง",
    });
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const handleSearchName = (event) => {
    let value = event.target.value.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    // console.log(value);
    let dataforfilter = data;
    if (status_searchDate) {
      dataforfilter = searchDate;
    }
    result = dataforfilter.filter((datas) => {
      return datas.first_name.search(value) !== -1;
    });
    result1 = result.filter((datas) => {
      return datas.faculty.search(searchFaculty) !== -1;
    });
    console.log("result1", result1);
    result2 = result1.filter((datas) => {
      let student_result = datas.student_id;
      student_result = student_result.slice(0, 2);
      return student_result.search(searchYear) !== -1;
    });
    console.log("result2", result2);
    //console.log(result1)
    setSearchName(value);
    setFilteredData(result2);
    // console.log(filteredData)
  };

  const handleSearchFaculty = (event) => {
    let value = event.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    // console.log(value);
    let dataforfilter = data;
    if (status_searchDate) {
      dataforfilter = searchDate;
    }
    result = dataforfilter.filter((datas) => {
      return datas.faculty.search(value) !== -1;
    });
    result1 = result.filter((datas) => {
      return datas.first_name.search(searchName) !== -1;
    });
    result2 = result1.filter((datas) => {
      let student_result = datas.student_id;
      student_result = student_result.slice(0, 2);
      return student_result.search(searchYear) !== -1;
    });
    setSearchFaculty(value);
    setFilteredData(result2);
  };

  const handleSearchYear = (event) => {
    let value = event.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    let dataforfilter = data;
    if (status_searchDate) {
      dataforfilter = searchDate;
    }
    result = dataforfilter.filter((datas) => {
      let student_result = datas.student_id;
      student_result = student_result.slice(0, 2);
      return student_result.search(value) !== -1;
    });
    result1 = result.filter((datas) => {
      return datas.first_name.search(searchName) !== -1;
    });
    result2 = result1.filter((datas) => {
      return datas.faculty.search(searchFaculty) !== -1;
    });
    setSearchYear(value);
    setFilteredData(result2);
  };

  const handleSearchDate = async (event) => {
    if (event) {
      // console.log(event)
      const res = await getDataByDate(event[0]._d, event[1]._d);
      if (res.status === 200) {
        console.log(res);
        let result = [];
        let result1 = [];
        let result2 = [];
        result = res.data.filter((datas) => {
          return datas.first_name.search(searchName) !== -1;
        });
        result1 = result.filter((datas) => {
          return datas.faculty.search(searchFaculty) !== -1;
        });
        console.log("result1", result1);
        result2 = result1.filter((datas) => {
          let student_result = datas.student_id;
          student_result = student_result.slice(0, 2);
          return student_result.search(searchYear) !== -1;
        });
        console.log("result2", result2);
        console.log(
          "searchStart => ",
          moment(event[0]._d).format("YYYY-MM-DD")
        );
        console.log("searchEnd => ", moment(event[1]._d).format("YYYY-MM-DD"));
        setSearchDate_start(event[0]._d);
        setSearchDate_end(event[1]._d);
        setStatus_searchDate(true);
        setSearchDate(res.data);
        setFilteredData(result2);
      } else {
        setSearchDate_start("");
        setSearchDate_end("");
        console.log(res);
      }
    } else {
      console.log("No found");
      let result = [];
      let result1 = [];
      let result2 = [];
      result = data.filter((datas) => {
        return datas.first_name.search(searchName) !== -1;
      });
      result1 = result.filter((datas) => {
        return datas.faculty.search(searchFaculty) !== -1;
      });
      console.log("result1", result1);
      result2 = result1.filter((datas) => {
        let student_result = datas.student_id;
        student_result = student_result.slice(0, 2);
        return student_result.search(searchYear) !== -1;
      });
      setStatus_searchDate(false);
      setSearchDate([]);
      setFilteredData(result2);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  if (isLoading) {
    return (
      <div className="nu-body-ctn-4">
        <LoadingComponent isLoading={isLoading} />
        <Row>
          {checkAddOrUpdate ? (
            <DrawerComponent
              onClose={onClose}
              visible={visibleDrawer}
              setVisible={setVisibleDrawer}
              setPlateTop={setPlateTop}
              setPlateCenter={setPlateCenter}
              setPlateBottom={setPlateBottom}
              setPlateImage={setPlateImage}
              plateTop={plateTop}
              plateCenter={plateCenter}
              plateBottom={plateBottom}
              plateImage={plateImage}
              plateuploadby={plateuploadby}
              titletext="เพิ่มข้อมูล"
              uploadDataHandles={uploadDataHandles}
              updateDataHandles={updateDataHandles}
              plateImageShow={plateImageShow}
              setPlateImageShow={setPlateImageShow}
              checkAddOrUpdate={checkAddOrUpdate}
            />
          ) : (
            <DrawerComponent
              onClose={onClose}
              visible={visibleDrawer}
              setVisible={setVisibleDrawer}
              setPlateTop={setPlateTop}
              setPlateCenter={setPlateCenter}
              setPlateBottom={setPlateBottom}
              setPlateImage={setPlateImage}
              plateTop={plateTop}
              plateCenter={plateCenter}
              plateBottom={plateBottom}
              plateImage={plateImage}
              plateuploadby={plateuploadby}
              plateImageShow={plateImageShow}
              setPlateImageShow={setPlateImageShow}
              uploadDataHandles={uploadDataHandles}
              updateDataHandles={updateDataHandles}
              checkAddOrUpdate={checkAddOrUpdate}
              titletext="แก้ไขข้อมูล"
            />
          )}
          <Modal
            title="อัพโหลดรูปภาพ"
            centered
            visible={visible}
            onOk={() => uploadHandles()}
            onCancel={() => (loading ? null : setVisible(false))}
            width={1000}
            cancelText={loading ? "กำลังอัพโหลด" : "ย้อนกลับ"}
            okText={loading ? "กำลังอัพโหลด" : "อัพโหลด"}
          >
            <Spin spinning={false} tip="กำลังอัพโหลด กรุณาห้ามกดออก">
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={(e) => setFileUpload(e.target.files)}
                multiple
              />
            </Spin>
          </Modal>
          <Col xs={24} sm={12} md={12} lg={3} xl={3}>
            {statusImage ? (
              <Button
                type="primary"
                shape="round"
                icon={<LoadingOutlined spin />}
                size="large"
                onClick={() => setVisible(true)}
                disabled
                style={{ marginTop: 18 }}
              >
                โปรแกรมกำลังทำงาน
              </Button>
            ) : (
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setVisible(true)}
                style={{ marginTop: 18 }}
              >
                เก็บข้อมูลด้วยภาพ
              </Button>
            )}
          </Col>
          <Col xs={24} sm={12} md={12} lg={3} xl={3}>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => UploadDataStudent()}
              style={{ marginLeft: 5, marginTop: 18 }}
            >
              เก็บข้อมูลด้วยตัวเอง
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={3} xl={3}>
            <Button
              type="primary"
              shape="round"
              icon={<ExportOutlined />}
              size="large"
              href={`${url}/api/exportxlsx?first_name=${searchName}&faculty=${searchFaculty}&year=${searchYear}&start_date=${searchDate_start}&end_date=${searchDate_end}`}
              style={{ marginLeft: 5, marginTop: 18 }}
            >
              นำออกข้อมูล
            </Button>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4}>
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">ชื่อ-นามสกุล</h3>
              <Search
                placeholder="ชื่อ-นามสกุล"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
                className="nu-data-search-ip"
                onChange={(event) => handleSearchName(event)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={2} xl={2}>
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">ชั้นปี</h3>
              <Select
                showSearch
                style={{ width: 100 }}
                placeholder="รหัสชั้นปี"
                optionFilterProp="children"
                onChange={(event) => {
                  handleSearchYear(event);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                <Option value="">-ไม่ระบุ-</Option>
                <Option value="63">63</Option>
                <Option value="62">62</Option>
                <Option value="61">61</Option>
                <Option value="60">60</Option>
                <Option value="59">59</Option>
                <Option value="58">58</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={3} xl={3}>
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">คณะ</h3>
              <Select
                showSearch
                style={{ width: 150 }}
                placeholder="คณะ"
                optionFilterProp="children"
                onChange={(event) => handleSearchFaculty(event)}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                <Option value="">-----ไม่ระบุ-----</Option>
                <Option value="เกษตรศาสตร์">คณะเกษตรศาสตร์</Option>
                <Option value="วิทยาศาสตร์">คณะวิทยาศาสตร์</Option>
                <Option value="วิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</Option>
                <Option value="สถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</Option>
                <Option value="ทันตแพทยศาสตร์">คณะทันตแพทยศาสตร์</Option>
                <Option value="แพทยศาสตร์">คณะแพทยศาสตร์</Option>
                <Option value="พยาบาลศาสตร์">คณะพยาบาลศาสตร์</Option>
                <Option value="เภสัชศาสตร์">คณะเภสัชศาสตร์</Option>
                <Option value="วิทยาศาสตร์การแพทย์">
                  คณะวิทยาศาสตร์การแพทย์
                </Option>
                <Option value="สหเวชศาสตร์">คณะสหเวชศาสตร์</Option>
                <Option value="สาธารณสุขศาสตร์">คณะสาธารณสุขศาสตร์</Option>
                <Option value="มนุษยศาสตร์">คณะมนุษยศาสตร์</Option>
                <Option value="นิติศาสตร์">คณะนิติศาสตร์</Option>
                <Option value="บริหารธุรกิจ">
                  คณะบริหารธุรกิจ เศรษฐศาสตร์และการสื่อสาร
                </Option>
                <Option value="ศึกษาศาสตร์">คณะศึกษาศาสตร์</Option>
                <Option value="สังคมศาสตร์">คณะสังคมศาสตร์</Option>
                <Option value="วิทยาลัยนานาชาติ">วิทยาลัยนานาชาติ</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={3} xl={3}>
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">วันเดือนปี</h3>
              <Space direction="vertical" size={10}>
                <RangePicker
                  onChange={(event) => handleSearchDate(event)}
                  className="nu-data-search-date"
                />
              </Space>
            </div>
          </Col>
        </Row>

        <div className="nu-data-table">
          <Table
            className="nu-data-table-table"
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey={() => uuid()}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ShowData;
