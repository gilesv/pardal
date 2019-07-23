import React from "react";
import { Sprint, SprintId } from "../entities/sprint.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import SprintItem, { ContentEditableEvent } from "./SprintItem";
import { removeSprint, addSprint, updateSprint } from "../redux/actions";

interface Props {
  sprints: Sprint[],
  deleteSprint: Function,
  [key: string]: any
};

class SprintList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  addSprint() {
    const newSprint = new Sprint();
    this.props.dispatch(addSprint(newSprint));
  }

  updateSprint(sprint: Sprint, e: ContentEditableEvent) {
    sprint.name = e.target.value;
    this.props.dispatch(updateSprint(sprint));
  }

  removeSprint(sprintId?: SprintId) {
    this.props.dispatch(removeSprint(sprintId));
  }

  render() {
    const { sprints } = this.props;

    return (
      <div>
        <h2>Sprints</h2>
        <button onClick={(e) => this.addSprint()}>New sprint</button>
        <ul>
          {
            sprints && sprints.length > 0 ?
              sprints.map(sprint =>
                <SprintItem
                  sprint={sprint}
                  updateSprint={(sprint: Sprint, e: ContentEditableEvent) => this.updateSprint(sprint, e)}
                  removeSprint={(sprintId?: SprintId) => this.removeSprint(sprintId)} />
              ) : <span>Nothing here</span>
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    sprints: Object.values(state.sprints.entities),
    ...props
  };
}

export default connect(mapStateToProps)(SprintList);
