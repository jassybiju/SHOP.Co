import { axiosInstance } from "@/lib/axios"


export const editAccountDetails = async(data) => {
   const formData = new FormData()
   console.log(data.avatar_url , 123)
   formData.append('first_name', data.first_name)
   formData.append('last_name', data.last_name)
   formData.append('phone', data.phone)
   formData.append('image', data.avatar_url[0])

   const res=  await axiosInstance.put('account/',formData)
   return res.data
}

export const changeUserEmail = async(newEmail) =>{
   const res = await axiosInstance.patch('account/change-email', {email : newEmail})
   return res.data
}

export const changePassword = async (data) =>{
   const res = await axiosInstance.patch("account/change-password", data)
   return res.data
}

export const addAddress = async (data) => {
   const res = await axiosInstance.post('account/address',data)
   return res.data
}

export const getAddresses = async() => {
   const res = await axiosInstance.get('account/address')
   return res.data
}
export const getAddress = async(data) => {
   const res = await axiosInstance.get('account/address/'+data.queryKey[1])
   return res.data
}
export const deleteAddress = async(id)=>{
   const res = await axiosInstance.delete('account/address/'+id)
   return res.data
}

export const editAddress = async ({id ,data}) => {
   console.log(id ,data)
   const res = await axiosInstance.put('account/address/'+id , data )
   return res.data

}
export const setAsPrimaryAddress = async(id) => {
   const res = await axiosInstance.patch('account/address/set-as-primary/'+id)
   return res.data
}

export const getUserCoupons = async() => {
    const res = await axiosInstance.get('account/coupons')
    return res.data
}