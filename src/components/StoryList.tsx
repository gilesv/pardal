import React, { SyntheticEvent } from "react";
import StoryListItem from "./StoryListItem";
import { addStory, removeStory, updateStory, selectStory } from "../redux/actions";
import { Button, NonIdealState } from "@blueprintjs/core";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Story, StoryId } from "../entities/story.entity";

interface Props {
  story: { [key: number]: Story },
  storiesIds: StoryId[],
  deleteStory: () => void,
  selectedStory: StoryId,
  [key: string]: any
};

class StoryList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public addStory() {
    const id = this.props.storiesIds.length;
    const story = new Story(id, this.generateNewName());
    this.props.dispatch(addStory(story));
  }

  private generateNewName(): string {
    const defaultName = "New Story";
    let name = `${defaultName} 1`;
    let counter = 1;

    while (this.storyExists(name)) {
      name = `${defaultName} ${counter++}`;
    }

    return name;
  }

  private storyExists(name: string): boolean {
    for (let id of this.props.storiesIds) {
      if (this.props.stories[id].name === name) {
        return true;
      }
    }
    return false;
  }

  public removeStory(storyId: StoryId) {
    this.props.dispatch(removeStory(storyId));
  }

  public selectStory(storyId: StoryId) {
    const index = this.props.storiesIds.indexOf(storyId || 0);
    this.props.dispatch(selectStory(index));
  }

  render() {
    const { stories, storiesIds, selectedStory } = this.props;

    return (
      <div className="story-list">
        <div className="story-list__header">
          <h1>Stories</h1>
          <Button text="Add Story" icon="cube-add" intent="success" onClick={(e: SyntheticEvent) => this.addStory()} />
        </div>

        <div className="story-list__body">
          {
            storiesIds && storiesIds.length > 0 ?
              storiesIds.map((storyId, index) => {
                const story: Story = this.props.stories[storyId];
                return <StoryListItem
                  story={story}
                  key={`story#${storyId}`}
                  isSelected={selectedStory === index}
                  selectStory={(storyId: StoryId) => this.selectStory(storyId)}
                  removeStory={(storyId: StoryId) => this.removeStory(storyId)} />
              }) : <NonIdealState
                className="story-list__no-items"
                title="Nothing here 😴"
                description="Add stories to start!"
                icon="add-to-artifact" />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    stories: state.stories.entities,
    storiesIds: state.stories.ids,
    selectedStory: state.ui.selectedStory,
    ...props
  };
}

export default connect(mapStateToProps)(StoryList);
