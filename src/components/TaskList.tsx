import React from "react";
import { Story, StoryId } from "../entities/story.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Task, TaskId, TaskType } from "../entities/task.entity";
import TaskItem from "./TaskItem";
import { NonIdealState, Button } from "@blueprintjs/core";
import { addTask, updateTask, removeTask, moveTask } from "../redux/actions";
import Notification from "../entities/notification.entity";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface Props {
  tasks: { [key: number]: Task },
  tasksIds: TaskId[],
  story: Story,
  [key: string]: any
}

class TaskList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  public addTask(type = TaskType.TASK, index = -1) {
    const task = new Task(type);
    this.props.dispatch(addTask(task, this.props.story.id, index));
  }

  public updateTask(task: Task) {
    this.props.dispatch(updateTask(task));
  }

  public removeTask(task: Task, storyId: StoryId) {
    this.props.dispatch(removeTask(task.id, storyId));
    this.props.notify(new Notification(`"${task.title}" was deleted successfully.`, "tick"));
  }

  public onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const storyId = this.props.story.id;

    this.props.dispatch(moveTask(
      storyId,
      result.source.index,
      result.destination.index)
    );
  }

  render() {
    const { story } = this.props;
    const hasAnyTask = story && story.tasks && story.tasks.length > 0;

    return (
      <div className="task-list">
        <div className="task-list__header"></div>

        <div className="task-list__items">
          {
            hasAnyTask
              ? <DragDrop onDragEnd={this.onDragEnd}>
                {
                  story.tasks.map((taskId, i) => {
                    const task = this.props.tasks[taskId];

                    return <Draggable key={`task#${taskId}`} draggableId={task.id} index={i}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskItem
                            index={i}
                            task={task}
                            storyId={story.id}
                            updateTask={this.updateTask}
                            addTaskAtIndex={(index) => this.addTask(TaskType.TASK, index)}
                            removeTask={this.removeTask}
                            isRaised={snapshot.isDragging} />
                        </div>
                      )}
                    </Draggable>
                  })
                }
              </DragDrop>
              : <NonIdealState
                className="story-details__nothing"
                title="No tasks here 😴 (yet)"
                icon="add"
                action={<Button intent="success" text="Add a task" icon="add-to-artifact" onClick={() => this.addTask()} />} />
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    tasks: state.tasks.entities,
    tasksIds: state.tasks.ids,
    ...props
  };
}

const DragDrop = (props: any) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(mapStateToProps)(TaskList);
