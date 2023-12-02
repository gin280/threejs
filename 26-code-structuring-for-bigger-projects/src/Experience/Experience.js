import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Resources from "./Utils/Resources"
import sources from "./sources"
import Debug from "./Utils/Debug"

export default class Experience {
  static instance = null
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance
    }

    Experience.instance = this
    // Global access
    window.experience = this
    this.canvas = canvas

    // Set up
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    this.setupEventListeners()
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  setupEventListeners() {
    this.sizes.on("resize", () => this.resize())
    this.time.on("tick", () => this.update())
  }

  removeEventListeners() {
    this.sizes.off("resize", this.resize)
    this.time.off("tick", this.update)
  }

  destroy() {
    this.removeEventListeners()
    this.disposeScene(this.scene)
    this.disposeRenderer(this.renderer)
    this.disposeCamera(this.camera)

    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }

  disposeScene(scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose()

        if (object.material) {
          if (object.material instanceof Array) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      }
    })
  }

  disposeRenderer(renderer) {
    renderer.instance.dispose()
  }

  disposeCamera(camera) {
    camera.controls.dispose()
  }
}
