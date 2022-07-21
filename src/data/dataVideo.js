import React from "react";
import { Button, Tag } from "antd";
import {
  SyncOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { url } from "../key";
import { startProgramDetection } from "../function/getVideo";
import moment from "moment";

// const { confirm } = Modal;

export const columns = [
  {
    title: "ลำดับ",
    dataIndex: "number",
    key: "number",
    render: (text, record, index) => <>{index + 1}</>,
  },
  {
    title: "ชื่อ-วิดีโอ",
    dataIndex: "video_name",
    key: "video_name",
  },
  {
    title: "ขนาด",
    dataIndex: "video_size",
    key: "video_size",
    render: (data) => {
      if (data > 1000000) {
        var sum = Math.trunc(data * 1e-6);
        return sum.toString() + " MB";
      } else {
        var sums = Math.trunc(data * 0.000976563);
        return sums.toString() + " KB";
      }
    },
  },
  {
    title: "วันที่อัพโหลด",
    dataIndex: "video_timestamp",
    key: "video_timestamp",
    render: (text, record, index) => <>{moment(text).format("DD/MM/YYYY")}</>,
  },
  {
    title: "อัพโหลดโดย",
    dataIndex: "video_uploadby",
    key: "video_uploadby",
  },
  {
    title: "ตัวอย่างวิดีโอ",
    dataIndex: "video_file",
    key: "video_file",
    render: (data) => {
      return (
        <a target="_blank" rel="noopener noreferrer" href={`${url}/api/video/${data}`}>
          ดูตัวอย่าง
        </a>
      );
    },
  },
  {
    title: "สถานะ",
    dataIndex: "video_status",
    key: "video_status",
    render: (data) => {
      if (data === "T") {
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            ประมวลผลเรียบร้อย
          </Tag>
        );
      } else if (data === "W") {
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            กำลังประมวลผล
          </Tag>
        );
      } else if (data === "F") {
        return (
          <Tag icon={<CloseCircleOutlined />} color="warning">
            ยังไม่ได้ประมวลผล
          </Tag>
        );
      }
    },
  },
  {
    title: "การทำงาน",
    dataIndex: "func",
    key: "func",
    render: (text, record, index) => (
      <>
        <Button
          type="primary"
          style={{ marginRight: 5 }}
          onClick={() => startProgramDetection(record)}
        >
          เริ่มประมวลผล
        </Button>
      </>
    ),
  },
];

export const columns_processing = [
  {
    title: "ลำดับ",
    dataIndex: "number",
    key: "number",
    render: (text, record, index) => <>{index + 1}</>,
  },
  {
    title: "ชื่อ-วิดีโอ",
    dataIndex: "video_name",
    key: "video_name",
  },
  {
    title: "ขนาด",
    dataIndex: "video_size",
    key: "video_size",
    render: (data) => {
      if (data > 1000000) {
        var sum = Math.trunc(data * 1e-6);
        return sum.toString() + " MB";
      } else {
        var sums = Math.trunc(data * 0.000976563);
        return sums.toString() + " KB";
      }
    },
  },
  {
    title: "วันที่อัพโหลด",
    dataIndex: "video_timestamp",
    key: "video_timestamp",
    render: (text, record, index) => <>{moment(text).format("DD/MM/YYYY")}</>,
  },
  {
    title: "อัพโหลดโดย",
    dataIndex: "video_uploadby",
    key: "video_uploadby",
  },
  {
    title: "ตัวอย่างวิดีโอ",
    dataIndex: "video_file",
    key: "video_file",
    render: (data) => {
      return (
        <a target="_blank" rel="noopener noreferrer" href={`${url}/api/video/${data}`}>
          ดูตัวอย่าง
        </a>
      );
    },
  },
  {
    title: "สถานะ",
    dataIndex: "video_status",
    key: "video_status",
    render: (data) => {
      if (data === "T") {
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            ประมวลผลเรียบร้อย
          </Tag>
        );
      } else if (data === "W") {
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            กำลังประมวลผล
          </Tag>
        );
      } else if (data === "F") {
        return (
          <Tag icon={<CloseCircleOutlined />} color="warning">
            ยังไม่ได้ประมวลผล
          </Tag>
        );
      }
    },
  },
  {
    title: "การทำงาน",
    dataIndex: "func",
    key: "func",
    render: (text, record, index) => (
      <>
        <Button
          disabled
          type="primary"
          style={{ marginRight: 5 }}
          onClick={() => startProgramDetection(record)}
        >
          เริ่มประมวลผล
        </Button>
      </>
    ),
  },
];
