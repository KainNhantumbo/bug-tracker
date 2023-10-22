import { Link } from 'react-router-dom';
import {
  FaJava,
  FaJs,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRust,
  FaSwift
} from 'react-icons/fa';
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

          <div className='anchors-container'>
            {!state.auth.token ? (
              <>
                <Link to={'/tab/login'}>
                  <span>Login</span>
                </Link>

                <Link to={'/tab/create-account'}>
                  <span>Sign up</span>
                </Link>
              </>
            ) : (
              <Link to={'/tab/create-account'}>
                <span>Go to Workspace</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      <article>
        <section className='ecosystem-container'>
          <div className='comment-container'>
            <h3>
              <span>- Eric Doe, Developer</span>
            </h3>
            <p>
              The detailed error analysis feature really helps us to find out
              thee cause of the error and find it.
            </p>
          </div>
          <div className='languages'>
            <FaPhp /> <FaJava /> <FaRust /> <FaNodeJs />
            <FaReact /> <FaJs /> <FaPython /> <FaSwift />
          </div>
        </section>
        <section className='features-container'>
          <ul>
            <li>Error Report</li>
            <li>Integation with other tools</li>
            <li>Debbuging Tools</li>
            <li>Error Analysis</li>
            <li>Simple and ease to use</li>
          </ul>
          <p>
            We can be integraated with other tools such as email or slack, so
            you can receive errror notification on the platform you prefer. We
            highly recommend exploring our features to get the most out of our
            software
          </p>
        </section>
        <section className='why-container'>
          <div className='top-container'>
            <h2>why you should choose us?</h2>

            <p>
              Security and trust are our top priority in providing error
              monitoring software. We understand you need to store sensitive
              data and we make sure that your data is safe and protected.
            </p>
          </div>
          <div className='base-container'>
            <div>
              <h3>360M+</h3>
              <p>Active users</p>
            </div>
            <div>
              <h3>930M+</h3>
              <p>Error reports</p>
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
              <div>Fast</div>
              <p>
                Our error collection feature allows you to quickly gather
                information on chashes that occur in your application. Our error
                analysis tool allows you to find out what causes an error and
                how to quickly solve it.
              </p>
            </div>
          </div>
          <h2>
            {' '}
            - You can access error information collected by our system directly
            from the workspace.
          </h2>
        </section>

        <section className='call-container'>
          <p>Dont't let your app crashes become a big problem</p>
          <div>
            <h3> - Find and organize errors in your code more effectively</h3>
            <Link to={state.auth.token ? '/tab/workspace' : '/tab/login'}>
              <span>Try for free</span>
            </Link>
          </div>
        </section>
      </article>
    </Container>
  );
}
