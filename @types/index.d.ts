import {} from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';

export type InputEvents =
	| ChangeEvent<HTMLInputElement>
	| ChangeEvent<HTMLSelectElement>
	| ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

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
};

export type TAction = { type: string; payload: TState };
