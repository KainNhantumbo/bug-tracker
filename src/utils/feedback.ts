import { Dispatch, SetStateAction } from 'react';

type TSetStateFun = Dispatch<SetStateAction<string>>;

const feedBack = (fn: TSetStateFun, message: string, delay: number): void => {
  fn(message);
  setTimeout(() => {
    fn('');
  }, delay);
};

export default feedBack;
