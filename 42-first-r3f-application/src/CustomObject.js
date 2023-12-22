import React, { useEffect, useMemo, useRef } from "react"
import { DoubleSide } from "three"

const CustomObject = () => {
  const geometryRef = useRef()
  const verticesCount = 10 * 3
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3
    }
    return positions
  }, [verticesCount])

  useEffect(() => {
    geometryRef.current?.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach={"attributes-position"}
          array={positions}
          count={verticesCount}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  )
}

export default CustomObject
