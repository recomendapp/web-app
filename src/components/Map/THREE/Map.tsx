"use client";

import * as THREE from 'three'
import Loader from '@/components/Loader/Loader'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense, useEffect, useRef } from 'react'
import {
	ContactShadows,
	Environment,
	MapControls,
	Sky,
	Stars,
	Stats,
	Text,
} from '@react-three/drei'
import { MovieMarker } from './MovieMarker';
import { Perf } from 'r3f-perf'
import { EffectComposer, Bloom, HueSaturation, BrightnessContrast, TiltShift2, WaterEffect, ToneMapping, LensFlare, GodRays, Vignette, Scanline, Depth, DepthOfField } from '@react-three/postprocessing'

import { useControls, folder, button } from "leva";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import Marker from './Marker';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Model as MapModel } from './Models/Map';
// import { Map } from './Map';
import { Movies } from './Movies';
import Ocean from './Ocean';
import { Interface } from './Interface/Interface';
import { useQuery } from '@tanstack/react-query';
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

export function Map() {
	// const {
	// 	orthographic,
	// } = useControls({
	// 	orthographic: { value: false },
	// });

	return (
		<div className='relative w-full h-full'>
			<Canvas
				camera={{
					// near: 0.1,
					// far: 1000,
					position: [280, 10, 70],
					fov: 60,
					far: 10000,
					
				}}
				// dpr={[1, 1.5]}
				// orthographic={orthographic}
				// gl={{ antialias: false }}
				// flat
				shadows={{
					type: THREE.VSMShadowMap,
				}}
				
				// frameloop="demand"
				
				
			>
				{/* <SunLight sunPosition={[5, 1, -8]} /> */}
				{/* <color attach="background" args={['#000']} /> */}
				<ambientLight intensity={0.1} />
				<MapModel scale={0.1} />
				<CustomSky />
				<Movies />
				<Ocean />
				<fog attach="fog" args={['#86B0E3', 10, 500]} />
				{/* <Light /> */}
				{/* {Array.from({ length: 1500 }, (_, index) => (
					// <group
					// 	key={index}
					// 	position={[
					// 		(index % 30) * (index % 2 === 0 ? 1 : 1),
					// 		1,
					// 		Math.floor(index / 30) * (Math.floor(index / 30) % 2 === 0 ? 1 : -1)
					// 	]}
					// 	rotation={[0, 0, Math.PI]}
					// >
						<Marker
							key={index}
							position={[
								(index % 30) * (index % 2 === 0 ? 1 : -1),
								1,
								Math.floor(index / 30) * (Math.floor(index / 30) % 2 === 0 ? 1 : -1)
							]}
							fontSize={0.25}
						>
							ok drhdr rhdrh rh rdh dhrdt tfhxf thtfx htfh cfth ft
						</Marker>
					// </group>
				))} */}
				<Controls />
				<Stats />
				<Perf position="bottom-right" />
				<Postpro/>
			</Canvas>
			<Interface />
		</div>
	)
}

const CustomSky = () => {
	const gl = useThree(state => state.gl);

	const {
		exposure,
		sunPosition,
		skyTurbitity,
		skyRayleigh,
		skyMieCoefficient,
		skyMieDirectionalG,
		skyAzimuth,
		skyInclination
	} = useControls({
		exposure: { value: 0.14, step: 0.01 },
		Sky: folder({
			sunPosition: { value: [5, 8, -8], step: 0.01 },
			skyTurbitity: { value: 0.05, step: 0.001 },
			skyRayleigh: { value: 0.01, step: 0.0001 },
			skyMieCoefficient: { value: 0.002, step: 0.0001 },
			skyMieDirectionalG: { value: 0.96, step: 0.0001 },
			skyInclination: { value: 0, step: 0.0001 },
			skyAzimuth: { value: 180, step: 0.0001 },
			skyExposure: { value: 0.0167, step: 0.001 },
		}),
	});


	useEffect(() => {
		gl.toneMappingExposure = exposure;
	}, [gl, exposure]);


	return (
		<>
			<Sky
				distance={450000}
				sunPosition={sunPosition}
				turbidity={skyTurbitity}
				rayleigh={skyRayleigh}
				mieCoefficient={skyMieCoefficient}
				mieDirectionalG={skyMieDirectionalG}
				azimuth={skyAzimuth}
				inclination={skyInclination}
			/>
			<Stars
				speed={1}
				depth={1000}
				count={2000}
			/>
			{/* <Light /> */}
			<SunLight position={sunPosition} />
			{/* <directionalLight
				position={sunPosition}
				color={'#white'}
				castShadow
				intensity={10}
				shadow-mapSize={1024}
				shadow-bias={-0.001}
				// shadow-camera-left={-10}
				// shadow-camera-right={10}
				// shadow-camera-top={10}
				// shadow-camera-bottom={-10}

				// shadow-mapSize={2048}
				// shadow-bias={-0.1}
			/> */}
			{/* <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} /> */}
		</>
	)
}

function Postpro() {
	return (
	  <EffectComposer>
		{/* <HueSaturation saturation={-1} /> */}
		<BrightnessContrast brightness={0} contrast={0.25} />
		{/* <WaterEffect factor={0.25} /> */}
		{/* <TiltShift2 samples={6} blur={0.125} /> */}
		<Bloom mipmapBlur luminanceThreshold={0} intensity={0.25} />
		{/* <ToneMapping /> */}
		<Vignette offset={0.3} darkness={0.6} />
	  </EffectComposer>
	)
}

function Controls() {
	const {
		camera
	} = useThree();

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

function SunLight({ ...props }) {
	const ref = useRef<THREE.Group>(null);

	const {
		sunIntensity,
	} = useControls({
		Sky: folder({
			sunIntensity: { value: 5, step: 0.1 },
		}),
	});

	return (
	  <group ref={ref}>
		<directionalLight
			castShadow
			intensity={sunIntensity}
			shadow-mapSize={2048}
			shadow-radius={10}
			shadow-bias={-0.0001}
			// shadow-bias={-0.001}
			{...props}
		>
		  <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
		</directionalLight>
	  </group>
	)
}

function Light() {
	const ref = useRef<THREE.Group>(null);
	
	return (
	  <group ref={ref}>
		<directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}>
		  <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
		</directionalLight>
	  </group>
	)
  }