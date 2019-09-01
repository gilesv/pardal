import { ActionType } from "../actions";
import IEntityMap from "../utils/entity-map.interface";
import IAction from "../utils/action.interface";
import { removeFromArray, removeFromObject, addToArray } from "../utils/store.utils";
import { Task } from "../../entities/task.entity";

export default function tasksReducer(
  state: IEntityMap<Task> = { entities: {}, ids: [] },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_TASK:
      return addTask(state, action.payload);

    case ActionType.UPDATE_TASK:
      return updateTask(state, action.payload);

    case ActionType.REMOVE_TASK:
      return removeTask(state, action.payload);

    default:
      return state;
  }
}

const addTask = (state: IEntityMap<Task>, payload: any) => {
  const { task } = payload;
  return {
    ...state,
    entities: {
      ...state.entities,
      [task.id]: task,
    },
    ids: addToArray(state.ids, task.id, -1)
  }
}

const updateTask = (state: IEntityMap<Task>, payload: any) => {
  const { task } = payload;

  return {
    ...state,
    entities: {
      ...state.entities,
      [task.id]: task
    },
  }
}

const removeTask = (state: IEntityMap<Task>, payload: any) => {
  const { taskId } = payload;

  return {
    ...state,
    entities: removeFromObject(state.entities, taskId),
    ids: removeFromArray(state.ids, taskId)
  };
}
