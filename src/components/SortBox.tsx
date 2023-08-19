import type { FC } from 'react';
import actions from '../reducers/actions';
import { sortOptions } from '../data/app-data';
import { useAppContext } from '../context/AppContext';
import { m as motion, AnimatePresence } from 'framer-motion';
import { BiSortAlt2, FiX, HiSelector } from 'react-icons/all';
import { _sortBox as Container } from '../styles/components/sort-box';

const SortBox: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isSortActive && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.SORT_BOX_CONTROL,
                payload: { ...state, isSortActive: false },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: -290 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: -290, transition: { duration: 0.3 } }}>
            <section className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <BiSortAlt2 />
                  <span>Sort by</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={() =>
                    dispatch({
                      type: actions.SORT_BOX_CONTROL,
                      payload: { ...state, isSortActive: false },
                    })
                  }>
                  <FiX />
                </button>
              </div>
              <section className='prompt-info'>
                {sortOptions.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.8 }}
                    key={option.code}
                    onClick={() => {
                      dispatch({
                        type: actions.SORT_BOX_CONTROL,
                        payload: { ...state, isSortActive: false },
                      });
                      dispatch({
                        type: actions.QUERY_BUGS,
                        payload: {
                          ...state,
                          queryBugs: { ...state.queryBugs, sort: option.code },
                        },
                      });
                    }}>
                    <HiSelector />
                    <span>{option.name}</span>
                  </motion.div>
                ))}
              </section>
            </section>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default SortBox;
