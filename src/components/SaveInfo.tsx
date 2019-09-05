import React from "react";
import { Icon } from "@blueprintjs/core";

interface Props {
  isSaving: boolean
}

export default function SaveInfo(props: Props) {
  const { isSaving } = props;

  return (
    <div className="save-info">
      {
        isSaving ? 'Saving...' : <span title="Your changes have been saved."><Icon icon="small-tick" iconSize={15}></Icon></span>
      }
    </div>
  );
}
