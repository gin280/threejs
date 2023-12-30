import { OrbitControls } from "@react-three/drei"
import { button, useControls } from "leva"
import { Perf } from "r3f-perf"

export default function Experience() {
  const { perfVisible } = useControls({ perfVisible: false })
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      min: -5,
      max: 5,
      step: 0.1,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    clickMe: button(() => alert("hi")),
    choice: {
      value: "foo",
      options: ["foo", "bar", "baz"],
    },
  })
  return (
    <>
      {perfVisible && (
        <Perf openByDefault trackGPU={true} position="bottom-left" />
      )}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={position.x} position-y={position.y}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh visible={visible} position-x={2} scale={2}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
