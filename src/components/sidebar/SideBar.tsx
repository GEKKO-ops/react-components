import { FC } from 'react';
import { fetchData } from '../../service/apiService';
import { useParams } from 'react-router-dom';
import './sideBar.css';

interface SideBarProps {
  id: string;
  isSideBarOpen: boolean;
  closeSideBar: () => void;
}

const SideBar: FC<SideBarProps> = (props) => {
  const { id } = useParams();
  const { data, isLoading } = fetchData.useGetCharacterQuery(id!);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={`sidebar${props.isSideBarOpen ? ' open' : ''}`}
          data-testid="sidebar"
        >
          <button
            className="close-button"
            onClick={props.closeSideBar}
            data-testid="sidebar-close"
          >
            &#10006;
          </button>
          {data && (
            <div
              className="sidebar-content"
              data-testid="sidebar-test-id"
            >
              <p className="item-title">{data.name}</p>
              <div className="item-description">
                <p>{`gender: ${data.gender}`}</p>
                <p>{`species: ${data.species}`}</p>
                <p>{`status: ${data.status}`}</p>
              </div>
              <img
                src={data.image}
                alt={`${data.name}-image`}
              />
            </div>
          )}
        </div>
      )}
      <div
        className={`overlay${props.isSideBarOpen ? ' active' : ''}`}
        onClick={props.closeSideBar}
      ></div>
    </>
  );
};

export default SideBar;
