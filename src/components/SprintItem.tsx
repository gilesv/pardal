import React, { SyntheticEvent, KeyboardEvent, RefObject } from "react";
import { Sprint, SprintId } from "../entities/sprint.entity";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export type ContentEditableEvent = SyntheticEvent<any, Event> & { target: { value: string } };

interface Props {
  sprint: Sprint,
  isSelected: boolean,
  onSelect: (sprintId?: SprintId) => void,
  updateSprint: (sprint: Sprint, e: ContentEditableEvent) => void
  removeSprint: (sprintId?: SprintId) => void
}

export default class SprintItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.editableNameElement = React.createRef()
  }

  editableNameElement: RefObject<HTMLDivElement>;

  handleClick(sprintId?: SprintId) {
    this.props.onSelect(sprintId);
  }

  handleChange(e: ContentEditableEvent) {
    this.props.updateSprint(this.props.sprint, e);
  }

  handleEnterKey(e: KeyboardEvent<HTMLDivElement>) {
    const el = this.editableNameElement.current;
    if (["Enter", "Escape"].includes(e.key) && el) {
      el.blur();
    }
  }

  render() {
    const { sprint, removeSprint, isSelected } = this.props;
    return (
      <div className={`sprint-item ${isSelected ? "selected" : ""}`} onClick={(e) => this.handleClick(sprint.id)}>

        <ContentEditable
          className={`sprint-item__name`}
          innerRef={this.editableNameElement}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleEnterKey(e)}
          html={sprint.name || "aa"} />

        <div className={`sprint-item__delete`} onClick={(e) => removeSprint(sprint.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>

        <div className={`sprint-item__items-count`}>
          {`${sprint.stories ? sprint.stories.length : "No"} items`}
        </div>
      </div>
    );
  }
}
