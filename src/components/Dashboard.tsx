import React from "react";
import StoryList from "./StoryList";
import StoryDetails from "./StoryDetails";
import Trader, { FileType } from "../services/trader.service";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import { download } from "../services/file.service";
import Notification from "../entities/notification.entity";
import { Story, StoryId } from "../entities/story.entity";
import IEntityMap from "../redux/utils/entity-map.interface";
import NotifyDock from "./NotifyDock";
import { setStateClean } from "../redux/actions";
import { importFromStorage, exportToStorage } from "../services/localStorage.service";
interface Props {
  selectedStory: number,
  stories: IEntityMap<Story>,
  isStateDirty: boolean,
  appVersion: string,
  [key: string]: any
}

class Dashboard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.exportStory = this.exportStory.bind(this);
    this.importStory = this.importStory.bind(this);
  }

  public componentDidMount() {
    const storageState = importFromStorage();

    if (storageState) {
      Trader.importStories(storageState, FileType.JSON);
    }

    setInterval(() => {
      const json = Trader.exportStories(
        this.props.stories.ids.map((storyId: StoryId) => this.props.stories.entities[storyId]),
        FileType.JSON,
        this.props.appVersion
      );
      exportToStorage(json)
    }, 5000);

    window.onbeforeunload = (e: any) => {
      return "";
    };
  }

  private notify(notification: Notification) {
    NotifyDock.show(notification);
  }

  public exportStory(fileType: FileType) {
    const storyIndex = this.props.selectedStory;
    const story = this.props.stories.entities[this.props.stories.ids[storyIndex]];
    const result = Trader.exportStories([story], fileType, this.props.appVersion);

    this.notify(new Notification("Your download will begin shortly.", "download"));
    setTimeout(() => download(story.name, fileType, result), 1500);
    this.props.dispatch(setStateClean());
  }

  public importStory(e: any) {
    const file: File = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let notification;

        try {
          const storyName = Trader.importStories(e.target.result, FileType.JSON);
          notification = new Notification(`"${storyName}" was imported successfully.`, "tick")
        } catch (e) {
          notification = new Notification(`${e.message}`, "error");
        }

        this.notify(notification);
      }
      reader.readAsText(file);
    }
  }

  render() {
    const { stories, appVersion } = this.props;
    return (
      <div className="app">
        <div className="dashboard">
          <aside>
            <header>
              <div className="app-title"> >=pardal<span>v{appVersion}</span></div>
            </header>

            <StoryList importStory={this.importStory} />
          </aside>

          {
            stories && stories.ids && stories.ids.length > 0 ?
              <main>
                <StoryDetails exportStory={this.exportStory} />
              </main>
              : null
          }

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    selectedStory: state.ui.selectedStory,
    stories: state.stories,
    isStateDirty: state.ui.isDirty,
    ...props
  };
}

export default connect(mapStateToProps)(Dashboard);
