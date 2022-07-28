import Header from '../components/Header';
import ThemeDialogBox from '../components/ThemeDialogBox';
import ToolBar from '../components/ToolBar';

export default function Main(): JSX.Element {
	return (
		<>
			<Header />
			<ThemeDialogBox />
			<ToolBar/>
		</>
	);
}
