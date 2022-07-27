import {} from 'styled-components';
import { ThemeType } from './themeTypes';

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}
