import { useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei"
import { useRef } from "react"
import { Perf } from "r3f-perf"
import * as THREE from "three"
import { useControls } from "leva"

export default function Experience() {
  const cube = useRef()
  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 0.4, "hotpink")

  useFrame((state, delta) => {
    // const time = state.clock.getElapsedTime()
    // cube.current.position.x = 2 + Math.sin(time * 0.5)
    cube.current.rotation.y += delta * 0.2
  })

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  })

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("envMap", {
      envMapIntensity: { value: 1, min: 0, max: 10 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 0, max: 1000 },
      envMapScale: { value: 100, min: 0, max: 1000 },
    })

  return (
    <>
      {/* <Environment
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        preset="sunset"
      >
        <color attach="background" args={["black"]} />
        <Lightformer
          form={"ring"}
          position-z={-5}
          scale={10}
          color={"red"}
          intensity={10}
        />
      </Environment> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      ></ContactShadows> */}
      {/* <Sky sunPosition={sunPosition} /> */}
      <color attach="background" args={["ivory"]} />
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={10}
      /> */}
      {/* <ambientLight intensity={1.5} /> */}

      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={6}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>

      {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  )
}
