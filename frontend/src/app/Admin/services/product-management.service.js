import { adminAxiosInstance } from "@/lib/axios"

export const addProduct = async (formData) => {
    const res = await adminAxiosInstance.post("product/", formData);
    return res.data;
};

export const getAllProducts = async (data) => {
    const res = await adminAxiosInstance.get("product/", {
        params: data.queryKey[1],
    });
    return res.data;
};

export const getProduct = async (id) => {
    const res = await adminAxiosInstance.get("product/" + id);
    return res.data;
};

export const editProduct = async ({id, formData}) => {
  console.log(id, formData, 980)
  const res = await adminAxiosInstance.put('product/'+id , formData)
  return res.data
}

export const toggleProductActive = async(id)=>{
      const res = await adminAxiosInstance.patch("product/toggle-status/" + id);
    return res.data;
}