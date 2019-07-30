import { TeamMemberId } from "./team-member.entity";

export type TaskId = number;

export enum TaskType {
  TASK = "TASK",
  ENH = "ENH",
  BUG = "BUG"
};

export class Task {
  constructor(id: TaskId, type?: TaskType) {
    this.id = id;
    this.type = type || TaskType.TASK;
    this.title = "New item";
    this.priority = 1.0;
    this.effort = 1.0;
    this.startDate = new Date();
    this.handOffDate = new Date();
    this.description = "";
  }

  public id: TaskId;
  public title: string;
  public type: TaskType;
  public priority: number;
  public effort: number;
  public startDate: Date;
  public handOffDate: Date;
  public description: string;
  public assignee?: TeamMemberId;
}
