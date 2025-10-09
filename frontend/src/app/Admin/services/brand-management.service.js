import { adminAxiosInstance } from "@/lib/axios"

export const getAllBrands = async(data) => {
    const res = await adminAxiosInstance.get('brand/', {params : data.queryKey[1]})
  return  res.data
}

export const addBrand = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('image', data.image[0])
    console.log(formData)
  const res = await adminAxiosInstance.post('brand/', formData)
  return res.data
}
export const getBrand = async (id) => {
  console.log(1234 , id)
  const res = await adminAxiosInstance.get('brand/'+id)
  console.log(res.data)
  return res.data
}

export const editBrand = async({data, id}) => {
  console.log(data , id)
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("image", typeof data.image === 'string' ? data.image : data.image[0])
  console.log(data.image)

  const res = await adminAxiosInstance.put('brand/'+id , formData)

  return res.data
}
