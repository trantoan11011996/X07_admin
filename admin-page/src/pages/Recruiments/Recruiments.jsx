import React, { useEffect, useState } from "react";

import { Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Recruiments/recruimentTable.css";
import { Link } from "react-router-dom";
import RecruimentDetail from "./RecruimentDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecruiment,
  getDetailRecuiment,
} from "../../Actions/adminAction";

const Recruiments = () => {
  const { getAllRecruiment, recruimentData, getDetailRecruiment } =
    useContext(AdminContext);
  const { token } = useSelector((state) => state.auths.user);
  // const { email } = useSelector(
  //   (state) => state?.recruiment?.recruiments?.name?.info
  // );

  const dispatch = useDispatch();
  const [showDetailTable, setShowDetailTable] = useState(false);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    getAllRecruiment(tokenLocal);
  }, []);

  const showModal = (id) => {
    dispatch(getDetailRecuiment(token, id));
    setOpen(true);
    setId(id);
  };
  const handleOk = (id) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);

    dispatch(deleteRecruiment(token, id, reason));
  };
  const handleCancel = () => {
    setOpen(false);
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
      title: "Nhu cầu",
      dataIndex: "numberApplicant",
      width: 50,
      key: "numberApplicant",
      // render : (text)=>{
      //   let txtToNumb = text.toString()
      //   return(
      //     <></>
      //     // <p>{txtToNumb}</p>
      //   )
      // }
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Hình thức làm việc",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        return <>{text === "fulltime" ? "Toàn thời gian" : "Bán thời gian"}</>;
      },
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      key: "experience",
    },
    {},
    {},
    {
      title: "Địa điểm",
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
            onClick={() => showModal(record._id)}
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

      <Modal
        title="Bạn có muốn xóa lĩnh vực ?"
        open={open}
        onOk={() => handleOk(id)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="reason">
          <input
            type="text"
            placeholder="Nhập lí do để xóa..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Recruiments;
