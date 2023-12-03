import { Link } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks/redux';

const MainComponent = () => {
  const { formDataHistory, lastSubmittedFormIndex } = useAppSelector(
    (state) => state.formDataReducer
  );

  return (
    <div className="main">
      <h2>Main</h2>
      <div className="links">
        <Link to="/uncontrolled-form">
          Form created using uncontrolled components approach
        </Link>
        <Link to="/react-hook-form">
          Form created with the help of the React Hook Form
        </Link>
      </div>
      <ul className="submit-tiles">
        {formDataHistory.map((data, index) => (
          <li
            className="tile"
            key={index}
            style={{
              width: '300px',
              borderRadius: '5px',
              padding: '5px',
              border:
                index === lastSubmittedFormIndex
                  ? '2px solid red'
                  : '1px solid #ccc',
            }}
          >
            <div>{`Name: ${data.name}`}</div>
            <div>{`Age: ${data.age}`}</div>
            <div>{`Email : ${data.email}`}</div>
            <div>{`Password : ${data.password}`}</div>
            <div>{`Gender : ${data.gender}`}</div>
            <div>{`T&C : ${data.terms}`}</div>
            <div>{`Country : ${data.country}`}</div>
            <img
              src={data.picture}
              alt="submit-pic"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainComponent;
