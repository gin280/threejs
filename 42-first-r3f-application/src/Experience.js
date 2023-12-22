import { extend, useFrame, useThree } from "@react-three/fiber"
import React from "react"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CustomObject from "./CustomObject"
import { DoubleSide } from "three"

extend({ OrbitControls })

const Experience = () => {
  const cubeRef = useRef()
  const groupRef = useRef()
  const { camera, gl } = useThree()

  useFrame((state, delta) => {
    // const angle = state.clock.getElapsedTime()
    // state.camera.position.x = Math.cos(angle) * 8
    // state.camera.position.z = Math.sin(angle) * 8
    // state.camera.lookAt(0, 0, 0)
    cubeRef.current.rotation.y += 0.01
  })

  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <CustomObject />
      <group ref={groupRef}>
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="pink" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation={[0, Math.PI * 0.25, 0]}
          position={[2, 0, 0]}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="purple" />
        </mesh>
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
        <planeGeometry />
        <meshStandardMaterial side={DoubleSide} color="greenyellow" />
      </mesh>
    </>
  )
}

export default Experience
