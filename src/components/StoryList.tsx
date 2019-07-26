import React, { SyntheticEvent } from "react";
import { Sprint } from "../entities/sprint.entity";
import StoryItem from "./StoryItem";
import { UserStory, UserStoryId } from "../entities/user-story.entity";
import { connect } from "react-redux";
import { IStore } from "../redux/reducers";
import { Button } from "@blueprintjs/core";
import { addStory } from "../redux/actions";

interface Props {
  stories: { [key: number]: UserStory },
  storiesIds: UserStoryId[],
  sprint: Sprint,
  [key: string]: any
}

class StoryList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  addStory() {
    const id = this.props.storiesIds.length;
    const story = new UserStory(id);
    this.props.dispatch(addStory(story, this.props.sprint.id));
  }

  render() {
    const { sprint } = this.props;
    return (
      <div className="story-list">
        <div className="story-list__header">
          {
            sprint ? <Button intent="success" text="Add Story" onClick={(e: SyntheticEvent) => this.addStory()} /> : null
          }
        </div>
        {
          sprint && sprint.stories && sprint.stories.length > 0 ?
            sprint.stories.map(storyId => {
              const story = this.props.stories[storyId];
              return <StoryItem story={story} />
            })
            : <span>Create an item!</span>
        }

      </div>

    );
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    stories: state.userStories.entities,
    storiesIds: state.userStories.ids,
    ...props
  };
}

export default connect(mapStateToProps)(StoryList);
