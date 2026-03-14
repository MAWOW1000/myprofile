import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Float } from '@react-three/drei'
import * as THREE from 'three'

interface PhotoVortexProps {
  images: string[]
}

function PhotoItem({ url, index, total }: { url: string; index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(url)
  
  // Calculate position in a spiral/vortex pattern
  const angle = (index / total) * Math.PI * 2
  const radius = 3 + (index * 0.5)
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const z = -index * 2

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation effect
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.z += 0.002
      
      // Floating motion
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y += Math.sin(time + index) * 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[x, y, z]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

export default function PhotoVortex({ images }: PhotoVortexProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Slowly rotate the entire vortex
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.1
      // Slowly move inward
      groupRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 2
    }
  })

  return (
    <group ref={groupRef}>
      {images.map((url, i) => (
        <PhotoItem key={url} url={url} index={i} total={images.length} />
      ))}
    </group>
  )
}
