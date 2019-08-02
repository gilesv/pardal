import React, { RefObject, KeyboardEvent } from "react";
import TaskList from "./TaskList";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Button, Tag, Menu, Popover, Position } from "@blueprintjs/core";
import { Story } from "../entities/story.entity";
import { TaskId, Task } from "../entities/task.entity";
import { updateStory } from "../redux/actions";
import StoryForm from "./StoryForm";
import { FileType } from "../services/trader.service";

interface Props {
  selectedStory: Story,
  tasks: { [key: number]: Task },
  tasksIds: TaskId[],
  exportStory: (fileType: FileType) => void,
  [key: string]: any
}

class StoryDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.editableNameElement = React.createRef()

    this.updateAttribute = this.updateAttribute.bind(this);
  }

  public editableNameElement: RefObject<HTMLDivElement>;

  public updateStoryName(e: ContentEditableEvent) {
    const name = e.target.value.trim() || "";
    const updated = { ...this.props.selectedStory, name };
    this.props.dispatch(updateStory(updated));
  }

  public handleEnterKeyOnStoryName(e: KeyboardEvent<HTMLDivElement>) {
    const el = this.editableNameElement.current;
    if (["Enter", "Escape"].includes(e.key) && el) {
      el.blur();
    }
  }

  // edit story
  public updateAttribute(key: string, value: any) {
    const updated = { ...this.props.selectedStory, [key]: value };
    this.props.dispatch(updateStory(updated));
  }

  render() {
    const { selectedStory } = this.props;

    const exportMenu = (
      <Menu>
        <Menu.Item text="To JSON file" onClick={() => this.props.exportStory(FileType.JSON)} />
        <Menu.Item text="To Radar export file" onClick={() => this.props.exportStory(FileType.DTD)} />
      </Menu>
    );

    return (
      <div className="story-details">
        {
          selectedStory ?
            <>
              <div className="story-details__header">
                <div className="story-details__name">
                  <Tag intent="primary" minimal={true}>STORY</Tag>

                  <ContentEditable
                    innerRef={this.editableNameElement}
                    onChange={(e) => this.updateStoryName(e)}
                    onKeyDown={(e) => this.handleEnterKeyOnStoryName(e)}
                    html={selectedStory.name || ""} />
                </div>

                <div className="story-details__controls">
                  <Popover content={exportMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
                    <Button intent="none" text="Export" icon="export" rightIcon="caret-down" />
                  </Popover>
                </div>
              </div>

              <div className="story-details__body">
                <StoryForm story={selectedStory} update={this.updateAttribute} />
              </div>

              <div className="story-details__stories">
                <TaskList story={selectedStory} />
              </div>
            </> : null
        }

      </div>
    );
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  const selectedStoryIndex = state.ui.selectedStory;
  const selectedStory = state.stories.entities[state.stories.ids[selectedStoryIndex]];

  return {
    selectedStory,
    tasks: state.tasks.entities,
    tasksIds: state.tasks.ids,
    ...props
  };
}

export default connect(mapStateToProps)(StoryDetails);
