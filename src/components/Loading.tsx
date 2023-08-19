import { FC } from 'react';
import { useAppContext } from '../context/AppContext';
import { _loading as Container } from '../styles/components/loading';

const Loading: FC = (): JSX.Element => {
  const { state } = useAppContext();
  return (
    <>
      {state.isLoading && (
        <Container>
          <section className='content'>
            <div className='title'>Now Loading</div>
            <div className='sub-title'>Please wait...</div>
            <i className='loader'></i>
          </section>
        </Container>
      )}
    </>
  );
};

export default Loading;
