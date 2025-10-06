// hooks/useFetchUserRole.js
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/store';
import { axiosInstance } from '../app/Auth/services/api/axiosInstance';

const useFetchUserRole=()=> {
  const setUser = useStore(state => state.setUser);

  return useQuery(
    ['auth', 'me'],
    async () => {
      const { data } = await axiosInstance.get('auth/me', { withCredentials: true });
      return data.data; // user object with role
    },
    {
      onSuccess: (user) => setUser(user),
      refetchOnWindowFocus: true,
      refetchInterval: false, // no auto polling
    }
  );
}

export default useFetchUserRole
