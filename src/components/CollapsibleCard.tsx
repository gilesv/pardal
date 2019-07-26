import React from "react";
import { Collapse, Tag } from "@blueprintjs/core";

interface Props {
  children: any,
  header: any,
  type: string,
}

export default class CollapsibleCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public state = {
    isBodyVisible: true
  }

  handleClick() {
    this.setState({
      ...this.state,
      isBodyVisible: !this.state.isBodyVisible
    });
  }

  render() {
    return (
      <div className="ccard">
        <div className="ccard__header" onClick={e => this.handleClick()}>
          <Tag intent="primary" minimal={true}>{this.props.type}</Tag>
          {this.props.header}
        </div>
        <Collapse isOpen={this.state.isBodyVisible}>
          <div className="ccard__body">
            {this.props.children}
          </div>
        </Collapse>
      </div>
    );
  }
}
