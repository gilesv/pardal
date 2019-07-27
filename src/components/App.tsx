import React from "react";
import StoryList from "./StoryList";
import StoryDetails from "./StoryDetails";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <div className="app-title"> >=pardal<span>v0.0.1</span></div>
        </header>

        <div className="dashboard">
          <aside>
            <StoryList />
          </aside>

          <main>
            <StoryDetails />
          </main>
        </div>

      </div>
    );
  }
}
