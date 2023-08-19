import type { FC } from 'react';
import actions from '../reducers/actions';
import { BiSearch, FiX } from 'react-icons/all';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { _searchBox as Container } from '../styles/components/search-box';

const SearchBox: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isSearchActive && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.SEARCH_BOX_CONTROL,
                payload: { ...state, isSearchActive: false },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: -290 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: -290, transition: { duration: 0.3 } }}>
            <div className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <BiSearch />
                  <span>Search</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={() =>
                    dispatch({
                      type: actions.SEARCH_BOX_CONTROL,
                      payload: { ...state, isSearchActive: false },
                    })
                  }>
                  <FiX />
                </button>
              </div>
              <div className='prompt-info'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type='search'
                    placeholder='Search...'
                    autoFocus={true}
                    value={state.queryBugs.query}
                    onChange={(e) => {
                      dispatch({
                        type: actions.QUERY_BUGS,
                        payload: {
                          ...state,
                          queryBugs: {
                            ...state.queryBugs,
                            query: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </form>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default SearchBox;
