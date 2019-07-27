import React from "react";
import { Story, StoryId } from "../entities/story.entity";

interface Props {
  story: Story,
  isSelected: boolean,
  selectStory: (storyId: StoryId) => void,
  removeStory: (storyId: StoryId) => void
}

export default class StoryListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleClick(storyId: StoryId) {
    this.props.selectStory(storyId);
  }

  render() {
    const { story, removeStory, isSelected } = this.props;
    return (
      <div className={`story-list-item ${isSelected ? "selected" : ""}`} onClick={(e) => this.handleClick(story.id)}>
        <div className="story-item__name">
          {story.name}
        </div>

        <div className={`story-list-item__delete`} onClick={(e) => removeStory(story.id)}>
        </div>

        <div className={`story-list-item__items-count`}>
          {`${story.tasks ? story.tasks.length : "No"} items`}
        </div>
      </div>
    );
  }
}
