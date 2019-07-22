import { ActionType } from "../actions";

export default interface IAction {
  type: ActionType,
  payload: {
    [key: string]: any,
  }
}
