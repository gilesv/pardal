import React from "react";
import { Task, getTaskTags } from "../entities/task.entity";
import TaskForm from "./TaskForm";
import { Collapse, Tag, Icon, Classes, Button, Popover, Position, Menu, Dialog } from "@blueprintjs/core";
import { StoryId } from "../entities/story.entity";

interface Props {
  task: Task,
  addTaskAtIndex: (index: number) => void,
  updateTask: (task: Task) => void,
  removeTask: (task: Task, storyId: StoryId) => void,
  isRaised: boolean,
  index: number,
  storyId: StoryId
}

export default class TaskItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.update = this.update.bind(this);
    this.updateEffort = this.updateEffort.bind(this);
    this.toggleBody = this.toggleBody.bind(this);
    this.handleOptionsClick = this.handleOptionsClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  public state = {
    isBodyVisible: true,
    isDialogVisible: false,
  }

  toggleDialog() {
    this.setState({
      ...this.state,
      isDialogVisible: !this.state.isDialogVisible
    });
  }

  toggleBody() {
    const isOpen = this.props.task.isBodyVisible;
    this.update("isBodyVisible", !isOpen);
  }

  update(key: string, value: any) {
    const updated = { ...this.props.task, [key]: value };
    this.props.updateTask({ ...updated, tags: getTaskTags(updated)});
  }

  updateEffort(n: number, s: string) {
    let value = String(Number(s.replace(".", "")) / 10);

    if (value.length === 1) {
      value += ".0";
    }

    if (Number(value) < 10) {
      this.update('effort', value);
    }
  }

  deleteItem() {
    this.toggleDialog();

    setTimeout(() => {
      const { task, storyId } = this.props;
      this.props.removeTask(task, storyId);
    }, 300);
  }

  handleOptionsClick(e: any) {
    e.stopPropagation();
  }

  render() {
    const { task, addTaskAtIndex, index, isRaised } = this.props;

    const optionsMenu = (
      <Menu>
        <Menu.Item text="Delete item" onClick={this.toggleDialog} />
      </Menu>
    );

    return (
      <div className={`task-item ${isRaised ? 'task-item--raised' : ''}`}>
        <AddTaskButton type="before" visible={index === 0} index={index} addTask={(index: number) => addTaskAtIndex(index)} />

        <div className="task-item__header" onClick={this.toggleBody}>
          <div className="task-item__header-left">
            <div className="task-item__tags">
              {
                task.tags.map((tag) => {
                  return <Tag key={`tag#${tag}`} intent="primary" minimal={true}>{tag}</Tag>
                })
              }
            </div>

            <div className="task-item__title ellipsis">{task.title}</div>
          </div>

          <div className="task-item__header-right" onClick={this.handleOptionsClick}>
            <Popover content={optionsMenu} position={Position.BOTTOM_RIGHT} minimal={true}>
              <Button rightIcon="more" minimal={true} />
            </Popover>
          </div>
        </div>

        <Collapse isOpen={task.isBodyVisible}>
          <div className="task-item__body">
            <TaskForm task={task} update={this.update} updateEffort={this.updateEffort} showDates={false} />
          </div>
        </Collapse>

        <AddTaskButton type="after" visible={true} index={index} addTask={(index: number) => addTaskAtIndex(index)} />

        <Dialog isOpen={this.state.isDialogVisible} onClose={this.toggleDialog} title="Delete item">
          <div className={Classes.DIALOG_BODY}>
            Are you really sure to delete the following item: <b>{task.title}</b>? This cannot be undone.
          </div>

          <div className={`${Classes.DIALOG_FOOTER} task-item__dialog-footer`} >
            <Button intent="none" onClick={this.toggleDialog}>Cancel</Button>
            <Button intent="danger" onClick={this.deleteItem}>Delete</Button>
          </div>
        </Dialog>
      </div >
    );
  }
}

const AddTaskButton = (props: any) => {
  const addIndex = props.type === "after" ? props.index + 1 : props.index;
  return props.visible ? (
    <div className={`task-item__add-item ${props.type}`} title="Add new item here" onClick={() => props.addTask(addIndex)}>
      <div className="line"></div>
      <div className="text">
        ADD NEW ITEM
      </div>
    </div>
  ) : null;
}
