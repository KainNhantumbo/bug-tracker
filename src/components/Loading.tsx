import { FC } from 'react';
import { _loading as Container } from '../styles/components/loading';

const Loading: FC<{ active: boolean }> = ({ active }): JSX.Element => {
  return (
    <>
      {active && (
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
