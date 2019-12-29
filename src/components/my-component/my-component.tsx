import { Component, State, Method, h } from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  /**
   * The list of items to set
   */
  @State() itemList: string[];
  // NOTE: gives initial state
  componentWillLoad() {
    this.itemList = [];
  }

  /**
   * Set expiry
   */
  private setExpiry = (id: string): any =>
    setTimeout(this.removeItem, 3000, id);
  /**
   * Remove Item
   */
  private removeItem = (id: string): void => {
    if (this.itemList.includes(id)) {
      this.itemList = this.itemList.filter(listItem => listItem !== id);
    }
  };

  /**
   * Allows for adding an item to the the list
   */
  @Method()
  async addNotification(notificationText: string): Promise<void> {
    // Note: I'm new to typescript, but i have learned when using concat the best way
    // to type it correctly is to create a function specifically dedicated to it.
    this.itemList = this.addItem(notificationText);
    this.setExpiry(notificationText);
  }

  /**
   * a function to wrap and ensure that concat is returning a valid item
   */
  private addItem(item: string): string[] {
    console.log("was i called");
    if (item) {
      return this.itemList.concat(item);
    }
    return this.itemList;
  }

  /**
   * render the notifications
   */
  private renderNotifications = (): any => {
    if (Array.isArray(this.itemList) && this.itemList.length) {
      return this.itemList.map(item => (
        <ul class="alert">
          {item}{" "}
          <button onClick={(): void => this.removeItem(item)}>Remove Me</button>
        </ul>
      ));
    }
    return <div></div>;
  };

  render() {
    return (
      <div class="list-container">
        <ul class="alert-list">{this.renderNotifications()}</ul>
      </div>
    );
  }
}
