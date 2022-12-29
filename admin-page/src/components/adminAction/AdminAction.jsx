 export const autoLogin = ()=>{
    const jsonUser = localStorage.getItem("allUsers")
    return jsonUser ? JSON.parse(jsonUser) : []
 }
 export const autoGetRecruiment = ()=>{
    const jsonRecuiment = localStorage.getItem("allRecruiment")
    return jsonRecuiment ? JSON.parse(jsonRecuiment) : []
 }
 export const autoGetFields = ()=>{
   const jsonFields = localStorage.getItem("allField")
   return jsonFields ? JSON.parse(jsonFields) : []
}
export const createCategory = (category)=>{
   const newCategory = {"name" : category}
   return newCategory
}
 const adminApi = {
    autoLogin : autoLogin,
    autoGetRecruiment:autoGetRecruiment,
    autoGetFields : autoGetFields,
    createCategory : createCategory
 }

 export default adminApi