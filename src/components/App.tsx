import React from "react";
import SprintList from "./SprintList";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Taskbase</h1>
        <SprintList />
      </div>
    );
  }
}
