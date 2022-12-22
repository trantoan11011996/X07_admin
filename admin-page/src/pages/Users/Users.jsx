import React from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Users/userTable.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Column from "antd/es/table/Column";

const Users = () => {
  const { getAllUser, usersData } = useContext(AdminContext);
  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "info",
      key: "name",
      render: (item) => {
        return item ? item.fullName ?? item.name : "admin";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: ["info", "phoneNumber"],
      key: "info",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <>
          {text === "recruiter" && <a>Nhà tuyển dụng</a>}
          {text === "candidate" && <a>Người tìm việc</a>}
          {text === "admin" && <a>Quản trị viên</a>}
        </>
      ),
      filters: [
        {
          text: "recruiter",
          value: "recruiter",
        },
        {
          text: "candidate",
          value: "candidate",
        },
        {
          text: "admin",
          value: "admin",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          {text === "active" && <a>Active</a>}
          {text === "locked" && <a>Locked</a>}
        </>
      ),
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Locked",
          value: "locked",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button>Cập nhật</button>
          <button>Khóa/mở khóa</button>
        </Space>
      ),
    },
  ];
  const onChangeTable = (pagination, filters, sorter) => {
    console.log("pagi", pagination);
    console.log("filter", filters);
    console.log("sorter", sorter);
  };
  return (
    <div className="user-table">
      <div className="user-table-btn">
        <Link to="/createAdmin">
          <button className="add-user">Thêm mới</button>
        </Link>
      </div>
      <Table
        dataSource={usersData}
        onChange={onChangeTable}
        columns={columns}
      ></Table>
    </div>
  );
};

export default Users;
