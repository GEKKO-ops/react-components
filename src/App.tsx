import { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundry';
import { MainPage } from './pages/main/MainPage';
import './app.css';
import NotFoundPage from './pages/page404/NotFoundPage';
import { Provider } from 'react-redux/es/exports';
import { setupStore } from './stores/store';

const store = setupStore();

const App: FC = () => {
  return (
    <Provider store={store}>
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
                element={<NotFoundPage />}
              ></Route>
              <Route
                path="/"
                element={<Navigate to="search/page/1" />}
              ></Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </Provider>
  );
};

export default App;
