import { UserStoryId } from "./user-story.entity";

export type SprintId = number;

export class Sprint {
  constructor(name: string = "Sprint 0") {
    this.name = name;
    this.milestone = "Version 0.0";
    this.stories = [];
  }

  public id?: SprintId;
  public name?: string;
  public stories: UserStoryId[];
  public milestone?: string;
}
