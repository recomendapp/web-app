"use client";

import Loader from '@/components/Loader/Loader'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense, useEffect } from 'react'
import { AccumulativeShadows, MapControls, RandomizedLight, Sky, Stats, useGLTF } from '@react-three/drei'
import { MovieMarker } from './MovieMarker';
import { Perf } from 'r3f-perf'
import { EffectComposer, Bloom, HueSaturation, BrightnessContrast, TiltShift2, WaterEffect, ToneMapping, LensFlare, GodRays } from '@react-three/postprocessing'

import { useControls, folder, button } from "leva";

export function Map() {
	// const gltf = useGLTF('/scene_3.gltf');
	const gltf = useGLTF('/map.glb');

	const numDuplicates = 1; // Nombre de duplications souhaitées

	const { sunPosition } = useControls({
		Sun: folder({
			sunPosition: { value: [5, 1, -8], step: 0.01 },
		}),
		Postpro: folder({
		}),
	  });

	useEffect(() => {
		console.log('gltf', gltf);
		if (gltf) {
			console.log('gltf loaded', gltf);
			gltf.scene.traverse((child) => {
				if (child.isObject3D) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			})
		}
	}, [gltf]);

	return (
		<Canvas
			className='w-full h-full'
			camera={{
				near: 0.1,
				far: 1000,
				position: [280, 10, 70]
				
			}}
			gl={{ antialias: false }}
			flat
			shadows 
		>
			<Suspense fallback={<Loader />}>
				{/* <fog attach="fog" args={["white", 0, 100]} /> */}
				{/* <mesh position={[1,1,0]}>
					<boxGeometry
						args={[1, 1, 1]}

					/>
					<meshStandardMaterial color='hotpink' />
				</mesh> */}
				{Array.from({ length: 1050 }, (_, index) => (
					<MovieMarker
						key={index}
						// make a square grid
						position={[
							(index % 30) * (index % 2 === 0 ? 2 : -2),
							0,
							Math.floor(index / 30) * (Math.floor(index / 30) % 2 === 0 ? 2 : -2)
						]}
						movie={{
							id: 1,
							title: `Movie ${index}`
						}}
					/>
				))}
				{Array.from({ length: numDuplicates }, (_, index) => (
					<group
						key={index}
						position={[index * 1, 0, 0]}
						scale={[0.1, 0.1, 0.1]}
						
					>
						<primitive castShadow object={gltf.scene.clone()} />
					</group>
				))}
				{/* <primitive
					object={gltf.scene}
					position={[1, 0, 0]}
				/> */}
				{/* <pointLight position={[10, 10, 10]} /> */}
				{/* <spotLight position={[10, 10, 10]} /> */}
				{/* <fog attach="fog" args={["#d0d0d0", 8, 35]} /> */}
				{/* <ambientLight intensity={0.4}/> */}
				{/* <hemisphereLight /> */}
				<directionalLight
					position={sunPosition}
					// castShadow
					intensity={5}
					shadow-mapSize={1024}
					shadow-bias={-0.001}
					// shadow-camera-left={-10}
					// shadow-camera-right={10}
					// shadow-camera-top={10}
					// shadow-camera-bottom={-10}

					// shadow-mapSize={2048}
					// shadow-bias={-0.1}
				>
					{/* <orthographicCamera attach="shadow-camera" args={[-120, 120, 120, -120, -120, 120]} /> */}
				</directionalLight>
				<Sky
					distance={1000}
					sunPosition={sunPosition}
					// inclination={0}
					azimuth={0.25}
					turbidity={0.001}
				/>
				{/* <gridHelper scale={10}/> */}
				<Controls />
				<Stats />
				<Perf position="bottom-right" />
			</Suspense>
			<Postpro/>
		</Canvas>
	)
}

function Postpro() {
	return (
	  <EffectComposer>
		{/* <HueSaturation saturation={-1} /> */}

		<BrightnessContrast brightness={0} contrast={0.25} />
		<WaterEffect factor={0.25} />
		{/* <TiltShift2 samples={6} blur={0.125} /> */}
		<Bloom mipmapBlur luminanceThreshold={0} intensity={0.25} />
		<ToneMapping />
	  </EffectComposer>
	)
  }

function Controls() {
	const {
		camera
	} = useThree()

	return (
		<MapControls
			enableDamping={true}
			dampingFactor={0.05}
			maxPolarAngle={Math.PI / 2 - 0.25}
			maxDistance={100}
			minDistance={0.5}
		/>
	)
}