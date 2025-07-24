"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";

const mouse = { current: { x: 0, y: 0 } };

const Stars = () => {
  const ref = useRef<THREE.Points>(null);

  const stars = useMemo(() => {
    const positions = Array.from({ length: 1500 }, () => {
      const x = THREE.MathUtils.randFloatSpread(600);
      const y = THREE.MathUtils.randFloatSpread(600);
      const z = THREE.MathUtils.randFloatSpread(600);
      return [x, y, z];
    });
    return new Float32Array(positions.flat());
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y - camera.position.y) * 0.02;
    camera.lookAt(new Vector3(0, 0, 0));

    if (ref.current) {
      ref.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={stars} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ShootingStar = ({
  delay,
  startX,
  startY,
}: {
  delay: number;
  startX: number;
  startY: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() - delay;
    if (t < 0 || !ref.current) return;

    const lifetime = 2;
    const progress = (t % lifetime) / lifetime;

    ref.current.position.x = startX - progress * 5;
    ref.current.position.y = startY - progress * 5;
    ref.current.position.z = -5 + progress * 2;
    const material = ref.current.material as THREE.Material;
    if ("opacity" in material) {
      (material as THREE.MeshBasicMaterial).opacity = 1 - progress;
    }
  });

  return (
    <mesh ref={ref} position={[startX, startY, -5]}>
      <sphereGeometry args={[0.05, 1, 1]} />
      <meshBasicMaterial
        color="#fcfcfe"
        transparent
        opacity={0}
        toneMapped={false} // ensures full brightness
      />
    </mesh>
  );
};

const ShootingStars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const delay = Math.random() * 10;
      const startX = Math.random() * 16 - 3;
      const startY = Math.random() * 4 + 1;
      return (
        <ShootingStar key={i} delay={delay} startX={startX} startY={startY} />
      );
    });
  }, []);

  return <>{stars}</>;
};

export const StarsCanvas = () => {
  return (
    <div
      className="absolute inset-0 z-[-1]"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouse.current = { x, y };
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <Stars />
        <ShootingStars />
      </Canvas>
    </div>
  );
};
