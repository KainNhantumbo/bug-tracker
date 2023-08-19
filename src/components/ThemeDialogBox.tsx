import type { FC } from 'react';
import { themeOptions } from '../data/app-data';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';
import { BiPalette, FiX, HiColorSwatch } from 'react-icons/all';
import { _themeSelector as Container } from '../styles/components/theme-dialog-box';
import { useAppContext } from '../context/AppContext';
import actions from '../reducers/actions';

const ThemeDialogBox: FC = (): JSX.Element => {
  const { themeSwitcher } = useThemeContext();
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isThemeModalActive && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.THEME_SWITCHER_MODAL,
                payload: { ...state, isThemeModalActive: false },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <section className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <HiColorSwatch />
                  <span>Choose Theme</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={() =>
                    dispatch({
                      type: actions.THEME_SWITCHER_MODAL,
                      payload: { ...state, isThemeModalActive: false },
                    })
                  }>
                  <FiX />
                </button>
              </div>
              <section className='prompt-info'>
                {themeOptions.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.8 }}
                    key={option.name}
                    onClick={() => {
                      dispatch({
                        type: actions.THEME_SWITCHER_MODAL,
                        payload: { ...state, isThemeModalActive: false },
                      });
                      themeSwitcher(option.code);
                    }}>
                    <BiPalette />
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

export default ThemeDialogBox;
