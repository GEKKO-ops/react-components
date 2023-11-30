import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent/MainComponent';
import UncontrolledForm from './components/UncontolledForm/UncontrolledForm';
// import Form2 from './Form2';

const App = () => (
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
);

export default App;
