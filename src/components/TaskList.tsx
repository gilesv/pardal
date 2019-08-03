import React from "react";
import { Story } from "../entities/story.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Task, TaskId, TaskType } from "../entities/task.entity";
import TaskItem from "./TaskItem";
import { NonIdealState, Button, Popover, Position, ButtonGroup, Menu } from "@blueprintjs/core";
import { addTask, updateTask } from "../redux/actions";

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
  }

  public addTask(type = TaskType.TASK) {
    const id = this.props.tasksIds.length;
    const task = new Task(id, type);
    this.props.dispatch(addTask(task, this.props.story.id));
  }

  public updateTask(task: Task) {
    this.props.dispatch(updateTask(task));
  }

  render() {
    const { story } = this.props;
    const addItemMenu = (
      <Menu>
        <Menu.Item text="Task" onClick={() => this.addTask()} />
        <Menu.Item text="Enhancement" onClick={() => this.addTask(TaskType.ENH)} />
        <Menu.Item text="Test" onClick={() => this.addTask(TaskType.TEST)} />
      </Menu>
    );
    return (
      <div className="task-list">
        <div className="task-list__header">
          {
            story && story.tasks.length > 0 ?
              <ButtonGroup>
                <Button intent="success" text="Add item" icon="add-to-artifact" onClick={() => this.addTask()} />

                <Popover content={addItemMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
                  <Button intent="success" rightIcon="caret-down" />
                </Popover>

              </ButtonGroup>
              : null
          }
        </div>
        {
          story && story.tasks && story.tasks.length > 0 ?
            story.tasks.map(taskId => {
              const task = this.props.tasks[taskId];
              return <TaskItem key={`task#${taskId}`} task={task} updateTask={this.updateTask} />
            })
            : <NonIdealState
              className="story-details__nothing"
              title="No tasks here 😴 (yet)"
              icon="add"
              action={<Button intent="success" text="Add a task" icon="add-to-artifact" onClick={() => this.addTask()} />} />
        }
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

export default connect(mapStateToProps)(TaskList);
