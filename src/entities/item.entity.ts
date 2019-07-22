import { UserStoryId } from "./user-story.entity";
import { TeamMemberId } from "./team-member.entity";

export type ItemId = number;

export enum ItemType {
  TASK = "Task",
  ENH = "Enhancement",
  BUG = "Bug"
};

export class Item {
  constructor(
    id: ItemId,
    title: string = "New task",
    userStory?: UserStoryId,
    assignee?: TeamMemberId
  ) {
    this.id = id;
    this.type = ItemType.TASK;
    this.title = title;
    this.priority = 1.0;
    this.effort = 1.0;
    this.startDate = new Date();
    this.handOffDate = new Date();
    this.description = "";
    this.userStory = userStory;
    this.assignee = assignee;
  }

  public id: ItemId;
  public title: string;
  public type: ItemType;
  public priority: number;
  public effort: number;
  public startDate: Date;
  public handOffDate: Date;
  public description: string;
  public userStory?: UserStoryId;
  public assignee?: TeamMemberId;
}
