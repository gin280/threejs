import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import {
  EffectComposer,
  Vignette,
  ToneMapping,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing"
import { BlendFunction, GlitchMode } from "postprocessing"
import Drunk from "./Drunk"
import { useRef } from "react"

export default function Experience() {
  const drunkRef = useRef()
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <EffectComposer disableNormalPass>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch mode={GlitchMode.DISABLED} /> */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom luminanceThreshold={1.1} mipmapBlur /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk ref={drunkRef} frequency={10} amplitude={0.01} />
        <ToneMapping />
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color={[4, 2, 4]} />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
