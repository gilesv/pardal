import IEntityMap from "../utils/entity-map.interface";
import IAction from "../utils/action.interface";
import { ActionType } from "../actions";
import { Team } from "../../entities/team.entity";

export default function teamsReducer(
  state: IEntityMap<Team> = { next: 0 },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_TEAM:
      return addTeam(state, action.payload);

    case ActionType.REMOVE_TEAM:
      return removeTeam(state, action.payload);

    case ActionType.ADD_TEAM_MEMBER:
      return addTeamMember(state, action.payload);

    case ActionType.REMOVE_TEAM_MEMBER:
      return removeTeamMember(state, action.payload);

    default:
      return state;
  }
}

const addTeam = (state: IEntityMap<Team>, payload: any) => {
  const newId = state.next;
  return {
    ...state,
    [newId]: payload.team,
    next: newId + 1
  };
}

const removeTeam = (state: IEntityMap<Team>, payload: any) => {
  return {
    ...state,
    [payload.teamId]: undefined,
  };
}

const addTeamMember = (state: IEntityMap<Team>, payload: any) => {
  const { teamId, teamMemberId } = payload;
  const team = state[teamId];

  return {
    ...state,
    [team.id]: {
      ...team,
      members: team.members.concat(teamMemberId)
    }
  };
}

const removeTeamMember = (state: IEntityMap<Team>, payload: any) => {
  const { teamId, teamMemberId } = payload;
  const team = state[teamId];
  const members = [...team.members];

  // removes the member id
  members.splice(members.indexOf(teamMemberId), 1);

  return {
    ...state,
    [team.id]: { ...team, members }
  };
}
