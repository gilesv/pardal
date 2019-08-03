import React from "react";
import StoryList from "./StoryList";
import StoryDetails from "./StoryDetails";
import Trader, { FileType } from "../services/trader.service";
import { IStore } from "../redux/reducers";
import { connect } from "react-redux";
import { download } from "../services/file.service";
import { Toaster, Toast } from "@blueprintjs/core";
import Notification from "../entities/notification.entity";
import { Story } from "../entities/story.entity";
import IEntityMap from "../redux/utils/entity-map.interface";
import { addNotification } from "../redux/actions";

interface Props {
  selectedStory: number,
  notifications: Notification[],
  stories: IEntityMap<Story>,
  [key: string]: any
}

class Dashboard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.exportStory = this.exportStory.bind(this);
    this.importStory = this.importStory.bind(this);
  }

  public exportStory(fileType: FileType) {
    const storyIndex = this.props.selectedStory;
    const story = this.props.stories.entities[this.props.stories.ids[storyIndex]];
    const result = Trader.exportStory(story, fileType);

    this.props.dispatch(
      addNotification(new Notification("The file download will begin shortly.", "success"))
    );

    setTimeout(() => download(story.name, fileType, result), 2000);
  }

  public importStory(e: any) {
    const file: File = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let notification;
        try {
          const storyName = Trader.importStory(e.target.result, FileType.JSON);
          notification = new Notification(`"${storyName}" was imported successfully.`, "success")
        } catch (e) {
          notification = new Notification(`${e.message}`, "danger");
        }

        this.props.dispatch(addNotification(notification));
      }
      reader.readAsText(file);
    }
  }

  render() {
    const { notifications } = this.props;
    return (
      <div className="app">
        <Toaster>
          {
            notifications.map((n: Notification) => <Toast message={n.message} intent={n.intent} timeout={n.timeout} />)
          }
        </Toaster>

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

const mapStateToProps = (state: IStore, props: any): Props => {
  return {
    selectedStory: state.ui.selectedStory,
    notifications: state.ui.notifications,
    stories: state.stories,
    ...props
  };
}

export default connect(mapStateToProps)(Dashboard);
