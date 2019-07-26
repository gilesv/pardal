import React from "react";
import CollapsibleCard from "./CollapsibleCard";
import { UserStory } from "../entities/user-story.entity";

interface Props {
  story: UserStory
}

export default class StoryItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { story } = this.props;
    const title = `[${story.article}] ${story.actor} [${story.verb}] ${story.action} [${story.predicate}] ${story.motivation}`;

    return (
      <CollapsibleCard header={title} type="User Story">
        {story.items && story.items.length > 0 ?
          story.items.map((item: any) => item.title)
          : <span> Nothing here as well </span>
        }
      </CollapsibleCard>
    );
  }
}
