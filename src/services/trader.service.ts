import { Story, StoryId } from "../entities/story.entity";
import { IStore } from "../redux/reducers";
import store from "../redux/store";
import { TaskId, Task, TaskArea } from "../entities/task.entity";
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
  exportStory(story: Story, to: FileType): string {
    const state = this.store.getState();

    switch (to) {
      case FileType.JSON:
        return this.exportStoryToJSON(story, state);
        break;
  
      case FileType.DTD:
        return this.exportStoryToDTD(story, state);
        break;
  
      default:
        throw new Error("Invalid export file type");
    }
  }

  private exportStoryToJSON(story: Story, state: IStore) {
    return JSON.stringify({ 
      story: {
        ...story,
        tasks: story.tasks.map(taskId => state.tasks.entities[taskId])
      } 
    }, null, 3);
  }

  private exportStoryToDTD(story: Story, state: IStore) {
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
      `[TASK][${storyName}][${task.area === TaskArea.BOTH ? 'BE][FE' : task.area}][${task.assignee}] ${task.title}`,
      `[PRIORITY]: ${task.priority}`,
      `[EFFORT]: ${task.effort}`,
      `[DESCRIPTION]:\n${this.descriptionToTopics(task.description)}`
    ].join("\n");
  }
  
  private descriptionToTopics(description: string) {
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
  
  importStory(source: string, from: FileType) {
    const obj = this.toObjectTree(source);
    const nextStoryId = this.store.getState().stories.ids.length;

    try {
      this.importStoryToStore(obj.story, nextStoryId);
      this.importTasksToStore(obj.story.tasks, nextStoryId)
    } catch (e) {
      throw new Error("Invalid JSON content: " + e.message);
    }

    console.log('Exported successfully');
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
