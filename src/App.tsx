import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent/MainComponent';
import UncontrolledForm from './components/UncontolledForm/UncontrolledForm';
import { Provider } from 'react-redux/es/exports';
import { store } from './stores/store';
import ControlledForm from './components/ControlledForm/ControlledForm';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainComponent />}
        />
        <Route
          path="/uncontrolled-form"
          element={<UncontrolledForm />}
        />
        <Route
          path="/react-hook-form"
          element={<ControlledForm />}
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;
