import uuid from "uuid";

export type TaskId = any; // TODO: change

export enum TaskType {
  TASK = "TASK",
  ENH = "ENH",
  BUG = "BUG",
  TEST = "TEST"
};

export enum TaskArea {
  BE = "BE",
  FE = "FE",
  BOTH = "BE & FE"
}

export const Assignee = {
  "A1": "A1",
  "A2": "A2",
  "A3": "A3",
  "A4": "A4",
  "A5": "A5"
}

export class Task {
  constructor(type?: TaskType) {
    this.id = uuid();
    this.type = type || TaskType.TASK;
    this.title = "New item";
    this.priority = 1.0;
    this.effort = "1.0";
    this.startDate = new Date();
    this.handOffDate = new Date();
    this.area = TaskArea.BOTH;
    this.description = "";
    this.assignee = Assignee.A1;
    this.isBodyVisible = true;
  }

  public id: TaskId;
  public title: string;
  public type: TaskType;
  public priority: number;
  public effort: number | string;
  public startDate: Date;
  public handOffDate: Date;
  public description: string;
  public area: TaskArea;
  public assignee: string;
  public isBodyVisible: boolean;
}
