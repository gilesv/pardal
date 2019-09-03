import { Story, StoryId } from "../entities/story.entity";
import { IStore } from "../redux/reducers";
import store from "../redux/store";
import { Task, TaskArea, TaskId } from "../entities/task.entity";
import { addStory, addTask } from "../redux/actions";

export enum FileType {
  JSON,
  DTD
}

class Trader {
  public store: any;

  constructor(store: any) {
    this.store = store;
  }

  exportStories(stories: Story[], to: FileType, version: string): string {
    const state = this.store.getState();

    switch (to) {
      case FileType.JSON:
        return this.exportStoriesToJSON(stories, state, version);

      case FileType.DTD:
        return this.exportStoriesToDTD(stories, state);

      default:
        throw new Error("Invalid export file type");
    }
  }

  private exportStoriesToJSON(stories: Story[], state: IStore, version: string) {
    stories.forEach((story: any) => {
      story.tasks = story.tasks.map((taskId: TaskId) => state.tasks.entities[taskId]);
    })

    return JSON.stringify({
      v: version,
      stories
    }, null, 3);
  }

  private exportStoriesToDTD(stories: Story[], state: IStore) {
    const story = stories[0]; // no support for multiple stories txt exportation

    if (!story) {
      throw new Error("No stories selected to export");
    }

    const tasks = story.tasks.map(taskId => state.tasks.entities[taskId]);
    let dtdContent = this.storyToDTDFormat(story);

    for (let task of tasks) {
      dtdContent += "\n" + this.taskToDTDFormat(task, story.name);
    }

    return dtdContent;
  }

  private storyToDTDFormat(story: Story): string {
    return [
      `[STORY][${story.name}] ${story.title}`,
      `[PRIORITY]: ${story.priority}`,
      `[EFFORT]: ${story.effort}`,
      `[DESCRIPTION]:\n${this.descriptionToTopics(story.description)}`
    ].join("\n");
  }

  private taskToDTDFormat(task: Task, storyName: string): string {
    return [
      `[${task.type}][${storyName}][${task.area === TaskArea.BOTH ? 'BE][FE' : task.area}][${task.assignee}] ${task.title}`,
      `[PRIORITY]: ${task.priority}`,
      `[EFFORT]: ${task.effort}`,
      `[DESCRIPTION]:\n${this.descriptionToTopics(task.description)}`
    ].join("\n");
  }

  private descriptionToTopics(description: string) {
    if (description.trim() === "") {
      return "- N/A\n";
    }

    let result = "";
    const lines = description.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    for (let line of lines) {
      if (line[0] !== "-") {
        line = "- " + line;
      }

      if (![":", ";", "."].includes(line[line.length - 1])) {
        line += ";"
      }

      result += line + "\n";
    }

    return result;
  }

  importStories(source: string, from: FileType): string {
    const obj = this.toObjectTree(source);
    const sourceVersion = obj.v;

    try {
      switch (sourceVersion) {
        case undefined:
        case "0.0.2":
          const nextStoryId = this.store.getState().stories.ids.length;
          this.importStoryToStore(obj.story, nextStoryId);
          this.importTasksToStore(obj.story.tasks, nextStoryId);
          return obj.story.name;

        // case "next-version" <-- add new cases here if the json format changes in future versions

        default: // current version
          let labels: string[] = [];
          obj.stories.forEach((storyObj: any) => {
            const nextStoryId = this.store.getState().stories.ids.length;

            this.importStoryToStore(storyObj, nextStoryId);
            this.importTasksToStore(storyObj.tasks, nextStoryId);

            labels.push(storyObj.name);
          });

          return labels.join(", ");
      }
    } catch (e) {
      throw new Error("Invalid JSON content: " + e.message);
    }
  }

  private importStoryToStore(storyObj: any, nextId: StoryId) {
    try {
      const story = new Story(nextId, storyObj.name);

      story.title = storyObj.title;
      story.description = storyObj.description;
      story.effort = storyObj.effort;
      story.priority = storyObj.priority;
      story.description = storyObj.description;
      story.startDate = this.parseDate(storyObj.startDate);
      story.handOffDate = this.parseDate(storyObj.handOffDate);

      this.store.dispatch(addStory(story));
    } catch (e) {
      throw new Error("incomplete story data. " + e.message);
    }
  }

  private parseDate(dateStr: string): Date {
    if (isNaN(Date.parse(dateStr))) {
      throw new Error(`could not parse date: '${dateStr}'`);
    } else {
      return new Date(dateStr)
    };
  }

  private importTasksToStore(tasksArray: any[], storyId: StoryId) {
    const state = this.store.getState();
    const newTasks: Task[] = [];
    let nextId = state.tasks.ids.length;

    for (let taskObj of tasksArray) {
      try {
        const task = new Task(nextId);

        task.title = taskObj.title;
        task.description = taskObj.description;
        task.effort = taskObj.effort;
        task.priority = taskObj.priority;
        task.description = taskObj.description;
        task.startDate = this.parseDate(taskObj.startDate);
        task.handOffDate = this.parseDate(taskObj.handOffDate);
        task.type = taskObj.type;
        task.area = taskObj.area;
        task.assignee = taskObj.assignee;

        newTasks.push(task);
        nextId++;
      } catch (e) {
        throw new Error("incomplete task data. " + e.message);
      }
    }

    for (let task of newTasks) {
      this.store.dispatch(addTask(task, storyId));
    }
  }

  private toObjectTree(source: string): any {
    try {
      return JSON.parse(source);
    } catch (e) {
      throw new Error("Invalid JSON file.");
    }
  }
}

export default new Trader(store);
