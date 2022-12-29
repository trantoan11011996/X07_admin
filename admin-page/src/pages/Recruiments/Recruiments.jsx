import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Recruiments/recruimentTable.css";
import { Link } from "react-router-dom";
import RecruimentDetail from "./RecruimentDetail";

const Recruiments = () => {
  const { getAllRecruiment, recruimentData, getDetailRecruiment } =
    useContext(AdminContext);
  const [showDetailTable,setShowDetailTable] = useState(false)
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    getAllRecruiment(tokenLocal);
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
      title : "Số lượng ứng viên",
      dataIndex : "numberApplicant",
      key : "numberApplicant",
      // render : (text)=>{
      //   let txtToNumb = text.toString()
      //   return(
      //     <></>
      //     // <p>{txtToNumb}</p>
      //   )
      // }
    },
    {
      title : "Vị trí công việc",
      dataIndex : "position",
      key : "position"
    },
    {
      title : "Yêu cầu thời gian làm việc",
      dataIndex : "type",
      key : "type"
    },
    {
      title : "Yêu cầu kinh nghiệm",
      dataIndex : "experience",
      key : "experience"
    },
    {

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
      render: (item) => {
        let crTime = new Date(item).getTime();
        let crDay = new Date(crTime).getDate();
        let crMonth = new Date(crTime).getMonth() + 1;
        let crYear = new Date(crTime).getFullYear();
        let newCreate = `${crDay}-${crMonth}-${crYear}`;
        return newCreate;
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "deadline",
      key: "deadline",
      render: (item) => {
        let crTime = new Date(item).getTime();
        let crDay = new Date(crTime).getDate();
        let crMonth = new Date(crTime).getMonth() + 1;
        let crYear = new Date(crTime).getFullYear();
        let newCreate = `${crDay}-${crMonth}-${crYear}`;
        return newCreate;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="btn btn-delete">Xóa</button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-recruiment">
      <Table
        className="table-antd"
        dataSource={recruimentData}
        columns={columns}
        pagination={{ defaultCurrent: 1, pageSize: 5 }}
      ></Table>
    </div>
  );
};

export default Recruiments;
