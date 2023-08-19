import actions from './actions';
import type { TState, TAction } from '../../@types';

export const initialState: TState = {
  isSearchActive: false,
  isSortActive: false,
  isFilterActive: false,
  isPromptActive: false,
  isLoading: false,
  searchValue: '',
  bugs: [],
  selectedBugId: '',
};

export const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case actions.SEARCH_BOX_CONTROL:
      return {
        ...state,
        isFilterActive: false,
        isSortActive: false,
        isSearchActive: action.payload.isSearchActive,
      };
    case actions.SORT_BOX_CONTROL:
      return {
        ...state,
        isFilterActive: false,
        isSearchActive: false,
        isSortActive: action.payload.isSortActive,
      };
    case actions.CLEAN_UP_MODALS:
      return {
        ...state,
        isFilterActive: false,
        isSearchActive: false,
        isSortActive: false,
        isPromptActive: false,
      };
    case actions.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload?.searchValue!,
      };
    case actions.PROMPT_BOX_CONTROL:
      return { ...state, isPromptActive: action.payload.isPromptActive };
    case actions.LOADING:
      return { ...state, isLoading: action.payload?.isLoading! };
    case actions.SET_BUGS_DATA:
      return {
        ...state,
        bugs: action.payload.bugs,
      };
    case actions.SELECTED_BUG_ID:
      return {
        ...state,
        selectedBugId: action.payload.selectedBugId,
      };
    default:
      return state;
  }
};
