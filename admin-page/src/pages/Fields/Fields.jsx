import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Fields/fields.css";
const Fields = () => {
  const { getAllFields, fielData } = useContext(AdminContext);

  useEffect(() => {
    getAllFields();
  }, []);
  const columns = [
    {
      title: "Tên Lĩnh vực",
      dataIndex: "name",
      width: 350,
      key: "name",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <button className="btn btn-delete-field">Xóa</button>
          <button className="btn btn-update-field">Cập nhật</button>
        </Space>
      ),
    },
  ];
  return (
    <div className="table-fields">
      <div className="field-table-btn">
        <button className="add-field">Thêm mới</button>
      </div>
      <Table
        className="table-antd"
        dataSource={fielData}
        columns={columns}
        pagination={{ defaultCurrent: 1, pageSize: 5 }}
      ></Table>
    </div>
  );
};

export default Fields;
