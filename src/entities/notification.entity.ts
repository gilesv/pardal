import { IconName, Intent } from "@blueprintjs/core";

export default class Notification {
  constructor(message: string, icon: IconName) {
    this.message = message || "";
    this.icon = icon;
    this.intent = "none";
    this.timeout = 3000;
  }

  message: string;
  icon?: IconName;
  intent: Intent;
  timeout: number;
}
