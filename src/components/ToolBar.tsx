import type { FC } from 'react';
import { motion } from 'framer-motion';
import actions from '../reducers/actions';
import { useAppContext } from '../context/AppContext';
import { BiSortAlt2, HiPlus, BiSearch } from 'react-icons/all';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { _toolbar as Container } from '../styles/components/toolbar';

const ToolBar: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch } = useAppContext();

  return (
    <Container>
      <section className='left-container'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Submit bug'
          className='descripted'
          onClick={() => navigate('/tab/create-bug/:id')}>
          <HiPlus />
          <span>Create Bug</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Sort'
          className='descripted'
          onClick={() =>
            dispatch({
              type: actions.SORT_BOX_CONTROL,
              payload: { ...state, isSortActive: true },
            })
          }>
          <BiSortAlt2 />
          <span>Sort</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Search for anything'
          className='descripted'
          onClick={() =>
            dispatch({
              type: actions.SEARCH_BOX_CONTROL,
              payload: { ...state, isSearchActive: true },
            })
          }>
          <BiSearch />
          <span>Search</span>
        </motion.button>
      </section>

      <section className='right-container'>
        <div className='count'>
          <span>{state.bugs.length} items</span>
        </div>
      </section>
    </Container>
  );
};

export default ToolBar;
