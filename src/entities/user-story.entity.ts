import { ItemId } from "./item.entity";

export class UserStory {
  constructor(id: UserStoryId) {
    this.id = id;
    this.article = "As a";
    this.actor = "User";
    this.verb = "I want to";
    this.action = "do something";
    this.predicate = "so I can";
    this.motivation = "accomplish something else"

    this.priority = 1.0;
    this.effort = 1.0;
    this.startDate = new Date();
    this.handOffDate = new Date();
    this.description = "";
    this.items = [];
  }

  public id: UserStoryId;
  public article: string;
  public actor: string;
  public verb: string;
  public action: string;
  public predicate: string;
  public motivation: string;
  public priority: number;
  public effort: number;
  public startDate: Date;
  public handOffDate: Date;
  public description: string;
  public items?: ItemId[];
}

export type UserStoryId = number;
