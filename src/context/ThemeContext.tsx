import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import {
  dark_default,
  dark_drackula,
  dark_rumble,
  light_default
} from '../styles/themes';
import GlobalStylesheet from '../styles/global';
import { ThemeProvider } from 'styled-components';

type ThemeType = { theme: string };
type Props = { children: ReactNode };

interface IContextProps {
  themeSwitcher: (theme: string) => void;
  controlModal: () => void;
  isModalActive: boolean;
}

export const context = createContext<IContextProps>({
  themeSwitcher: (theme: string) => {},
  isModalActive: false,
  controlModal: () => {},
});

function ThemeContext(props: Props) {
  const [currentTheme, setCurrentTheme] = useState(light_default);
  const [isModalActive, setIsModalActive] = useState(false);
  const THEME_STORAGE_KEY = 'ThemeSettings';

  // quit the them options modal
  const controlModal = (): void => setIsModalActive((prevstate) => !prevstate);

  const loadTheme = (themeCode?: string): void => {
    const { theme }: ThemeType = JSON.parse(
      localStorage.getItem(THEME_STORAGE_KEY) || `{"theme":"light-default"}`
    );

    switch (themeCode ? themeCode : theme) {
      case 'light-default':
        setCurrentTheme(light_default);
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify({ theme: 'light-default' })
        );
        break;
      case 'dark-default':
        setCurrentTheme(dark_default);
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify({ theme: 'dark-default' })
        );
        break;
      case 'dark-rumble':
        setCurrentTheme(dark_rumble);
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify({ theme: 'dark-rumble' })
        );
        break;
      case 'dark-drackula':
        setCurrentTheme(dark_drackula);
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify({ theme: 'dark-drackula' })
        );
        break;
      default:
        setCurrentTheme(light_default);
    }
  };

  // swithches the current theme
  const themeSwitcher = (theme: string): void => loadTheme(theme);

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStylesheet />
      <context.Provider
        value={{
          themeSwitcher,
          isModalActive,
          controlModal,
        }}
      >
        {props.children}
      </context.Provider>
    </ThemeProvider>
  );
}

export default ThemeContext;

export function useThemeContext(): IContextProps {
  const data = useContext(context);
  return data;
}
