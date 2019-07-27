import React, { RefObject, KeyboardEvent, SyntheticEvent } from "react";
import TaskList from "./TaskList";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Button, FormGroup, InputGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { Story } from "../entities/story.entity";
import { TaskId, Task } from "../entities/task.entity";
import { updateStory, addTask } from "../redux/actions";
import { DateInput } from "@blueprintjs/datetime";

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

  public updateStoryName(e: ContentEditableEvent) {
    const newName = e.target.value.trim() || "New Story";
    const { selectedStory } = this.props;
    selectedStory.name = newName;
    this.props.dispatch(updateStory(selectedStory));
  }

  public handleEnterKeyOnStoryName(e: KeyboardEvent<HTMLDivElement>) {
    const el = this.editableNameElement.current;
    if (["Enter", "Escape"].includes(e.key) && el) {
      el.blur();
    }
  }

  public addTask() {
    const id = this.props.tasksIds.length;
    const task = new Task(id);
    this.props.dispatch(addTask(task, this.props.selectedStory.id));
  }

  // edit story
  public updateAttribute(key: string, value: any) {
    const { selectedStory } = this.props;
    (selectedStory as any)[key] = value;
    this.props.dispatch(updateStory(selectedStory));
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
                <div className="story-details__title">
                  <FormGroup label="Title" labelFor="title-form">
                    <div id="title-form">
                      <ContentEditable placeholder="As a" html={selectedStory.article} onChange={(e) => this.updateAttribute('article', e.target.value)} className="label" />
                      <ContentEditable placeholder="User" html={selectedStory.actor} onChange={(e) => this.updateAttribute('actor', e.target.value)} className="bp3-input field" />
                      <ContentEditable placeholder="I want to" html={selectedStory.verb} onChange={(e) => this.updateAttribute('verb', e.target.value)} className="label" />
                      <ContentEditable placeholder="do something" html={selectedStory.action} onChange={(e) => this.updateAttribute('action', e.target.value)} className="bp3-input field" />
                      <ContentEditable placeholder="so that" html={selectedStory.predicate} onChange={(e) => this.updateAttribute('predicate', e.target.value)} className="label" />
                      <ContentEditable placeholder="get money" html={selectedStory.motivation} onChange={(e) => this.updateAttribute('motivation', e.target.value)} className="bp3-input field" />
                    </div>
                  </FormGroup>

                  <div className="story-details__row">
                    <FormGroup label="Priority">
                      <NumericInput id="priority" value={selectedStory.priority} max={5.0} min={1.0} onValueChange={(n) => this.updateAttribute('priority', n)} />
                    </FormGroup>

                    <FormGroup label="Effort">
                      <NumericInput id="priority" value={selectedStory.effort} max={5.0} min={1.0} onValueChange={(n) => this.updateAttribute('effort', n)} />
                    </FormGroup>

                    <FormGroup label="Kick-start date">
                      <DateInput
                        onChange={(newDate) => this.updateAttribute('startDate', newDate)}
                        value={selectedStory.startDate}
                        formatDate={date => date.toLocaleDateString()}
                        parseDate={str => new Date(str)}
                        placeholder={"M/D/YYYY"} />
                    </FormGroup>

                    <FormGroup label="Hand-off date">
                      <DateInput
                        onChange={(newDate) => this.updateAttribute('handOffDate', newDate)}
                        value={selectedStory.startDate}
                        formatDate={date => date.toLocaleDateString()}
                        parseDate={str => new Date(str)}
                        placeholder={"M/D/YYYY"} />
                    </FormGroup>
                  </div>

                  <FormGroup label="Description">
                    <TextArea
                      growVertically={true}
                      fill={true}
                      onChange={(e) => this.updateAttribute('description', e.target.value)}
                      value={selectedStory.description}
                    />
                  </FormGroup>

                </div>

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
