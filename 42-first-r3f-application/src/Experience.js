import { extend, useFrame, useThree } from "@react-three/fiber"
import React from "react"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CustomObject from "./CustomObject"
import { DoubleSide } from "three"

extend({ OrbitControls })

const Experience = () => {
  const ref = useRef()
  useFrame(() => {})
  return (
    <>
      <CustomObject />
      {/* <group>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
      </group> */}
    </>
  )
}

export default Experience
