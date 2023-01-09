import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import adminApi from "../adminAction/AdminAction";
import { getApiHost } from "../../config";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTJlZGEzZjQ3NzNjOTgyZmIwYjMwOCIsImlhdCI6MTY3MTcxNjc1NSwiZXhwIjoxNjcxODAzMTU1fQ.08dxF8kKLOUT-2FSNXKRwSU6SZc8ftXKv6wBobq2zSI";
const AdminContext = createContext();
const url = "https://xjob-mindx-production.up.railway.app/api";

const AdminProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [recruimentData, setRecruimentData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [token, setToken] = useState("");
  const [detailJob, setDetailJob] = useState({});

  const autoGetAllUsers = () => {
    const allUsers = adminApi.autoLogin();
    if (!allUsers) {
      return;
    }
    return allUsers;
  };
  const autoGetAllRecruiment = () => {
    const allRecruiment = adminApi.autoGetRecruiment();
    if (!allRecruiment) {
      return;
    }
    return allRecruiment;
  };
  const autoGetField = () => {
    const allField = adminApi.autoGetFields();
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
        setRecruimentData(data.recruiment);
        localStorage.setItem("allRecruiment", JSON.stringify(data.recruiment));
        return data.recruiment;
      });
    return getRecruiments;
  };
  const updateStatusUser = async (status, id) => {
    const statusJson = {
      status: status,
    };
    console.log(statusJson, id);
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
    const newCategory = adminApi.createCategory(category);
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
  const value = {
    getAllUser,
    usersData,
    getAllRecruiment,
    recruimentData,
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
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
