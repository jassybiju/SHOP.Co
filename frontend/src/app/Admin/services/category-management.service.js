import { adminAxiosInstance } from "@/lib/axios"

export const getCategories = async(data) => {
    const res = await adminAxiosInstance.get('category/', {params : data.queryKey[1]})
    
  return  res.data
}

export const addCategory = async (data) => {
  
  const res = await adminAxiosInstance.post('category/', data)
  return res.data
}

export const getCategory = async (id) => {
  const res = await adminAxiosInstance.get('category/'+id)
  return res.data
}

export const editCategory = async({data, id}) => {
  console.log(data , id)
  const res = await adminAxiosInstance.put('category/'+id , data)
  return res.data
}

export const toggleCategoryStatus = async(id) =>{
  const res = await adminAxiosInstance.patch('category/toggle/'+id)
  return res.data
}