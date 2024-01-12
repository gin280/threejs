import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256)
  const donuts = useRef()
  useFrame((state, delta) => {
    for (const donut of donuts.current.children) {
      donut.rotation.y += delta * 0.1
    }
  })
  //   const [torusGeometry, setTorusGeometry] = useState()
  //   const [material, setMaterial] = useState()

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true
    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  return (
    <>
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
          font={"./fonts/helvetiker_regular.typeface.json"}
        >
          Hello World
        </Text3D>
      </Center>
      <group ref={donuts}>
        {[...Array(100)].map((_, i) => (
          <mesh
            key={i}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  )
}
