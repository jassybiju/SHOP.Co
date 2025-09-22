import { adminAxiosInstance } from "./api/adminAxiosInstance";

export const getAllUsers = async (data) => {
    console.log(data.queryKey[1])
    const res = await adminAxiosInstance.get("user-management/users", {
         params:data.queryKey[1]
    });
    return res.data;
};

export const getUserById = async (data) => {
    // ! TODO
    const res = await adminAxiosInstance.get('user-management/user'+data.q)
}

export const toggleUserActiveStatusById = async (id) =>{
    console.log(id)
    const res = await adminAxiosInstance.patch('user-management/users/toogle-state/'+id)
    return res.data
}