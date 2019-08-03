import { IconName, Intent } from "@blueprintjs/core";

export default class Notification {
  constructor(message: string, intent: Intent) {
    this.message = message || "";
    this.intent = intent || "none";
    this.onDismiss = () => { };
    this.timeout = 3000;
  }

  message: string;
  icon?: IconName;
  intent: Intent;
  onDismiss: Function;
  timeout: number;
}
