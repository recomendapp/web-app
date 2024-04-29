// React
import {
	useEffect,
	useRef
} from "react";

// THREE
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
	Environment,
	Sky as SkyComponent,
	Stars
} from "@react-three/drei";

// GUI
import {
	folder,
	useControls
} from "leva";

export const Sky = () => {
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
			sunPosition: { value: [6, 8, 4], step: 0.01 },
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
			{/* <Environment
				files={"./map/hdri/sky_linekotsi_11_HDRI.hdr"}
				background
			/> */}
			<SkyComponent
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
			<SunLight position={sunPosition} />
		</>
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
			{...props}
		>
		  	<orthographicCamera
		  		attach="shadow-camera"
				args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
			/>
		</directionalLight>
	  </group>
	)
}