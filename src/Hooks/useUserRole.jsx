// src/Hooks/useUserRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  
  const {
    data: role = null,
    isLoading: queryLoading,
    isError,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const emailParam = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${emailParam}`);
      return res.data.role;
    },
    enabled: !authLoading && Boolean(user?.email),
    staleTime: 5 * 60 * 1000, // keep role cached for 5 minutes
    retry: 2, // don't hammer the API if it's down/blocked — fail after 2 tries
    retryDelay: (attempt) => Math.min(2000 * 2 ** attempt, 15000), // backoff, capped
    refetchOnWindowFocus: false, // don't refire every time the tab regains focus
    refetchOnReconnect: false,   // don't refire on every network blip
  });

  return {
    role,
    roleLoading: authLoading || queryLoading,
    hasError: isError,
  };
}