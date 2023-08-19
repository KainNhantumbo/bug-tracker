import type { FC } from 'react';
import ThemeContext from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import AppContext from './context/AppContext';

const App: FC = (): JSX.Element => (
  <AppContext>
    <ThemeContext>
      <AppRoutes />
    </ThemeContext>
  </AppContext>
);

export default App;
