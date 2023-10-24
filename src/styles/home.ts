import styled from 'styled-components';
import { BaseButton } from './defaults';

export const _home = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background: rgb(${({ theme }) => theme.background});
  z-index: -10000;

  header {
    width: 100%;
    padding: 20px;
    position: relative;
    background: rgb(${({ theme }) => theme.foreground});
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    padding-bottom: 80px;

    ::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 1px;
      top: 100px;
      left: calc(50% - 220px);
      border-radius: 50%;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 100px 50px rgba(${({ theme }) => theme.secondary}, 0.8);
    }

    h1 {
      font-weight: 600;
      font-size: 3.8rem;
      line-height: 4.8rem;
      text-align: center;
      align-self: center;
      background: linear-gradient(
        45deg,
        rgba(${({ theme }) => theme.font}, 0.8) 20%,
        rgba(${({ theme }) => theme.primary}, 0.8) 40%,
        rgba(${({ theme }) => theme.secondary}, 0.8) 300%
      );
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      background-size: 200%;
      
      @media (max-width: 420px) {
        font-size: 3rem;
      }
    }

    .intro-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      p {
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.8rem;
        text-align: center;
        width: 100%;
        max-width: 700px;
      }

      a {
        ${BaseButton}
        font-size: 1.2rem;
        background: rgb(${({ theme }) => theme.primary});
        color: #fff;
        border-radius: 20px;
        padding: 12px 25px;
      }
    }

    .dots-icon {
      align-self: center;
      width: 25px;
      height: 25px;
    }

    img {
      width: 100%;
      margin: 0 auto;
      max-width: 900px;
      max-height: 300px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    }
  }

  article {
    width: 100%;
    align-items: center;
    gap: 40px;
    padding: 20px;

    .ecosystem-container {
      width: 100%;
      max-width: 900px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: 12px;
      margin: 0 auto;

      .comment-container {
        position: relative;
        top: -80px;
        width: 100%;
        max-width: 420px;
        display: flex;
        gap: 12px;
        padding: 20px;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
        backdrop-filter: blur(10px);
        background: rgba(${({ theme }) => theme.foreground}, 0.8);
        box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
        margin: 0 auto;

        ::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 1px;
          left: 50px;
          bottom: calc(50% - 10px);
          border-radius: 50%;
          z-index: -999;
          transform: rotate(180);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 70px 30px rgba(${({ theme }) => theme.primary}, 0.8);
        }

        svg {
          width: 120px !important;
          height: 90px !important;
          color: rgb(${({ theme }) => theme.primary});
        }

        h3 {
          font-size: 1.1rem;
          font-weight: 500;
          line-height: 1.8rem;
        }

        p {
          line-height: 1.4rem;
          font-size: 0.95rem;
        }
      }

      .languages-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: relative;
        top: -80px;

        .separator {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 12px;

          svg {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    .features-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;

      h2 {
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.6rem;

        i {
          color: rgb(${({ theme }) => theme.primary});
          text-decoration: underline;
          text-underline-offset: 5px;
        }
      }

      div {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        gap: 12px;
        justify-content: space-evenly;

        ul {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: inside;

          li {
            font-size: 1.2rem;
            line-height: 1.6rem;
            border-bottom: 2px dashed rgb(${({ theme }) => theme.font});
            padding-bottom: 12px;

            i {
              color: rgb(${({ theme }) => theme.primary});
            }
          }
        }

        p {
          font-weight: 500;
          font-size: 1.2rem;
          line-height: 1.8rem;
          width: 100%;
          max-width: 320px;

          i {
            color: rgb(${({ theme }) => theme.primary});
          }
        }

        @media screen and (max-width: 650px) {
          p {
            max-width: 100%;
          }
        }
      }
    }

    .why-container {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
      padding-top: 60px;

      h2 {
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.6rem;

        i {
          color: rgb(${({ theme }) => theme.primary});
          text-decoration: underline;
          text-underline-offset: 5px;
        }
      }

      h3 {
      }

      p {
        font-size: 1.1rem;
        line-height: 1.8rem;
      }

      .base-container {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        align-items: center;
        gap: 20px;
        justify-self: flex-end;
        align-self: flex-end;

        div {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgb(${({ theme }) => theme.foreground});
          border-radius: 12px;
          padding: 8px 30px;
          align-items: center;

          h3 {
            line-height: 2.6rem;
            font-size: 2rem;
            font-weight: 600;
            color: rgb(${({ theme }) => theme.primary});
          }

          p {
            text-transform: capitalize;
          }
        }
      }
    }

    .explanation-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
      padding-top: 60px;

      h2 {
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.6rem;
        text-align: center;
        color: rgb(${({ theme }) => theme.alternative_b});
        margin: 20px 0;

        @media (max-width: 420px) {
          font-size: 1.3rem;
          line-height: 1.8rem;
        }
      }

      .cards-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 12px;

        @media screen and (max-width: 540px) {
          flex-direction: column;
        }

        .card {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
          position: relative;
          margin: 0 auto;

          svg {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 22px;
            height: 22px;
            color: rgb(${({ theme }) => theme.alternative_b});
          }

          h3 {
            font-size: 2rem;
            font-weight: 500;
            line-height: 2.6rem;
            color: rgb(${({ theme }) => theme.alternative_b});
          }

          p {
            font-size: 1rem;
            line-height: 1.6rem;
          }
        }
      }
    }

    .call-container {
      width: 100%;
      height: auto;
      max-width: 900px;
      margin: 0 auto;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: rgb(${({ theme }) => theme.foreground});
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
      justify-content: space-evenly;

      p {
        line-height: 1.6rem;
        font-size: 1.1rem;
        em {
          font-style: italic;
        }
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 20px;

        h3 {
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 2rem;
          color: rgb(${({ theme }) => theme.alternative_b});
        }

        a {
          ${BaseButton}
          font-size: 1.2rem;
          background: rgb(${({ theme }) => theme.primary});
          color: #fff;
          border-radius: 20px;
          padding: 12px 25px;
        }
      }
    }
  }
`;
