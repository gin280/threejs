import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"

import Model from "./Model"
import { Suspense } from "react"
import Placeholder from "./Placeholder"
import Hamburger from "./Hamburger"
import { normalize } from "three/src/math/MathUtils"
import Fox from "./Fox"

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        shadow-normalBias={0.5}
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} />
      </Suspense>
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Fox scale={0.015} />
      </Suspense>
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
