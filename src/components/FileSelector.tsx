import { FileInput, Button } from "@blueprintjs/core";
import React from "react";

interface Props {
  importStory: Function
}

const FileSelector = (props: Props) => {
  const { importStory } = props;
  return (
    <label>
      <Button text="Import" icon="import" />
      <FileInput
        onInputChange={(e) => importStory(e)}
        inputProps={{style: {display: "none"}}} />
    </label>
  );
}

export default FileSelector;
