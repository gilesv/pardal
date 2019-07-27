import { TaskId } from "./task.entity";

export type StoryId = number;

export class Story {
  constructor(id: StoryId, name: string) {
    this.id = id;
    this.name = name || "New Story";
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
    this.tasks = [];
  }

  public id: StoryId;
  public name: string;
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
  public tasks: TaskId[];
}
