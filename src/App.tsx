import type { FC } from 'react';
import ThemeContext from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import InfoBoxContext from './context/InfoBoxContext';
import AppContext from './context/AppContext';

const App: FC = (): JSX.Element => (
  <AppContext>
    <ThemeContext>
      <InfoBoxContext>
        <AppRoutes />
      </InfoBoxContext>
    </ThemeContext>
  </AppContext>
);

export default App;
