import React from "react";
import { FormGroup, InputGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Story } from "../entities/story.entity";

interface Props {
  story: Story,
  update: (key: string, value: any) => void
}

const StoryForm = (props: Props) => {
  const { story, update } = props;

  return (
    <div className="story-form">
      <div className="story-form__row">
        <FormGroup label="Name">
          <InputGroup
            onChange={(e: any) => update('name', e.target.value)}
            value={story.name}
            placeholder="STORY-001" />
        </FormGroup>

        <FormGroup label="Priority">
          <NumericInput id="priority" value={story.priority} max={5.0} min={1.0} onValueChange={(n) => update('priority', n)} />
        </FormGroup>

        <FormGroup label="Effort">
          <NumericInput id="effort" value={story.effort} max={100.0} min={1.0} onValueChange={(n) => update('effort', n)} />
        </FormGroup>

        <FormGroup label="Kick-start date">
          <DateInput
            onChange={(newDate) => update('startDate', newDate)}
            value={story.startDate}
            formatDate={date => date.toLocaleDateString()}
            parseDate={str => new Date(str)}
            placeholder="M/D/YYYY"
            inputProps={{ leftIcon: "calendar" }} />
        </FormGroup>

        <FormGroup label="Hand-off date">
          <DateInput
            onChange={(newDate) => update('handOffDate', newDate)}
            value={story.handOffDate}
            formatDate={date => date.toLocaleDateString()}
            parseDate={str => new Date(str)}
            placeholder="M/D/YYYY"
            inputProps={{ leftIcon: "calendar" }} />
        </FormGroup>
      </div>

      <FormGroup label="Title">
        <InputGroup
          onChange={(e: any) => update('title', e.target.value)}
          value={story.title}
          placeholder="Insert a title..."
          fill={true} />
      </FormGroup>

      <FormGroup label="Acceptance Criteria">
        <TextArea
          growVertically={false}
          fill={true}
          onChange={(e) => update('description', e.target.value)}
          value={story.description}
          placeholder="Describe this item..." />
      </FormGroup>

    </div>
  );
}

export default StoryForm;
