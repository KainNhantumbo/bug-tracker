import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  FC,
} from 'react';
import {
  dark_default,
  dark_drackula,
  dark_rumble,
  light_default,
} from '../styles/themes';
import GlobalStylesheet from '../styles/global';
import { ThemeProvider } from 'styled-components';

type Props = { children: ReactNode };

interface IContextProps {
  themeSwitcher: (theme: string) => void;
}

export const context = createContext<IContextProps>({
  themeSwitcher: () => {},
});

const ThemeContext: FC<Props> = (props): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState(light_default);
  const THEME_STORAGE_KEY = 'ThemeSettings';

  const loadTheme = (themeCode?: string): void => {
    const { theme } = JSON.parse(
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

  const themeSwitcher = (theme: string): void => loadTheme(theme);

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStylesheet />
      <context.Provider value={{ themeSwitcher }}>
        {props.children}
      </context.Provider>
    </ThemeProvider>
  );
};

export default ThemeContext;

export const useThemeContext = (): IContextProps => useContext(context);
