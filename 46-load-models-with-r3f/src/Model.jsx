import React from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { useGLTF, Clone } from "@react-three/drei"

const Model = () => {
  const model = useGLTF("./hamburger-draco.glb")
  return (
    <>
      <Clone scale={0.35} object={model.scene} position-y={-4}></Clone>
      <Clone scale={0.35} object={model.scene} position-y={-1}></Clone>
      <Clone scale={0.35} object={model.scene} position-y={4}></Clone>
      <Clone scale={0.35} object={model.scene} position-y={-1}></Clone>
    </>
  )
}

export default Model

useGLTF.preload("./hamburger-draco.glb")
