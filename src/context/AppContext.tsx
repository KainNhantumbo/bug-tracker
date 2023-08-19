import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';
import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { TAction, TState } from '../../@types';
import { reducer, initialState } from '../reducers/reducer';
import actions from '../reducers/actions';

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

export default function AppContext(props: Props) {
  const navigate: NavigateFunction = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Makes connection to the server api
  function fetchAPI(config: AxiosRequestConfig): AxiosPromise<any> {
    apiClient.interceptors.response.use(undefined, function (err: AxiosError) {
      if (err.response?.status === 401) {
        navigate('/tab/login');
      }
      return Promise.reject(err);
    });

    return apiClient({
      ...config,
      withCredentials: true,
      headers: { authorization: `Bearer ${state.auth.token}` },
    });
  }

  async function authenticateUser(): Promise<void> {
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/tab/login');
      }
      console.error(err);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    const revalidateAuth = setTimeout(() => {
      (async (): Promise<void> => {
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
        } catch (err: any | unknown) {
          if (err.response?.status === 401) {
            navigate('/tab/login');
          }
          console.error(err);
        }
      })();
    }, 1000 * 60 * 10);

    return () => clearTimeout(revalidateAuth);
  }, [state.auth]);

  return (
    <context.Provider
      value={{
        authenticateUser,
        fetchAPI,
        state,
        dispatch,
      }}>
      {props.children}
    </context.Provider>
  );
}

export function useAppContext(): ContextProps {
  var data = useContext(context);
  return data;
}
