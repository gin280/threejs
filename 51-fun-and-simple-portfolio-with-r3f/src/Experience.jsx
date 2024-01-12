import {
  OrbitControls,
  useGLTF,
  Environment,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei"

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  )

  return (
    <>
      <Environment preset="city" />
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      <color attach="background" args={["#241a1a"]} />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            color="#ff6900"
            intensity={65}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive position-y={-1.2} object={computer.scene}>
            <Html
              transform
              wrapperClass="htmlscreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="http://localhost:8080/" />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
          >
            Guo Qi
          </Text>
        </Float>
      </PresentationControls>
    </>
  )
}
