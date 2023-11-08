type ev = {
  ons: Array<Function>;
  onces: Array<Function>;
};

class MyEventEmitter {
  private events: Map<string, ev>;
  constructor() {
    this.events = new Map<string, ev>();
  }

  on(event: string, fn: Function) {
    if (this.events.has(event)) {
      this.events.get(event)?.ons.push(fn);
    } else {
      this.events.set(event, { ons: [fn], onces: [] });
    }
  }

  off(event: string, fn: Function) {
    if (this.events.has(event)) {
      const newList = this.events.get(event)?.ons.filter((foo) => foo != fn);
      if (newList) {
        this.events.set(event, {
          ons: newList,
          onces: this.events.get(event)?.onces || [],
        });
      } else {
        this.events.delete(event);
      }
    } else {
      console.log(`ERROR: '${event}' event is not defined`);
    }
  }

  once(event: string, fn: Function) {
    if (this.events.has(event)) {
      this.events.get(event)?.onces.push(fn);
    } else {
      this.events.set(event, { ons: [], onces: [fn] });
    }
  }

  delete(event: string) {
    this.events.delete(event);
  }

  emit(event: string, ...args: any[]) {
    if (this.events.has(event)) {
      this.events.get(event)?.ons.forEach((fn) => fn(...args));
      this.events.get(event)?.onces.forEach((fn) => fn(...args));
      this.events.get(event)!.onces = [];
    } else {
      console.log(`ERROR: '${event}' event is not defined`);
    }
  }
}

const myEventEmitter = new MyEventEmitter();
