import IEntityMap from "../utils/entity-map.interface";
import { TeamMember } from "../../entities/team-member.entity";
import IAction from "../utils/action.interface";
import { ActionType } from "../actions";

export default function teamMembersReducer(
  state: IEntityMap<TeamMember> = { entities: {}, ids: [] },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_TEAM_MEMBER:
      return addTeamMember(state, action.payload);
    case ActionType.UPDATE_TEAM_MEMBER:
      return updateTeamMember(state, action.payload);
    case ActionType.REMOVE_TEAM_MEMBER:
      return removeTeamMember(state, action.payload);
    default:
      return state;
  }
}

const addTeamMember = (state: IEntityMap<TeamMember>, payload: any) => {
  const nextId = state.ids.length;
  const { member } = payload;
  member.id = nextId;

  return {
    ...state,
    entities: {
      ...state.entities,
      [nextId]: member,
    },
    ids: [
      ...state.ids,
      nextId
    ]
  }
}

const updateTeamMember = (state: IEntityMap<TeamMember>, payload: any) => {
  const { member } = payload;

  return {
    ...state,
    entities: {
      ...state.entities,
      [member.id]: member
    },
  }
}

const removeTeamMember = (state: IEntityMap<TeamMember>, payload: any) => {
  const { teamMemberId } = payload;
  const ids = state.ids;

  return {
    ...state,
    entities: {
      ...state.entities,
      [teamMemberId]: undefined,
    },
    ids: ids.splice(ids.indexOf(teamMemberId), 1)
  };
}
