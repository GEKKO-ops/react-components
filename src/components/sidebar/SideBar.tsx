import { FC, useEffect, useState } from 'react';
import { fetchCharacter } from '../../service/apiService';
import { IApi } from '../../utils/types/types';
import { useParams } from 'react-router-dom';
import './sideBar.css';

interface SideBarProps {
  id: string;
  isSideBarOpen: boolean;
  closeSideBar: () => void;
}

const SideBar: FC<SideBarProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState<IApi>();
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id]);

  const getCharacter = (id: string) => {
    setHasError(false);

    fetchCharacter(id)
      .then((data) => {
        setItem(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setHasError(true);
      });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (hasError) {
    return <div>Oops, nothing found!!!</div>;
  } else {
    return (
      <>
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
          {item && (
            <div className="sidebar-content">
              <p className="item-title">{item.name}</p>
              <div className="item-description">
                <p>{`gender: ${item.gender}`}</p>
                <p>{`species: ${item.species}`}</p>
                <p>{`status: ${item.status}`}</p>
              </div>
              <img
                src={item.image}
                alt={`${item.name}-image`}
              />
            </div>
          )}
        </div>
        <div
          className={`overlay${props.isSideBarOpen ? ' active' : ''}`}
          onClick={props.closeSideBar}
        ></div>
      </>
    );
  }
};

export default SideBar;
