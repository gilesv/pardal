import React from "react";
import StoryListItem from "./StoryListItem";
import { addStory, removeStory, selectStory, removeTask } from "../redux/actions";
import { Button, NonIdealState, Menu, ButtonGroup, Popover, Position } from "@blueprintjs/core";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Story, StoryId } from "../entities/story.entity";

interface Props {
  stories: Story[],
  storiesIds: StoryId[],
  selectedStory: StoryId,
  addStory: () => void,
  deleteStory: (storyId: StoryId, index: number) => void,
  selectStory: (index: number) => void,
  importStory: (e: any) => void,
};

class StoryList extends React.Component<Props> {
  public fileSelector: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.fileSelector = React.createRef();

    this.handleClickCreateNewStory = this.handleClickCreateNewStory.bind(this);
    this.handleClickImportFromJson = this.handleClickImportFromJson.bind(this);
    this.handleFileSelectorChange = this.handleFileSelectorChange.bind(this);
  }

  private handleClickCreateNewStory() {
    this.props.addStory();
  }

  private handleClickImportFromJson() {
    const el = this.fileSelector.current;
    if (el) {
      el.value = "";
      el.click();
    }
  }

  private handleFileSelectorChange(e: any) {
    this.props.importStory(e);
  }

  render() {
    const { storiesIds, selectedStory, selectStory, deleteStory } = this.props;
    const hasContent = storiesIds && storiesIds.length > 0;

    const addStoryMenu = (
      <Menu>
        <Menu.Item text="Create new" icon="plus" onClick={this.handleClickCreateNewStory} />
        <Menu.Item text="Import from JSON" icon="import" onClick={this.handleClickImportFromJson} />
      </Menu>
    );

    return (
      <div className="story-list">

        <input
          className="story-list__file-selector"
          type="file"
          ref={this.fileSelector}
          onChange={this.handleFileSelectorChange}
          accept=".json, application/json" />

        <div className="story-list__header">
          <span>Stories</span>
          <ButtonGroup>
            <Button text="Add Story" icon="cube-add" intent="none" onClick={this.handleClickCreateNewStory} />
            <Popover content={addStoryMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
              <Button intent="none" rightIcon="caret-down" />
            </Popover>
          </ButtonGroup>
        </div>

        <div className="story-list__body">
          {
            hasContent
              ? storiesIds.map((storyId, index) => {
                const story: Story = this.props.stories[storyId];
                return <StoryListItem
                  story={story}
                  key={`story#${storyId}`}
                  storyIndex={index}
                  isSelected={selectedStory === index}
                  selectStory={selectStory}
                  deleteStory={deleteStory} />
              })
              : <NonIdealState
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
