import { ItemId } from "./item.entity";

export class UserStory {
  constructor(
    id: UserStoryId,
    title: string = "New Sprint",
    items?: ItemId[]
  ) {
    this.id = id;
    this.title = title;
    this.priority = 1.0;
    this.effort = 1.0;
    this.startDate = new Date();
    this.handOffDate = new Date();
    this.description = "";
    this.items = items;
  }

  public id: UserStoryId;
  public title: string;
  public priority: number;
  public effort: number;
  public startDate: Date;
  public handOffDate: Date;
  public description: string;
  public items?: ItemId[];
}

export type UserStoryId = number;
