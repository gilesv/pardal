import React from "react";
import { Story } from "../entities/story.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Task, TaskId } from "../entities/task.entity";
import TaskItem from "./TaskItem";

interface Props {
  tasks: { [key: number]: Task },
  tasksIds: TaskId[],
  story: Story,
  [key: string]: any
}

class TaskList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { story } = this.props;
    return (
      <div className="task-list">
        <div className="task-list__header"></div>
        {
          story && story.tasks && story.tasks.length > 0 ?
            story.tasks.map(taskId => {
              const task = this.props.tasks[taskId];
              return <TaskItem key={`task#${taskId}`} task={task} />
            })
            : <span>Create an item!</span>
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
