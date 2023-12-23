import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei"
import { useThree, extend } from "@react-three/fiber"
import { useRef } from "react"

export default function Experience() {
  const { camera, gl } = useThree()
  const cube = useRef()
  const sphere = useRef()

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        scale={2}
      >
        <mesh ref={sphere} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            wrapperClass="label"
            position={[1, 1, 0]}
            distanceFactor={4}
            occlude={[sphere, cube]}
          >
            lala
          </Html>
        </mesh>
      </PivotControls>
      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.4}
          color={"greenyellow"}
        />
      </mesh>
      <Float>
        <Text
          fontSize={1}
          color={"salmon"}
          font="./bangers-v20-latin-regular.woff"
          position={[0, 2, 0]}
          maxWidth={2}
        >
          321312 fsdf
        </Text>
      </Float>
    </>
  )
}
