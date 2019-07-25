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

export interface IStore {
  ui: IUiState,
  sprints: IEntityMap<Sprint>,
  teams: IEntityMap<Team>,
  teamMembers: IEntityMap<TeamMember>
}

export default combineReducers({
  ui: uiReducer,
  sprints: sprintsReducer,
  teams: teamsReducer,
  teamMembers: teamMembersReducer
});
