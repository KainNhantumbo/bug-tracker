import type { FC } from 'react';
import actions from '../reducers/actions';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearch, FiX } from 'react-icons/all';
import type { TAction, TState, SubmitEvent } from '../../@types';
import { _searchBox as Container } from '../styles/components/search-box';

interface Props {
  active: boolean;
  quit: () => void;
  actionFn: (e: SubmitEvent) => Promise<void>;
  reloadFn: () => Promise<void> | void;
  stateFn: React.Dispatch<TAction>;
  state: TState;
}

const SearchBox: FC<Props> = (props): JSX.Element => (
  <AnimatePresence>
    {props.active && (
      <Container
        className='main'
        onClick={(e) => {
          const target = (e as any).target.classList;
          if (target.contains('main')) {
            props.quit();
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
              <button className='quit' title='Close' onClick={props.quit}>
                <FiX />
              </button>
            </div>
            <div className='prompt-info'>
              <form onSubmit={props.actionFn}>
                <input
                  type='search'
                  name='name'
                  placeholder='Search for anything...'
                  autoFocus={true}
                  onChange={(e) => {
                    props.stateFn({
                      type: actions.SET_SEARCH_VALUE,
                      payload: {
                        ...props.state,
                        searchValue: e.target.value,
                      },
                    });
                    if (e.target.value.length < 1) {
                      props.reloadFn();
                    }
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

export default SearchBox;
