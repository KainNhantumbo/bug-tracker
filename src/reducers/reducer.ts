import actions from './actions';
import type { TState, TAction } from '../../@types';
import { CgDanger } from 'react-icons/cg';

export const initialState: TState = {
  isSearchActive: false,
  isSortActive: false,
  isFilterActive: false,
  isPromptActive: false,
  isLoading: false,
  searchValue: '',
  bugs: [],
  selectedBugId: '',
  queryBugs: { query: '', sort: '' },
  infoboxData: {
    active: false,
    message: '',
    icon: CgDanger,
  },
  isEditAccountModalActive: false,
  auth: { token: '', username: '', recoveryKey: '' },
};

export const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };
    case actions.EDIT_ACCOUNT_MODAL:
      return {
        ...state,
        isEditAccountModalActive: action.payload.isEditAccountModalActive,
      };
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
        infoboxData: { ...state.infoboxData, active: false },
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
    case actions.INFO_BOX_DATA:
      return { ...state, infoboxData: action.payload.infoboxData };
    case actions.QUERY_BUGS:
      return { ...state, queryBugs: action.payload.queryBugs };
    default:
      return state;
  }
};
