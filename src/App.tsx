import ThemeContext from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
	return (
		<ThemeContext>
			<AppRoutes />
		</ThemeContext>
	);
}

export default App;
