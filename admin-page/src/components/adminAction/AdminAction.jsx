 export const autoLogin = ()=>{
    const jsonUser = localStorage.getItem("allUsers")
    return jsonUser ? JSON.parse(jsonUser) : []
 }
 export const autoGetRecruiment = ()=>{
    const jsonUser = localStorage.getItem("allRecruiment")
    return jsonUser ? JSON.parse(jsonUser) : []
 }
 const adminApi = {
    autoLogin : autoLogin,
    autoGetRecruiment:autoGetRecruiment
 }

 export default adminApi