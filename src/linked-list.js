const Node = require("./node");

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    let node = new Node(data);
    if (!this._head) {
      this._tail = node;
      this._head = node;
    } else {
      node.prev = this._tail;
      this._tail.next = node;
      this._tail = node;
    }
    this.length++;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    let counter = 0;
    let cur = this._head;
    while (cur) {
      if (counter === index) {
        return cur.data;
      }
      cur = cur.next;
      counter++;
    }
  }

  insertAt(index, data) {
    let cur = this._head;
    let counter = 1;
    let node = new Node(data);
    if (!this._head) {
      this._tail = node;
      this._head = node;
    } else if (index === 0) {
      this._head.prev = node;
      node.next = this._head;
      this._head = node;
    } else {
      while (cur) {
        cur = cur.next;
        if (counter === index) {
          node.prev = cur.prev;
          cur.prev.next = node;
          node.next = cur;
          cur.prev = node;
        }
        counter++;
      }
    }
    this.length++;
    return this;
  }

  isEmpty() {
    return this.length < 1;
  }

  clear() {
    let cur = this._head;
    while (cur) {
      cur.data = null;
      if (cur.prev) {
        cur.prev = null;
      }
      if (cur.next) {
        cur = cur.next;
        cur.prev.next = null;
      } else {
        cur = null;
      }
      this.length--;
    }
    return this;
  }

  deleteAt(index) {
    let cur = this._head;
    let counter = 1;
    if (index === 0) {
      cur.data = null;
      this._head = null;
      this._tail = null;
    }
    while (cur) {
      if (index === counter) {
        if (cur.prev && cur.next) {
          cur.prev.next = cur.next;
          cur.next.prev = cur.prev;
        } else if (!cur.prev) {
          cur.next.prev = null;
          cur.next = null;
        } else {
          cur.prev.next = null;
          cur.prev = null;
        }
        this.length--;
      }
      cur = cur.next;
      counter++;
    }
    return this;
  }

  reverse() {
    let cur = this._head;
    let next = null;
    let prev = null;

    while (cur) {
      next = cur.next;
      prev = cur.prev;

      cur.next = prev;
      cur.prev = next;

      prev = cur;
      cur = next;
    }
    this._tail = this._head;
    this._head = prev;
    return this;
  }

  indexOf(data) {
    let cur = this._head;
    let counter = 0;
    while (cur) {
      if (cur.data === data) {
        return counter;
      } else {
        cur = cur.next;
        counter++;
      }
    }
    return -1;
  }
}

module.exports = LinkedList;
