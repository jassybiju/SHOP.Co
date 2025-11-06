import { adminAxiosInstance } from "@/lib/axios"

export const getAllUsers = async (data) => {
    console.log(data.queryKey[1])
    const res = await adminAxiosInstance.get("user-management/users", {
         params:data.queryKey[1]
    });
    return res.data;
};

export const getUserById = async (data) => {
    // ! TODO
    console.log(data)
    const res = await adminAxiosInstance.get('user-management/users/'+data.queryKey[1])
    return res.data
}

export const toggleUserActiveStatusById = async (id) =>{
    console.log(id)
    const res = await adminAxiosInstance.patch('user-management/users/toogle-state/'+id)
    return res.data
}