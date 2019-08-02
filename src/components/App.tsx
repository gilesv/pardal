import React from "react";
import StoryList from "./StoryList";
import StoryDetails from "./StoryDetails";
import Trader, { FileType } from "../services/trader.service";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import { download } from "../services/file.service";

class Dashboard extends React.Component<IStore> {
  constructor(props: IStore) {
    super(props);

    this.exportStory = this.exportStory.bind(this);
    this.importStory = this.importStory.bind(this);
  }

  public exportStory(fileType: FileType) {
    const storyIndex = this.props.ui.selectedStory;
    const story = this.props.stories.entities[this.props.stories.ids[storyIndex]];
    const result = Trader.exportStory(story, fileType);
    download(story.name, fileType, result);
  }

  public importStory(e: any) {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.onload = (e: any) => {
      Trader.importStory(e.target.result, FileType.JSON);
    }
    reader.readAsBinaryString(file);
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="app-title"> >=pardal<span>v0.0.1</span></div>
        </header>

        <div className="dashboard">
          <aside>
            <StoryList importStory={this.importStory} />
          </aside>

          <main>
            <StoryDetails exportStory={this.exportStory} />
          </main>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: IStore): IStore => {
  return state;
}

export default connect(mapStateToProps)(Dashboard);
