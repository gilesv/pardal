import { ActionType } from "../actions";
import IEntityMap from "../utils/entity-map.interface";
import IAction from "../utils/action.interface";
import { removeFromArray, removeFromObject, addToArray } from "../utils/store.utils";
import { Story } from "../../entities/story.entity";

export default function storiesReducer(
  state: IEntityMap<Story> = { entities: {}, ids: [] },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_USER_STORY:
      return addStory(state, action.payload);

    case ActionType.UPDATE_USER_STORY:
      return updateStory(state, action.payload);

    case ActionType.REMOVE_USER_STORY:
      return removeStory(state, action.payload);

    case ActionType.ADD_TASK:
      return addTaskToStory(state, action.payload);

    case ActionType.REMOVE_TASK:
      return removeTaskFromStory(state, action.payload);

    default:
      return state;
  }
}

const addStory = (state: IEntityMap<Story>, payload: any) => {
  const { story } = payload;

  return {
    ...state,
    entities: {
      ...state.entities,
      [story.id]: story,
    },
    ids: [...state.ids, story.id]
  }
}

const updateStory = (state: IEntityMap<Story>, payload: any) => {
  const { story } = payload;

  return {
    ...state,
    entities: {
      ...state.entities,
      [story.id]: story
    },
  }
}

const removeStory = (state: IEntityMap<Story>, payload: any) => {
  const { storyId } = payload;

  return {
    ...state,
    entities: removeFromObject(state.entities, storyId),
    ids: removeFromArray(state.ids, storyId)
  };
}

const addTaskToStory = (state: IEntityMap<Story>, payload: any) => {
  const { task, storyId, index } = payload;
  const story = state.entities[storyId];
  story.tasks = addToArray(story.tasks, task.id, index);

  return {
    ...state,
    entities: {
      ...state.entities,
      [storyId]: story
    },
  };
}

const removeTaskFromStory = (state: IEntityMap<Story>, payload: any) => {
  const { taskId, storyId } = payload;
  const story = state.entities[storyId];
  story.tasks = removeFromArray(story.tasks, taskId);

  return {
    ...state,
    entities: {
      ...state.entities,
      [storyId]: story
    },
  };
}
