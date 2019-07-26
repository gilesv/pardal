import React from "react";
import { Sprint } from "../entities/sprint.entity";
import StoryList from "./StoryList";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";

interface Props {
  selectedSprint: Sprint,
  [key: string]: any
}

class SprintDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { selectedSprint } = this.props;

    return (
      <div className="sprint-details">
        {
          selectedSprint ?
            <>
              <div className="sprint-details__header">
                <h1>{selectedSprint.name}</h1>
              </div>
              <div className="sprint-details__stories">
                <StoryList sprint={selectedSprint} />
              </div>
            </>
            : <span>Create an item</span>
        }

      </div>
    );
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  const selectedSprintIndex = state.ui.selectedSprint;
  const selectedSprint = state.sprints.entities[state.sprints.ids[selectedSprintIndex]];

  return {
    selectedSprint,
    ...props
  };
}

export default connect(mapStateToProps)(SprintDetails);
