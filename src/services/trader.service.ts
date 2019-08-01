import { StoryId, Story } from "../entities/story.entity";
import { IStore } from "../redux/reducers";
import { TaskId, Task, TaskArea } from "../entities/task.entity";

export enum FileType {
  JSON,
  DTD
}

export function exportStory(story: Story, to: FileType, state: IStore): string {
  switch (to) {
    case FileType.JSON:
      return exportStoryToJSON(story, state);
      break;

    case FileType.DTD:
      return exportStoryToDTD(story, state);
      break;

    default:
      throw new Error("Invalid export file type");
  }
}

function exportStoryToJSON(story: Story, state: IStore) {
  return JSON.stringify({
    story,
    tasks: story.tasks.reduce((obj: any, taskId: TaskId) => {
      return { ...obj, [taskId]: state.tasks.entities[taskId] };
    }, {})
  }, null, 3);
}

function exportStoryToDTD(story: Story, state: IStore) {
  const tasks = story.tasks.map(taskId => state.tasks.entities[taskId]);
  let dtdContent = storyToDTDFormat(story);

  for (let task of tasks) {
    dtdContent += "\n" + taskToDTDFormat(task, story.name);
  }

  return dtdContent;
}

function storyToDTDFormat(story: Story): string {
  return [
    `[STORY][${story.name}] ${story.title}`,
    `[PRIORITY]: ${story.priority}`,
    `[EFFORT]: ${story.effort}`,
    `[DESCRIPTION]:\n${descriptionToTopics(story.description)}`
  ].join("\n");
}

function taskToDTDFormat(task: Task, storyName: string): string {
  return [
    `[TASK][${storyName}][${task.area === TaskArea.BOTH ? 'BE][FE' : task.area}][${task.assignee}] ${task.title}`,
    `[PRIORITY]: ${task.priority}`,
    `[EFFORT]: ${task.effort}`,
    `[DESCRIPTION]:\n${descriptionToTopics(task.description)}`
  ].join("\n");
}

function descriptionToTopics(description: string) {
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

export function importStory(tree: string, from: FileType) {

}

