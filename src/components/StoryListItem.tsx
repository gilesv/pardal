import React, { RefObject } from "react";
import { Story, StoryId } from "../entities/story.entity";
import { Popover, Button, Dialog, Classes, Position, Menu } from "@blueprintjs/core";

interface Props {
  story: Story,
  storyIndex: number,
  isSelected: boolean,
  selectStory: (index: number) => void,
  deleteStory: (storyId: StoryId, index: number) => void
}

export default class StoryListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOptionsClick = this.handleOptionsClick.bind(this);
    this.handleClickDialogDelete = this.handleClickDialogDelete.bind(this);
    this.element = React.createRef();
  }

  public element: RefObject<HTMLDivElement>;

  public state = {
    isDialogVisible: false,
  }

  componentDidUpdate(prevProps: Props) {
    const isSelected = this.props.isSelected;
    if (isSelected && prevProps.isSelected !== isSelected) {
      setTimeout(() => {
        const el = this.element.current;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
      }, 200);
    }
  }

  toggleDialog() {
    this.setState({
      ...this.state,
      isDialogVisible: !this.state.isDialogVisible
    });
  }

  handleClick() {
    this.props.selectStory(this.props.storyIndex);
  }

  handleOptionsClick(e: any) {
    e.stopPropagation();
  }

  handleClickDialogDelete() {
    this.props.deleteStory(this.props.story, this.props.storyIndex);
  }

  render() {
    const { story, storyIndex, deleteStory, isSelected } = this.props;

    const optionsMenu = (
      <Menu>
        <Menu.Item text="Delete" onClick={this.toggleDialog} />
      </Menu>
    );

    return (
      <div className={`story-list-item ${isSelected ? "selected" : ""}`} onClick={this.handleClick} ref={this.element}>
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

          <Dialog isOpen={this.state.isDialogVisible} onClose={this.toggleDialog} title="Delete story">
            <div className={Classes.DIALOG_BODY}>
              Are you really sure to delete <b>{story.name}</b>? This cannot be undone.
            </div>

            <div className={`${Classes.DIALOG_FOOTER} task-item__dialog-footer`} >
              <Button intent="none" onClick={this.toggleDialog}>Cancel</Button>
              <Button intent="danger" onClick={this.handleClickDialogDelete}>Delete</Button>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
