import { Billboard, Html, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { max } from "lodash";
import { useRef, useState } from "react"
import * as THREE from "three"
import { animated, useSpring } from "@react-spring/three";
import { fr } from "date-fns/locale";

const AnimatedText = animated(Text);

const Marker = ({
	maxRange = 40,
	position = [0, 0, 0],
	fontSize = 0.2,
	children,
	...props
} : {
	position?: [number, number, number];
	maxRange?: number;
	fontSize?: number;
	children: React.ReactNode;
}) => {
	const ref = useRef<THREE.Group>(null);

	const [isOccluded, setIsOccluded] = useState<boolean>();
	const [isInRange, setIsInRange] = useState<boolean>();
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const isVisible = isInRange && !isOccluded;

	const spring = useSpring({
		from: { scale: 0 },
		to: { scale: 1 },
		config: {
			friction: 15,
		},
		delay: 10,
		reverse: !isVisible,
	});
	useFrame(({ camera }) => {
		if (ref.current) {
			const range = camera.position.distanceTo(ref.current.position) <= maxRange;
			if (range !== isInRange) setIsInRange(range);

			// Calculer la direction de la caméra par rapport au texte
		}

		// ref.current.lookAt(camera.position);
	})

	useCursor(isHovered);

	return (
		<Billboard
			ref={ref}
			onClick={() => console.log('Clicked on marker', children)}
			onPointerOver={() => setIsHovered(true)}
			onPointerOut={() => setIsHovered(false)}
			position={position}
		>
			<AnimatedText
				material={new THREE.MeshBasicMaterial({
					color: 'white',
					depthTest: false,
				})}
				
				{...props}
				{...spring}
			>
				{children}
			</AnimatedText>
		</Billboard>
		// <Text
		// 	ref={ref}
		// 	castShadow={false}
		// 	receiveShadow={false}
		// 	{...props}
		// >
		// 	{children}
		// </Text>
		// <group ref={ref}>
		// 	{/* <Html
		// 		transform
		// 		className=" select-none cursor-pointer"
		// 		// occlude
		// 		// onOcclude={setIsOccluded}
		// 		style={{
		// 			transition: 'all 0.2s',
		// 			opacity: isVisible ? 1 : 0,
		// 			transform: `
		// 				scale(${isVisible ? 1 : 0.5}
		// 			`
		// 		}}
		// 		{...props}
		// 	>
		// 		{children}
		// 	</Html> */}
		// </group>
	)
}

export default Marker;