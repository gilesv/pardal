import { ItemId } from "./item.entity";

export type SprintId = number;

export class Sprint {
  constructor(
    id: SprintId,
    name: string = "Sprint 0", items: ItemId[]) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.milestone = "Version 0.0";
  }

  public id: SprintId;
  public name: string;
  public items: ItemId[];
  public milestone: string;
}

