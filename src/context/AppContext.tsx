import { AxiosError } from 'axios';
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  userRecouveryKey: string;
  setUserRecouveryKey: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  authenticateUser: () => Promise<void>;
}

const context = createContext<ContextProps>({
  userRecouveryKey: '',
  setUserRecouveryKey: () => {},
  authenticateUser: async (): Promise<void> => {},
  accessToken: '',
});

export default function AppContext(props: Props) {
  const [userRecouveryKey, setUserRecouveryKey] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  async function authenticateUser(): Promise<void> {
    try {
      const credentials = await apiClient({
        method: 'post',
        url: '/auth/refresh',
        withCredentials: true,
      });
      setAccessToken(credentials.data?.accessToken);
    } catch (err: any | unknown) {
      if (err.response?.status === 401) {
        navigate('/tab/login');
      }
      console.error(err);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <context.Provider
      value={{
        userRecouveryKey,
        setUserRecouveryKey,
        authenticateUser,
        accessToken,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export function useAppContext(): ContextProps {
  var data = useContext(context);
  return data;
}
