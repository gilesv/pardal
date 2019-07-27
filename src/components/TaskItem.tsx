import React from "react";
import CollapsibleCard from "./CollapsibleCard";
import { Task } from "../entities/task.entity";

interface Props {
  task: Task
}

export default class TaskItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { task } = this.props;

    return (
      <div className="task-item">
        <CollapsibleCard header={task.title} type={task.type}>
          Nothing here yet
        </CollapsibleCard>
      </div>
    );
  }
}
