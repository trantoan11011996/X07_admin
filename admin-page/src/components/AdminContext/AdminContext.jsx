import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import adminApi from "../adminAction/AdminAction";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTg3MmRjNTZhZTY3MzgyNjdiYmY5ZSIsImlhdCI6MTY3MTQ2MDQ4MSwiZXhwIjoxNjcxNTQ2ODgxfQ.PJogc7ToeJn-RKyhQ5sAMTcYSQC_r79WdkBwuUqS1CU'
const AdminContext = createContext();


const AdminProvider = ({children}) =>{
    const [usersData,setUsersData] = useState([])
    const [recruimentData,setRecruimentData]= useState([])

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
        recruimentData
    }
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
} 

export {AdminContext,AdminProvider}
