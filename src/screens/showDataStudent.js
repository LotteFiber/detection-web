import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  message,
  Modal,
  Spin,
  notification,
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import LoadingComponent from "../components/loading";
import {
  SignUpFunc,
  getDataStudent,
  DeleteDataStudent,
  putUpdateDataStudent,
} from "../function/signupDataStudent";
import DrawerComponent from "../components/drawer";
// import ReactFileReader from 'react-file-reader';
// import utf8 from "utf8"
import { uploadCSV } from "../function/uploadData";

const { confirm } = Modal;

const { Option } = Select;
const { Search } = Input;

function showDeleteConfirm(id) {
  console.log(id);
  confirm({
    title: "แน่ใจไหมว่าต้องการลบข้อมูลของบุคคลนี้",
    icon: <ExclamationCircleOutlined />,
    content: "",
    okText: "ใช่",
    okType: "danger",
    cancelText: "ไม่ใช่",
    onOk() {
      const result = DeleteDataStudent(id);
      console.log("OK", result);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function ShowDataStudent() {
  const [visible, setVisible] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  const [isLoading, setisLoading] = useState("block");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [faculty, setFaculty] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [licensepartone, setlicensepartone] = useState("");
  const [licenseparttwo, setlicenseparttwo] = useState("");
  const [licensepartthree, setlicensepartthree] = useState("");
  const [data_Student, setData_Student] = useState("");
  const [checkAddOrUpdate, setCheckAddOrUpdate] = useState(true);

  const [visibleCSV, setVisibleCSV] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchId_student, setSearchId_student] = useState("");

  const insertDataStudent = () => {
    setCheckAddOrUpdate(true);
    setIdStudent("");
    setFirst_name("");
    setLast_name("");
    setFaculty("");
    setStudent_id("");
    setlicensepartone("");
    setlicenseparttwo("");
    setlicensepartthree("");
    setVisible(true);
  };

  const UpdateDataStudent = (record) => {
    setCheckAddOrUpdate(false);
    setIdStudent(record._id);
    setFirst_name(record.first_name);
    setLast_name(record.last_name);
    setFaculty(record.faculty);
    setStudent_id(record.student_id);
    setlicensepartone(record.licensepartone);
    setlicenseparttwo(record.licenseparttwo);
    setlicensepartthree(record.licensepartthree);
    setVisible(true);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => <>{index + 1}</>,
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
      title: "แก้ไข-ลบ",
      dataIndex: "func",
      key: "func",
      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            onClick={() => UpdateDataStudent(record)}
            style={{ marginRight: 5 }}
          >
            แก้ไข
          </Button>
          <Button
            type="primary"
            onClick={() => showDeleteConfirm(record._id)}
            danger
          >
            ลบ
          </Button>
        </>
      ),
    },
  ];

  const loadingData = async () => {
    var result = await getDataStudent();
    await console.log("loading", result.data);
    await setData_Student(result.data);
    setFilteredData(result.data);
    await setisLoading(true);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const onClose = () => {
    setVisible(false);
  };
  // function onChange(value) {
  //   console.log(`selected ${value}`);
  // }

  // function onBlur() {
  //   console.log("blur");
  // }

  // function onFocus() {
  //   console.log("focus");
  // }

  // function onSearch(val) {
  //   console.log("search:", val);
  // }

  const success = (text) => {
    message.success(text);
  };
  const error = (text) => {
    message.error(text);
  };

  const ClickButton = async () => {
    if (
      !first_name ||
      !last_name ||
      !faculty ||
      !student_id ||
      !licensepartone ||
      !licenseparttwo ||
      !licensepartthree
    ) {
      error("กรุณากรอกข้อมูลให้ครบ");
    } else {
      console.log("1");
      var result;
      if (checkAddOrUpdate) {
        result = await SignUpFunc(
          first_name,
          last_name,
          faculty,
          student_id,
          licensepartone,
          licenseparttwo,
          licensepartthree
        );
        console.log("2", result);
        if (result.status === 200) {
          console.log("Success");
          success("เพิ่มข้อมูลสำเร็จแล้ว");
          window.location.reload(false);
        } else {
          error("มีข้อมูลผิดพลาด");
        }
      } else {
        result = await putUpdateDataStudent(
          idStudent,
          first_name,
          last_name,
          faculty,
          student_id,
          licensepartone,
          licenseparttwo,
          licensepartthree
        );
      }
    }
  };

  const openNotificationNofileError = (type) => {
    notification[type]({
      message: "กรุณาเพิ่มไฟล์",
      description: "ไม่พบไฟล์ที่ต้องการอัพโหลด",
    });
  };

  const openNotificationSucess = (type) => {
    notification[type]({
      message: "อัพโหลดสำเร็จ",
      description: "ตอนนี้เก็บข้อมูลแล้ว",
    });
  };

  const openNotificationError = (type) => {
    notification[type]({
      message: "อัพโหลดไม่สำเร็จ",
      description:
        "มีปัญหาเกิดขึ้นเกี่ยวกับการอัพกรุณาตรวจสอบไฟล์ว่าถูกต้องไหม",
    });
  };

  const uploadHandles = async () => {
    if (!loading) {
      setLoading(true);
      if (!fileUpload) {
        setLoading(false);
        openNotificationNofileError("error");
        return console.log("ไม่มีไฟล์");
      }
      const result = await uploadCSV(fileUpload);
      console.log(result);
      if (result.status === 200) {
        setLoading(false);
        setVisibleCSV(false);
        openNotificationSucess("success");
      } else {
        setLoading(false);
        setVisibleCSV(false);
        openNotificationError("error");
      }
    }
  };

  const handleSearchName = (event) => {
    let value = event.target.value.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    let result3 = [];
    // console.log(value);
    let dataforfilter = data_Student;
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
    result3 = result2.filter((datas) => {
      return datas.student_id.search(searchId_student) !== -1;
    });
    console.log("result3", result3);
    setSearchName(value);
    setFilteredData(result3);
  };

  const handleSearchFaculty = (event) => {
    let value = event.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    let result3 = [];
    // console.log(value);
    let dataforfilter = data_Student;
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
    result3 = result2.filter((datas) => {
      return datas.student_id.search(searchId_student) !== -1;
    });
    console.log("result3", result3);
    setSearchFaculty(value);
    setFilteredData(result3);
  };

  const handleSearchYear = (event) => {
    let value = event.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    let result3 = [];
    let dataforfilter = data_Student;
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
    result3 = result2.filter((datas) => {
      return datas.student_id.search(searchId_student) !== -1;
    });
    console.log("result3", result3);
    setSearchYear(value);
    setFilteredData(result3);
  };

  const handleSearchStudentID = (event) => {
    let value = event.target.value.toLowerCase();
    console.log("TEST=>", value);
    let result = [];
    let result1 = [];
    let result2 = [];
    let result3 = [];
    let dataforfilter = data_Student;
    result = dataforfilter.filter((datas) => {
      return datas.student_id.search(value) !== -1;
    });
    result1 = result.filter((datas) => {
      return datas.first_name.search(searchName) !== -1;
    });
    result2 = result1.filter((datas) => {
      return datas.faculty.search(searchFaculty) !== -1;
    });
    result3 = result2.filter((datas) => {
      let student_result = datas.student_id;
      student_result = student_result.slice(0, 2);
      return student_result.search(searchYear) !== -1;
    });
    console.log("result3", result3);
    setSearchId_student(value);
    setFilteredData(result3);
  };

  if (isLoading) {
    return (
      <div className="nu-body-ctn-4">
        <LoadingComponent isLoading={isLoading} />
        {checkAddOrUpdate ? (
          <DrawerComponent
            onClose={onClose}
            visible={visible}
            setVisible={setVisible}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setStudent_id={setStudent_id}
            setlicensepartone={setlicensepartone}
            setlicenseparttwo={setlicenseparttwo}
            setlicensepartthree={setlicensepartthree}
            first_name={first_name}
            last_name={last_name}
            student_id={student_id}
            licensepartone={licensepartone}
            licenseparttwo={licenseparttwo}
            licensepartthree={licensepartthree}
            ClickButton={ClickButton}
            faculty={faculty}
            setFaculty={setFaculty}
            titletext={"เพิ่มข้อมูลนิสิต"}
            putUpdateDataStudent={putUpdateDataStudent}
          />
        ) : (
          <DrawerComponent
            onClose={onClose}
            visible={visible}
            setVisible={setVisible}
            setFirst_name={setFirst_name}
            setLast_name={setLast_name}
            setStudent_id={setStudent_id}
            setlicensepartone={setlicensepartone}
            setlicenseparttwo={setlicenseparttwo}
            setlicensepartthree={setlicensepartthree}
            first_name={first_name}
            last_name={last_name}
            student_id={student_id}
            licensepartone={licensepartone}
            licenseparttwo={licenseparttwo}
            licensepartthree={licensepartthree}
            ClickButton={ClickButton}
            faculty={faculty}
            setFaculty={setFaculty}
            titletext={"เปลี่ยนแปลงข้อมูลนิสิต"}
          />
        )}

        <div className="nu-student-header">
          <div className="nu-student-header-1">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => insertDataStudent()}
              style={{ marginRight: 5 }}
            >
              เพิ่มข้อมูล
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setVisibleCSV(true)}
            >
              CSV File
            </Button>
            <Modal
              title="อัพโหลดไฟล์ CSV"
              centered
              visible={visibleCSV}
              onOk={uploadHandles}
              onCancel={() => (loading ? null : setVisibleCSV(false))}
              width={1000}
              cancelText={loading ? "กำลังอัพโหลด" : "ย้อนกลับ"}
              okText={loading ? "กำลังอัพโหลด" : "อัพโหลด"}
            >
              <Spin spinning={loading} tip="กำลังอัพโหลด กรุณาห้ามกดออก">
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
              </Spin>
            </Modal>
          </div>
          <div className="nu-student-header-2">
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
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">รหัสนิสิต</h3>
              <Search
                placeholder="รหัสนิสิต"
                style={{ width: 200 }}
                className="nu-data-search-ip"
                onChange={(event) => handleSearchStudentID(event)}
              />
            </div>
            <div className="nu-data-search">
              <h3 className="nu-data-search-text">คณะ</h3>
              <Select
                showSearch
                style={{ width: 150 }}
                placeholder="คณะ"
                optionFilterProp="children"
                onChange={(event) => handleSearchFaculty(event)}
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
              >
                <Option value="">-ไม่ระบุ-</Option>
                <Option value="70">70</Option>
                <Option value="69">69</Option>
                <Option value="68">68</Option>
                <Option value="67">67</Option>
                <Option value="66">66</Option>
                <Option value="65">65</Option>
                <Option value="64">64</Option>
                <Option value="63">63</Option>
                <Option value="62">62</Option>
                <Option value="61">61</Option>
                <Option value="60">60</Option>
                <Option value="59">59</Option>
                <Option value="58">58</Option>
                <Option value="57">57</Option>
                <Option value="56">56</Option>
                <Option value="55">55</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="nu-data-table">
          <Table
            className="nu-data-table-table"
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey="student_id"
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ShowDataStudent;
