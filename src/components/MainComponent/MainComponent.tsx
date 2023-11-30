import { Link } from 'react-router-dom';

const MainComponent = () => (
  <div>
    <h2>Main</h2>
    <Link to="/uncontrolled-form">
      Form created using uncontrolled components approach
    </Link>
    <Link to="/form2"> Form created with the help of the React Hook Form</Link>
  </div>
);

export default MainComponent;
