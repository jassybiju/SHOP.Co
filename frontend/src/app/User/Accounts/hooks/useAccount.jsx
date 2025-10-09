import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addAddress, changePassword, changeUserEmail, deleteAddress, editAccountDetails, editAddress, getAddress, getAddresses, setAsPrimaryAddress } from "../services/accounts.service"


export const useEditAccount = () =>{
    const queryClient = useQueryClient()
  return  useMutation({
    mutationFn : editAccountDetails,
    onSuccess : () => queryClient.invalidateQueries(['users'])
  })
}

export const useChangeEmail = () => {
  return useMutation({
    mutationFn : changeUserEmail
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn : changePassword
  })
}

export const useAddAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : addAddress,
    onSuccess : () => queryClient.invalidateQueries({queryKey : ['address']})
  })
}

export const useGetAllAddress = () => {
  return useQuery({
    queryFn : getAddresses,
    queryKey : ['address', 'all']
  }) 
}

export const useGetAddress = (id) => {
  return useQuery({
    queryKey : ['address', id],
    queryFn : getAddress
  })
}

export const useDeleteAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : deleteAddress, 
        onSuccess : () => queryClient.invalidateQueries({queryKey : ['address']})

  })
}

export const useEditAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : editAddress, 
        onSuccess : () => queryClient.invalidateQueries({queryKey : ['address']})

  })
}
export const useSetAsPrimaryAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : setAsPrimaryAddress, 
        onSuccess : () => queryClient.invalidateQueries({queryKey : ['address']})

  })
}
