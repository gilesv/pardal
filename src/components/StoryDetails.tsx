import React, { RefObject, KeyboardEvent } from "react";
import TaskList from "./TaskList";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Button, Tag, Menu, Popover, Position, ButtonGroup, FormGroup } from "@blueprintjs/core";
import { Story } from "../entities/story.entity";
import { TaskId, Task, TaskType } from "../entities/task.entity";
import { updateStory, addTask } from "../redux/actions";
import StoryForm from "./StoryForm";
import { FileType } from "../services/trader.service";
import SaveInfo from "./SaveInfo";

interface Props {
  selectedStory: Story,
  tasks: { [key: number]: Task },
  tasksIds: TaskId[],
  exportStory: (fileType: FileType) => void,
  notify: () => void,
  [key: string]: any
}

class StoryDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.footElement = React.createRef();

    this.updateAttribute = this.updateAttribute.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  public footElement: RefObject<HTMLDivElement>;

  public updateStoryName(e: ContentEditableEvent) {
    const name = e.target.value.trim() || "";
    const updated = { ...this.props.selectedStory, name };
    this.props.dispatch(updateStory(updated));
  }

  public updateAttribute(key: string, value: any) {
    const updated = { ...this.props.selectedStory, [key]: value };
    this.props.dispatch(updateStory(updated));
  }

  public addTask(type = TaskType.TASK) {
    const task = new Task(type);
    this.props.dispatch(addTask(task, this.props.selectedStory.id, -1));
    this.scrollDown();
  }

  public scrollDown() {
    setTimeout(() => {
      const footEl = this.footElement.current;

      if (footEl) {
        footEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }

  render() {
    const { selectedStory, isStateDirty, notify } = this.props;

    const exportMenu = (
      <Menu>
        <Menu.Item text="To JSON file" onClick={() => this.props.exportStory(FileType.JSON)} />
        <Menu.Item text="To TXT file" onClick={() => this.props.exportStory(FileType.TXT)} />
      </Menu>
    );

    const addItemMenu = (
      <Menu>
        <Menu.Item text="Task" onClick={() => this.addTask()} />
        <Menu.Item text="Enhancement" onClick={() => this.addTask(TaskType.ENH)} />
        <Menu.Item text="Test" onClick={() => this.addTask(TaskType.TEST)} />
      </Menu>
    );

    return (
      <div className="story-details">
        {
          selectedStory ?
            <>
              <div className="story-details__header">
                <div className="story-details__left">
                  <Tag intent="primary" minimal={true}>STORY</Tag>

                  <div className="story-details__name ellipsis">
                    {selectedStory.name}
                  </div>
                </div>

                <div className="story-details__controls">
                  <SaveInfo isSaving={isStateDirty} />
                  <Popover content={exportMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
                    <Button intent="none" text="Export" icon="export" rightIcon="caret-down" />
                  </Popover>

                  <ButtonGroup>
                    <Button intent="success" text="Add item" icon="add-to-artifact" onClick={() => this.addTask()} />

                    <Popover content={addItemMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
                      <Button intent="success" rightIcon="caret-down" />
                    </Popover>

                  </ButtonGroup>
                </div>
              </div>

              <div className="story-details__body">
                <StoryForm story={selectedStory} update={this.updateAttribute} />
              </div>

              <div className="story-details__items">
                <FormGroup label="Items">
                  <TaskList story={selectedStory} notify={notify} scrollDown={this.scrollDown} />
                </FormGroup>
              </div>

              <div className="story-details__footer" ref={this.footElement}></div>
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
    isStateDirty: state.ui.isDirty,
    ...props
  };
}

export default connect(mapStateToProps)(StoryDetails);
