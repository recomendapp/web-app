import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ObjectMap, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Map({ ...props }) {
	const gltf = useLoader(GLTFLoader, '/map4.glb');

	// const gltf = useLoader(GLTFLoader, '/map4_comp.glb', (loader) => {
	// 	const dracoLoader = new DRACOLoader();
	// 	dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
	// 	loader.setDRACOLoader(dracoLoader);

	// });
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

	// const { nodes, materials } = useGLTF("/room-transformed.glb")

	// return (
	// 	<group {...props} dispose={null}>
	// 		<group rotation={[-Math.PI / 2, 0, 0]}>
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.Material} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials["Material.002"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials["Material.003"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials.krzeslo_1} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_7.geometry} material={materials.krzeslo_okno} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials.krzeslo_prawe} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials.krzeslo_srodek} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials.podloga} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_11.geometry} material={materials.sciana_okno} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials["stolik.001"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials["Material.006"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials["Material.004"]} />
	// 			<mesh geometry={nodes.Object_13.geometry}>
	// 			<meshStandardMaterial transparent opacity={0.5} />
	// 			</mesh>
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials["Material.002"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials["Material.005"]} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_17.geometry} material={materials.mata} />
	// 			<mesh castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials.stolik} />
	// 		</group>
	// 	</group>
	// )
	return (
		<group
			{...props}
			
		>
			<primitive castShadow object={gltf.scene.clone()} />
		</group>
	)
}
