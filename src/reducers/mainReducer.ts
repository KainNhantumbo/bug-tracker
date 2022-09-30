import { ActionsTypes } from './actions';

interface IInitialState {
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
}

interface IState extends IInitialState {}
interface Actions {
	readonly type: string;
	payload?: IState;
}

export const initialState: IInitialState = {
	isSearchActive: false,
	isSortActive: false,
	isFilterActive: false,
	isPromptActive: false,
	isLoading: false,
	searchValue: '',
	bugsData: [],
	selectedBugID: '',
};

export const reducer = (state: IState, action: Actions) => {
	switch (action.type) {
		case ActionsTypes.LOADING:
			return { ...state, isLoading: action.payload?.isLoading };
		default:
			return state;
	}
};
