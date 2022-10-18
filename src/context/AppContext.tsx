import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';
import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

interface Props {
  children: ReactNode;
}

export interface IUser {
  token: string;
  username: string;
}

interface ContextProps {
  userRecouveryKey: string;
  setUserRecouveryKey: React.Dispatch<React.SetStateAction<string>>;
  user: IUser;
  authenticateUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  fetchAPI: (config: AxiosRequestConfig) => AxiosPromise<any>;
}

const context = createContext<ContextProps>({
  userRecouveryKey: '',
  setUserRecouveryKey: () => {},
  authenticateUser: async (): Promise<void> => {},
  setUser: () => {},
  user: { token: '', username: '' },
  fetchAPI: (): any => {},
});

export default function AppContext(props: Props) {
  const [userRecouveryKey, setUserRecouveryKey] = useState<string>('');
  const [user, setUser] = useState<IUser>({ token: '', username: '' });
  const navigate: NavigateFunction = useNavigate();

  // Makes connection to the server api
  function fetchAPI(config: AxiosRequestConfig): AxiosPromise<any> {
    apiClient.interceptors.response.use(undefined, function (err: AxiosError) {
      const { response, config } = err;
      const res: any = response;

      if (res?.data?.code === 401) {
        navigate('/tab/login');
        return Promise.reject(err);
      }

      if (res?.data?.code === 403) {
        // apiClient({
        //   method: 'get',
        //   url: '/auth/refresh',
        //   withCredentials: true,
        // })
        //   .then((credentials) => {
        //     setUser({
        //       token: credentials.data?.accessToken,
        //       username: credentials.data?.username,
        //     });
        //   })
        //   .catch((err) => {})
        //   .finally(async () => {
        //     try {
        //       apiClient({
        //         ...config,
        //         withCredentials: true,
        //         headers: { authorization: `Bearer ${user.token}` },
        //       });
        //     } catch (error) {
        //       console.error(error);
        //     }
        //   });

      }
      return Promise.reject(err);
    });

    return apiClient({
      ...config,
      withCredentials: true,
      headers: { authorization: `Bearer ${user.token}` },
    });
  }

  async function authenticateUser(): Promise<void> {
    try {
      const credentials = await apiClient({
        method: 'get',
        url: '/auth/refresh',
        withCredentials: true,
      });
      setUser({
        token: credentials.data?.accessToken,
        username: credentials.data?.username,
      });
      navigate('/');
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
        user,
        setUser,
        fetchAPI,
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
