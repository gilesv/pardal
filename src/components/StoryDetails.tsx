import React, { RefObject, KeyboardEvent, SyntheticEvent } from "react";
import TaskList from "./TaskList";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Button } from "@blueprintjs/core";
import { Story } from "../entities/story.entity";
import { TaskId, Task } from "../entities/task.entity";
import { updateStory, addTask } from "../redux/actions";

interface Props {
  selectedStory: Story,
  tasks: { [key: number]: Task },
  tasksIds: TaskId[],
  [key: string]: any
}

class StoryDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.editableNameElement = React.createRef()
  }

  public editableNameElement: RefObject<HTMLDivElement>;

  updateStoryName(e: ContentEditableEvent) {
    const newName = e.target.value.trim() || "New Story";
    const { selectedStory } = this.props;
    selectedStory.name = newName;
    this.props.dispatch(updateStory(selectedStory));
  }

  handleEnterKeyOnStoryName(e: KeyboardEvent<HTMLDivElement>) {
    const el = this.editableNameElement.current;
    if (["Enter", "Escape"].includes(e.key) && el) {
      el.blur();
    }
  }

  addTask() {
    const id = this.props.tasksIds.length;
    const task = new Task(id);
    this.props.dispatch(addTask(task, this.props.selectedStory.id));
  }

  render() {
    const { selectedStory } = this.props;

    return (
      <div className="story-details">
        {
          selectedStory ?
            <>
              <div className="story-details__header">
                <ContentEditable
                  className="story-details__name"
                  innerRef={this.editableNameElement}
                  onChange={(e) => this.updateStoryName(e)}
                  onKeyDown={(e) => this.handleEnterKeyOnStoryName(e)}
                  html={selectedStory.name || "oi"} />

                <div className="story-details__controls">
                  <Button intent="none" text="Export" />
                  <Button intent="success" text="Add Item" onClick={(e: SyntheticEvent) => this.addTask()} />
                </div>
              </div>

              <div className="story-details__body">
                hahahahhh
              </div>

              <div className="story-details__stories">
                <TaskList story={selectedStory} />
              </div>
            </>
            : <span>Create an item</span>
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
