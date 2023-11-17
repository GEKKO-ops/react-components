import { FC } from 'react';
import { fetchData } from '../../service/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
import './sideBar.css';

const SideBar: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = fetchData.useGetCharacterQuery(id!);
  const { isSideBarOpen } = useAppSelector((state) => state.viewModeReducer);
  const { setIsSideBarOpen } = viewModeSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { page } = useParams();

  const closeSideBar = () => {
    dispatch(setIsSideBarOpen(false));
    localStorage.setItem('isSideBarOpen', 'false');
    navigate(`/search/page/${page}`, { replace: true });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={`sidebar${isSideBarOpen ? ' open' : ''}`}
          data-testid="sidebar"
        >
          <button
            className="close-button"
            onClick={closeSideBar}
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
        className={`overlay${isSideBarOpen ? ' active' : ''}`}
        onClick={closeSideBar}
      ></div>
    </>
  );
};

export default SideBar;
