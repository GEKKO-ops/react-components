import { FC, useEffect } from 'react';
import { fetchCharacter } from '../../service/apiService';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import { sidebarApiDataSlice } from '../../stores/reducers/SidebarApiDataSlice';
import './sideBar.css';

interface SideBarProps {
  id: string;
  isSideBarOpen: boolean;
  closeSideBar: () => void;
}

const SideBar: FC<SideBarProps> = (props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { character, isLoading } = useAppSelector(
    (state) => state.sidebarReducer
  );

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id]);

  const getCharacter = (id: string) => {
    dispatch(sidebarApiDataSlice.actions.sidebarFetchingData());

    fetchCharacter(id)
      .then((data) => {
        dispatch(sidebarApiDataSlice.actions.sidebarFetchingSuccess(data));
      })
      .catch((error) => {
        dispatch(
          sidebarApiDataSlice.actions.sidebarFetchingError(error.message)
        );
      });
  };

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
          {character && (
            <div
              className="sidebar-content"
              data-testid="sidebar-test-id"
            >
              <p className="item-title">{character.name}</p>
              <div className="item-description">
                <p>{`gender: ${character.gender}`}</p>
                <p>{`species: ${character.species}`}</p>
                <p>{`status: ${character.status}`}</p>
              </div>
              <img
                src={character.image}
                alt={`${character.name}-image`}
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
