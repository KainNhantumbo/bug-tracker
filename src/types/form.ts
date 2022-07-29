import { ChangeEvent, FormEvent } from 'react';

export type InputEvents =
	| ChangeEvent<HTMLInputElement>
	| ChangeEvent<HTMLSelectElement>
	| ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;
