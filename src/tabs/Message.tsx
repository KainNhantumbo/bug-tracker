import { FaBug } from 'react-icons/fa';
import { _message as Container } from '../styles/message';
import { useState, useEffect, FC } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { HiArrowCircleRight } from 'react-icons/hi';

interface PageProps {
  message: string;
  title: string;
  code?: string;
  btnText: string;
  url: string;
}

const Message: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { msg, id } = useParams<{ msg: 'account' | 'recover'; id: string }>();
  const [data, setData] = useState<PageProps>({
    title: '',
    message: '',
    btnText: '',
    url: '',
  });

  const loadPage = (type: 'account' | 'recover'): void => {
    if (type === 'account')
      return setData({
        title: 'Congratulations! Account created successfuly.',
        message: `Please keep the following code a in a safe place, it will be used to recover your account in case if you forget your password.`,
        btnText: 'Proceed to login page',
        code: id,
        url: '/tab/login',
      });

    if (type === 'recover')
      return setData({
        title: 'Password updated successfuly.',
        message: `Please keep your recovery key in a safe place, it will still be used to recover your account in case you forget your password again.`,
        btnText: 'Proceed to login page',
        url: '/tab/login',
      });
  };

  useEffect((): void => {
    if (msg) loadPage(msg);
  }, []);

  return (
    <Container>
      <header className='upper-container'>
        <h1>
          <FaBug />
          <span>Bug Tracker</span>
        </h1>
        <h5>Start shooting on bugs before they know what hit them!</h5>
      </header>
      <main>
        <article>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
          {data.code && (
            <h3>
              Recovery account key:&nbsp;&nbsp;&nbsp; <i>{data.code}</i>
            </h3>
          )}
          <button onClick={() => navigate(data.url)}>
            <HiArrowCircleRight />
            <span>{data.btnText}</span>
          </button>
        </article>
      </main>
    </Container>
  );
};

export default Message;
