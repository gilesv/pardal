import { Sprint, SprintId } from "../entities/sprint.entity";
import { Team, TeamId } from "../entities/team.entity";
import { TeamMember, TeamMemberId } from "../entities/team-member.entity";
import IAction from "./utils/action.interface";
import { Story, StoryId } from "../entities/story.entity";
import { Task, TaskId } from "../entities/task.entity";

export enum ActionType {
  // UI
  SELECT_STORY,
  SET_STATE_CLEAN,

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

  // TASK
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK
}

/**
 * ============================================
 * Actions for UI
 * ============================================
 */

export function selectStory(storyIndex: number): IAction {
  return {
    type: ActionType.SELECT_STORY,
    payload: { storyIndex }
  };
}

export function setStateClean(): IAction {
  return { type: ActionType.SET_STATE_CLEAN, payload: {} };
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

/**
 * ============================================
 * Actions for UserStory
 * ============================================
 */
export function addStory(story: Story): IAction {
  return {
    type: ActionType.ADD_USER_STORY,
    payload: { story }
  };
}

export function updateStory(story: Story): IAction {
  return {
    type: ActionType.UPDATE_USER_STORY,
    payload: { story }
  };
}

export function removeStory(storyId?: StoryId): IAction {
  return {
    type: ActionType.REMOVE_USER_STORY,
    payload: { storyId }
  };
}

/**
 * ============================================
 * Actions for Task
 * ============================================
 */
export function addTask(task: Task, storyId: StoryId): IAction {
  return {
    type: ActionType.ADD_TASK,
    payload: { task, storyId }
  };
}

export function updateTask(task: Task): IAction {
  return {
    type: ActionType.UPDATE_TASK,
    payload: { task }
  };
}

export function removeTask(taskId: TaskId): IAction {
  return {
    type: ActionType.REMOVE_TASK,
    payload: { taskId }
  };
}