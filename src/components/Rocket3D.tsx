import React, { useRef } from 'react';
import { useInView } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) { console.error("WebGL Error in Rocket3D:", error); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function RocketModel() {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const leftThrusterRef = useRef<THREE.Group>(null);
  const rightThrusterRef = useRef<THREE.Group>(null);
  
  // Custom time tracking to avoid THREE.Clock deprecation warning
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    
    if (groupRef.current) {
      // Smoother cinematic flight path
      groupRef.current.position.x = Math.sin(t * 0.4) * 8;
      groupRef.current.position.y = Math.cos(t * 0.3) * 3 + Math.sin(t * 0.8) * 0.5;
      
      // Smooth banking and subtle pitch
      const bank = Math.cos(t * 0.4) * 0.6;
      groupRef.current.rotation.z = -Math.PI / 2 + bank;
      // Pitching up and down smoothly based on altitude
      groupRef.current.rotation.x = -Math.sin(t * 0.3) * 0.2;
      // Gentle yaw
      groupRef.current.rotation.y = bank * 0.4;
    }
    
    // Smooth pulsating plasma exhaust
    const pulse = 1 + Math.sin(t * 20) * 0.08;
    const exhaustLength = 1 + Math.sin(t * 10) * 0.2;
    
    if (flameRef.current) {
      flameRef.current.scale.set(pulse, exhaustLength, pulse);
    }
    
    if (leftThrusterRef.current) {
      leftThrusterRef.current.scale.set(pulse, exhaustLength * 0.8, pulse);
    }

    if (rightThrusterRef.current) {
      rightThrusterRef.current.scale.set(pulse, exhaustLength * 0.8, pulse);
    }

    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 2 + Math.sin(t * 8) * 0.3;
    }
  });

  // Material Palette (Sleek Sci-Fi Anime Vibe)
  const armorMat = <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.15} />;
  const darkArmorMat = <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />;
  const accentMat = <meshStandardMaterial color="#E9C349" metalness={1} roughness={0.1} emissive="#E9C349" emissiveIntensity={0.2} />;
  const energyMat = <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} toneMapped={false} />;
  
  // Exhaust Plasma Mats
  const plasmaOuter = <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} blending={THREE.AdditiveBlending} />;
  const plasmaMid = <meshBasicMaterial color="#00ffff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />;
  const plasmaCore = <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />;

  return (
    <group ref={groupRef} scale={1.2}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Core Fuselage - Smooth, Flat, and Round (Saucer/Disc blend) */}
        <mesh position={[0, 0, 0]} scale={[1, 1, 0.35]}>
          <sphereGeometry args={[1.2, 64, 32]} />
          {armorMat}
        </mesh>
        
        {/* Dark Inner Core - Flatter */}
        <mesh position={[0, -0.2, 0]} scale={[0.8, 0.8, 0.4]}>
          <sphereGeometry args={[1.2, 64, 32]} />
          {darkArmorMat}
        </mesh>

        {/* Sleek Forward Nose / Canopy Area */}
        <mesh position={[0, 1.2, 0.1]} scale={[0.4, 0.8, 0.2]}>
          <sphereGeometry args={[1, 32, 32]} />
          {darkArmorMat}
        </mesh>
        
        {/* Glowing Visor (Sleek crescent eye) */}
        <mesh ref={coreRef} position={[0, 1.6, 0.28]} rotation={[0, 0, 0]} scale={[0.6, 0.1, 0.1]}>
          <sphereGeometry args={[0.5, 32, 16]} />
          {energyMat}
        </mesh>

        {/* Energy Rings integrated smoothly */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.02, 16, 64]} />
          {energyMat}
        </mesh>

        {/* Swept, Smooth Wings built onto the flat body */}
        <group position={[0, -0.5, 0]}>
          {/* Left Wing Blended */}
          <mesh position={[-1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 8]} scale={[1.8, 0.5, 0.1]}>
            <cylinderGeometry args={[0.1, 0.4, 1.5, 32]} />
            {armorMat}
          </mesh>
          <mesh position={[-1.9, -0.2, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 1.2, 32]} />
            {darkArmorMat}
          </mesh>
          
          {/* Left Smooth Pod Exhaust */}
          <group ref={leftThrusterRef} position={[-1.9, -0.8, 0]}>
            <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.2, 0, 1.5, 32]} />{plasmaOuter}</mesh>
            <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.1, 0, 1.0, 32]} />{plasmaCore}</mesh>
          </group>

          {/* Right Wing Blended */}
          <mesh position={[1.2, 0.2, 0]} rotation={[0, 0, -Math.PI / 8]} scale={[1.8, 0.5, 0.1]}>
            <cylinderGeometry args={[0.1, 0.4, 1.5, 32]} />
            {armorMat}
          </mesh>
          <mesh position={[1.9, -0.2, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 1.2, 32]} />
            {darkArmorMat}
          </mesh>
          
          {/* Right Smooth Pod Exhaust */}
          <group ref={rightThrusterRef} position={[1.9, -0.8, 0]}>
            <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.2, 0, 1.5, 32]} />{plasmaOuter}</mesh>
            <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.1, 0, 1.0, 32]} />{plasmaCore}</mesh>
          </group>
        </group>
        
        {/* Sleek Vertical Stabilizers (V-Tail curved) */}
        <mesh position={[0.4, -0.8, -0.2]} rotation={[Math.PI / 6, Math.PI / 8, 0]} scale={[0.15, 1, 0.3]}>
          <cylinderGeometry args={[0.01, 0.5, 1.5, 32]} />
          {darkArmorMat}
        </mesh>
        <mesh position={[-0.4, -0.8, -0.2]} rotation={[Math.PI / 6, -Math.PI / 8, 0]} scale={[0.15, 1, 0.3]}>
          <cylinderGeometry args={[0.01, 0.5, 1.5, 32]} />
          {darkArmorMat}
        </mesh>
        
        {/* Main Central Engine Cowling - Smooth Sphere cut */}
        <mesh position={[0, -1.1, 0]} scale={[1, 0.4, 1]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          {accentMat}
        </mesh>

        {/* Epic Main Plasma Beam */}
        <group ref={flameRef} position={[0, -1.4, 0]}>
          {/* Outer Aura */}
          <mesh position={[0, -1.5, 0]}>
            <cylinderGeometry args={[0.9, 0, 4.5, 32]} />
            {plasmaOuter}
          </mesh>
          {/* Middle Flare */}
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[0.6, 0, 3.5, 32]} />
            {plasmaMid}
          </mesh>
          {/* Inner Intensity Core Beam */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.25, 0, 2.5, 32]} />
            {plasmaCore}
          </mesh>
          
          {/* Shock diamonds / Energy Disks - Smoother */}
          <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.08, 16, 32]} />
            {plasmaMid}
          </mesh>
          <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.7}>
            <torusGeometry args={[0.5, 0.08, 16, 32]} />
            {plasmaOuter}
          </mesh>
        </group>

      </Float>
    </group>
  );
}

export default function Rocket3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen bg-black/5" style={{ minHeight: "200px" }}>
      {isInView && (
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 0, 14], fov: 45 }} gl={{ powerPreference: "default", preserveDrawingBuffer: false }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#00E5FF" />
            <directionalLight position={[0, -10, 5]} intensity={2.5} color="#E9C349" />
            <RocketModel />
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  );
}
