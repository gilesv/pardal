import IEntityMap from "../utils/entity-map.interface";
import IAction from "../utils/action.interface";
import { ActionType } from "../actions";
import { Team } from "../../entities/team.entity";

export default function teamsReducer(
  state: IEntityMap<Team> = { entities: {}, ids: [] },
  action: IAction
) {
  switch (action.type) {
    case ActionType.ADD_TEAM:
      return addTeam(state, action.payload);

    case ActionType.UPDATE_TEAM:
      return updateTeam(state, action.payload);

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
  const nextId = state.ids.length;
  const { team } = payload;
  team.id = nextId;

  return {
    ...state,
    entities: {
      ...state.entities,
      [nextId]: team
    },
    ids: [...state.ids, nextId]
  }
}

const updateTeam = (state: IEntityMap<Team>, payload: any) => {
  const { team } = payload;

  return {
    ...state,
    entities: {
      [team.id]: team
    }
  }
}

const removeTeam = (state: IEntityMap<Team>, payload: any) => {
  const { teamId } = payload;
  const ids = state.ids;

  return {
    ...state,
    entities: {
      ...state.entities,
      [teamId]: undefined,
    },
    ids: ids.splice(ids.indexOf(teamId), 1)
  };
}

const addTeamMember = (state: IEntityMap<Team>, payload: any) => {
  const { teamId, teamMemberId } = payload;
  const team = state.entities[teamId];
  team.members = team.members.concat(teamMemberId);

  return {
    ...state,
    entities: {
      ...state.entities,
      [team.id]: team
    },
  };
}

const removeTeamMember = (state: IEntityMap<Team>, payload: any) => {
  const { teamId, teamMemberId } = payload;
  const team = state.entities[teamId];

  // removes the member id
  let members = team.members;
  members = members.splice(members.indexOf(teamMemberId), 1);
  team.members = members;

  return {
    ...state,
    entities: {
      ...state.entities,
      [teamId]: team
    }
  };
}
