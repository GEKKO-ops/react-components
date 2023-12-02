import { Link } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks/redux';

const MainComponent = () => {
  const { storedFormData } = useAppSelector((state) => state.formDataReducer);

  return (
    <div>
      <h2>Main</h2>
      <Link to="/uncontrolled-form">
        Form created using uncontrolled components approach
      </Link>
      <Link to="/react-hook-form">
        {' '}
        Form created with the help of the React Hook Form
      </Link>
      <div>
        {storedFormData.terms.toString()}
        {storedFormData.age}
      </div>
    </div>
  );
};

export default MainComponent;
