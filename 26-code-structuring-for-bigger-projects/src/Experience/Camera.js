import * as THREE from "three"
import Experience from "./Experience"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    // 从外部获取或使用默认值
    const fieldOfView = 75
    const aspectRatio = this.sizes.width / this.sizes.height
    const nearPlane = 0.1
    const farPlane = 100

    this.instance = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.instance, this.canvas)
    this.orbitControls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.orbitControls.update()
  }
}
