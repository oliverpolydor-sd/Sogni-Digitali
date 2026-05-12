import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, ContactShadows, Float, MeshDistortMaterial, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Smartphone, CheckCircle, Database } from 'lucide-react';

function Card({ onClick }: { onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animate on hover
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, hovered ? 1.05 : 1, 0.1);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, hovered ? 1.05 : 1, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group 
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        rotation={[0, Math.PI / 6, 0]}
      >
        <RoundedBox args={[2.2, 3.4, 0.1]} radius={0.15} smoothness={4}>
          <MeshDistortMaterial
            color={hovered ? '#E9C349' : '#0B1120'}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            speed={hovered ? 3 : 1}
            distort={hovered ? 0.2 : 0}
          />
        </RoundedBox>
        
        {/* Glow effect when hovered */}
        {hovered && (
          <pointLight position={[0, 0, 1]} color="#00E5FF" intensity={5} distance={3} />
        )}

        <Html position={[0, 0, 0.06]} transform distanceFactor={1.5}>
          <div className="w-48 h-72 border border-white/20 rounded-2xl flex flex-col items-center justify-between p-6 pointer-events-none opacity-80" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-[#00E5FF] font-bold text-lg">SD</span>
            </div>
            <div className="text-center w-full">
              <p className="text-white text-xs tracking-widest uppercase mb-1">Passa il telefono</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent my-2" />
              <p className="text-[#E9C349] font-mono text-[10px]">NFC SCANNABLE</p>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function PhygitalSandbox() {
  const [interactionState, setInteractionState] = useState<'idle' | 'transferring' | 'success'>('idle');
  const [fakeLead, setFakeLead] = useState<{name: string, email: string, source: string} | null>(null);

  const handleInteract = () => {
    if (interactionState !== 'idle') return;
    
    setInteractionState('transferring');
    setFakeLead(null);

    setTimeout(() => {
      setInteractionState('success');
      setFakeLead({
        name: "Mario Rossi",
        email: "mario.rossi@example.com",
        source: "NFC Stand - Milano"
      });
      setTimeout(() => {
        setInteractionState('idle');
      }, 4000);
    }, 2000);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-[#050A15]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C349]/10 border border-[#E9C349]/20">
            <span className="w-2 h-2 rounded-full bg-[#E9C349] animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#E9C349]">Simulazione Interattiva</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Esperienza <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#E9C349]">Phygital</span>
          </h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            I nostri stand e card NFC collegano il mondo fisico al tuo ecosistema digitale. Clicca sulla card in 3D per simulare l'acquisizione di un Lead.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-transparent flex items-center justify-center border border-[#00E5FF]/30">
                <Database className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Sogni CRM Monitor</h3>
                <p className="text-sm text-slate-400">In ascolto per nuovi contatti...</p>
              </div>
            </div>
            
            <div className="min-h-[140px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {interactionState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center">
                    <Smartphone className="w-8 h-8 text-slate-600 mb-3 animate-bounce" />
                    <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span> In attesa di Tap NFC...
                    </span>
                  </motion.div>
                )}
                
                {interactionState === 'transferring' && (
                  <motion.div key="transfer" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 border-2 border-dashed border-[#00E5FF] rounded-full animate-[spin_3s_linear_infinite] flex items-center justify-center mb-3">
                      <div className="w-8 h-8 bg-[#00E5FF]/20 rounded-full animate-pulse" />
                    </div>
                    <span className="text-sm text-[#00E5FF] uppercase tracking-widest font-bold">Inizializzazione Trasferimento Seguro...</span>
                  </motion.div>
                )}

                {interactionState === 'success' && fakeLead && (
                  <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-[#E9C349]/10 border border-[#E9C349]/30 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-4 text-[#E9C349]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-sm uppercase tracking-widest">Lead Acquisito con Successo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="block text-[10px] text-slate-400 tracking-widest uppercase mb-1">Nome</span>
                        <span className="text-white font-medium text-sm">{fakeLead.name}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 tracking-widest uppercase mb-1">Email</span>
                        <span className="text-white font-medium text-sm">{fakeLead.email}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[10px] text-slate-400 tracking-widest uppercase mb-1">Origine</span>
                        <span className="text-[#00E5FF] font-mono text-xs bg-[#00E5FF]/10 px-2 py-1 rounded inline-block">{fakeLead.source}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Flying particle effect container */}
            {interactionState === 'transferring' && (
              <motion.div
                initial={{ opacity: 1, x: 200, y: -100 }}
                animate={{ opacity: 0, x: -50, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 right-0 w-6 h-6 bg-[#00E5FF] rounded-full blur-[4px] shadow-[0_0_30px_#00E5FF]"
              />
            )}
          </div>
        </div>

        {/* 3D Canvas */}
        <div 
          className="h-[600px] w-full rounded-3xl bg-black/40 border border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-70 transition-opacity z-10 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-xs tracking-widest uppercase text-white shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              Trascina per ruotare • Clicca la card per interagire
            </div>
          </div>
          
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
            <PresentationControls
              global
              rotation={[0.13, 0.1, 0]}
              polar={[-0.4, 0.2]}
              azimuth={[-1, 0.75]}
            >
              <Card onClick={handleInteract} />
            </PresentationControls>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#00E5FF" />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
