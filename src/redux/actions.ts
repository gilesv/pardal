import { Sprint, SprintId } from "../entities/sprint.entity";
import { Team, TeamId } from "../entities/team.entity";
import { TeamMember, TeamMemberId } from "../entities/team-member.entity";
import IAction from "./utils/action.interface";

export enum ActionType {
  ADD_TEAM,
  UPDATE_TEAM,
  REMOVE_TEAM,
  ADD_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  REMOVE_TEAM_MEMBER,
  ADD_SPRINT,
  UPDATE_SPRINT,
  REMOVE_SPRINT,
  ADD_USER_STORY,
  UPDATE_USER_STORY,
  REMOVE_USER_STORY,
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM
}

function addTeam(team: Team): IAction {
  return {
    type: ActionType.ADD_TEAM,
    payload: { team }
  };
}

function updateTeam(team: Team): IAction {
  return {
    type: ActionType.UPDATE_TEAM,
    payload: { team }
  }
}

function removeTeam(teamId: TeamId): IAction {
  return {
    type: ActionType.REMOVE_TEAM,
    payload: { teamId }
  };
}

function addTeamMember(teamId: TeamId, teamMember: TeamMember): IAction {
  return {
    type: ActionType.ADD_TEAM_MEMBER,
    payload: { teamId, teamMember }
  };
}

function updateTeamMember(teamId: TeamId, teamMember: TeamMember): IAction {
  return {
    type: ActionType.ADD_TEAM_MEMBER,
    payload: { teamId, teamMember }
  };
}

function removeTeamMember(teamId: TeamId, teamMemberId: TeamMemberId): IAction {
  return {
    type: ActionType.ADD_TEAM_MEMBER,
    payload: { teamId, teamMemberId }
  };
}

export function addSprint(sprint: Sprint): IAction {
  return {
    type: ActionType.ADD_SPRINT,
    payload: { sprint }
  };
}

export function updateSprint(sprint: Sprint): IAction {
  return {
    type: ActionType.UPDATE_SPRINT,
    payload: { sprint }
  };
}

export function removeSprint(sprintId?: SprintId): IAction {
  return {
    type: ActionType.REMOVE_SPRINT,
    payload: { sprintId }
  };
}
