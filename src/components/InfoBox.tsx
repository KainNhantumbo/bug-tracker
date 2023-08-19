import type { FC } from 'react';
import actions from '../reducers/actions';
import { useAppContext } from '../context/AppContext';
import { _infoBox as Container } from '../styles/components/info-box';

const InfoBox: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <>
      {state.infoboxData.active && (
        <Container>
          <section className='content'>
            <div className='icon'>
              <state.infoboxData.icon />
            </div>
            <div className='message'>
              <span>{state.infoboxData.message}</span>
              {state.infoboxData.err && <h3>{state.infoboxData.err}</h3>}
            </div>
            {state.infoboxData.buttonText && (
              <button
                onClick={() => {
                  state.infoboxData.actionFn
                    ? state.infoboxData.actionFn()
                    : undefined;
                  dispatch({
                    type: actions.INFO_BOX_DATA,
                    payload: {
                      ...state,
                      infoboxData: { ...state.infoboxData, active: false },
                    },
                  });
                }}>
                <span>{state.infoboxData.buttonText}</span>
              </button>
            )}
          </section>
        </Container>
      )}
    </>
  );
};

export default InfoBox;
