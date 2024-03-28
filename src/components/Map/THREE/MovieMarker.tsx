import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';

export function MovieMarker({
	position,
	movie,
	...props
} : {
	position: [number, number, number];
	movie: {
		id: number;
		title: string;
	};
}) {
	const { camera } = useThree();
	const ref = useRef(new Vector3(...position));
	const [ visible, setVisible ] = useState(false);
	// Fonction pour mettre à jour la visibilité du marker en fonction de sa distance par rapport à la caméra
	useFrame(() => {
		// console.log('useFrame');
		if (!ref.current) return;
		const distance = camera.position.distanceTo(ref.current);
		// Définir ici la distance seuil à partir de laquelle afficher le marker
		const thresholdDistance = 20; // Par exemple, afficher le marker si la distance est inférieure à 5 unités
		setVisible(distance < thresholdDistance);
	});
	if (!visible) return null;
	return (
		<Html
			position={ref.current}
			center
			className='cursor-pointer'
		>
        	<div
				onClick={() => console.log(`Clicked on ${movie.title}`)}
			>
				{movie.title}
			</div>
        </Html>
	)
}