import { ActionType } from "../actions";
import IAction from "../utils/action.interface";
import IUiState from "../utils/ui-state.interface";

export default function uiReducer(
  state: IUiState = { selectedStory: 0, isDirty: false },
  action: IAction
) {
  switch (action.type) {
    case ActionType.SELECT_STORY:
      return selectStory(state, action.payload);

    case ActionType.SET_STATE_CLEAN:
      return setStateClean(state);

    default:
      return isNaN(action.type) ? state : setStateDirty(state);
  }
}

const selectStory = (state: IUiState, payload: any) => {
  const { storyIndex } = payload;
  return {
    ...state,
    selectedStory: storyIndex
  };
}

/**
 * Any other action must force the application into a `dirty` state,
 * so it will display a confirm alert if the tab is closed or reloaded.
 * Only `SET_STATE_CLEAN` can undo it
 */
const setStateDirty = (state: IUiState) => {
  return !state.isDirty ? { ...state, isDirty: true } : state;
}

const setStateClean = (state: IUiState) => {
  return state.isDirty ? { ...state, isDirty: false } : state
}
