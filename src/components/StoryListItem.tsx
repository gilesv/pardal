import React from "react";
import { Story, StoryId } from "../entities/story.entity";
import { Popover, Button, Dialog, Classes, Position, Menu } from "@blueprintjs/core";

interface Props {
  story: Story,
  isSelected: boolean,
  selectStory: (storyId: StoryId) => void,
  deleteStory: (storyId: StoryId) => void
}

export default class StoryListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleOptionsClick = this.handleOptionsClick.bind(this);
  }

  public state = {
    isDialogVisible: false,
  }

  toggleDialog() {
    this.setState({
      ...this.state,
      isDialogVisible: !this.state.isDialogVisible
    });
  }

  handleClick(storyId: StoryId) {
    this.props.selectStory(storyId);
  }

  handleOptionsClick(e: any) {
    e.stopPropagation();
  }

  render() {
    const { story, deleteStory, isSelected } = this.props;

    const optionsMenu = (
      <Menu>
        <Menu.Item text="Delete" onClick={this.toggleDialog} />
      </Menu>
    );

    return (
      <div className={`story-list-item ${isSelected ? "selected" : ""}`} onClick={(e) => this.handleClick(story.id)}>
        <div className="story-list-item__info">
          <div className="story-list-item__name ellipsis">
            {story.name}
          </div>

          <div className={`story-list-item__items-count`}>
            {`${story.tasks ? story.tasks.length : "No"} items`}
          </div>
        </div>

        <div className={`story-list-item__options`} onClick={this.handleOptionsClick}>
          <Popover content={optionsMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
            <Button rightIcon="more" minimal={true} />
          </Popover>
        </div>


        <Dialog isOpen={this.state.isDialogVisible} onClose={this.toggleDialog} title="Delete story">
          <div className={Classes.DIALOG_BODY}>
            Are you really sure to delete <b>{story.name}</b>? This cannot be undone.
          </div>

          <div className={`${Classes.DIALOG_FOOTER} task-item__dialog-footer`} >
            <Button intent="none" onClick={this.toggleDialog}>Cancel</Button>
            <Button intent="danger" onClick={() => deleteStory(story)}>Delete</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
