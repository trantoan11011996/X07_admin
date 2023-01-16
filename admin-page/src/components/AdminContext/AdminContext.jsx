import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import adminAction, { autoLogout } from "../adminAction/AdminAction";
import { getApiHost } from "../../config";
import { useNavigate } from "react-router-dom";
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [recruimentData, setRecruimentData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [token, setToken] = useState("");
  const [detailJob, setDetailJob] = useState({});
  const autoGetAllUsers = () => {
    const allUsers = adminAction.autoLogin();
    if (!allUsers) {
      return;
    }
    return allUsers;
  };
  const autoGetAllRecruiment = () => {
    const allRecruiment = adminAction.autoGetRecruiment();
    if (!allRecruiment) {
      return;
    }
    return allRecruiment;
  };
  const autoGetField = () => {
    const allField = adminAction.autoGetFields();
    if (!allField) {
      return;
    }
    return allField;
  };
  useEffect(() => {
    const tokenLocal = JSON.parse(localStorage.getItem("token"));
    const allUsers = autoGetAllUsers(tokenLocal);
    setUsersData(allUsers);
    const allRecruiment = autoGetAllRecruiment(tokenLocal);
    setRecruimentData(allRecruiment);
    const allField = autoGetField(tokenLocal);
    setFieldData(allField);

  }, []);

  const getAllUser = async (token) => {
    const getUsers = await fetch(getApiHost() + "admin/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data',data);
        setUsersData(data);
        localStorage.setItem("allUsers", JSON.stringify(data));
        return data;
      });
    return getUsers;
  };
  const getAllRecruiment = async (token) => {
    const getRecruiments = await fetch(getApiHost() + "admin/recruiments", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRecruimentData(data);
        localStorage.setItem("allRecruiment", JSON.stringify(data));
        return data;
      });
    return getRecruiments;
  };
  const updateStatusUser = async (status, id) => {
    const statusJson = {
      status: status,
    };
    const updateStatus = await fetch(getApiHost() + `admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(statusJson),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return result;
      });
    return updateStatus;
  };
  const getAllFields = async (token) => {
    const allFields = await fetch(getApiHost() + `admin/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setFieldData(data);
        localStorage.setItem("allField", JSON.stringify(data));
        return data;
      });
    return allFields;
  };

  const createCategoryContext = async (category, token) => {
    const newCategory = adminAction.createCategory(category);
    const fetchApiCateory = await fetch(getApiHost() + `admin/category`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data",data);
        return data;
      });
    return fetchApiCateory;
  };

  const updateCategory = async (id, token,name) => {
    const newCategory = adminAction.updateCategory(name)
    console.log('new',newCategory);
    const fetchApiCateory = await fetch(getApiHost() + `admin/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data",data);
        return data;
      });
    return fetchApiCateory;
  };
  const getDetailRecruiment = async (id) => {
    const detailRecruiment = await fetch(
      getApiHost() + `recruiments/detail/${id}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("detailJob", JSON.stringify(data));
        setDetailJob(data);
        return data;
      });
    return detailRecruiment;
  };

  const deleteRecruiment = async(token,id,reason)=>{
    const reasonDelete = {"reason" : reason}
   
    const deleteRcm = await fetch(getApiHost() + `admin/recruiments/${id}`,{
      method : "DELETE",
      body : JSON.stringify(reasonDelete),
      headers:{
        "authorization" : `Bearer ${token}`
      }
    }).then((res)=>{
      return res.json()
    }).then((result)=>{
      console.log(result);
      return result
    })
    return deleteRcm
  }
  const value = {
    getAllUser,
    usersData,
    getAllRecruiment,
    recruimentData,
    setRecruimentData,
    updateStatusUser,
    getAllFields,
    fieldData,
    setFieldData,
    token,
    setToken,
    createCategoryContext,
    getDetailRecruiment,
    detailJob,
    setDetailJob,
    deleteRecruiment,
    updateCategory
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
