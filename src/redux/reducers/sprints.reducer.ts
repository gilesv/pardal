import { ActionType } from "../actions";
import IEntityMap from "../utils/entity-map.interface";
import { Sprint } from "../../entities/sprint.entity";
import IAction from "../utils/action.interface";
import { removeFromArray, removeFromObject } from "../utils/store.utils";

export default function sprintsReducer(
  state: IEntityMap<Sprint> = { entities: {}, ids: [] },
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
  const nextId = state.ids.length;
  const { sprint } = payload;
  sprint.id = nextId;

  return {
    ...state,
    entities: {
      ...state.entities,
      [nextId]: sprint,
    },
    ids: [...state.ids, nextId]
  }
}

const updateSprint = (state: IEntityMap<Sprint>, payload: any) => {
  const { sprint } = payload;

  return {
    ...state,
    entities: {
      ...state.entities,
      [sprint.id]: sprint
    },
  }
}

const removeSprint = (state: IEntityMap<Sprint>, payload: any) => {
  const { sprintId } = payload;

  return {
    ...state,
    entities: removeFromObject(state.entities, sprintId),
    ids: removeFromArray(state.ids, sprintId)
  };
}
