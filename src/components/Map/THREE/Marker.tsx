import { Billboard, Html, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { max, set } from "lodash";
import { useRef, useState } from "react"
import * as THREE from "three"
import { animated, useSpring } from "@react-spring/three";
import { fr } from "date-fns/locale";
import useDebounce from "@/hooks/use-debounce";
import { useMap } from "../../../context/map-context";

const AnimatedText = animated(Text);

const Marker = ({
	id,
	maxRange = 40,
	position = [0, 0, 0],
	fontSize = 0.2,
	children,
	...props
} : {
	id: number;
	position?: [number, number, number];
	maxRange?: number;
	fontSize?: number;
	onClick?: () => void;
	children: React.ReactNode;
}) => {
	const {
		movieId
	} = useMap();

	const ref = useRef<THREE.Group>(null);

	const [isOccluded, setIsOccluded] = useState<boolean>();
	const [isInRange, setIsInRange] = useState<boolean>();
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const isVisible = (movieId === id) || (isInRange && !isOccluded);

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
		// dont use ref because that make draw call but compare with position
		const range = camera.position.distanceTo(new THREE.Vector3(...position)) <= maxRange;
		if (range !== isInRange) setIsInRange(range);
		// if (ref.current) {
		// 	const range = camera.position.distanceTo(ref.current.position) <= maxRange;
		// 	if (range !== isInRange) setIsInRange(range);
		// }
	})

	useCursor(isHovered);

	if (!isVisible) return null;

	return (
		<Billboard
			ref={ref}

			onPointerOver={() => setIsHovered(true)}
			onPointerOut={() => setIsHovered(false)}
			position={position}
		>
			<AnimatedText
				material={new THREE.MeshBasicMaterial({
					color: 'white',
					depthTest: false,
				})}
				fontSize={fontSize}
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