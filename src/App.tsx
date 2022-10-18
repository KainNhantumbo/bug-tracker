import ThemeContext from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import InfoBoxContext from './context/InfoBoxContext';
import AppContext from './context/AppContext';

function App() {
  return (
    <AppContext>
      <ThemeContext>
        <InfoBoxContext>
          <AppRoutes />
        </InfoBoxContext>
      </ThemeContext>
    </AppContext>
  );
}

export default App;
