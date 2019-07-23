import { ItemId } from "./item.entity";

export type SprintId = number;

export class Sprint {
  constructor(name: string = "Sprint 0") {
    this.name = name;
    this.milestone = "Version 0.0";
  }

  public id?: SprintId;
  public name?: string;
  public items?: ItemId[];
  public milestone?: string;
}
