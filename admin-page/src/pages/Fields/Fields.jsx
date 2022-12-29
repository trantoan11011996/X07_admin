import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Fields/fields.css";
const Fields = () => {
  const { getAllFields, fieldData, setFieldData,createCategoryContext, token, setToken } =
    useContext(AdminContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [category, setCategory] = useState("");
  const [alertExist, setAlertExist] = useState(false);
  const [succes,setSucces] = useState(false)
  const [status,setStatus] = useState("")
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    getAllFields(tokenLocal);
    setToken(tokenLocal);
  }, []);
 
  const pushvalue = () => {
    let nameCategoryList = [];
    for (let item of fieldData) {
      nameCategoryList.push(item.name);
    }
    const lowerStringCategory = nameCategoryList.map((item) => {
      return item.toLowerCase();
    });
    return lowerStringCategory;
  };
  const handleToggleModal = () => {
    setToggleModal(true);
  };
  const handleCloseModal = () => {
    setToggleModal(false);
    setSucces(false)
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const categoryList = pushvalue();
    if (categoryList.includes(category.toLocaleLowerCase())) {
      setAlertExist(true);
      setSucces(false)
      return;
    }
    setCategory(" ");
    setAlertExist(false);
    setSucces(true)
    setStatus(category)
    createCategoryContext(category,token)
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    setTimeout(()=>{
      const getData = async()=>{
        const data = await getAllFields(tokenLocal)
     };
     getData()
    },800)
    
    setToken(tokenLocal)
  };
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
      // fixed: "right",
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
        <button className="add-field" onClick={() => handleToggleModal()}>
          Thêm mới
        </button>
      </div>
      <Table
        className="table-antd"
        dataSource={fieldData}
        columns={columns}
        pagination={{ defaultCurrent: 1, pageSize: 5 }}
      ></Table>
      {toggleModal ? (
        <div className="modal-overlay">
          <div className={toggleModal ? "open-modal" : "modal-container"}>
            <div className="wrap-close-modal">
              <AiOutlineClose
                className="icon-close-modal"
                onClick={() => handleCloseModal()}
              />
            </div>
            <form className="form-add-category" onSubmit={handleCreateCategory}>
              <input
                className="form-input-category"
                type="text"
                value={category}
                placeholder="Tên lĩnh vực..."
                onChange={(e) => setCategory(e.target.value)}
              ></input>
              <button className="btn-add-category" type="submit">
                + Tạo mới
              </button>
            </form>
            {alertExist && (
                <p className="alert-exist">
                  Tên lĩnh vực đã tồn tại, hãy nhập lại!
                </p>
              )}
              {succes && (
                <p className="alert-succes">
                  Đã tạo lĩnh vực, kiểm tra lại dữ liệu
                </p>
              )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Fields;
