import { css } from 'styled-components';

export const BaseButton = css`
  border: none;
  background: none;
  border-radius: 5px;
  position: relative;
  padding: 10px;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
  width: fit-content;
  cursor: pointer;
  :hover {
    color: rgb(${({ theme }) => theme.alternative_a});
  }
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    right: 7px;
    pointer-events: none;
  }
  span {
    padding-right: 20px;
    font-weight: 500;
    pointer-events: none;
  }
`;

export const BaseButton_Danger = css`
  border: none;
  background: rgb(${({ theme }) => theme.alternative_a});
  border-radius: 5px;
  position: relative;
  padding: 10px;
  color: rgb(${({ theme }) => theme.neutral});
  width: fit-content;
  cursor: pointer;
  :hover {
    color: rgb(${({ theme }) => theme.neutral});
    background: rgb(${({ theme }) => theme.secondary});
  }
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    right: 7px;
    pointer-events: none;
  }
  span {
    padding-right: 20px;
    font-weight: 500;
    pointer-events: none;
  }
`;

export const Button_Mono_A = css`
  border: none;
  border-radius: 8px;
  background: rgba(${({ theme }) => theme.primary}, 0.7);
  color: rgb(${({ theme }) => theme.neutral});
  position: relative;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;

  :hover {
    background: rgb(${({ theme }) => theme.alternative_a});
  }
  svg {
    pointer-events: none;
    min-width: 20px;
    min-height: 20px;
  }
`;

export const Button_Mono_B = css`
  border: none;
  border-radius: 5px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
  position: relative;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;

  :hover {
    color: rgb(${({ theme }) => theme.alternative_a});
  }

  svg {
    pointer-events: none;
    min-width: 20px;
    min-height: 20px;
  }
`;

export const StyledCornerButton = css`
  border-radius: 50%;
  background: rgba(${({ theme }) => theme.primary}, 0.4);
  color: rgb(${({ theme }) => theme.primary});
  border: none;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;

  :hover {
    background: rgb(${({ theme }) => theme.secondary});
    transition: all 200ms ease;
    svg {
      color: rgb(${({ theme }) => theme.neutral});
    }
  }
  svg {
    pointer-events: none;
  }
`;

export const StyledLabels = css`
  font-weight: 500;
  display: inline;
  position: relative;
  line-height: 1.4rem;

  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 2px;
    left: 0;
    color: rgb(${({ theme }) => theme.alternative_a});
  }
  span {
    padding-left: 25px;
    font-weight: 500;
  }
`;

export const StyledInputs = css`
  input,
  textarea,
  select {
    width: 100%;
    height: fit-content;
    border: none;
    padding: 10px;
    line-height: 1.2rem;
    font-weight: 400;
    outline: none;
    border-radius: 5px;
    background: rgba(${({ theme }) => theme.primary}, 0.2);
    border: 1px solid transparent;

    :focus {
      border: 1px solid rgba(${({ theme }) => theme.accent}, 0.3);
    }
    ::placeholder {
      color: rgba(${({ theme }) => theme.font}, 0.8);
      font-size: 0.9rem;
    }
    :disabled {
      background: none;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
      ::placeholder {
        color: transparent;
      }
    }
  }
  textarea {
    resize: none;
  }
`;
