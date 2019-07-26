import React, { SyntheticEvent } from "react";
import { Sprint, SprintId } from "../entities/sprint.entity";
import SprintItem, { ContentEditableEvent } from "./SprintItem";
import { removeSprint, addSprint, updateSprint, selectSprint } from "../redux/actions";
import { Button, Alert, Intent } from "@blueprintjs/core";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";

interface Props {
  sprints: { [key: number]: Sprint },
  sprintsIds: SprintId[],
  deleteSprint: Function,
  selectedSprint: SprintId | undefined,
  [key: string]: any
};

class SprintList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public state = {
    isAlertOpen: false,
  }

  generateSprintName(): string {
    const defaultName = "Sprint";
    let name = `${defaultName} 1`;
    let counter = 1;
    while (this.sprintExists(name)) {
      name = `${defaultName} ${counter++}`;
    }

    return name;
  }

  addSprint() {
    const newSprint = new Sprint();
    newSprint.name = this.generateSprintName();
    this.props.dispatch(addSprint(newSprint));
  }

  updateSprint(sprint: Sprint, e: ContentEditableEvent) {
    sprint.name = e.target.value;
    this.props.dispatch(updateSprint(sprint));
  }

  sprintExists(name: string): boolean {
    for (let id of this.props.sprintsIds) {
      if (this.props.sprints[id].name === name) {
        return true;
      }
    }
    return false;
  }

  removeSprint(sprintId?: SprintId) {
    this.props.dispatch(removeSprint(sprintId));
  }

  onSelect(sprintId?: SprintId) {
    const sprintIndex = this.props.sprintsIds.indexOf(sprintId || 0);
    this.props.dispatch(selectSprint(sprintIndex));
  }

  openAlert() {
    this.setState({
      ...this.state,
      isAlertOpen: true,
    });
  }

  closeAlert() {
    this.setState({
      ...this.state,
      isAlertOpen: false,
    });
  }

  render() {
    const { sprints, sprintsIds, selectedSprint } = this.props;

    return (
      <div className="sprint-list">
        <Alert
          confirmButtonText="Alright"
          isOpen={this.state.isAlertOpen}
          intent={Intent.NONE}
          onClose={() => this.closeAlert()}
          canOutsideClickCancel={true}
          canEscapeKeyCancel={true}
        >
          <p>
            This name is already being used.
          </p>
        </Alert>
        <div className="sprint-list__header">
          <h1>Sprints</h1>
          <Button text="Add Sprint" intent="success" onClick={(e: SyntheticEvent) => this.addSprint()} />
        </div>

        <div>
          {
            sprintsIds && sprintsIds.length > 0 ?
              sprintsIds.map((sprintId, index) => {
                const sprint = this.props.sprints[sprintId];
                return <SprintItem
                  sprint={sprint}
                  key={`sprint#${sprint.id}`}
                  isSelected={selectedSprint === index}
                  onSelect={(sprintId?: SprintId) => this.onSelect(sprintId)}
                  updateSprint={(sprint: Sprint, e: ContentEditableEvent) => this.updateSprint(sprint, e)}
                  removeSprint={(sprintId?: SprintId) => this.removeSprint(sprintId)} />
              }

              ) : <div className="sprint-list__no-items">Nothing here (yet)</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    sprints: state.sprints.entities,
    sprintsIds: state.sprints.ids,
    selectedSprint: state.ui.selectedSprint,
    ...props
  };
}

export default connect(mapStateToProps)(SprintList);
