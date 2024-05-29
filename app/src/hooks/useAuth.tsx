import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
/**
 * Hook to use the AuthContext
 * @returns AuthContext
 */
const useAuth = () => useContext(AuthContext);

export default useAuth;