import { TeamId } from "./team.entity";

export class TeamMember {
  constructor(id: TeamMemberId, name: string, team?: TeamId) {
    this.id = id;
    this.name = name;
    this.team = team;
  }

  public id: TeamMemberId;
  public name: string;
  public team?: TeamId;
}

export type TeamMemberId = number;
