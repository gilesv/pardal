import React from "react";
import SprintList from "./SprintList";
import "../styles/app.scss";
import { SprintId } from "../entities/sprint.entity";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <div className="app-title">taskbase <span>v0.0.1</span></div>
        </header>

        <main>
          <SprintList />
        </main>
      </div>
    );
  }
}
