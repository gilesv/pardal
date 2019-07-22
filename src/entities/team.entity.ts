import { TeamMemberId } from './team-member.entity';

export class Team {
  constructor(id: TeamId, name: string, members: TeamMemberId[]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }

  public id: TeamId;
  public name: string;
  public members: TeamMemberId[];
}

export type TeamId = number;
