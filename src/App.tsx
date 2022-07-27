import GlobalStylesheet from './styles/global';
import ThemeContext from './context/ThemeContext';

function App() {
	return (
		<ThemeContext>
			<GlobalStylesheet />
		</ThemeContext>
	);
}

export default App;
