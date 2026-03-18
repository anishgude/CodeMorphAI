class Cart {
  constructor(items = []) {
    this.items = items;
  }

  add(item) {
    this.items.push(item);
    return this.items.length;
  }
}
