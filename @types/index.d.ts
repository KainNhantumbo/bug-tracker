import {} from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';
import { IconType } from 'react-icons';

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

/**  interface for infoBox component data */
export interface InfoProps {
  active: boolean;
  message: string;
  icon: IconType;
  buttonText?: string;
  err?: string;
  actionFn?: () => void;
}

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
  neutral: string;
  background: string;
  foreground: string;
  alternative_a: string;
  alternative_b: string;
};

export type TBug = {
  _id: string;
  title: string;
  priority: string;
  author: string;
  status: string;
  createdAt: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type TState = {
  isSearchActive: boolean;
  isSortActive: boolean;
  isFilterActive: boolean;
  isPromptActive: boolean;
  isLoading: boolean;
  searchValue: string;
  bugs: TBug[];
  selectedBugId: string;
  infoboxData: InfoProps;
  queryBugs: { query: string; sort: string };
  isEditAccountModalActive: boolean;
  auth: { token: string; username: string; recoveryKey: string };
};

export type TAction = { type: string; payload: TState };
