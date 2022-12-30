import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Recruiments/recruimentTable.css";
import { Link } from "react-router-dom";
import RecruimentDetail from "./RecruimentDetail";
import { useDispatch, useSelector } from "react-redux";

const Recruiments = () => {
  const { getAllRecruiment, recruimentData, getDetailRecruiment } =
    useContext(AdminContext);
  const { token } = useSelector((state) => state.auths.user);
  const dispatch = useDispatch();
  const [showDetailTable, setShowDetailTable] = useState(false);
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    getAllRecruiment(tokenLocal);
  }, []);

  const handleDeleteRecruiment = (id) => {
    dispatch(id, token);
  };
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
          <button
            className="btn btn-delete"
            onClick={() => handleDeleteRecruiment(record._id)}
          >
            Xóa
          </button>
          <Link to={"/recruimentDetail/" + record._id}>
            <button
              className="btn btn-detail"
              onClick={() => handleGetDetail(record._id)}
            >
              Xem chi tiết
            </button>
          </Link>
        </Space>
      ),
    },
  ];

  const handleGetDetail = (id) => {
    getDetailRecruiment(id);
    setShowDetailTable(true);
  };
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
