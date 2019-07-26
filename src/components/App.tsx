import React from "react";
import SprintList from "./SprintList";
import SprintDetails from "./SprintDetails";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <div className="app-title"> >=pardal<span>v0.0.1</span></div>
        </header>

        <div className="dashboard">
          <aside>
            <SprintList />
          </aside>

          <main>
            <SprintDetails />
          </main>
        </div>

      </div>
    );
  }
}
