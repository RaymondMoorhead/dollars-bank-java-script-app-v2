class Queue {

    constructor() {
        this.elements = [];
    }

    push(element) {
        this.elements.push(element);
    }

    pop() {
        return this.elements.shift();
    }

    empty() {
        return this.elements.length === 0;
    }

    front() {
        return this.isEmpty() ? undefined : this.elements[0];
    }

    size() {
        return this.elements.length;
    }

    at(i) {
        return this.elements[i];
    }
}

module.exports = Queue;