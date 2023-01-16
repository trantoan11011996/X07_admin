import React, { useEffect, useState,useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Modal } from 'antd';
import Highlighter from 'react-highlight-words';

import { useContext } from "react";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Recruiments/recruimentTable.css";
import { Link, useNavigate } from "react-router-dom";
import RecruimentDetail from "./RecruimentDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecruiment,
  getDetailRecuiment,
} from "../../Actions/adminAction";
import { getApiHostUser } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const Recruiments = () => {
  const {
    getAllRecruiment,
    recruimentData,
    getDetailRecruiment,
    setRecruimentData,
    deleteRecruiment
  } = useContext(AdminContext);
  const { token } = useSelector((state) => state.auths.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDetailTable, setShowDetailTable] = useState(false);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState("")
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    getAllRecruiment(tokenLocal);
  }, []);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    handleSearch("","","")
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
  });

  const getlocalToken = JSON.parse(localStorage.getItem("token"));
  const showModal = (id) => {
    setOpen(true);
    setId(id)
  };
  const handleOk = async (id) => {
    setConfirmLoading(true);
    await deleteRecruiment(getlocalToken,id,reason)
    setTimeout(()=>{
      setConfirmLoading(false);
    },300)
    setTimeout(()=>{
        toast.success("Xóa tin tuyển dụng thành công")
    },300)
    getAllRecruiment(getlocalToken)
    setOpen(false);
    setReason("")
};
  
  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Tiêu đề tin",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Tên công ty",
      dataIndex: ["name", "info", "name"],
      key: "nameCompany",
    },
    {
      title: "Lĩnh vực tuyển dụng",
      dataIndex: ["category", "name"],
      key: "name",
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Trạng thái tin",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return (
          <>
            {text === "extended" && "Đã gia hạn"}
            {text === "active" && "Đang hoạt động"}
            {text === "expire" && "Hết hạn"}
            {text === "pending" && "Đang chờ duyệt"}
          </>
        );
      },
    filters:[
      {
        text : "active",
        value : "active"
      },
      {
        text : "extended",
        value : "extended"
      },
      {
        text : "pendingt",
        value : "pending"
      },
      {
        text : "expire",
        value : "expire"
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
      ...getColumnSearchProps("position"),
    },
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
          {/* <Link to={"/recruimentDetail/" + record._id}>
            <button
              className="btn btn-detail"
              onClick={() => handleGetDetail(record._id)}
            >
              Xem chi tiết
            </button>
          </Link> */}
        </Space>
      ),
    },
  ];

  const handleGetDetail = (id) => {
    getDetailRecruiment(id);
    setShowDetailTable(true);
  };
  return (
    <>
    <ToastContainer/>
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
    </>
    
  );
};

export default Recruiments;
