import IEntityMap from "../utils/entity-map.interface";
import { TeamMember } from "../../entities/team-member.entity";
import IAction from "../utils/action.interface";
import { ActionType } from "../actions";

export default function teamMembersReducer(
  state: IEntityMap<TeamMember> = { next: 0 },
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
  const newId = state.next;
  const { teamMember } = payload;
  return {
    ...state,
    [newId]: teamMember,
    next: newId + 1
  };
}

const updateTeamMember = (state: IEntityMap<TeamMember>, payload: any) => {
  const { teamMember } = payload;
  return {
    ...state,
    [teamMember.id]: teamMember
  };
}

const removeTeamMember = (state: IEntityMap<TeamMember>, payload: any) => {
  const { teamMemberId } = payload;
  return {
    ...state,
    [teamMemberId]: undefined
  };
}
