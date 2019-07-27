import { StoryId } from "./story.entity";

export type SprintId = number;

export class Sprint {
  constructor(id: SprintId) {
    this.id = id;
    this.name = "Sprint 0";
    this.milestone = "Version 0.0";
    this.stories = [];
  }

  public id: SprintId;
  public name: string;
  public stories: StoryId[];
  public milestone: string;
}
