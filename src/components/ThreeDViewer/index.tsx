import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ color = '#00ff7f' }: { color?: string }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const mesh2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.3
      meshRef.current.rotation.y = clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.1
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = -clock.elapsedTime * 0.3
      mesh2Ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.4
      mesh2Ref.current.position.y = Math.cos(clock.elapsedTime * 0.6) * 0.15
    }
  })

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.3} smoothness={4}>
          <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.1} metalness={0.8} />
        </RoundedBox>
      </mesh>
      <mesh ref={mesh2Ref} position={[1.4, -0.8, -0.5]}>
        <torusGeometry args={[0.5, 0.15, 16, 50]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} wireframe />
      </mesh>
      <pointLight position={[2, 2, 2]} color={color} intensity={2} distance={5} />
    </group>
  )
}

interface ThreeDViewerProps {
  color?: string
  className?: string
}

export default function ThreeDViewer({ color = '#00ff7f', className = '' }: ThreeDViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingShape color={color} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Suspense>
      </Canvas>
    </div>
  )
}
