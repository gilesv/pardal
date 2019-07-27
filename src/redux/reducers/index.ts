import { combineReducers } from "redux";
import sprintsReducer from "./sprints.reducer";
import teamsReducer from "./teams.reducer";
import teamMembersReducer from "./team-members.reducer";
import IEntityMap from "../utils/entity-map.interface";
import { Sprint } from "../../entities/sprint.entity";
import { TeamMember } from "../../entities/team-member.entity";
import { Team } from "../../entities/team.entity";
import IUiState from "../utils/ui-state.interface";
import uiReducer from "./ui.reducer";
import storiesReducer from "./stories.reducer";
import { Story } from "../../entities/story.entity";
import { Task } from "../../entities/task.entity";
import tasksReducer from "./tasks.reducer";

export interface IStore {
  ui: IUiState,
  // sprints: IEntityMap<Sprint>,
  teams: IEntityMap<Team>,
  teamMembers: IEntityMap<TeamMember>,
  stories: IEntityMap<Story>,
  tasks: IEntityMap<Task>
}

export default combineReducers({
  ui: uiReducer,
  // sprints: sprintsReducer,
  teams: teamsReducer,
  teamMembers: teamMembersReducer,
  stories: storiesReducer,
  tasks: tasksReducer
});
