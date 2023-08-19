import { InfoBoxContainer as Container } from '../styles/components/info-box';
import { useInfoBoxContext } from '../context/InfoBoxContext';

export default function InfoBox(): JSX.Element {
  const { info, setInfo } = useInfoBoxContext();
  return (
    <>
      {info.active && (
        <Container>
          <section className='content'>
            <div className='icon'>{info.icon}</div>
            <div className='message'>
              <span>{info.message}</span>
              {info.err && <h3>{info.err}</h3>}
            </div>
            {info.buttonText && (
              <button
                onClick={() => {
                  info.actionFn ? info.actionFn() : undefined;
                  setInfo((prevState: any) => ({
                    ...prevState,
                    active: false,
                  }));
                }}
              >
                <span>{info.buttonText}</span>
              </button>
            )}
          </section>
        </Container>
      )}
    </>
  );
}
