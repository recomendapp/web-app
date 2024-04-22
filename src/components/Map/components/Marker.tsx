import { Billboard, Html, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { max, set } from "lodash";
import { useEffect, useRef, useState } from "react"
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
	color = 'white',
	children,
	...props
} : {
	id: number;
	position?: [number, number, number];
	maxRange?: number;
	fontSize?: number;
	color?: string;
	onClick?: () => void;
	children: React.ReactNode;
}) => {
	const {
		movieId
	} = useMap();

	const [isInRange, setIsInRange] = useState<boolean>(true);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const isVisible = isInRange;

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
		const range = camera.position.distanceTo(new THREE.Vector3(...position)) <= maxRange;
		if (range !== isInRange) setIsInRange(range);
	})

	useCursor(isHovered);

	if (!isVisible) return null;

	return (
		<Billboard
			onPointerOver={() => setIsHovered(true)}
			onPointerOut={() => setIsHovered(false)}
			// visible={isVisible}
			position={position}
		>
			<AnimatedText
				material={new THREE.MeshBasicMaterial({
					color: color,
					depthTest: false,
					alphaTest: 0.5,
				})}
				fontSize={fontSize}
				{...props}
				{...spring}
			>
				{children}
			</AnimatedText>
		</Billboard>
	)
}

export default Marker;