import { FileInput, Button } from "@blueprintjs/core";
import React from "react";

interface Props {
  importStory: Function,
  ref: React.RefObject<{}>
}

const FileSelector = (props: Props) => {
  const { importStory, ref } = props;
  return (
    <div>
      <div className="file-selector">
        Import from JSON

      </div>
    </div>
  );
}

export default FileSelector;
