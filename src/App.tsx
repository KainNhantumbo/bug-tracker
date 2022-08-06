import ThemeContext from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import InfoBoxContext from './context/InfoBoxContext';

function App() {
	return (
		<ThemeContext>
			<InfoBoxContext>
				<AppRoutes />
			</InfoBoxContext>
		</ThemeContext>
	);
}

export default App;
