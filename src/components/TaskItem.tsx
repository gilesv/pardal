import React from "react";
import CollapsibleCard from "./CollapsibleCard";
import { Task } from "../entities/task.entity";
import TaskForm from "./TaskForm";

interface Props {
  task: Task,
  updateTask: (task: Task) => void
}

export default class TaskItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update(key: string, value: any) {
    const updated = { ...this.props.task, [key]: value };
    this.props.updateTask(updated);
  }

  render() {
    const { task } = this.props;

    return (
      <div className="task-item">
        <CollapsibleCard header={task.title} type={task.type}>
          <TaskForm task={task} update={this.update} />
        </CollapsibleCard>
      </div>
    );
  }
}
