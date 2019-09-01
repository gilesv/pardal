import React from "react";
import { Task } from "../entities/task.entity";
import TaskForm from "./TaskForm";
import { Collapse, Tag, Icon } from "@blueprintjs/core";
import { CSSTransition } from "react-transition-group";

interface Props {
  task: Task,
  addTaskAtIndex: (index: number) => void,
  updateTask: (task: Task) => void,
  index: number
}

export default class TaskItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.update = this.update.bind(this);
    this.updateEffort = this.updateEffort.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  public state = {
    isBodyVisible: true
  }

  handleHeaderClick() {
    this.setState({
      ...this.state,
      isBodyVisible: !this.state.isBodyVisible
    });
  }

  update(key: string, value: any) {
    const updated = { ...this.props.task, [key]: value };
    this.props.updateTask(updated);
  }

  updateEffort(n: number, s: string) {
    let value = String(Number(s.replace(".", "")) / 10);

    if (value.length === 1) {
      value += ".0";
    }

    if (Number(value) < 10) {
      this.update('effort', value);
    }
  }

  render() {
    const { task, addTaskAtIndex, index } = this.props;

    return (
      <CSSTransition classNames="task" timeout={300} in={true}>
        <div className="task-item">
          <AddTaskButton type="before" visible={index === 0} index={index} addTask={(index: number) => addTaskAtIndex(index)} />

          <div className="task-item__header" onClick={this.handleHeaderClick}>
            <div className="task-item__tags">
              <Tag intent="primary" minimal={true}>{task.type}</Tag>
              <Tag intent="primary" minimal={true}>{task.area}</Tag>
              <Tag intent="primary" minimal={true}>{task.assignee}</Tag>
            </div>

            <div className="task-item__title">{task.title}</div>
          </div>

          <Collapse isOpen={this.state.isBodyVisible}>
            <div className="task-item__body">
              <TaskForm task={task} update={this.update} updateEffort={this.updateEffort} showDates={false} />
            </div>
          </Collapse>

          <AddTaskButton type="after" visible={true} index={index} addTask={(index: number) => addTaskAtIndex(index)} />
        </div>
      </CSSTransition>

    );
  }
}

const AddTaskButton = (props: any) => {
  const addIndex = props.type === "after" ? props.index + 1 : props.index;
  return props.visible ? (
    <div className={`task-item__add-button ${props.type}`} title="Add new item here" onClick={() => props.addTask(addIndex)}>
      <div className="button" >
        <Icon icon="plus" iconSize={15}></Icon>
      </div>

      <div className="line"></div>
    </div>
  ) : null;
}
