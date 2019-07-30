import React from "react";
import { FormGroup, InputGroup, NumericInput, TextArea, HTMLSelect } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Task, TaskType } from "../entities/task.entity";

interface Props {
  task: Task,
  update: (key: string, value: any) => void
}

const TaskForm = (props: Props) => {
  const { task, update } = props;

  return (
    <div className="task-form">

      <FormGroup label="Title" inline={true} className="title">
        <InputGroup
          onChange={(e: any) => update('title', e.target.value)}
          value={task.title}
          placeholder="Insert a title..."
          fill={true} />
      </FormGroup>

      <div className="task-form__row">
        <FormGroup label="Assignee">
          <HTMLSelect
            options={["A1", "A2", "A3", "A4", "A5"]}
            onChange={(e) => update('assignee', e.currentTarget.value)}
            value={task.assignee} />
        </FormGroup>

        <FormGroup label="Priority">
          <NumericInput id="priority" allowNumericCharactersOnly={false} value={task.priority} max={5.0} min={1.0} onValueChange={(n) => update('priority', n)} />
        </FormGroup>

        <FormGroup label="Effort">
          <NumericInput id="effort" allowNumericCharactersOnly={false} value={task.effort} max={5.0} min={1.0} onValueChange={(n) => update('effort', n)} />
        </FormGroup>

        <FormGroup label="Kick-start date">
          <DateInput
            onChange={(newDate) => update('startDate', newDate)}
            value={task.startDate}
            formatDate={date => date.toLocaleDateString()}
            parseDate={str => new Date(str)}
            placeholder="M/D/YYYY"
            inputProps={{ leftIcon: "calendar" }} />
        </FormGroup>

        <FormGroup label="Hand-off date">
          <DateInput
            onChange={(newDate) => update('handOffDate', newDate)}
            value={task.handOffDate}
            formatDate={date => date.toLocaleDateString()}
            parseDate={str => new Date(str)}
            placeholder="M/D/YYYY"
            inputProps={{ leftIcon: "calendar" }} />
        </FormGroup>

        <FormGroup label="Type">
          <HTMLSelect
            options={[{ label: "Task", value: TaskType.TASK }, { label: "Enhancement", value: TaskType.ENH }, { label: "Bug", value: TaskType.BUG }]}
            onChange={(e) => update('type', e.currentTarget.value)}
            value={task.type} />
        </FormGroup>

      </div>

      <FormGroup label="Description">
        <TextArea
          growVertically={false}
          fill={true}
          onChange={(e) => update('description', e.target.value)}
          value={task.description}
          placeholder="Describe this item..." />
      </FormGroup>

    </div>
  );
}

export default TaskForm;
