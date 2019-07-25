import { ActionType } from "../actions";
import IAction from "../utils/action.interface";
import IUiState from "../utils/ui-state.interface";

export default function uiReducer(
  state: IUiState = { selectedSprint: 0 },
  action: IAction
) {
  switch (action.type) {
    case ActionType.SELECT_SPRINT:
      return selectSprint(state, action.payload);

    default:
      return state;
  }
}

const selectSprint = (state: IUiState, payload: any) => {
  const { sprintIndex } = payload;
  return {
    ...state,
    selectedSprint: sprintIndex
  };
}
