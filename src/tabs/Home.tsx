import {
  RiArrowRightLine,
  RiDoubleQuotesR,
  RiMoreFill,
  RiUser6Line
} from 'react-icons/ri';
import {
  DiDotnet,
  DiGo,
  DiHaskell,
  DiJavascript1,
  DiNodejsSmall,
  DiPython,
  DiRubyRough,
  DiScala,
  DiSwift
} from 'react-icons/di';
import { Link } from 'react-router-dom';
import { FaJava, FaPhp, FaRust } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/home';

export default function Home(): JSX.Element {
  const { state } = useAppContext();
  return (
    <Container>
      <header>
        <h1>Bug Tracking Made Easy</h1>

        <div className='intro-container'>
          <p>
            Detailed crash reports to help you track problem progress an improve
            the quality of your projects.
          </p>

          {!state.auth.token ? (
            <Link to={'/tab/login'}>
              <RiArrowRightLine />
              <span>Try it for free</span>
            </Link>
          ) : (
            <Link to={'/tab/create-account'}>
              <span>Go to Workspace</span>
            </Link>
          )}
        </div>

        <RiMoreFill className='dots-icon' />

        <img
          src='/assets/code.png'
          alt='code example image'
          loading='lazy'
          decoding='async'
        />
      </header>
      <article>
        <section className='ecosystem-container'>
          <div className='comment-container'>
            <RiUser6Line />
            <div>
              <h3>
                <span>- Eric Doe, Developer</span>
              </h3>
              <p>
                The detailed error analysis feature really helps us to find out
                thee cause of the error and find it.
              </p>
            </div>
          </div>
          <div className='languages-container'>
            <div className='separator'>
              <DiDotnet /> <DiHaskell /> <FaPhp /> <FaJava /> <FaRust />
              <DiNodejsSmall />
            </div>
            <div className='separator'>
              <DiGo /> <DiScala />
              <DiRubyRough /> <DiJavascript1 /> <DiPython /> <DiSwift />
            </div>
          </div>
        </section>
        <section className='features-container'>
          <h2>
            <i>Our</i> Features
          </h2>

          <div>
            <ul>
              <li>Error Report</li>
              <li>Integation with other tools</li>
              <li>
                <i>Simple and ease to use</i>
              </li>
              <li>Debbuging Tools</li>
              <li>Error Analysis</li>
            </ul>
            <p>
              - We can be integraated with other tools such as <i>e-mail</i> or{' '}
              <i>slack</i>, so you can receive errror notification on the
              platform you prefer. We highly recommend exploring our features to
              get the most out of our software
            </p>
          </div>
        </section>
        <section className='why-container'>
          <h2>
            <i>Why</i> you should choose us?
          </h2>
          <p>
            Security and trust are our top priority in providing error
            monitoring software. We understand you need to store sensitive data
            and we make sure that your data is safe and protected.
          </p>
          <div className='base-container'>
            <div>
              <h3>360M+</h3>
              <p>Active users</p>
            </div>
            <div>
              <h3>930M+</h3>
              <p>Total Error reports</p>
            </div>
            <div>
              <h3>120M+</h3>
              <p>Error reports Daily</p>
            </div>
          </div>
        </section>
        <section className='explanation-container'>
          <div className='cards-container'>
            <div className='card'>
              <RiDoubleQuotesR />
              <h3>Trusted</h3>
              <p>
                We also follow the relevant industry and regulatory standards
                such to ensure that we meet the security requirements expected
                of companies. Additionaly, we have a dedicated security team
                that constantly monitors our systems and performs security
                audits to ensure that your data is safe.
              </p>
            </div>
            <div className='card'>
              <RiDoubleQuotesR />
              <h3>Fast</h3>
              <p>
                Our error collection feature allows you to quickly gather
                information on chashes that occur in your application. Our error
                analysis tool allows you to find out what causes an error and
                how to quickly solve it.
              </p>
            </div>
          </div>
          <h2>
            - You can access error information collected by our system directly
            from the workspace.
          </h2>
        </section>

        <section className='call-container'>
          <p>
            <em>Dont't let your app crashes become a big problem!</em>
          </p>
          <div>
            <h3> - Find and organize errors in your code more effectively</h3>
            <Link to={state.auth.token ? '/tab/workspace' : '/tab/login'}>
              <RiArrowRightLine />
              <span>Try for free</span>
            </Link>
          </div>
        </section>
      </article>
    </Container>
  );
}
