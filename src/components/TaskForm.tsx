import React from "react";
import { FormGroup, InputGroup, NumericInput, TextArea, HTMLSelect } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Task, TaskType, TaskArea, Assignee } from "../entities/task.entity";

interface Props {
  task: Task,
  update: (key: string, value: any) => void,
  updateEffort: (n: number, s: string) => void,
  showDates: boolean
}

const TaskForm = (props: Props) => {
  const { task, update, updateEffort, showDates } = props;

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
        <FormGroup label="Type">
          <HTMLSelect
            options={[{ label: "Task", value: TaskType.TASK }, { label: "Enhancement", value: TaskType.ENH }, { label: "Test", value: TaskType.TEST }]}
            onChange={(e) => update('type', e.currentTarget.value)}
            value={task.type} />
        </FormGroup>

        <FormGroup label="Effort">
          <NumericInput
            allowNumericCharactersOnly={false}
            min={0.1}
            value={task.effort}
            buttonPosition={"none"}
            onValueChange={(n, s) => updateEffort(n, s)} />
        </FormGroup>

        <FormGroup label="Priority">
          <NumericInput value={task.priority} max={5.0} min={1.0} onValueChange={(n) => update('priority', n)} />
        </FormGroup>

        {
          showDates ?
            <>
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
            </> : null
        }

        <FormGroup label="Assignee">
          <HTMLSelect
            options={Object.values(Assignee)}
            onChange={(e) => update('assignee', e.currentTarget.value)}
            value={task.assignee} />
        </FormGroup>

        {
          task.type !== TaskType.TEST ?
            <FormGroup label="Area">
              <HTMLSelect
                options={[{ label: "Frontend", value: TaskArea.FE }, { label: "Backend", value: TaskArea.BE }, { label: "FE & BE", value: TaskArea.BOTH }]}
                onChange={(e) => update('area', e.currentTarget.value)}
                value={task.area} />
            </FormGroup> : null
        }
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
