"use client";

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import {
	Loader,
	MapControls,
	Stars,
	Stats,
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EffectComposer, Bloom, BrightnessContrast, TiltShift2, WaterEffect, ToneMapping, LensFlare, GodRays, Vignette, Scanline, Depth, DepthOfField } from '@react-three/postprocessing'

import { useControls, folder, Leva } from "leva";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { Model as MapModel } from './Models/Map';
import { Movies } from './Environment/Movies';
import { Ocean } from '@/components/Map/THREE/Environment/Ocean';
import { Interface } from '../Interface';
import { Biomes } from './Environment/Biomes';
import { useMap } from '@/context/map-context';
import { Sky } from '@/components/Map/THREE/Environment/Sky';
import useDebounce from '@/hooks/use-debounce';
import { Space } from './Environment/Space';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

export function Experience() {
	const {
		user,
		setMovieId,
		debug
	} = useMap();

	return (
		<div className='relative w-full h-full'>
			<Canvas
				camera={{
					position: new THREE.Vector3(user.position[0], user.position[1], user.position[2]),
					fov: 60,
					far: 10000,
				}}
				onDoubleClick={() => setMovieId(null)}
			>
				<color attach="background" args={['#000']} />
				{/* <ambientLight intensity={0.1} />
				<MapModel scale={0.1} rotation={[0, -Math.PI / 2, 0]} />
				<Biomes />
				<Space />
				<Sky />
				<Movies />
				<Ocean />
				<fog attach="fog" args={['#86B0E3', 10, 400]} /> */}
				<Controls />
				
				<Postpro/>
				<Debug />
				{/* <gridHelper args={[100, 100]} position={[0, 0.25, 0]} /> */}
				{/* <axesHelper position={[0, 0.25, 0]} scale={[100, 100, 100]} /> */}
			</Canvas>
			<Loader />
			<Leva hidden={!debug} />
			<Interface />
		</div>
	)
}

const Debug = () => {
	const {
		debug
	} = useMap();

	const texture = useLoader(THREE.TextureLoader, '/map/image.jpg');

	if (!debug) return null;

	return (
		<>
			<Stats />
			<Perf position="bottom-right" />
			<mesh rotation={[-Math.PI / 2, 0, -Math.PI / 2]} position={[0, 0.25, 0]}>
				<planeGeometry attach="geometry" args={[180, 120]} />
				<meshBasicMaterial attach="material" map={texture} toneMapped={false} opacity={0.2}/>
			</mesh>
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
		user
	} = useMap();

	const [position, setPosition] = useState([0, 0, 0]);
	const userPositionDebounce = useDebounce(position, 500);
	
	const {
		camera
	} = useThree();

	useFrame(() => {
		if (position.toString() !== camera.position.toArray().toString()) {
			setPosition(camera.position.toArray());
		}
	});

	useEffect(() => {
		user.setPosition(userPositionDebounce);
	}, [user, userPositionDebounce]);
	
	return (
		<MapControls
			enableDamping={true}
			dampingFactor={0.05}
			maxPolarAngle={Math.PI / 2 - 0.25}
			maxDistance={100}
			minDistance={5}
		/>
	)
}

