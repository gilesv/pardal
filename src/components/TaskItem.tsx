import React from "react";
import { Task } from "../entities/task.entity";
import TaskForm from "./TaskForm";
import { Collapse, Tag } from "@blueprintjs/core";

interface Props {
  task: Task,
  updateTask: (task: Task) => void
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
    const { task } = this.props;

    return (
      <div className="task-item">
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
            <TaskForm task={task} update={this.update} updateEffort={this.updateEffort} />
          </div>
        </Collapse>
      </div>
    );
  }
}
