// THREE
import {
	Text,
	Text3D
} from "@react-three/drei";

// Context
import { useMap } from "@/context/map-context";

export const Biomes = () => {
	const {
		data,
	} = useMap();

	// if (!data?.biomes) return null;
	return (
		<>
			{/* {data?.biomes.map((biome, i) => (
				<Text3D
					key={biome.id}
					position={biome.position as [number, number, number]}
					scale={[1, 1, 0.25]}
					rotation={[-Math.PI / 2, 0, biome.rotationX]}
					font={'/fonts/gt.json'}
				>
					{biome.name}
					<meshBasicMaterial attach="material" color="#ed66a1" />
				</Text3D>
			))} */}
		</>
	)
}