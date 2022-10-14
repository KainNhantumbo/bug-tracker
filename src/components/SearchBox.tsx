import { motion, AnimatePresence } from 'framer-motion';
import { SearchBoxContainer as Container } from '../styles/components/search-box';
import { BiSearch, FiX } from 'react-icons/all';
import { SubmitEvent } from '../types/form';
import type { Actions, State } from '../reducers/mainReducer';
import { ActionTypes } from '../reducers/actions';

interface Props {
  active: boolean;
  quit: () => void;
  actionFn: (e: SubmitEvent) => Promise<void>;
  reloadFn: () => Promise<void> | void;
  stateFn: React.Dispatch<Actions>;
  state: State;
}

export default function SearchBox(props: Props): JSX.Element {
  return (
    <AnimatePresence>
      {props.active && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              props.quit();
            }
          }}
        >
          <motion.section
            className='dialog-modal'
            initial={{ y: -290 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: -290, transition: { duration: 0.3 } }}
          >
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
                        type: ActionTypes.SET_SEARCH_VALUE,
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
}
