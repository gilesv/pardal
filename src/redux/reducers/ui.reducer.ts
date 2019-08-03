import { ActionType } from "../actions";
import IAction from "../utils/action.interface";
import IUiState from "../utils/ui-state.interface";

export default function uiReducer(
  state: IUiState = { selectedStory: 0, notifications: [] },
  action: IAction
) {
  switch (action.type) {
    case ActionType.SELECT_STORY:
      return selectStory(state, action.payload);

    case ActionType.ADD_NOTIFICATION:
      return addNotification(state, action.payload);

    default:
      return state;
  }
}

const selectStory = (state: IUiState, payload: any) => {
  const { storyIndex } = payload;
  return {
    ...state,
    selectedStory: storyIndex
  };
}

const addNotification = (state: IUiState, payload: any) => {
  const { notification } = payload;
  return {
    ...state,
    notifications: [...state.notifications, notification]
  };
}
