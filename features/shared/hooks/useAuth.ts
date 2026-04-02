import * as SecureStore from 'expo-secure-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const AUTH_KEY = 'auth_token';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Read auth state from SecureStore
  const { data: isAuthenticated = false, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync(AUTH_KEY);
      return token === 'true';
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Login function
  const login = async () => {
    await SecureStore.setItemAsync(AUTH_KEY, 'true');
    queryClient.setQueryData(['auth'], true);
  };

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    queryClient.setQueryData(['auth'], false);
  };

  return { isAuthenticated, isLoading, login, logout };
};
