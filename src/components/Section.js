export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((element) => {
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
