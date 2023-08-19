import {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  FC,
} from 'react';
import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import actions from '../reducers/actions';
import { apiClient } from '../api/axios';
import { TAction, TState } from '../../@types';
import { reducer, initialState } from '../reducers/reducer';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ThemeContext from './ThemeContext';

interface Props {
  children: ReactNode;
}
export interface IUser {
  token: string;
  username: string;
}

interface ContextProps {
  state: TState;
  dispatch: Dispatch<TAction>;

  authenticateUser: () => Promise<void>;
  fetchAPI: (config: AxiosRequestConfig) => AxiosPromise<any>;
}

const context = createContext<ContextProps>({
  authenticateUser: async (): Promise<void> => {},
  fetchAPI: (): any => {},
  state: initialState,
  dispatch: () => {},
});

const AppContext: FC<Props> = (props): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateAuth = async (): Promise<void> => {
    try {
      const { data } = await apiClient({
        method: 'get',
        url: '/auth/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: {
            ...state.auth,
            token: data?.accessToken,
            username: data?.username,
          },
        },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  const fetchAPI = async (
    config: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    apiClient.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error?.response?.status);
        if (status > 400 && status < 404) {
          validateAuth().catch((error) => {
            console.error(error?.response?.data?.message ?? error);
            navigate('/tab/login');
          });
        }
        return Promise.reject(error);
      }
    );

    return await apiClient({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` },
    });
  };

  const authenticateUser = async (): Promise<void> => {
    try {
      const { data } = await apiClient({
        method: 'get',
        url: '/auth/refresh',
        withCredentials: true,
      });

      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: {
            ...state.auth,
            token: data?.accessToken,
            username: data?.username,
          },
        },
      });
      navigate('/');
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  useEffect((): void => {
    authenticateUser();
  }, []);

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      validateAuth();
    }, 1000 * 60 * 10);
    return (): void => clearTimeout(debounceTimer);
  }, [state.auth]);

  return (
    <context.Provider
      value={{
        authenticateUser,
        fetchAPI,
        state,
        dispatch,
      }}>
      <ThemeContext>{props.children}</ThemeContext>
    </context.Provider>
  );
};

export default AppContext;

export const useAppContext = (): ContextProps => useContext(context);
