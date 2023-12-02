import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      gltfLoader: new GLTFLoader(),
    }
  }

  async startLoading() {
    const promises = this.sources.map((source) => this.load(source))
    await Promise.all(promises)
    this.trigger("resourcesLoaded")
  }

  async load(source) {
    try {
      switch (source.type) {
        case "texture":
          this.items[source.name] = await this.loaders.textureLoader.loadAsync(
            source.path
          )
          break
        case "cubeTexture":
          this.items[source.name] =
            await this.loaders.cubeTextureLoader.loadAsync(source.path)
          break
        case "gltfModel":
          this.items[source.name] = await this.loaders.gltfLoader.loadAsync(
            source.path
          )
          break
        default:
          console.error("Unknown type of resource:", source.type)
      }
    } catch (error) {
      console.error("Error loading resource:", source.name, error)
    } finally {
      this.loaded++
    }
  }
}
