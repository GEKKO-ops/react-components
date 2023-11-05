import { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ErrorButton from './components/error-button/ErrorButton';
import ErrorBoundary from './components/error-boundary/ErrorBoundry';
import './app.css';
import { MainPage } from './pages/MainPage';

const App: FC = () => {
  return (
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
          </Routes>
          <Route
            path="*"
            element={<Navigate to="search/page/1" />}
          ></Route>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
