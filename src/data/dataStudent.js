import React from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DeleteDataStudent } from "../function/signupDataStudent";

const { confirm } = Modal;

function showDeleteConfirm(id) {
  console.log(id);
  confirm({
    title: "แน่ใจไหมว่าต้องการลบข้อมูลของบุคคลนี้",
    icon: <ExclamationCircleOutlined />,
    content: "นายภานุวิชญ์  มากมี",
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

export const columns = [
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
        <Button type="primary" style={{ marginRight: 5 }}>
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
