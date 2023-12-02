import * as THREE from "three"
import Experience from "./Experience.js"

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true, // antialias属性设置为true，以启用抗锯齿，这可以使3D场景的边缘看起来更平滑。
    })
    //这里设置了渲染器的色调映射(toneMapping)为THREE.CineonToneMapping，这种色调映射用于模拟电影胶片的颜色响应特性。toneMappingExposure设置了色调映射的曝光级别，这里设置为1.75，影响整个场景的亮度。
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    // 这部分代码开启了阴影映射，并设置阴影类型为PCFSoftShadowMap。PCF代表“百分比更近过滤”（Percentage-Closer Filtering），是一种用于软化阴影边缘的技术。
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    // setClearColor设置了渲染器清除画面时使用的颜色。这里使用的是深色调的背景颜色。
    this.instance.setClearColor("#211d20")
    // setSize设置渲染器的大小，这通常与canvas的大小一致。setPixelRatio设置了渲染器的像素比例，这个比例通常与设备的物理像素比相等，以确保在高分辨率屏幕上渲染时不会出现模糊。
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
