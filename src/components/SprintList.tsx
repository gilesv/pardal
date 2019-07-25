import React from "react";
import { Sprint, SprintId } from "../entities/sprint.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import SprintItem, { ContentEditableEvent } from "./SprintItem";
import { removeSprint, addSprint, updateSprint, selectSprint } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  sprints: Sprint[],
  sprintsIds: SprintId[],
  deleteSprint: Function,
  selectedSprint: SprintId | undefined,
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
    const ids = this.props.sprints.map(s => s.id); // TODO: make this shit better
    if (ids.indexOf(sprintId) < 0) {
      sprintId = ids.length - 1;
    }
    this.props.dispatch(removeSprint(sprintId));
  }

  onSelect(sprintId?: SprintId) {
    const sprintIndex = this.props.sprintsIds.indexOf(sprintId || 0);
    this.props.dispatch(selectSprint(sprintIndex));
  }

  render() {
    const { sprints, selectedSprint } = this.props;

    return (
      <div className="sprint-list">
        <div className="sprint-list__header">
          <h1>Sprints</h1>
          <div className="sprint-list__add" onClick={(e) => this.addSprint()} >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>

        <div>
          {
            sprints && sprints.length > 0 ?
              sprints.map((sprint, index) =>
                <SprintItem
                  sprint={sprint}
                  key={`sprint#${sprint.id}`}
                  isSelected={selectedSprint === index}
                  onSelect={(sprintId?: SprintId) => this.onSelect(sprintId)}
                  updateSprint={(sprint: Sprint, e: ContentEditableEvent) => this.updateSprint(sprint, e)}
                  removeSprint={(sprintId?: SprintId) => this.removeSprint(sprintId)} />
              ) : <div className="sprint-list__no-items">Nothing here (yet)</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    sprints: Object.values(state.sprints.entities),
    sprintsIds: state.sprints.ids,
    selectedSprint: state.ui.selectedSprint,
    ...props
  };
}

export default connect(mapStateToProps)(SprintList);
