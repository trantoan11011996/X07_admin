import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import "../Fields/fields.css";
import { autoLogout } from "../../components/adminAction/AdminAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Fields = () => {
  const {
    getAllFields,
    fieldData,
    setFieldData,
    createCategoryContext,
    token,
    setToken,
    updateCategory
  } = useContext(AdminContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalUpdate, setToggleModalUpdate] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryUpdate, setCategoryUpdate] = useState("");

  const [alertExist, setAlertExist] = useState(false);
  const [succes, setSucces] = useState(false);
  const [succesUpdate, setSuccesUpdate] = useState(false);
  const [idCateogory,setIdCategory] = useState("")
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const tokenLocal = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getAllFields(tokenLocal);
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
  const handleToggleModalUpdate = (id) => {
    setToggleModalUpdate(true);
    setIdCategory(id)
  };
  const handleCloseModal = () => {
    setToggleModal(false);
    setSucces(false);
  };

  const handleCloseModalUpdate = () => {
    setToggleModalUpdate(false);
    setSuccesUpdate(false);
  };

  const handleUpdateCategory = (e,id) => {
    e.preventDefault();
    setCategoryUpdate(" ");
    setAlertExist(false);
    setToggleModalUpdate(false);
    setSuccesUpdate(true);
    updateCategory(id,tokenLocal,categoryUpdate);
    setTimeout(() => {
      const getData = async () => {
        const data = await getAllFields(tokenLocal);
        console.log('data',data);
        return data
      };
      getData();
    }, 800);
    setToken(tokenLocal);
    setTimeout(()=>{
       toast.success("Cập nhật lĩnh vực thành công")
    },500)
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const categoryList = pushvalue();
    if (categoryList.includes(category.toLocaleLowerCase())) {
      setAlertExist(true);
      setSucces(false);
      return;
    }
    setCategory(" ");
    setAlertExist(false);
    setSucces(true);
    setStatus(category);
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    createCategoryContext(category, tokenLocal);
    setTimeout(() => {
      const getData = async () => {
        const data = await getAllFields(tokenLocal);
      };
      getData();
    }, 800);
    setToken(tokenLocal);
    setTimeout(()=>{
       toast.success("Thêm mới lĩnh vực thành công")
    },500)
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
          <button className="btn btn-update-field" onClick={()=>handleToggleModalUpdate(record._id)}>Cập nhật</button>
        </Space>
      ),
    },
  ];
  return (
    <>
    <ToastContainer/>
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
            <div className="modal-header-field">
              <p className="">Tạo mới lĩnh vực</p>
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
      {toggleModalUpdate ? (
        <div className="modal-overlay">
          <div className={toggleModalUpdate ? "open-modal" : "modal-container"}>
            <div className="wrap-close-modal">
              <AiOutlineClose
                className="icon-close-modal"
                onClick={() => handleCloseModalUpdate()}
              />
            </div>
            <div className="modal-header-field">
              <p className="">Cập nhật tên lĩnh vực</p>
            </div>
            <form className="form-add-category" onSubmit={(e)=>handleUpdateCategory(e,idCateogory)}>
              <input
                className="form-input-category"
                type="text"
                value={categoryUpdate}
                placeholder="Cập nhật lĩnh vực..."
                onChange={(e) => setCategoryUpdate(e.target.value)}
              ></input>
              <button className="btn-add-category" type="submit">
                Cập nhật
              </button>
            </form>
            {succes && (
              <p className="alert-succes">
                Đã cập nhật lĩnh vực, kiểm tra lại dữ liệu
              </p>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
    </>
   
  );
};

export default Fields;
