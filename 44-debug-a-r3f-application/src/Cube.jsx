import React from "react"

const Cube = ({ scale = 1 }) => {
  return (
    <mesh position-x={2} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  )
}

export default Cube
