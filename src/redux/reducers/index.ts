import { combineReducers } from "redux";
import sprintsReducer from "./sprints.reducer";
import teamsReducer from "./teams.reducer";
import teamMembersReducer from "./team-members.reducer";
import IEntityMap from "../utils/entity-map.interface";
import { Sprint } from "../../entities/sprint.entity";
import { TeamMember } from "../../entities/team-member.entity";
import { Team } from "../../entities/team.entity";

export interface IStore {
  sprints: IEntityMap<Sprint>,
  teams: IEntityMap<Team>,
  teamMembers: IEntityMap<TeamMember>
}

export default combineReducers({
  sprints: sprintsReducer,
  teams: teamsReducer,
  teamMembers: teamMembersReducer
});
