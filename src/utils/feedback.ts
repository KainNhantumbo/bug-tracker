import * as React from 'react';

type state = React.Dispatch<React.SetStateAction<string>>;

const feedBack = (fn: state, message: string, delay: number): void => {
  fn(message);
  setTimeout(() => {
    fn('');
  }, delay);
};

export default feedBack;
