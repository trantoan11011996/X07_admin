import React from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";

const Recruiments = () => {
  const { getAllRecruiment, recruimentData } = useContext(AdminContext);
  getAllRecruiment()
  const columns = [
    {
      title: "Tiêu đề tin",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tên công ty",
      dataIndex: ["name", "info", "name"],
      key: "name",
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Địa điểm tuyển dụng",
      dataIndex: ["location", "name"],
      key : "location"
    },
    {
      title : "Ngày tạo",
      dataIndex : "createAt",
      key : "createAt"
    },
    {
      title : "Ngày kết thúc",
      dataIndex : "deadline",
      key:"deadline"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button>Xóa</button>
          <button>Xem chi tiết</button>
        </Space>
      ),
    },
  ];
  return <Table dataSource={recruimentData} columns={columns}></Table>;
};

export default Recruiments;
