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
import { setStateClean, addStory, removeStory, selectStory, removeTask } from "../redux/actions";
import { importFromStorage, exportToStorage } from "../services/localStorage.service";
import Header from "./Header";

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
    this.addStory = this.addStory.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.importStory = this.importStory.bind(this);
    this.notify = this.notify.bind(this);
  }

  public componentDidMount() {
    this.restorePreviousWork();
    this.saveProgress();
  }

  public addStory() {
    const story = new Story("New Story");
    this.props.dispatch(addStory(story));
    setTimeout(() => this.selectStory(-1), 50);
  }

  public deleteStory(story: Story, index: number) {
    const selectedStory = this.props.selectedStory;
    const isFirstStory = index === 0;
    const isSelected = index === selectedStory;
    const isAfterSelected = index > selectedStory;

    for (let task of story.tasks) {
      this.props.dispatch(removeTask(task.id, story.id));
    }

    this.props.dispatch(removeStory(story.id));

    if (isFirstStory && isSelected) {
      this.selectStory(0);
    } else if (!isAfterSelected) {
      this.selectStory(selectedStory - 1);
    }
  }

  public selectStory(index: number) {
    this.props.dispatch(selectStory(
      index === -1 ? this.props.stories.ids.length - 1 : index
    ));
  }

  public restorePreviousWork() {
    const storageState = importFromStorage();

    if (storageState) {
      Trader.importStories(storageState, FileType.JSON);
      this.notify(new Notification("Your work was restored!", "tick"));
    }
  }

  public saveProgress() {
    setInterval(() => {
      if (this.props.isStateDirty) {
        const json = Trader.exportStories(
          this.props.stories.ids.map((storyId: StoryId) => this.props.stories.entities[storyId]),
          FileType.JSON,
          this.props.appVersion
        );

        exportToStorage(json);
        this.props.dispatch(setStateClean());
        console.log("Progress saved.");
      }
    }, 2500);
  }

  public exportStory(fileType: FileType) {
    const storyIndex = this.props.selectedStory;
    const story = this.props.stories.entities[this.props.stories.ids[storyIndex]];
    const result = Trader.exportStories([story], fileType, this.props.appVersion);

    this.notify(new Notification("Your download will begin shortly.", "download"));

    setTimeout(() => download(story.name, fileType, result), 1000);
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
          notification = new Notification(`"${storyName}" was imported successfully.`, "tick");
          this.selectStory(-1);
        } catch (e) {
          notification = new Notification(`${e.message}`, "error");
        }

        this.notify(notification);
      }
      reader.readAsText(file);
    }
  }

  public notify(notification: Notification) {
    NotifyDock.show(notification);
  }

  render() {
    const { stories, appVersion } = this.props;
    const hasAnyStory = stories && stories.ids && stories.ids.length > 0;

    return (
      <div className="app">
        <div className="dashboard">
          <aside>
            <Header appVersion={appVersion} />
            <StoryList
              addStory={this.addStory}
              deleteStory={this.deleteStory}
              selectStory={this.selectStory}
              importStory={this.importStory} />
          </aside>

          {
            hasAnyStory
              ? <main>
                <StoryDetails exportStory={this.exportStory} notify={this.notify} />
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
