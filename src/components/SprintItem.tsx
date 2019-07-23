import React, { SyntheticEvent, KeyboardEvent, RefObject } from "react";
import { Sprint, SprintId } from "../entities/sprint.entity";
import ContentEditable from "react-contenteditable";

export type ContentEditableEvent = SyntheticEvent<any, Event> & { target: { value: string } };

interface Props {
  sprint: Sprint,
  updateSprint: (sprint: Sprint, e: ContentEditableEvent) => void
  removeSprint: (sprintId?: SprintId) => void
}

export default class SprintItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.editableNameElement = React.createRef()
  }

  editableNameElement: RefObject<HTMLDivElement>;

  handleChange(e: ContentEditableEvent) {
    this.props.updateSprint(this.props.sprint, e);
  }

  handleEnterKey(e: KeyboardEvent<HTMLDivElement>) {
    const el = this.editableNameElement.current;
    if (e.key === "Enter" && el) {
      el.blur();
    }
  }

  render() {
    const { sprint, removeSprint } = this.props;
    return (
      <div>
        <ContentEditable
          innerRef={this.editableNameElement}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleEnterKey(e)}
          html={sprint.name || "aa"} />
        <button onClick={(e) => removeSprint(sprint.id)}>Delete</button>
      </div>
    );
  }
}
