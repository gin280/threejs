import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei"
import portalVertexShader from "./shaders/portal/vertex.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import * as THREE from "three"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience() {
  const portal = useRef()
  const { nodes } = useGLTF("./model/portal.glb")
  const bakedTexture = useTexture("./model/baked.jpg")
  useFrame((state, delta) => {
    portal.current.uniforms.uTime.value += delta * 4
  })
  return (
    <>
      <color attach="background" args={["#030202"]} />
      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ff7d46" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ff7d46" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portal} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={44}
        />
      </Center>
    </>
  )
}
