import { ActionType } from "../actions";
import IEntityMap from "../utils/entity-map.interface";
import IAction from "../utils/action.interface";
import { removeFromArray, removeFromObject } from "../utils/store.utils";
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

    default:
      return state;
  }
}

const addStory = (state: IEntityMap<Story>, payload: any) => {
  const nextId = state.ids.length;
  const { story } = payload;
  story.id = nextId;

  return {
    ...state,
    entities: {
      ...state.entities,
      [nextId]: story,
    },
    ids: [...state.ids, nextId]
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
  const { task, storyId } = payload;
  const story = state.entities[storyId];
  story.tasks = story.tasks.concat(task.id);

  return {
    ...state,
    entities: {
      ...state.entities,
      [storyId]: story
    },
  };
}
