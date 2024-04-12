import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useLoader, useFrame, Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

extend({ PlaneBufferGeometry: THREE.PlaneGeometry });

const vertexShader = `
	#include <fog_pars_vertex>

	varying vec2 vUv;

	void main() {

		vUv = uv;

		#include <begin_vertex>
		#include <project_vertex>
		#include <fog_vertex>

	}
`;

const fragmentShader = `
	#include <common>
	#include <packing>
	#include <fog_pars_fragment>

	varying vec2 vUv;
	uniform sampler2D tDepth;
	uniform sampler2D tDudv;
	uniform vec3 waterColor;
	uniform vec3 foamColor;
	uniform float cameraNear;
	uniform float cameraFar;
	uniform float time;
	uniform float threshold;
	uniform vec2 resolution;

	float getDepth( const in vec2 screenPosition ) {
		#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
		#else
			return texture2D( tDepth, screenPosition ).x;
		#endif
	}

	float getViewZ( const in float depth ) {
		#if ORTHOGRAPHIC_CAMERA == 1
			return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
		#else
			return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
		#endif
	}

	void main() {

		vec2 screenUV = gl_FragCoord.xy / resolution;

		float fragmentLinearEyeDepth = getViewZ( gl_FragCoord.z );
		float linearEyeDepth = getViewZ( getDepth( screenUV ) );

		float diff = saturate( fragmentLinearEyeDepth - linearEyeDepth );

		vec2 displacement = texture2D( tDudv, ( vUv * 2.0 ) - time * 0.05 ).rg;
		displacement = ( ( displacement * 2.0 ) - 1.0 ) * 1.0;
		diff += displacement.x;

		gl_FragColor.rgb = mix( foamColor, waterColor, step( threshold, diff ) );
		gl_FragColor.a = 1.0;

		#include <tonemapping_fragment>
		#include <encodings_fragment>
		#include <fog_fragment>

	}
`;

const Ocean = () => {
	const clock = new THREE.Clock();

	const ref = useRef<THREE.Mesh>(null);

	const {
		gl,
		camera,
		scene,
	} = useThree();

	const pixelRatio = gl.getPixelRatio();

	// const supportsDepthTextureExtension = gl.extensions.has("WEBGL_depth_texture");
	const supportsDepthTextureExtension = true;
	const renderTarget = useMemo(() => 
		new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
			minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter,
			generateMipmaps: false,
			stencilBuffer: false,
			
			// if supportsDepthTextureExtension is true, use the depth texture
			depthBuffer: supportsDepthTextureExtension,
			depthTexture: supportsDepthTextureExtension ?
				new THREE.DepthTexture(
					window.innerWidth,
					window.innerHeight,
					THREE.UnsignedShortType,
				)
				:
				undefined
		})
	, [supportsDepthTextureExtension]);

	const depthMaterial = new THREE.MeshDepthMaterial();
	depthMaterial.depthPacking = THREE.RGBADepthPacking;
	depthMaterial.blending = THREE.NoBlending;

	const dudvMap = new THREE.TextureLoader().load(
		"https://i.imgur.com/hOIsXiZ.png"
	);
	dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

	const uniforms = {
		time: {
		  value: 0
		},
		threshold: {
		  value: 0.1
		},
		tDudv: {
		  value: dudvMap
		},
		tDepth: {
		  value: supportsDepthTextureExtension === true ? renderTarget?.depthTexture : renderTarget?.texture
		},
		cameraNear: {
		  value: camera.near
		},
		cameraFar: {
		  value: camera.far
		},
		resolution: {
		  value: new THREE.Vector2(
			window.innerWidth * pixelRatio,
			window.innerHeight * pixelRatio
		  )
		},
		foamColor: {
		  value: new THREE.Color(0xffffff)
		},
		waterColor: {
		  value: new THREE.Color(0x000)
		}
	};

	useFrame(() => {
		if (ref.current) {
			// depth pass
			ref.current.visible = false;
			scene.overrideMaterial = depthMaterial;
			gl.setRenderTarget(renderTarget);
			gl.render(scene, camera);
			gl.setRenderTarget(null);
			scene.overrideMaterial = null;
			ref.current.visible = true;

			// water pass
			const time = clock.getElapsedTime();
			const material = ref?.current?.material as THREE.ShaderMaterial;
			material.uniforms.time.value = time;
			material.uniforms.threshold.value = 0.1;
			// material.uniforms.foamColor.value.set(0xffffff);
			// material.uniforms.waterColor.value.set(0x14c6a5);
		}
	});
  
	return (
		<>
			<mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeBufferGeometry args={[10000, 10000]} />
				<meshStandardMaterial color="black" />
			</mesh>
		{/* <mesh ref={ref} position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
		  <planeBufferGeometry args={[100, 100]} />
		  <shaderMaterial
		  	defines={{
				DEPTH_PACKING: supportsDepthTextureExtension === true ? 0 : 1,
      			ORTHOGRAPHIC_CAMERA: 0
			}}
			uniforms={THREE.UniformsUtils.merge([THREE.UniformsLib["fog"], uniforms])}
			vertexShader={vertexShader}
			fragmentShader={fragmentShader}
			// fragmentShader=""
			// vertexShader={document.getElementById("vertexShader").textContent}
			// fragmentShader={document.getElementById("fragmentShader").textContent}
			fog={true}
		  />
		</mesh> */}
		</>
	);
};

// function Ocean() {
//   const ref = useRef();
//   const gl = useThree((state) => state.gl);
//   const waterNormals = useLoader(
//     THREE.TextureLoader, "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
//   );


//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
//   const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xeb8934,
//       waterColor: 0x0064b5,
//       distortionScale: 20,
//       fog: true,
//       format: gl.encoding,
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [waterNormals]
//   );
//   useFrame((state, delta) => {
//     const material = ref?.current?.material as THREE.ShaderMaterial;
//     material.uniforms.time.value += delta;
// 	});
//   return (
//     <water
//       ref={ref}
//       args={[geom, config]}
//       rotation-x={-Math.PI / 2}
//       position={[0, -0.2, 0]}
//     />
//   );
// }

export default Ocean;