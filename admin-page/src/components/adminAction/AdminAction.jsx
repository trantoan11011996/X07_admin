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
export const updateCategory = (name)=>{
   const category = {"name"  : name}
   return category
}
export const autoLogout = ()=>{
   localStorage.clear()
}
 const adminAction = {
    autoLogin : autoLogin,
    autoGetRecruiment:autoGetRecruiment,
    autoGetFields : autoGetFields,
    createCategory : createCategory,
    autoLogout: autoLogout,
    updateCategory : updateCategory
 }

 export default adminAction