import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { Project } from '../../data/projects'

interface Carousel3DProps {
  projects: Project[]
  currentIndex: number
}

function ProjectCard({ project, index, total, activeIndex }: { project: Project; index: number; total: number; activeIndex: number }) {
  const meshRef = useRef<THREE.Group>(null)
  
  const isSelected = index === activeIndex
  
  useFrame(() => {
    if (meshRef.current) {
      // Let's just make the cards face center or camera
      meshRef.current.lookAt(0, 0, 10)
    }
  })

  // Material properties based on active state
  const scale = isSelected ? 1.2 : 0.8
  const opacity = isSelected ? 1 : 0.5

  return (
    <group 
      ref={meshRef} 
      position={[
        Math.sin((index / total) * Math.PI * 2) * 5, 
        0, 
        Math.cos((index / total) * Math.PI * 2) * 5
      ]}
      rotation={[0, (index / total) * Math.PI * 2, 0]}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <group scale={scale}>
          {/* Card background */}
          <RoundedBox args={[2.5, 3.5, 0.2]} radius={0.1}>
            <MeshDistortMaterial
              color={project.color}
              speed={2}
              distort={0.3}
              roughness={0.2}
              transparent
              opacity={opacity}
            />
          </RoundedBox>
          
          {/* Text Content */}
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
          >
            {project.title}
          </Text>
        </group>
      </Float>
    </group>
  )
}

export default function Carousel3D({ projects, currentIndex }: Carousel3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Desired rotation for the group to center the current index
  const targetRotation = - (currentIndex / projects.length) * Math.PI * 2

  useFrame((state) => {
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10, 0.1)

    if (groupRef.current) {
      // Smoothly rotate to target
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={i} 
          total={projects.length} 
          activeIndex={currentIndex} 
        />
      ))}
    </group>
  )
}
