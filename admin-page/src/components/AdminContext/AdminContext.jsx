import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import adminApi from "../adminAction/AdminAction";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTJlZGEzZjQ3NzNjOTgyZmIwYjMwOCIsImlhdCI6MTY3MTcxNjc1NSwiZXhwIjoxNjcxODAzMTU1fQ.08dxF8kKLOUT-2FSNXKRwSU6SZc8ftXKv6wBobq2zSI'
const AdminContext = createContext();
const url = 'https://xjob-mindx-production.up.railway.app/api'

const AdminProvider = ({children}) =>{
    const [usersData,setUsersData] = useState([])
    const [recruimentData,setRecruimentData]= useState([])
    const [fielData,setFielData] = useState([])

    const getAllUser = async ()=>{
        const getUsers = await fetch ('https://xjob-mindx-production.up.railway.app/api/admin/users',{
            method : "GET",
            headers:{
                "authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            setUsersData(data)
            localStorage.setItem('allUsers',JSON.stringify(data))
            return data
        })
        return getUsers
    }
    const getAllRecruiment = async()=>{
        const getRecruiments = await fetch ('https://xjob-mindx-production.up.railway.app/api/admin/recruiments',{
            method : "GET",
            headers:{
                "authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            setRecruimentData(data.recruiment)
            localStorage.setItem('allRecruiment',JSON.stringify(data.recruiment))
            return data.recruiment
        })
        return getRecruiments
    }
    const updateStatusUser = async(status,id)=>{
            const statusJson = {
                "status" : status
            }
            console.log(statusJson,id);
            const updateStatus = await fetch (`${url}/admin/users/${id}`,{
                method : "PUT",
                body: JSON.stringify(statusJson),
                headers :{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "authorization" : `Bearer ${token}`
                }
            }).then((res)=>{
                return res.json()
            }).then((result)=>{
                return result
            })
        return updateStatus
    }
    const getAllFields = async()=>{
        
        const allFields = await fetch(`${url}/admin/category`,{
            method : "GET",
            headers :{
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            setFielData(data)
            return data
        })
        return allFields
    }
    const autoGetAllUsers = ()=>{
        const allUsers = adminApi.autoLogin()
        if(!allUsers){
            return
        }
        return allUsers
    }
    const autoGetAllRecruiment = ()=>{
        const allRecruiment = adminApi.autoGetRecruiment()
        if(!allRecruiment){
            return
        }
        return allRecruiment
    }
    useEffect(()=>{
        const allUsers = autoGetAllUsers()
        setUsersData(allUsers)
        const allRecruiment = autoGetAllRecruiment()
        setRecruimentData(allRecruiment)
    },[])
    const value = {
        getAllUser,
        usersData,
        getAllRecruiment,
        recruimentData,
        updateStatusUser,
        getAllFields,
        fielData
    }
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
} 

export {AdminContext,AdminProvider}
