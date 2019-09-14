import React, { SyntheticEvent } from "react";
import StoryListItem from "./StoryListItem";
import { addStory, removeStory, selectStory } from "../redux/actions";
import { Button, NonIdealState, Menu, ButtonGroup, Popover, Position } from "@blueprintjs/core";
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
  public fileSelector: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.fileSelector = React.createRef();
    this.addStory = this.addStory.bind(this);
    this.clickFileSelector = this.clickFileSelector.bind(this);
  }

  public addStory() {
    const story = new Story(this.generateNewName());
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

  public clickFileSelector() {
    const el = this.fileSelector.current;
    if (el) {
      el.value = "";
      el.click();
    }
  }

  render() {
    const { storiesIds, selectedStory, importStory } = this.props;

    const addStoryMenu = (
      <Menu>
        <Menu.Item text="Create new" icon="plus" onClick={this.addStory} />
        <Menu.Item text="Import from JSON" icon="import" onClick={this.clickFileSelector} />
      </Menu>
    );

    return (
      <div className="story-list">

        <input
          className="story-list__file-selector"
          type="file"
          ref={this.fileSelector}
          onChange={(e) => importStory(e)}
          accept=".json, application/json" />

        <div className="story-list__header">
          <h1>Stories</h1>
          <ButtonGroup>
            <Button text="Add Story" icon="cube-add" intent="none" onClick={this.addStory} />
            <Popover content={addStoryMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
              <Button intent="none" rightIcon="caret-down" />
            </Popover>
          </ButtonGroup>
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
