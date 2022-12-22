import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Recruiments/recruimentTable.css"
const Recruiments = () => {
  const { getAllRecruiment, recruimentData } = useContext(AdminContext);

  useEffect(() => {
    getAllRecruiment();
  }, []);
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
      key: "location",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="btn btn-delete">Xóa</button>
          <button className="btn btn-detail">Xem chi tiết</button>
        </Space>
      ),
    },
  ];
  return <Table 
    className="table-antd"
    dataSource={recruimentData}
    columns={columns}
    pagination={{defaultCurrent:1, pageSize : 5}}
   ></Table>;
};

export default Recruiments;
