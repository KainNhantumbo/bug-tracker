import { ActionTypes } from './actions';

export type State = {
	isSearchActive: boolean;
	isSortActive: boolean;
	isFilterActive: boolean;
	isPromptActive: boolean;
	isLoading: boolean;
	searchValue: string;
	bugsData: {
		_id: string;
		title: string;
		priority: string;
		author: string;
		status: string;
		createdAt: string;
	}[];
	selectedBugID: string;
};

export type Actions = { type: string; payload?: State };

export const initialState: State = {
	isSearchActive: false,
	isSortActive: false,
	isFilterActive: false,
	isPromptActive: false,
	isLoading: false,
	searchValue: '',
	bugsData: [],
	selectedBugID: '',
};

export const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case ActionTypes.SEARCH_BOX_CONTROL:
			return {
				...state,
				isFilterActive: false,
				isSortActive: false,
				isSearchActive: !state.isSearchActive,
			};
		case ActionTypes.SORT_BOX_CONTROL:
			return {
				...state,
				isFilterActive: false,
				isSearchActive: false,
				isSortActive: !state.isSortActive,
			};
		case ActionTypes.CLEAN_UP_MODALS:
			return {
				...state,
				isFilterActive: false,
				isSearchActive: false,
				isSortActive: false,
				isPromptActive: false,
			};
		case ActionTypes.PROMPT_BOX_CONTROL:
			return { ...state, isPromptActive: !state.isPromptActive };
		case ActionTypes.LOADING:
			return { ...state, isLoading: action.payload?.isLoading! };
		case ActionTypes.SET_BUGS_DATA:
			return {
				...state,
				bugsData: action.payload?.bugsData!,
				isLoading: false,
			};
		case ActionTypes.SELECTED_BUG_ID:
			return {
				...state,
				selectedBugID: action.payload?.selectedBugID!,
			};
		default:
			return state;
	}
};
