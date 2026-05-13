import React, { Suspense, useRef, useMemo } from 'react';
import { useInView } from 'motion/react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  PresentationControls, 
  Float,
  Html,
  RoundedBox,
  Environment,
  Icosahedron,
  Torus
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Model Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-3xl border border-white/10 min-h-[400px]">
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 border-2 border-[#00E5FF]/30 rounded-full flex items-center justify-center">
              <span className="text-[#00E5FF]">!</span>
            </div>
            <p className="text-slate-400 text-sm font-display tracking-widest uppercase">Visualizzazione 3D non disponibile</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hologram Component to handle texture loading safely
function Hologram({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  return (
    <group position={[-0.4, 1.5, 1.2]} rotation={[0, Math.PI / 6, 0]}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial map={texture} transparent opacity={0.8} side={THREE.DoubleSide} color="#00E5FF" />
        </mesh>
        {/* Hologram Glow/Rays */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

// Enhanced G4B Robot Model Component
function G4BModel({ imageUrl }: { imageUrl?: string }) {
  const { isLightMode } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armsRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const happyEyesRef = useRef<THREE.Group>(null);
  const wideEyesRef = useRef<THREE.Group>(null);
  
  const [isJumping, setIsJumping] = React.useState(false);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const jumpTime = useRef(0);
  const spinTime = useRef(0);
  const jumpStartY = useRef(0);
  const spinStartY = useRef(0);
  const blinkTimer = useRef(2);
  const isBlinking = useRef(false);
  const [hovered, setHovered] = React.useState(false);

  // Colors based on theme
  const accentColor = isLightMode ? "#ea580c" : "#00E5FF";
  const bodyColor = isLightMode ? "#ffffff" : "#e2e8f0";
  const darkColor = "#0f172a";

  // Materials
  const bodyMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: bodyColor,
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), [bodyColor]);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.9,
  }), []);

  const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: darkColor,
    metalness: 0.8,
    roughness: 0.4,
  }), [darkColor]);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 2.5,
    toneMapped: false,
    transparent: true,
  }), [accentColor]);

  useFrame((state, delta) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();
    
    // Blinking Logic
    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0 && !isBlinking.current) {
      isBlinking.current = true;
      blinkTimer.current = 0.15; // blink duration
    }
    if (isBlinking.current) {
      const blinkScale = Math.max(0.01, Math.abs(Math.sin((blinkTimer.current / 0.15) * Math.PI)));
      if (leftEyeRef.current) leftEyeRef.current.scale.y = blinkScale;
      if (rightEyeRef.current) rightEyeRef.current.scale.y = blinkScale;
      if (blinkTimer.current <= 0) {
        isBlinking.current = false;
        blinkTimer.current = Math.random() * 3 + 2; // next blink in 2-5s
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 1;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 1;
      }
    }

    // Antenna Wobble
    if (antennaRef.current) {
      antennaRef.current.rotation.z = -Math.PI / 6 + Math.sin(t * 4) * 0.05;
      antennaRef.current.rotation.x = Math.cos(t * 3) * 0.05;
    }

    if (groupRef.current && !isJumping && !isSpinning) {
      // Smooth mouse tracking for the whole body (slight)
      const targetRotationY = mouse.x * Math.PI * 0.15;
      const targetRotationX = -mouse.y * Math.PI * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      
      // Head tracks mouse more
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouse.x * Math.PI * 0.3, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouse.y * Math.PI * 0.2, 0.1);
      }
      
      // Floating animation
      groupRef.current.position.y = Math.sin(t * 2) * 0.1;
      
      // Reset shockwave
      if (shockwaveRef.current) {
        // @ts-ignore
        shockwaveRef.current.material.opacity = 0;
        shockwaveRef.current.scale.setScalar(1);
      }
      
      // Reset eyes
      if (happyEyesRef.current) happyEyesRef.current.visible = !hovered;
      if (wideEyesRef.current) wideEyesRef.current.visible = hovered;
    }

    // Arms floating
    if (armsRef.current && !isJumping && !isSpinning) {
      armsRef.current.children[0].position.y = Math.sin(t * 2 + 1) * 0.05;
      armsRef.current.children[1].position.y = Math.sin(t * 2 + 2) * 0.05;
      armsRef.current.position.y = 0;
    }

    // Double Click Spin Animation
    if (isSpinning && groupRef.current) {
      spinTime.current += delta;
      const duration = 1.0;
      const tSpin = spinTime.current / duration;
      
      if (tSpin < 1.0) {
        // Ease in out cubic for spin
        const spinEase = tSpin < 0.5 ? 4 * tSpin * tSpin * tSpin : 1 - Math.pow(-2 * tSpin + 2, 3) / 2;
        groupRef.current.rotation.y = spinStartY.current + (spinEase * Math.PI * 4); // 720 degree spin
        
        // Happy eyes during spin
        if (happyEyesRef.current) happyEyesRef.current.visible = true;
        if (wideEyesRef.current) wideEyesRef.current.visible = false;
        
        // Little hop
        groupRef.current.position.y = Math.sin(tSpin * Math.PI) * 0.5;
      } else {
        setIsSpinning(false);
        groupRef.current.rotation.y = spinStartY.current;
        groupRef.current.position.y = 0;
      }
    }

    // Enhanced Jump / Flip Animation
    if (isJumping && groupRef.current) {
      jumpTime.current += delta;
      const duration = 1.2;
      const tJump = jumpTime.current / duration;
      
      if (tJump < 0.15) {
        // Anticipation (Crouch)
        const crouchProgress = tJump / 0.15;
        groupRef.current.position.y = -0.2 * crouchProgress;
        if (armsRef.current) armsRef.current.position.y = -0.1 * crouchProgress;
        if (headRef.current) headRef.current.rotation.x = 0.2 * crouchProgress;
      } else if (tJump < 0.85) {
        // The Flip & Spin
        const airTime = (tJump - 0.15) / 0.7;
        const jumpHeight = 1.8;
        
        // Parabolic jump
        groupRef.current.position.y = Math.sin(airTime * Math.PI) * jumpHeight;
        
        // 360 Barrel Roll (Z-axis) + Spin (Y-axis)
        groupRef.current.rotation.z = airTime * Math.PI * 2;
        
        // Ease in out cubic for spin
        const spinEase = airTime < 0.5 ? 4 * airTime * airTime * airTime : 1 - Math.pow(-2 * airTime + 2, 3) / 2;
        const baseRot = THREE.MathUtils.lerp(jumpStartY.current, 0, airTime);
        groupRef.current.rotation.y = baseRot + (spinEase * Math.PI * 4);
        
        // Wide eyes during jump
        if (happyEyesRef.current) happyEyesRef.current.visible = false;
        if (wideEyesRef.current) wideEyesRef.current.visible = true;
        
        // Shockwave effect
        if (shockwaveRef.current) {
          shockwaveRef.current.scale.setScalar(1 + airTime * 6);
          // @ts-ignore
          shockwaveRef.current.material.opacity = Math.max(0, 1 - airTime * 1.5);
        }
      } else if (tJump < 1.0) {
        // Landing & Recovery
        const landProgress = (tJump - 0.85) / 0.15;
        groupRef.current.position.y = -0.1 * (1 - landProgress);
        groupRef.current.rotation.z = 0;
        groupRef.current.rotation.y = 0; // Snap to exactly 0 to face front
        if (headRef.current) headRef.current.rotation.x = 0;
        
        // Back to happy eyes
        if (happyEyesRef.current) happyEyesRef.current.visible = true;
        if (wideEyesRef.current) wideEyesRef.current.visible = false;
        
        if (shockwaveRef.current) {
          // @ts-ignore
          shockwaveRef.current.material.opacity = 0;
        }
      } else {
        // End Jump
        setIsJumping(false);
        groupRef.current.position.y = 0;
        groupRef.current.rotation.z = 0;
        groupRef.current.rotation.y = 0;
        if (armsRef.current) armsRef.current.position.y = 0;
      }
    }
  });

  const handleInteract = (e: any) => {
    e.stopPropagation();
    if (!isJumping && !isSpinning) {
      setIsJumping(true);
      jumpTime.current = 0;
      if (groupRef.current) {
        jumpStartY.current = groupRef.current.rotation.y % (Math.PI * 2);
      }
    }
  };

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    if (!isJumping && !isSpinning) {
      setIsSpinning(true);
      spinTime.current = 0;
      if (groupRef.current) {
        spinStartY.current = groupRef.current.rotation.y % (Math.PI * 2);
      }
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.8, 0]} 
      onClick={handleInteract}
      onDoubleClick={handleDoubleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={1.35}
    >
      <Html>
        <style>{`
          .cursor-pointer-3d { cursor: pointer !important; }
        `}</style>
      </Html>
      
      {/* Shockwave VFX */}
      <mesh ref={shockwaveRef} position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.05, 16, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Main Head Sphere */}
        <mesh castShadow receiveShadow material={bodyMaterial}>
          <sphereGeometry args={[0.7, 64, 64]} />
        </mesh>
        
        {/* Face Screen (Curved Glass) */}
        <RoundedBox args={[1.0, 0.6, 0.2]} radius={0.2} smoothness={4} position={[0, 0, 0.6]} material={glassMaterial} />

        {/* Eyes Group */}
        <group position={[0, 0, 0.72]}>
          {/* Happy Eyes (^ ^) */}
          <group ref={happyEyesRef}>
            <mesh ref={leftEyeRef} position={[-0.2, 0.1, 0]} material={glowMaterial}>
              <torusGeometry args={[0.1, 0.035, 16, 32, Math.PI]} />
            </mesh>
            <mesh ref={rightEyeRef} position={[0.2, 0.1, 0]} material={glowMaterial}>
              <torusGeometry args={[0.1, 0.035, 16, 32, Math.PI]} />
            </mesh>
          </group>
          
          {/* Wide Eyes (O O) - Hidden by default */}
          <group ref={wideEyesRef} visible={false}>
            <mesh position={[-0.2, 0.1, 0]} material={glowMaterial} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
            </mesh>
            <mesh position={[0.2, 0.1, 0]} material={glowMaterial} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
            </mesh>
          </group>
        </group>

        {/* Ears/Headphones */}
        {/* Left Ear */}
        <group position={[-0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={bodyMaterial}>
            <cylinderGeometry args={[0.28, 0.28, 0.15, 32]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={jointMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          </mesh>
          <mesh position={[0, 0.11, 0]} material={glowMaterial}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
          </mesh>
        </group>
        {/* Right Ear */}
        <group position={[0.68, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh material={bodyMaterial}>
            <cylinderGeometry args={[0.28, 0.28, 0.15, 32]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={jointMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          </mesh>
          <mesh position={[0, 0.11, 0]} material={glowMaterial}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
          </mesh>
        </group>

        {/* Antenna */}
        <group ref={antennaRef} position={[0.4, 0.6, -0.2]} rotation={[0, 0, -Math.PI / 6]}>
          <mesh position={[0, 0.3, 0]} material={jointMaterial}>
            <cylinderGeometry args={[0.015, 0.025, 0.6, 16]} />
          </mesh>
          <mesh position={[0, 0.6, 0]} material={glowMaterial}>
            <sphereGeometry args={[0.06, 32, 32]} />
          </mesh>
        </group>
      </group>

      {/* Neck Joint */}
      <mesh position={[0, 0.6, 0]} material={jointMaterial}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 32]} />
      </mesh>

      {/* Body */}
      <group position={[0, 0, 0]}>
        {/* Round Egg Body */}
        <mesh castShadow receiveShadow material={bodyMaterial} position={[0, 0, 0]} scale={[1, 1.15, 1]}>
          <sphereGeometry args={[0.55, 64, 64]} />
        </mesh>

        {/* Chest Screen */}
        <mesh position={[0, 0.1, 0.52]} rotation={[0.1, 0, 0]} material={glassMaterial}>
          <capsuleGeometry args={[0.15, 0.25, 16, 32]} />
        </mesh>
        
        {/* Chest Core/Camera */}
        <mesh position={[0, 0.15, 0.54]} rotation={[Math.PI / 2, 0, 0]} material={glowMaterial}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
        </mesh>
        <mesh position={[0, 0.15, 0.55]} rotation={[Math.PI / 2, 0, 0]} material={jointMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 32]} />
        </mesh>

        {/* Hover Thruster Base */}
        <mesh position={[0, -0.62, 0]} material={jointMaterial}>
          <cylinderGeometry args={[0.25, 0.3, 0.15, 32]} />
        </mesh>
        {/* Thruster Glow */}
        <mesh position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]} material={glowMaterial}>
          <torusGeometry args={[0.2, 0.05, 16, 64]} />
        </mesh>
        {/* Inner Thruster Light */}
        <mesh position={[0, -0.69, 0]} material={glowMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={armsRef}>
        {/* Left Arm */}
        <group position={[-0.8, 0.3, 0]}>
          {/* Shoulder Joint */}
          <mesh position={[0.1, 0, 0]} material={jointMaterial}>
            <sphereGeometry args={[0.12, 32, 32]} />
          </mesh>
          <group rotation={[0, 0, -Math.PI / 8]}>
            <mesh castShadow receiveShadow material={bodyMaterial} position={[0, -0.3, 0]}>
              <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
            </mesh>
            {/* Arm Glow Stripe */}
            <mesh position={[-0.13, -0.3, 0]} material={glowMaterial}>
              <capsuleGeometry args={[0.03, 0.5, 8, 16]} />
            </mesh>
          </group>
        </group>
        
        {/* Right Arm */}
        <group position={[0.8, 0.3, 0]}>
          {/* Shoulder Joint */}
          <mesh position={[-0.1, 0, 0]} material={jointMaterial}>
            <sphereGeometry args={[0.12, 32, 32]} />
          </mesh>
          <group rotation={[0, 0, Math.PI / 8]}>
            <mesh castShadow receiveShadow material={bodyMaterial} position={[0, -0.3, 0]}>
              <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
            </mesh>
            {/* Arm Glow Stripe */}
            <mesh position={[0.13, -0.3, 0]} material={glowMaterial}>
              <capsuleGeometry args={[0.03, 0.5, 8, 16]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Hologram Display (if imageUrl provided) */}
      {imageUrl && <Hologram imageUrl={imageUrl} />}
    </group>
  );
}

export default function Dodo3D({ imageUrl }: { imageUrl?: string }) {
  const [hovered, setHovered] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative group ${hovered ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
    >
      {isInView && (
        <ErrorBoundary>
          <Canvas
            dpr={[1, 2]}
            shadows={{ type: THREE.PCFShadowMap }}
            camera={{ position: [0, 1, 10], fov: 40 }}
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: "default" }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <Suspense fallback={
              <Html center>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin" />
                  <span className="text-[#00E5FF] font-display text-xs tracking-widest uppercase">Initializing Neural Link...</span>
                </div>
              </Html>
            }>
              <Environment preset="city" />
              <ambientLight intensity={1.2} />
              <directionalLight position={[10, 15, 10]} intensity={2.5} castShadow />
              <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#00E5FF" />
              <G4BModel imageUrl={imageUrl} />
              
              {/* Ambient Glow */}
              <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
              <pointLight position={[-5, -5, -5]} intensity={1} color="#E9C349" />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  );
}
