import { Sprint, SprintId } from "../entities/sprint.entity";
import { Team, TeamId } from "../entities/team.entity";
import { TeamMember, TeamMemberId } from "../entities/team-member.entity";
import IAction from "./utils/action.interface";

export enum ActionType {
  // UI
  SELECT_SPRINT,

  // Team
  ADD_TEAM,
  UPDATE_TEAM,
  REMOVE_TEAM,

  // Team Member
  ADD_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  REMOVE_TEAM_MEMBER,

  // Sprint
  ADD_SPRINT,
  UPDATE_SPRINT,
  REMOVE_SPRINT,

  // User Story
  ADD_USER_STORY,
  UPDATE_USER_STORY,
  REMOVE_USER_STORY,

  // Item
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM
}

/**
 * ============================================
 * Actions for UI
 * ============================================
 */

export function selectSprint(sprintIndex: number): IAction {
  return {
    type: ActionType.SELECT_SPRINT,
    payload: { sprintIndex }
  };
}

/**
 * ============================================
 * Actions for Team
 * ============================================
 */
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

/**
 * ============================================
 * Actions for Team Member
 * ============================================
 */
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

/**
 * ============================================
 * Actions for Sprint
 * ============================================
 */
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
