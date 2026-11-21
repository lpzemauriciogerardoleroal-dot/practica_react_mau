import { useState, useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useTexture } from "@react-three/drei"
import type { Mesh } from 'three'

function Cubo() {
  const triangulo = useRef<Mesh>(null)
  const esfera = useRef<Mesh>(null)

  const [encima, setEncima] = useState(false)
  const [encima2, setEncima2] = useState(false)

  const [walterTexture, pocoyoTexture] = useTexture(['/images.jpg', '/tarea.jpg'])

  useFrame((_, delta) => {
    if (triangulo.current) {
      triangulo.current.rotation.y += delta
    }
    if (esfera.current) {
      esfera.current.rotation.y += delta
    }
  })

  return (
      <>
        <mesh
            ref={esfera}
            position={[-3.5, 0, -4]}
            scale={encima ? 1.4 : 1}
            onPointerOver={() => setEncima(true)}
            onPointerOut={() => setEncima(false)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={walterTexture} />
        </mesh>

        <mesh
            ref={triangulo}
            position={[3.5, 0, -4]}
            scale={encima2 ? 1.4 : 1}
            onPointerOver={() => setEncima2(true)}
            onPointerOut={() => setEncima2(false)}
        >
          <coneGeometry args={[0.8, 1.5, 3]} />
          <meshStandardMaterial map={pocoyoTexture} />
        </mesh>
      </>
  )
}

function App() {
  return (
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <Environment files="/360.jpg" background />
        <Cubo />
        <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={-0.4}
        />
      </Canvas>
  )
}

export default App