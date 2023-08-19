import type { FC } from 'react';
import { IconType } from 'react-icons';
import actions from '../reducers/actions';
import { FaArrowLeft } from 'react-icons/fa';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { _prompt as Container } from '../styles/components/dialog-prompt-box';

interface Props {
  prompt_title: string;
  prompt_message: string;
  button_text: string;
  icon: IconType;
  action: () => Promise<void> | void;
}

const PromptDialogBox: FC<Props> = (props): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isPromptActive && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.PROMPT_BOX_CONTROL,
                payload: { ...state, isPromptActive: false },
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
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>{props.prompt_title}</span>
                <p className='prompt-message'>{props.prompt_message}</p>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.PROMPT_BOX_CONTROL,
                      payload: { ...state, isPromptActive: false },
                    })
                  }>
                  <FaArrowLeft />
                  <span>Cancel</span>
                </button>
                <button className='prompt-accept' onClick={props.action}>
                  <props.icon />
                  <span>{props.button_text}</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default PromptDialogBox;
