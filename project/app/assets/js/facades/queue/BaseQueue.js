export default class BaseQueue {
    constructor() {
        this.queue = [];
    }

    getQueueItem() {
        return this.queue.shift();
    }

    getQueueCount() {
        return this.queue.length;
    }

    runQueue() {
        throw new Error('You have to implement the method runQueue!');
    }
}