import { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ErrorButton from './components/error-button/ErrorButton';
import ErrorBoundary from './components/error-boundary/ErrorBoundry';
import { MainPage } from './pages/MainPage';
import { AppProvider } from './stores/SearchContext';
import './app.css';

const App: FC = () => {
  return (
    <AppProvider>
      <div className="wrap">
        <h1 className="main-title"> Rick and Morty API</h1>
        <ErrorBoundary>
          <ErrorButton />
          <Router>
            <Routes>
              <Route
                path="search/page/:page/*"
                element={<MainPage />}
              />
              <Route
                path="*"
                element={<Navigate to="search/page/1" />}
              ></Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </AppProvider>
  );
};

export default App;
