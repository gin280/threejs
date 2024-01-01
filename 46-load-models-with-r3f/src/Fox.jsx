import React, { useEffect } from "react"
import { useGLTF, Clone, useAnimations } from "@react-three/drei"
import { useControls } from "leva"

const Fox = () => {
  const model = useGLTF("./Fox/glTF/Fox.gltf")
  const animations = useAnimations(model.animations, model.scene)
  const { animationName } = useControls({
    animationName: {
      options: animations.names,
    },
  })
  useEffect(() => {
    const action = animations.actions[animationName]
    action.fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5).stop()
    }
  }, [animationName])
  return (
    <>
      <primitive
        scale={0.02}
        object={model.scene}
        position={[-2.5, 0, 2.5]}
      ></primitive>
    </>
  )
}

export default Fox
