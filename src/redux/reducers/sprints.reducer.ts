import { ActionType } from "../actions";
import IEntityMap from "../utils/entity-map.interface";
import { Sprint } from "../../entities/sprint.entity";
import IAction from "../utils/action.interface";

export default function sprintsReducer(
  state: IEntityMap<Sprint> = { next: 0 },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_SPRINT:
      return addSprint(state, action.payload);

    case ActionType.UPDATE_SPRINT:
      return updateSprint(state, action.payload);

    case ActionType.REMOVE_SPRINT:
      return removeSprint(state, action.payload);

    default:
      return state;
  }
}

const addSprint = (state: IEntityMap<Sprint>, payload: any) => {
  const newId = state.next;
  return {
    ...state,
    [newId]: payload.sprint,
    next: newId + 1
  };
}

const updateSprint = (state: IEntityMap<Sprint>, payload: any) => {
  const newId = state.next;
  return {
    ...state,
    [payload.sprint.id]: payload.sprint,
  };
}

const removeSprint = (state: IEntityMap<Sprint>, payload: any) => {
  const newId = state.next;
  return {
    ...state,
    [newId]: payload.sprint,
    next: newId + 1
  };
}
