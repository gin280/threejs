import EventEmitter from "./EventEmitter.js"
import { Clock } from "three"

export default class Time extends EventEmitter {
  constructor() {
    super()

    this.clock = new Clock()
    this.tick()
  }

  tick = () => {
    this.delta = this.clock.getDelta()
    this.elapsed = this.clock.getElapsedTime()

    this.trigger("tick")

    window.requestAnimationFrame(this.tick)
  }
}
