import React from "react";
import moment from "moment";
import { url } from "../key";
import { Button, Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

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
    title: "คณะ",
    dataIndex: "student_faculty",
    key: "student_faculty",
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
      <>{moment(record.date_data).format("L")}</>
    ),
  },
  {
    title: "อัตราความถูกต้อง",
    dataIndex: "date",
    key: "date",
    render: (text, record, index) => (
      <Tag icon={<CheckCircleOutlined />} color="success">
        85%
      </Tag>
    ),
  },
  {
    title: "Path Image",
    dataIndex: "image",
    key: "image",
    render: (res, record) => {
      console.log(record);
      const data = record.path_image;
      const upload_by = record.upload_by;
      var str = data.replaceAll("/", "-");
      if (upload_by === "video") {
        return (
          <a target="_blank" href={`${url}/api/data/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "image") {
        return (
          <a target="_blank" href={`${url}/api/data/image/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "web") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyweb/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "app") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyapp/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      }
    },
  },
  {
    title: "Card Image",
    dataIndex: "image",
    key: "image",
    render: (res, record) => {
      console.log(record);
      const data = record.image_card;
      const upload_by = record.upload_by;
      if (data == null) { 
        return (
          <p>N/A</p>
        );
      }
      var str = data.replaceAll("/", "-");
      if (upload_by === "video") {
        return (
          <a target="_blank" href={`${url}/api/data/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "image") {
        return (
          <a target="_blank" href={`${url}/api/data/image/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "web") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyweb/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "app") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyapp/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      }
    },
  },
  {
    title: "Event Image",
    dataIndex: "image",
    key: "image",
    render: (res, record) => {
      console.log(record);
      const data = record.image_event;
      const upload_by = record.upload_by;
      var str = data.replaceAll("/", "-");
      if (data == null) { 
        return (
          <p>N/A</p>
        );
      }
      var str = data.replaceAll("/", "-");
      if (upload_by === "video") {
        return (
          <a target="_blank" href={`${url}/api/data/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "image") {
        return (
          <a target="_blank" href={`${url}/api/data/image/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "web") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyweb/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      } else if (upload_by === "app") {
        return (
          <a target="_blank" href={`${url}/api/data/uploadbyapp/${str}`}>
            ดูตัวอย่าง
          </a>
        );
      }
    },
  },
  {
    title: "ฟังก์ชัน",
    dataIndex: "Function",
    key: "Function",
    render: (res, record) => {
      return (
        <>
          <Button type="dashed">แก้ไข</Button>
          <Button type="primary" style={{ marginLeft: 5 }}>
            ยืนยัน
          </Button>
        </>
      );
    },
  },
];
