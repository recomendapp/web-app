"use client";

import Loader from '@/components/Loader/Loader'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'
import { MapControls, Stats, useGLTF } from '@react-three/drei'
import { MovieMarker } from './MovieMarker';
import { Perf } from 'r3f-perf'

export function Map() {
	const gltf = useGLTF('/scene.gltf');
	const numDuplicates = 10; // Nombre de duplications souhaitées
	return (
		<Canvas
			className='w-full h-full bg-red-500'
			camera={{
				near: 0.1,
				far: 1000,
			}}
		>
			<Suspense fallback={<Loader />}>
				<mesh position={[1,1,0]}>
					<boxGeometry
						args={[1, 1, 1]}

					/>
					<meshStandardMaterial color='hotpink' />
				</mesh>
				{Array.from({ length: 1050 }, (_, index) => (
					<MovieMarker
						key={index}
						position={[index * 1, 1, 0]}
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
						<primitive object={gltf.scene.clone()} />
					</group>
				))}
				{/* <primitive
					object={gltf.scene}
					position={[1, 0, 0]}
				/> */}
				{/* <ambientLight /> */}
				{/* <directionalLight /> */}
				{/* <pointLight position={[10, 10, 10]} /> */}
				{/* <spotLight position={[10, 10, 10]} /> */}
				{/* <hemisphereLight /> */}
				<gridHelper />
				<Controls />
				<Stats />
				<Perf />
			</Suspense>
		</Canvas>
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