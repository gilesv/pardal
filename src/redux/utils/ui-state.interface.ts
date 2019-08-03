import Notification from "../../entities/notification.entity";

export default interface IUiState {
  selectedStory: number,
  notifications: Notification[],
  [key: string]: any
}
