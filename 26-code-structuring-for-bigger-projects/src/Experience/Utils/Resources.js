import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    // Options
    this.sources = sources

    // Set up
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  startLoading() {
    for (const source of this.sources) {
      this.load(source)
    }
  }

  load(source) {
    let name = source.name
    let type = source.type
    let path = source.path

    switch (type) {
      case "texture":
        this.loaders.textureLoader.load(path, (texture) => {
          this.items[name] = texture
          this.checkLoading()
        })
        break
      case "cubeTexture":
        this.loaders.cubeTextureLoader.load(path, (texture) => {
          this.items[name] = texture
          this.checkLoading()
        })
        break
      case "gltfModel":
        this.loaders.gltfLoader.load(path, (gltf) => {
          this.items[name] = gltf
          this.checkLoading()
        })
        break
      default:
        console.error("Unknown type of resource:", type)
    }
  }

  checkLoading() {
    this.loaded++
    if (this.loaded === this.toLoad) {
      this.trigger("ready")
    }
  }
}
