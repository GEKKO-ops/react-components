import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent/MainComponent';
import UncontrolledForm from './components/UncontolledForm/UncontrolledForm';
import { Provider } from 'react-redux/es/exports';
import { setupStore } from './stores/store';
// import Form2 from './Form2';
const store = setupStore();

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
        {/* <Route
        path="/React-Hook-Form"
        element={Form2}
      /> */}
      </Routes>
    </Router>
  </Provider>
);

export default App;
