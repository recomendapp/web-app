// @ts-nocheck

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

// export function Map({ ...props }) {
// 	const gltf = useLoader(GLTFLoader, '/map4.glb');

// 	useEffect(() => {
// 		console.log('gltf', gltf);
// 		if (gltf) {
// 			console.log('gltf loaded', gltf);
// 			gltf.scene.traverse((child) => {
// 				if (child.isObject3D) {
// 					child.castShadow = true;
// 					child.receiveShadow = true;
// 				}
// 			})
// 		}
// 	}, [gltf]);

// 	return (
// 		<group
// 			{...props}
			
// 		>
// 			<primitive castShadow object={gltf.scene.clone()} />
// 		</group>
// 	)
// }

export function Model({ ...props }) {
  const { nodes, materials } = useGLTF('/map4.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.small_islands.geometry}
        material={materials['Color texture']}
        position={[-32.969, -0.146, -41.771]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sport_Terrain.geometry}
        material={materials['Color texture']}
        position={[-324.747, 0.071, -74.819]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Green_space.geometry}
        material={materials['Color texture']}
        position={[-14.722, -0.146, -46.448]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Beach.geometry}
        material={materials['Color texture']}
        position={[16.722, -5.6, 163.498]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desert.geometry}
        material={materials['Color texture']}
        position={[-79.834, 0.01, 113.488]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main_island.geometry}
        material={materials['Color texture']}
        position={[-32.969, -0.146, -41.771]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.crater.geometry}
        material={materials['Color texture']}
        position={[-174.788, -0.052, -2.618]}
        scale={[1, 0.746, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.moutain.geometry}
        material={materials['Color texture']}
        position={[248.011, 1.864, -112.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Train.geometry}
        material={materials['Color texture']}
        position={[33.976, -0.889, 46.673]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Secondary_Road.geometry}
        material={materials['Color texture']}
        position={[-31.032, -0.645, 84.081]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main_road.geometry}
        material={materials['Color texture']}
        position={[-68.041, -0.527, -24.859]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Highway.geometry}
        material={materials['Color texture']}
        position={[-59.124, -1.553, -13.716]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dirt_Road.geometry}
        material={materials['Color texture']}
        position={[210.728, 2.652, -112.916]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dirt_Road001.geometry}
        material={materials['Color texture']}
        position={[210.728, -7.337, -112.916]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Water_flat.geometry}
        material={materials['Color texture_water']}
        position={[-45.161, -1.257, 58.543]}
      /> */}
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004.geometry}
        material={materials['Color texture']}
        position={[-995.285, 1.706, 240.575]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002.geometry}
        material={materials['Color texture']}
        position={[-969.615, 1.706, 240.716]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003.geometry}
        material={materials['Color texture']}
        position={[-969.573, 1.098, 228.307]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002.geometry}
        material={materials['Color texture']}
        position={[-995.243, 1.098, 228.166]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026.geometry}
        material={materials['Color texture']}
        position={[-1009.678, 1.075, 239.729]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025.geometry}
        material={materials['Color texture']}
        position={[-1003.279, 1.479, 229.409]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024.geometry}
        material={materials['Color texture']}
        position={[-984.008, 1.075, 239.871]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023.geometry}
        material={materials['Color texture']}
        position={[-977.609, 1.479, 229.55]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20020.geometry}
        material={materials['Color texture']}
        position={[-334.914, 0, -236.629]}
        rotation={[0, -0.522, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041.geometry}
        material={materials['Color texture']}
        position={[11.592, 0, -218.291]}
        rotation={[0, 0.827, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242.geometry}
        material={materials['Color texture']}
        position={[-529.913, 0, 193.293]}
        rotation={[-Math.PI, 0.919, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233.geometry}
        material={materials['Color texture']}
        position={[-519.84, 0, 188.257]}
        rotation={[0, -1.411, 0]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20034.geometry}
        material={materials['Color texture']}
        position={[-516.902, 0, 197.07]}
        rotation={[0, -0.968, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20035.geometry}
        material={materials['Color texture']}
        position={[-506.83, 0, 208.821]}
        rotation={[-Math.PI, 1.058, -Math.PI]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30026.geometry}
        material={materials['Color texture']}
        position={[-502.214, 0, 200.008]}
        rotation={[0, 0.306, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0267.geometry}
        material={materials['Color texture']}
        position={[-493.82, 0, 202.526]}
        rotation={[0, -0.508, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0238.geometry}
        material={materials['Color texture']}
        position={[-498.017, 0, 205.884]}
        rotation={[Math.PI, -0.587, Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0259.geometry}
        material={materials['Color texture']}
        position={[-490.882, 0, 184.06]}
        rotation={[0, 1.321, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200210.geometry}
        material={materials['Color texture']}
        position={[-498.856, 0, 183.64]}
        rotation={[0, 0.54, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200211.geometry}
        material={materials['Color texture']}
        position={[-484.587, 0, 180.283]}
        rotation={[-Math.PI, 0.513, -Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300212.geometry}
        material={materials['Color texture']}
        position={[-508.089, 0, 166.853]}
        rotation={[Math.PI, -0.201, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02313.geometry}
        material={materials['Color texture']}
        position={[-501.794, 0, 170.63]}
        rotation={[0, 1.339, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02414.geometry}
        material={materials['Color texture']}
        position={[-562.228, 0, 188.257]}
        rotation={[-Math.PI, 0.285, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200215.geometry}
        material={materials['Color texture']}
        position={[-563.907, 0, 193.293]}
        rotation={[Math.PI, -0.457, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200316.geometry}
        material={materials['Color texture']}
        position={[-569.782, 0, 196.65]}
        rotation={[-Math.PI, 0.742, -Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300417.geometry}
        material={materials['Color texture']}
        position={[-555.513, 0, 186.578]}
        rotation={[0, 0.163, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300218.geometry}
        material={materials['Color texture']}
        position={[-590.347, 0, 200.847]}
        rotation={[0, 0.923, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02319.geometry}
        material={materials['Color texture']}
        position={[-597.482, 0, 197.91]}
        rotation={[-Math.PI, 0.069, -Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02620.geometry}
        material={materials['Color texture']}
        position={[-602.098, 0, 203.785]}
        rotation={[-Math.PI, 1.524, -Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200321.geometry}
        material={materials['Color texture']}
        position={[-584.471, 0, 195.811]}
        rotation={[0, -0.185, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02622.geometry}
        material={materials['Color texture']}
        position={[-586.99, 0, 180.703]}
        rotation={[0, 0.651, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300423.geometry}
        material={materials['Color texture']}
        position={[-593.285, 0, 176.925]}
        rotation={[Math.PI, -1.081, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02424.geometry}
        material={materials['Color texture']}
        position={[-596.642, 0, 182.381]}
        rotation={[Math.PI, -1.27, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300225.geometry}
        material={materials['Color texture']}
        position={[-579.855, 0, 168.951]}
        rotation={[-Math.PI, 0.195, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200226.geometry}
        material={materials['Color texture']}
        position={[-566.005, 0, 220.572]}
        rotation={[Math.PI, -0.898, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300427.geometry}
        material={materials['Color texture']}
        position={[-573.56, 0, 225.189]}
        rotation={[Math.PI, -0.849, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02628.geometry}
        material={materials['Color texture']}
        position={[-578.596, 0, 232.324]}
        rotation={[-Math.PI, 0.409, -Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02429.geometry}
        material={materials['Color texture']}
        position={[-569.363, 0, 234.422]}
        rotation={[0, -0.834, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02530.geometry}
        material={materials['Color texture']}
        position={[-563.487, 0, 244.075]}
        rotation={[0, -0.657, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02531.geometry}
        material={materials['Color texture']}
        position={[-551.316, 0, 220.572]}
        rotation={[-Math.PI, 1.117, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200232.geometry}
        material={materials['Color texture']}
        position={[-560.549, 0, 221.412]}
        rotation={[Math.PI, -0.79, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02433.geometry}
        material={materials['Color texture']}
        position={[-570.622, 0, 225.609]}
        rotation={[Math.PI, -0.985, Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200234.geometry}
        material={materials['Color texture']}
        position={[-571.042, 0, 218.474]}
        rotation={[0, -0.939, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02335.geometry}
        material={materials['Color texture']}
        position={[-564.746, 0, 224.35]}
        rotation={[0, 1.342, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200236.geometry}
        material={materials['Color texture']}
        position={[-590.347, 0, 239.038]}
        rotation={[-Math.PI, 1.553, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02337.geometry}
        material={materials['Color texture']}
        position={[-583.632, 0, 245.334]}
        rotation={[0, -0.882, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02338.geometry}
        material={materials['Color texture']}
        position={[-584.471, 0, 238.619]}
        rotation={[0, -1.308, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02439.geometry}
        material={materials['Color texture']}
        position={[-572.72, 0, 247.012]}
        rotation={[0, -1.17, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02340.geometry}
        material={materials['Color texture']}
        position={[-562.228, 0, 248.691]}
        rotation={[0, 1.477, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02541.geometry}
        material={materials['Color texture']}
        position={[-605.875, 0, 258.764]}
        rotation={[Math.PI, -0.913, Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02642.geometry}
        material={materials['Color texture']}
        position={[-609.652, 0, 251.629]}
        rotation={[0, -0.271, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02543.geometry}
        material={materials['Color texture']}
        position={[-600, 0, 258.764]}
        rotation={[0, -0.909, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300244.geometry}
        material={materials['Color texture']}
        position={[-617.626, 0, 257.924]}
        rotation={[-Math.PI, 0.143, -Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300445.geometry}
        material={materials['Color texture']}
        position={[-615.108, 0, 253.727]}
        rotation={[0, -0.111, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200346.geometry}
        material={materials['Color texture']}
        position={[-625.181, 0, 256.245]}
        rotation={[-Math.PI, 0.227, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300247.geometry}
        material={materials['Color texture']}
        position={[-618.466, 0, 276.39]}
        rotation={[0, -1.426, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02648.geometry}
        material={materials['Color texture']}
        position={[-637.771, 0, 279.748]}
        rotation={[0, 0.132, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300449.geometry}
        material={materials['Color texture']}
        position={[-634.414, 0, 278.489]}
        rotation={[0, -0.52, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200350.geometry}
        material={materials['Color texture']}
        position={[-655.817, 0, 261.282]}
        rotation={[-Math.PI, 0.392, -Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200251.geometry}
        material={materials['Color texture']}
        position={[-641.548, 0, 236.94]}
        rotation={[0, -0.505, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02652.geometry}
        material={materials['Color texture']}
        position={[-635.253, 0, 244.075]}
        rotation={[-Math.PI, 1.235, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200253.geometry}
        material={materials['Color texture']}
        position={[-499.276, 0, 244.494]}
        rotation={[0, -0.658, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200254.geometry}
        material={materials['Color texture']}
        position={[-487.525, 0, 227.707]}
        rotation={[0, 1.525, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200255.geometry}
        material={materials['Color texture']}
        position={[-477.452, 0, 239.458]}
        rotation={[Math.PI, -0.337, Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200256.geometry}
        material={materials['Color texture']}
        position={[-499.695, 0, 238.199]}
        rotation={[0, -1.224, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200257.geometry}
        material={materials['Color texture']}
        position={[-482.908, 0, 219.733]}
        rotation={[0, 1.398, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300458.geometry}
        material={materials['Color texture']}
        position={[-478.711, 0, 216.795]}
        rotation={[0, 0.391, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02359.geometry}
        material={materials['Color texture']}
        position={[-475.354, 0, 218.894]}
        rotation={[0, 0.247, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200260.geometry}
        material={materials['Color texture']}
        position={[-474.934, 0, 206.303]}
        rotation={[Math.PI, -0.884, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200261.geometry}
        material={materials['Color texture']}
        position={[-484.587, 0, 200.008]}
        rotation={[0, 1.137, 0]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02562.geometry}
        material={materials['Color texture']}
        position={[-481.229, 0, 202.106]}
        rotation={[0, -0.557, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300463.geometry}
        material={materials['Color texture']}
        position={[-475.774, 0, 186.998]}
        rotation={[0, 0.046, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02364.geometry}
        material={materials['Color texture']}
        position={[-470.737, 0, 186.998]}
        rotation={[0, 1.522, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200265.geometry}
        material={materials['Color texture']}
        position={[-537.047, 0, 156.781]}
        rotation={[0, 0.983, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200366.geometry}
        material={materials['Color texture']}
        position={[-534.529, 0, 150.905]}
        rotation={[0, -0.126, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200367.geometry}
        material={materials['Color texture']}
        position={[-531.591, 0, 155.102]}
        rotation={[0, -0.028, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300468.geometry}
        material={materials['Color texture']}
        position={[-525.296, 0, 146.289]}
        rotation={[Math.PI, -0.05, Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02669.geometry}
        material={materials['Color texture']}
        position={[-517.742, 0, 139.574]}
        rotation={[-Math.PI, 0.167, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300270.geometry}
        material={materials['Color texture']}
        position={[-524.457, 0, 134.537]}
        rotation={[0, 0.413, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200371.geometry}
        material={materials['Color texture']}
        position={[-537.887, 0, 122.367]}
        rotation={[-Math.PI, 0.152, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200372.geometry}
        material={materials['Color texture']}
        position={[-541.664, 0, 125.304]}
        rotation={[0, -0.036, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02473.geometry}
        material={materials['Color texture']}
        position={[-547.959, 0, 129.082]}
        rotation={[-Math.PI, 0.557, -Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02674.geometry}
        material={materials['Color texture']}
        position={[-550.897, 0, 138.315]}
        rotation={[Math.PI, -0.675, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200375.geometry}
        material={materials['Color texture']}
        position={[-535.369, 0, 132.019]}
        rotation={[-Math.PI, 0.826, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02476.geometry}
        material={materials['Color texture']}
        position={[-529.913, 0, 117.75]}
        rotation={[-Math.PI, 0.64, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300477.geometry}
        material={materials['Color texture']}
        position={[-543.762, 0, 108.937]}
        rotation={[-Math.PI, 1.296, -Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02478.geometry}
        material={materials['Color texture']}
        position={[-540.405, 0, 110.616]}
        rotation={[0, -0.543, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02479.geometry}
        material={materials['Color texture']}
        position={[-545.441, 0, 114.393]}
        rotation={[0, 0.199, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300280.geometry}
        material={materials['Color texture']}
        position={[-560.549, 0, 116.491]}
        rotation={[0, -1.55, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02681.geometry}
        material={materials['Color texture']}
        position={[-565.166, 0, 118.59]}
        rotation={[0, -0.628, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02382.geometry}
        material={materials['Color texture']}
        position={[-580.275, 0, 101.802]}
        rotation={[0, -0.167, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02683.geometry}
        material={materials['Color texture']}
        position={[-583.632, 0, 98.025]}
        rotation={[Math.PI, -0.61, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02384.geometry}
        material={materials['Color texture']}
        position={[-586.15, 0, 103.481]}
        rotation={[-Math.PI, 0.669, -Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200285.geometry}
        material={materials['Color texture']}
        position={[-594.124, 0, 102.222]}
        rotation={[0, -1.081, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02586.geometry}
        material={materials['Color texture']}
        position={[-597.482, 0, 95.927]}
        rotation={[Math.PI, -1.295, Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300487.geometry}
        material={materials['Color texture']}
        position={[-592.026, 0, 114.812]}
        rotation={[0, 0.094, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200388.geometry}
        material={materials['Color texture']}
        position={[-590.347, 0, 118.17]}
        rotation={[-Math.PI, 0.228, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02489.geometry}
        material={materials['Color texture']}
        position={[-586.15, 0, 119.429]}
        rotation={[Math.PI, -0.836, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree200290.geometry}
        material={materials['Color texture']}
        position={[-577.756, 0, 120.268]}
        rotation={[0, -1.009, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02391.geometry}
        material={materials['Color texture']}
        position={[-570.622, 0, 96.346]}
        rotation={[0, 1.232, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300292.geometry}
        material={materials['Color texture']}
        position={[-568.104, 0, 98.864]}
        rotation={[-Math.PI, 1.563, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300493.geometry}
        material={materials['Color texture']}
        position={[-564.746, 0, 94.248]}
        rotation={[0, -0.004, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02594.geometry}
        material={materials['Color texture']}
        position={[-584.052, 0, 86.274]}
        rotation={[0, 0.806, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02395.geometry}
        material={materials['Color texture']}
        position={[-605.036, 0, 103.901]}
        rotation={[0, 0.182, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300496.geometry}
        material={materials['Color texture']}
        position={[-618.466, 0, 119.009]}
        rotation={[Math.PI, -1.063, Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02497.geometry}
        material={materials['Color texture']}
        position={[-621.403, 0, 122.367]}
        rotation={[-Math.PI, 0.138, -Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree300298.geometry}
        material={materials['Color texture']}
        position={[-618.466, 0, 127.403]}
        rotation={[Math.PI, -0.064, Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree02699.geometry}
        material={materials['Color texture']}
        position={[-622.663, 0, 136.636]}
        rotation={[0, -0.828, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023100.geometry}
        material={materials['Color texture']}
        position={[-628.538, 0, 143.351]}
        rotation={[Math.PI, -0.359, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025101.geometry}
        material={materials['Color texture']}
        position={[-615.528, 0, 158.879]}
        rotation={[0, -1.37, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002102.geometry}
        material={materials['Color texture']}
        position={[-628.118, 0, 158.04]}
        rotation={[0, 0.792, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002103.geometry}
        material={materials['Color texture']}
        position={[-629.797, 0, 160.138]}
        rotation={[Math.PI, -1.086, Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024104.geometry}
        material={materials['Color texture']}
        position={[-638.61, 0, 155.522]}
        rotation={[-Math.PI, 0.808, -Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025105.geometry}
        material={materials['Color texture']}
        position={[-612.59, 0, 142.511]}
        rotation={[Math.PI, -1.311, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002106.geometry}
        material={materials['Color texture']}
        position={[-608.393, 0, 146.708]}
        rotation={[0, 1.439, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002107.geometry}
        material={materials['Color texture']}
        position={[-607.554, 0, 138.734]}
        rotation={[-Math.PI, 0.446, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003108.geometry}
        material={materials['Color texture']}
        position={[-590.347, 0, 141.252]}
        rotation={[Math.PI, -0.592, Math.PI]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024109.geometry}
        material={materials['Color texture']}
        position={[-586.99, 0, 147.548]}
        rotation={[Math.PI, -0.174, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003110.geometry}
        material={materials['Color texture']}
        position={[-583.632, 0, 142.092]}
        rotation={[0, 0.999, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003111.geometry}
        material={materials['Color texture']}
        position={[-573.979, 0, 139.154]}
        rotation={[-Math.PI, 0.33, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004112.geometry}
        material={materials['Color texture']}
        position={[-579.016, 0, 145.869]}
        rotation={[-Math.PI, 0.274, -Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003113.geometry}
        material={materials['Color texture']}
        position={[-569.782, 0, 139.154]}
        rotation={[0, -0.888, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025114.geometry}
        material={materials['Color texture']}
        position={[-570.622, 0, 125.304]}
        rotation={[-Math.PI, 1.278, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002115.geometry}
        material={materials['Color texture']}
        position={[-558.871, 0, 142.931]}
        rotation={[Math.PI, -0.435, Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004116.geometry}
        material={materials['Color texture']}
        position={[-561.809, 0, 133.698]}
        rotation={[0, -0.608, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025117.geometry}
        material={materials['Color texture']}
        position={[-552.995, 0, 155.522]}
        rotation={[0, 0.912, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024118.geometry}
        material={materials['Color texture']}
        position={[-556.353, 0, 164.335]}
        rotation={[Math.PI, -0.474, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023119.geometry}
        material={materials['Color texture']}
        position={[-549.218, 0, 163.496]}
        rotation={[0, -0.982, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003120.geometry}
        material={materials['Color texture']}
        position={[-545.861, 0, 179.863]}
        rotation={[0, 1.257, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003121.geometry}
        material={materials['Color texture']}
        position={[-545.861, 0, 200.847]}
        rotation={[0, -0.172, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023122.geometry}
        material={materials['Color texture']}
        position={[-542.503, 0, 196.231]}
        rotation={[Math.PI, -1.103, Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003123.geometry}
        material={materials['Color texture']}
        position={[-545.021, 0, 186.158]}
        rotation={[0, 0.975, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002124.geometry}
        material={materials['Color texture']}
        position={[-511.027, 0, 138.734]}
        rotation={[-Math.PI, 1.365, -Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026125.geometry}
        material={materials['Color texture']}
        position={[-522.778, 0, 116.071]}
        rotation={[Math.PI, -1.223, Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004126.geometry}
        material={materials['Color texture']}
        position={[-432.546, 0, 206.303]}
        rotation={[-Math.PI, 0.324, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023127.geometry}
        material={materials['Color texture']}
        position={[-437.582, 0, 209.661]}
        rotation={[0, 1.08, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002128.geometry}
        material={materials['Color texture']}
        position={[-448.914, 0, 203.365]}
        rotation={[-Math.PI, 1.5, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023129.geometry}
        material={materials['Color texture']}
        position={[-450.593, 0, 211.759]}
        rotation={[0, 0.846, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004130.geometry}
        material={materials['Color texture']}
        position={[-455.209, 0, 221.831]}
        rotation={[0, 1.458, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003131.geometry}
        material={materials['Color texture']}
        position={[-464.022, 0, 215.536]}
        rotation={[-Math.PI, 1.094, -Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004132.geometry}
        material={materials['Color texture']}
        position={[-456.048, 0, 194.552]}
        rotation={[0, -0.805, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026133.geometry}
        material={materials['Color texture']}
        position={[-509.768, 0, 248.691]}
        rotation={[Math.PI, -0.405, Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025134.geometry}
        material={materials['Color texture']}
        position={[-543.342, 0, 214.277]}
        rotation={[0, -1.503, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026135.geometry}
        material={materials['Color texture']}
        position={[-584.891, 0, 208.821]}
        rotation={[0, 1.495, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023136.geometry}
        material={materials['Color texture']}
        position={[-596.642, 0, 218.894]}
        rotation={[-Math.PI, 0.726, -Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025137.geometry}
        material={materials['Color texture']}
        position={[-602.518, 0, 220.153]}
        rotation={[Math.PI, -0.961, Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023138.geometry}
        material={materials['Color texture']}
        position={[-607.974, 0, 216.376]}
        rotation={[Math.PI, -0.286, Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023139.geometry}
        material={materials['Color texture']}
        position={[-618.046, 0, 213.018]}
        rotation={[0, 1.082, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025140.geometry}
        material={materials['Color texture']}
        position={[-606.715, 0, 229.805]}
        rotation={[-Math.PI, 0.063, -Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004141.geometry}
        material={materials['Color texture']}
        position={[-620.144, 0, 229.386]}
        rotation={[0, -1.003, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002142.geometry}
        material={materials['Color texture']}
        position={[-628.118, 0, 225.609]}
        rotation={[Math.PI, -1.015, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026143.geometry}
        material={materials['Color texture']}
        position={[-631.476, 0, 230.225]}
        rotation={[0, 1.349, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004144.geometry}
        material={materials['Color texture']}
        position={[-608.393, 0, 273.452]}
        rotation={[-Math.PI, 0.647, -Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003145.geometry}
        material={materials['Color texture']}
        position={[-595.383, 0, 255.826]}
        rotation={[0, 0.088, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024146.geometry}
        material={materials['Color texture']}
        position={[-605.875, 0, 247.012]}
        rotation={[0, -0.669, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023147.geometry}
        material={materials['Color texture']}
        position={[-545.441, 0, 222.251]}
        rotation={[Math.PI, -1.031, Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004148.geometry}
        material={materials['Color texture']}
        position={[-534.529, 0, 186.578]}
        rotation={[-Math.PI, 0.522, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026149.geometry}
        material={materials['Color texture']}
        position={[-522.358, 0, 176.086]}
        rotation={[0, -0.562, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026150.geometry}
        material={materials['Color texture']}
        position={[-514.804, 0, 179.444]}
        rotation={[-Math.PI, 0.295, -Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023151.geometry}
        material={materials['Color texture']}
        position={[-513.545, 0, 172.309]}
        rotation={[Math.PI, -0.414, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024152.geometry}
        material={materials['Color texture']}
        position={[-545.861, 0, 146.708]}
        rotation={[0, -0.711, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024153.geometry}
        material={materials['Color texture']}
        position={[-536.208, 0, 139.154]}
        rotation={[0, 0.659, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025154.geometry}
        material={materials['Color texture']}
        position={[-512.286, 0, 153.004]}
        rotation={[-Math.PI, 0.179, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003155.geometry}
        material={materials['Color texture']}
        position={[-503.473, 0, 146.708]}
        rotation={[0, -1.237, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002156.geometry}
        material={materials['Color texture']}
        position={[-502.214, 0, 153.423]}
        rotation={[0, -0.188, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002157.geometry}
        material={materials['Color texture']}
        position={[-577.337, 0, 174.407]}
        rotation={[0, -0.374, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004158.geometry}
        material={materials['Color texture']}
        position={[-592.026, 0, 152.164]}
        rotation={[0, 0.245, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023159.geometry}
        material={materials['Color texture']}
        position={[-603.777, 0, 150.905]}
        rotation={[-Math.PI, 0.425, -Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004160.geometry}
        material={materials['Color texture']}
        position={[-590.767, 0, 132.019]}
        rotation={[-Math.PI, 1.274, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026161.geometry}
        material={materials['Color texture']}
        position={[-560.549, 0, 104.32]}
        rotation={[0, -0.06, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002162.geometry}
        material={materials['Color texture']}
        position={[-584.471, 0, 109.356]}
        rotation={[-Math.PI, 0.019, -Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004163.geometry}
        material={materials['Color texture']}
        position={[-620.144, 0, 245.753]}
        rotation={[0, -0.536, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025164.geometry}
        material={materials['Color texture']}
        position={[-630.636, 0, 244.914]}
        rotation={[0, -1.569, 0]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026165.geometry}
        material={materials['Color texture']}
        position={[-721.66, 0, 194.609]}
        rotation={[0, 1.434, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002166.geometry}
        material={materials['Color texture']}
        position={[-716.732, 0, 192.877]}
        rotation={[0, -1.373, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004167.geometry}
        material={materials['Color texture']}
        position={[-722.499, 0, 185.796]}
        rotation={[Math.PI, -0.456, Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023168.geometry}
        material={materials['Color texture']}
        position={[-702.584, 0, 196.935]}
        rotation={[0, -0.453, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004169.geometry}
        material={materials['Color texture']}
        position={[-701.987, 0, 263.689]}
        rotation={[Math.PI, -1.546, Math.PI]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004170.geometry}
        material={materials['Color texture']}
        position={[-705.76, 0, 268.416]}
        rotation={[0, -0.7, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024171.geometry}
        material={materials['Color texture']}
        position={[-513.965, 0, 202.946]}
        rotation={[Math.PI, -0.862, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004172.geometry}
        material={materials['Color texture']}
        position={[-491.721, 0, 168.951]}
        rotation={[-Math.PI, 0.69, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004173.geometry}
        material={materials['Color texture']}
        position={[-477.033, 0, 176.506]}
        rotation={[Math.PI, -0.437, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002174.geometry}
        material={materials['Color texture']}
        position={[-524.037, 0, 206.723]}
        rotation={[0, 1.548, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025175.geometry}
        material={materials['Color texture']}
        position={[-347.924, 0, -243.764]}
        rotation={[0, -1.256, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003176.geometry}
        material={materials['Color texture']}
        position={[-339.531, 0, -252.997]}
        rotation={[0, -1.165, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025177.geometry}
        material={materials['Color texture']}
        position={[-327.779, 0, -241.665]}
        rotation={[Math.PI, -1.336, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025178.geometry}
        material={materials['Color texture']}
        position={[-329.878, 0, -258.033]}
        rotation={[Math.PI, -1.522, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002179.geometry}
        material={materials['Color texture']}
        position={[-335.753, 0, -244.183]}
        rotation={[0, -0.527, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004180.geometry}
        material={materials['Color texture']}
        position={[-327.36, 0, -289.509]}
        rotation={[0, 0.265, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003181.geometry}
        material={materials['Color texture']}
        position={[-342.888, 0, -289.929]}
        rotation={[0, -1.224, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003182.geometry}
        material={materials['Color texture']}
        position={[-347.505, 0, -303.778]}
        rotation={[-Math.PI, 0.725, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026183.geometry}
        material={materials['Color texture']}
        position={[-337.432, 0, -307.555]}
        rotation={[-Math.PI, 1.325, -Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004184.geometry}
        material={materials['Color texture']}
        position={[-333.655, 0, -304.198]}
        rotation={[0, 0.311, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023185.geometry}
        material={materials['Color texture']}
        position={[-350.862, 0, -290.768]}
        rotation={[0, 1.341, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026186.geometry}
        material={materials['Color texture']}
        position={[-323.163, 0, -295.384]}
        rotation={[0, -1.432, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026187.geometry}
        material={materials['Color texture']}
        position={[-324.422, 0, -287.83]}
        rotation={[0, 0.445, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025188.geometry}
        material={materials['Color texture']}
        position={[-312.671, 0, -286.151]}
        rotation={[Math.PI, -0.823, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002189.geometry}
        material={materials['Color texture']}
        position={[-320.645, 0, -276.499]}
        rotation={[0, 0.147, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026190.geometry}
        material={materials['Color texture']}
        position={[-334.075, 0, -288.25]}
        rotation={[-Math.PI, 1.077, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003191.geometry}
        material={materials['Color texture']}
        position={[-352.541, 0, -303.778]}
        rotation={[Math.PI, -0.975, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023192.geometry}
        material={materials['Color texture']}
        position={[-350.442, 0, -251.318]}
        rotation={[0, 0.417, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026193.geometry}
        material={materials['Color texture']}
        position={[-358.836, 0, -242.085]}
        rotation={[Math.PI, -1.31, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025194.geometry}
        material={materials['Color texture']}
        position={[-322.324, 0, -223.199]}
        rotation={[Math.PI, -1.171, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023195.geometry}
        material={materials['Color texture']}
        position={[-362.193, 0, -209.769]}
        rotation={[Math.PI, -0.218, Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002196.geometry}
        material={materials['Color texture']}
        position={[-369.748, 0, -217.323]}
        rotation={[0, -0.935, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026197.geometry}
        material={materials['Color texture']}
        position={[-376.043, 0, -207.251]}
        rotation={[-Math.PI, 0.797, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024198.geometry}
        material={materials['Color texture']}
        position={[-384.437, 0, -216.484]}
        rotation={[Math.PI, -1.135, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023199.geometry}
        material={materials['Color texture']}
        position={[-379.82, 0, -226.137]}
        rotation={[-Math.PI, 1.161, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002200.geometry}
        material={materials['Color texture']}
        position={[-380.24, 0, -216.904]}
        rotation={[-Math.PI, 1.558, -Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026201.geometry}
        material={materials['Color texture']}
        position={[-386.115, 0, -205.153]}
        rotation={[0, 0.384, 0]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003202.geometry}
        material={materials['Color texture']}
        position={[-393.67, 0, -220.261]}
        rotation={[0, -1.456, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024203.geometry}
        material={materials['Color texture']}
        position={[-350.023, 0, -218.583]}
        rotation={[0, 0.737, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025204.geometry}
        material={materials['Color texture']}
        position={[-334.494, 0, -226.976]}
        rotation={[0, -0.011, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002205.geometry}
        material={materials['Color texture']}
        position={[-344.986, 0, -246.701]}
        rotation={[0, 0.868, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025206.geometry}
        material={materials['Color texture']}
        position={[-340.79, 0, -199.277]}
        rotation={[Math.PI, -1.457, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025207.geometry}
        material={materials['Color texture']}
        position={[-340.79, 0, -205.992]}
        rotation={[-Math.PI, 0.169, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004208.geometry}
        material={materials['Color texture']}
        position={[-328.199, 0, -203.894]}
        rotation={[-Math.PI, 1.424, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024209.geometry}
        material={materials['Color texture']}
        position={[-318.127, 0, -196.339]}
        rotation={[-Math.PI, 1.269, -Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002210.geometry}
        material={materials['Color texture']}
        position={[-320.645, 0, -207.251]}
        rotation={[Math.PI, -0.564, Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024211.geometry}
        material={materials['Color texture']}
        position={[-307.635, 0, -198.018]}
        rotation={[-Math.PI, 0.735, -Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026212.geometry}
        material={materials['Color texture']}
        position={[-311.412, 0, -194.241]}
        rotation={[0, -0.69, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023213.geometry}
        material={materials['Color texture']}
        position={[-303.018, 0, -190.044]}
        rotation={[0, 0.654, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003214.geometry}
        material={materials['Color texture']}
        position={[-295.464, 0, -171.998]}
        rotation={[-Math.PI, 1.15, -Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002215.geometry}
        material={materials['Color texture']}
        position={[-274.06, 0, -169.48]}
        rotation={[Math.PI, -0.685, Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026216.geometry}
        material={materials['Color texture']}
        position={[-278.257, 0, -165.702]}
        rotation={[0, -1.313, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024217.geometry}
        material={materials['Color texture']}
        position={[-292.946, 0, -171.998]}
        rotation={[0, 0.201, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024218.geometry}
        material={materials['Color texture']}
        position={[-303.858, 0, -160.666]}
        rotation={[0, 0.743, 0]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024219.geometry}
        material={materials['Color texture']}
        position={[-314.769, 0, -153.112]}
        rotation={[0, 1.562, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003220.geometry}
        material={materials['Color texture']}
        position={[-320.225, 0, -170.319]}
        rotation={[0, -0.187, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003221.geometry}
        material={materials['Color texture']}
        position={[-323.163, 0, -179.972]}
        rotation={[0, 0.431, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026222.geometry}
        material={materials['Color texture']}
        position={[-310.992, 0, -183.329]}
        rotation={[0, 1.127, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004223.geometry}
        material={materials['Color texture']}
        position={[-286.231, 0, -179.552]}
        rotation={[-Math.PI, 0.803, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002224.geometry}
        material={materials['Color texture']}
        position={[-372.685, 0, -190.044]}
        rotation={[0, 0.436, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024225.geometry}
        material={materials['Color texture']}
        position={[-378.561, 0, -178.293]}
        rotation={[0, -0.101, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003226.geometry}
        material={materials['Color texture']}
        position={[-384.017, 0, -165.283]}
        rotation={[0, 1.141, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002227.geometry}
        material={materials['Color texture']}
        position={[-379.82, 0, -164.443]}
        rotation={[Math.PI, -1.31, Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002228.geometry}
        material={materials['Color texture']}
        position={[-361.354, 0, -153.532]}
        rotation={[Math.PI, -0.331, Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024229.geometry}
        material={materials['Color texture']}
        position={[-370.167, 0, -143.04]}
        rotation={[-Math.PI, 0.407, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002230.geometry}
        material={materials['Color texture']}
        position={[-352.96, 0, -146.817]}
        rotation={[-Math.PI, 0.416, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023231.geometry}
        material={materials['Color texture']}
        position={[-339.531, 0, -148.076]}
        rotation={[0, -0.638, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026232.geometry}
        material={materials['Color texture']}
        position={[-358.416, 0, -169.899]}
        rotation={[-Math.PI, 0.727, -Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025233.geometry}
        material={materials['Color texture']}
        position={[-363.033, 0, -179.552]}
        rotation={[Math.PI, -1.258, Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026234.geometry}
        material={materials['Color texture']}
        position={[-369.328, 0, -162.345]}
        rotation={[Math.PI, -1.197, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024235.geometry}
        material={materials['Color texture']}
        position={[-391.571, 0, -153.532]}
        rotation={[-Math.PI, 0.24, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024236.geometry}
        material={materials['Color texture']}
        position={[-397.027, 0, -149.335]}
        rotation={[Math.PI, -0.408, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002237.geometry}
        material={materials['Color texture']}
        position={[-416.333, 0, -145.558]}
        rotation={[0, 0.886, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003238.geometry}
        material={materials['Color texture']}
        position={[-407.519, 0, -135.066]}
        rotation={[Math.PI, -0.249, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002239.geometry}
        material={materials['Color texture']}
        position={[-400.385, 0, -127.511]}
        rotation={[-Math.PI, 1.072, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002240.geometry}
        material={materials['Color texture']}
        position={[-397.867, 0, -138.003]}
        rotation={[0, 1.191, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025241.geometry}
        material={materials['Color texture']}
        position={[-389.473, 0, -128.77]}
        rotation={[0, -0.068, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004242.geometry}
        material={materials['Color texture']}
        position={[-383.178, 0, -135.066]}
        rotation={[0, -0.311, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024243.geometry}
        material={materials['Color texture']}
        position={[-366.39, 0, -141.361]}
        rotation={[0, -0.925, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003244.geometry}
        material={materials['Color texture']}
        position={[-372.266, 0, -137.584]}
        rotation={[Math.PI, -0.521, Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003245.geometry}
        material={materials['Color texture']}
        position={[-386.955, 0, -138.003]}
        rotation={[0, -0.418, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002246.geometry}
        material={materials['Color texture']}
        position={[-337.432, 0, -162.765]}
        rotation={[Math.PI, -0.634, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025247.geometry}
        material={materials['Color texture']}
        position={[-311.832, 0, -155.63]}
        rotation={[0, -0.153, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002248.geometry}
        material={materials['Color texture']}
        position={[-414.234, 0, -142.2]}
        rotation={[-Math.PI, 0.065, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004249.geometry}
        material={materials['Color texture']}
        position={[-398.706, 0, -184.588]}
        rotation={[0, 0.8, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002250.geometry}
        material={materials['Color texture']}
        position={[-397.027, 0, -192.143]}
        rotation={[0, -0.467, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024251.geometry}
        material={materials['Color texture']}
        position={[-421.369, 0, -188.785]}
        rotation={[0, -0.835, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003252.geometry}
        material={materials['Color texture']}
        position={[-419.27, 0, -195.08]}
        rotation={[Math.PI, -0.12, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003253.geometry}
        material={materials['Color texture']}
        position={[-407.519, 0, -184.169]}
        rotation={[0, -0.953, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025254.geometry}
        material={materials['Color texture']}
        position={[-391.151, 0, -186.267]}
        rotation={[0, 0.318, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003255.geometry}
        material={materials['Color texture']}
        position={[-423.047, 0, -162.345]}
        rotation={[0, 0.409, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002256.geometry}
        material={materials['Color texture']}
        position={[-402.063, 0, -171.158]}
        rotation={[0, -0.588, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002257.geometry}
        material={materials['Color texture']}
        position={[-433.539, 0, -162.345]}
        rotation={[Math.PI, -0.527, Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026258.geometry}
        material={materials['Color texture']}
        position={[-432.7, 0, -139.682]}
        rotation={[Math.PI, -0.415, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002259.geometry}
        material={materials['Color texture']}
        position={[-436.058, 0, -130.449]}
        rotation={[0, -1.489, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025260.geometry}
        material={materials['Color texture']}
        position={[-454.943, 0, -123.734]}
        rotation={[Math.PI, -1.361, Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025261.geometry}
        material={materials['Color texture']}
        position={[-472.57, 0, -114.921]}
        rotation={[-Math.PI, 1.054, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025262.geometry}
        material={materials['Color texture']}
        position={[-478.865, 0, -101.911]}
        rotation={[Math.PI, -1.211, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003263.geometry}
        material={materials['Color texture']}
        position={[-473.829, 0, -85.963]}
        rotation={[0, 0.722, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023264.geometry}
        material={materials['Color texture']}
        position={[-464.596, 0, -92.258]}
        rotation={[Math.PI, -0.968, Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025265.geometry}
        material={materials['Color texture']}
        position={[-420.949, 0, -124.574]}
        rotation={[0, 0.474, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002266.geometry}
        material={materials['Color texture']}
        position={[-420.529, 0, -114.082]}
        rotation={[0, -0.144, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023267.geometry}
        material={materials['Color texture']}
        position={[-431.021, 0, -121.216]}
        rotation={[-Math.PI, 0.971, -Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024268.geometry}
        material={materials['Color texture']}
        position={[-436.058, 0, -105.688]}
        rotation={[0, 0.289, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025269.geometry}
        material={materials['Color texture']}
        position={[-452.845, 0, -103.589]}
        rotation={[0, 0.64, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002270.geometry}
        material={materials['Color texture']}
        position={[-454.943, 0, -87.642]}
        rotation={[Math.PI, -1.215, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026271.geometry}
        material={materials['Color texture']}
        position={[-462.078, 0, -51.549]}
        rotation={[Math.PI, -1.066, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025272.geometry}
        material={materials['Color texture']}
        position={[-456.202, 0, -62.461]}
        rotation={[0, 0.45, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023273.geometry}
        material={materials['Color texture']}
        position={[-468.373, 0, -67.916]}
        rotation={[Math.PI, -0.281, Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002274.geometry}
        material={materials['Color texture']}
        position={[-466.275, 0, -69.595]}
        rotation={[Math.PI, -0.366, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024275.geometry}
        material={materials['Color texture']}
        position={[-458.72, 0, -80.507]}
        rotation={[0, -0.248, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002276.geometry}
        material={materials['Color texture']}
        position={[-459.14, 0, -121.216]}
        rotation={[0, -0.797, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002277.geometry}
        material={materials['Color texture']}
        position={[-429.343, 0, -136.325]}
        rotation={[0, 0.844, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003278.geometry}
        material={materials['Color texture']}
        position={[-441.094, 0, -101.491]}
        rotation={[Math.PI, -1.015, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002279.geometry}
        material={materials['Color texture']}
        position={[-449.907, 0, -94.776]}
        rotation={[0, 0.861, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004280.geometry}
        material={materials['Color texture']}
        position={[-475.088, 0, -101.491]}
        rotation={[0, -1.431, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002281.geometry}
        material={materials['Color texture']}
        position={[-406.68, 0, -4.125]}
        rotation={[0, 0.519, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002282.geometry}
        material={materials['Color texture']}
        position={[-407.939, 0, -14.617]}
        rotation={[0, -0.601, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026283.geometry}
        material={materials['Color texture']}
        position={[-417.172, 0, -21.751]}
        rotation={[0, 1.07, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002284.geometry}
        material={materials['Color texture']}
        position={[-413.814, 0, -28.466]}
        rotation={[-Math.PI, 0.795, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026285.geometry}
        material={materials['Color texture']}
        position={[-418.011, 0, -29.306]}
        rotation={[-Math.PI, 0.384, -Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024286.geometry}
        material={materials['Color texture']}
        position={[-459.14, 0, -21.332]}
        rotation={[0, 0.714, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003287.geometry}
        material={materials['Color texture']}
        position={[-484.321, 0, 3.43]}
        rotation={[Math.PI, -1.459, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003288.geometry}
        material={materials['Color texture']}
        position={[-491.875, 0, -7.482]}
        rotation={[0, 1.38, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003289.geometry}
        material={materials['Color texture']}
        position={[-471.731, 0, -25.948]}
        rotation={[Math.PI, -1.442, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004290.geometry}
        material={materials['Color texture']}
        position={[-483.062, 0, -19.233]}
        rotation={[0, -1.158, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023291.geometry}
        material={materials['Color texture']}
        position={[-478.445, 0, -10.84]}
        rotation={[-Math.PI, 0.382, -Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004292.geometry}
        material={materials['Color texture']}
        position={[-457.461, 0, -17.135]}
        rotation={[-Math.PI, 0.569, -Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004293.geometry}
        material={materials['Color texture']}
        position={[-440.674, 0, -14.617]}
        rotation={[-Math.PI, 0.291, -Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025294.geometry}
        material={materials['Color texture']}
        position={[-436.477, 0, -0.348]}
        rotation={[0, -0.093, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004295.geometry}
        material={materials['Color texture']}
        position={[-458.72, 0, -2.446]}
        rotation={[0, 0.304, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004296.geometry}
        material={materials['Color texture']}
        position={[-463.337, 0, 24.833]}
        rotation={[-Math.PI, 0.313, -Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026297.geometry}
        material={materials['Color texture']}
        position={[-461.239, 0, 40.362]}
        rotation={[0, 0.375, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026298.geometry}
        material={materials['Color texture']}
        position={[-442.773, 0, 40.362]}
        rotation={[-Math.PI, 1.033, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003299.geometry}
        material={materials['Color texture']}
        position={[-425.146, 0, 26.093]}
        rotation={[0, 0.978, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003300.geometry}
        material={materials['Color texture']}
        position={[-429.343, 0, 28.611]}
        rotation={[0, -1.02, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024301.geometry}
        material={materials['Color texture']}
        position={[-442.353, 0, 21.896]}
        rotation={[-Math.PI, 0.256, -Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002302.geometry}
        material={materials['Color texture']}
        position={[-428.084, 0, 8.046]}
        rotation={[0, 1.173, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002303.geometry}
        material={materials['Color texture']}
        position={[-429.343, 0, 38.263]}
        rotation={[0, 0.097, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003304.geometry}
        material={materials['Color texture']}
        position={[-461.658, 0, 26.093]}
        rotation={[Math.PI, -0.813, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023305.geometry}
        material={materials['Color texture']}
        position={[-446.969, 0, -3.705]}
        rotation={[Math.PI, -0.28, Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004306.geometry}
        material={materials['Color texture']}
        position={[-479.285, 0, 68.9]}
        rotation={[0, -1.055, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004307.geometry}
        material={materials['Color texture']}
        position={[-472.99, 0, 58.828]}
        rotation={[0, 0.109, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026308.geometry}
        material={materials['Color texture']}
        position={[-480.964, 0, 53.372]}
        rotation={[-Math.PI, 0.44, -Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002309.geometry}
        material={materials['Color texture']}
        position={[-447.809, 0, 24.414]}
        rotation={[0, -0.741, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023310.geometry}
        material={materials['Color texture']}
        position={[-468.793, 0, 7.207]}
        rotation={[0, -1.523, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026311.geometry}
        material={materials['Color texture']}
        position={[-444.871, 0, -14.617]}
        rotation={[0, 0.671, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002312.geometry}
        material={materials['Color texture']}
        position={[-445.71, 0, 42.46]}
        rotation={[-Math.PI, 1.552, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002313.geometry}
        material={materials['Color texture']}
        position={[-489.357, 0, -6.223]}
        rotation={[0, -0.591, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004314.geometry}
        material={materials['Color texture']}
        position={[-499.01, 0, -39.798]}
        rotation={[0, 1.033, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002315.geometry}
        material={materials['Color texture']}
        position={[-524.191, 0, -38.958]}
        rotation={[0, 0.223, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003316.geometry}
        material={materials['Color texture']}
        position={[-520.833, 0, -30.565]}
        rotation={[0, 0.574, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025317.geometry}
        material={materials['Color texture']}
        position={[-484.741, 0, -42.735]}
        rotation={[-Math.PI, 1.531, -Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023318.geometry}
        material={materials['Color texture']}
        position={[-471.311, 0, -111.563]}
        rotation={[Math.PI, -0.253, Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002319.geometry}
        material={materials['Color texture']}
        position={[-450.327, 0, -115.341]}
        rotation={[0, 0.55, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024320.geometry}
        material={materials['Color texture']}
        position={[-457.881, 0, -85.963]}
        rotation={[Math.PI, -1.534, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026321.geometry}
        material={materials['Color texture']}
        position={[96.939, 0, -331.057]}
        rotation={[0, 1.099, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002322.geometry}
        material={materials['Color texture']}
        position={[126.737, 0, -331.897]}
        rotation={[0, -1.197, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024323.geometry}
        material={materials['Color texture']}
        position={[130.934, 0, -326.861]}
        rotation={[Math.PI, -0.747, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003324.geometry}
        material={materials['Color texture']}
        position={[138.068, 0, -322.664]}
        rotation={[0, 1.526, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023325.geometry}
        material={materials['Color texture']}
        position={[124.639, 0, -310.493]}
        rotation={[Math.PI, -1.311, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002326.geometry}
        material={materials['Color texture']}
        position={[127.576, 0, -306.716]}
        rotation={[0, -1.414, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004327.geometry}
        material={materials['Color texture']}
        position={[117.504, 0, -317.628]}
        rotation={[0, -1.517, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002328.geometry}
        material={materials['Color texture']}
        position={[91.903, 0, -320.565]}
        rotation={[Math.PI, -0.247, Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004329.geometry}
        material={materials['Color texture']}
        position={[108.271, 0, -300.421]}
        rotation={[Math.PI, -0.746, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003330.geometry}
        material={materials['Color texture']}
        position={[114.566, 0, -295.384]}
        rotation={[-Math.PI, 0.829, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025331.geometry}
        material={materials['Color texture']}
        position={[138.488, 0, -304.617]}
        rotation={[-Math.PI, 1.14, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003332.geometry}
        material={materials['Color texture']}
        position={[135.131, 0, -288.25]}
        rotation={[0, 1.447, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003333.geometry}
        material={materials['Color texture']}
        position={[129.675, 0, -285.312]}
        rotation={[0, -1.568, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023334.geometry}
        material={materials['Color texture']}
        position={[117.504, 0, -279.017]}
        rotation={[Math.PI, -1.567, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024335.geometry}
        material={materials['Color texture']}
        position={[123.799, 0, -297.903]}
        rotation={[Math.PI, -0.671, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004336.geometry}
        material={materials['Color texture']}
        position={[109.53, 0, -272.722]}
        rotation={[Math.PI, -0.87, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003337.geometry}
        material={materials['Color texture']}
        position={[117.504, 0, -260.131]}
        rotation={[-Math.PI, 1.23, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002338.geometry}
        material={materials['Color texture']}
        position={[96.52, 0, -266.846]}
        rotation={[-Math.PI, 1.441, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003339.geometry}
        material={materials['Color texture']}
        position={[146.882, 0, -260.131]}
        rotation={[0, -0.77, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003340.geometry}
        material={materials['Color texture']}
        position={[148.56, 0, -268.105]}
        rotation={[0, 0.239, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024341.geometry}
        material={materials['Color texture']}
        position={[179.197, 0, -295.384]}
        rotation={[Math.PI, -1.096, Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024342.geometry}
        material={materials['Color texture']}
        position={[182.555, 0, -294.125]}
        rotation={[-Math.PI, 1.432, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002343.geometry}
        material={materials['Color texture']}
        position={[194.306, 0, -296.224]}
        rotation={[-Math.PI, 1.547, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004344.geometry}
        material={materials['Color texture']}
        position={[212.772, 0, -281.955]}
        rotation={[0, -1.331, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026345.geometry}
        material={materials['Color texture']}
        position={[209.834, 0, -293.706]}
        rotation={[0, 0.346, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004346.geometry}
        material={materials['Color texture']}
        position={[203.119, 0, -300.84]}
        rotation={[0, -0.503, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004347.geometry}
        material={materials['Color texture']}
        position={[224.103, 0, -286.151]}
        rotation={[0, -0.501, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004348.geometry}
        material={materials['Color texture']}
        position={[209.414, 0, -276.918]}
        rotation={[0, -0.578, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025349.geometry}
        material={materials['Color texture']}
        position={[214.87, 0, -275.659]}
        rotation={[0, 1.367, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004350.geometry}
        material={materials['Color texture']}
        position={[196.824, 0, -284.053]}
        rotation={[0, 1.006, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003351.geometry}
        material={materials['Color texture']}
        position={[197.663, 0, -274.82]}
        rotation={[-Math.PI, 1.212, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002352.geometry}
        material={materials['Color texture']}
        position={[177.938, 0, -265.587]}
        rotation={[-Math.PI, 0.841, -Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025353.geometry}
        material={materials['Color texture']}
        position={[172.902, 0, -262.23]}
        rotation={[-Math.PI, 0.283, -Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026354.geometry}
        material={materials['Color texture']}
        position={[157.793, 0, -259.711]}
        rotation={[0, -1.349, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002355.geometry}
        material={materials['Color texture']}
        position={[164.089, 0, -278.597]}
        rotation={[0, 0.587, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026356.geometry}
        material={materials['Color texture']}
        position={[159.892, 0, -293.286]}
        rotation={[0, -0.134, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004357.geometry}
        material={materials['Color texture']}
        position={[244.248, 0, -300.001]}
        rotation={[Math.PI, -1.351, Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002358.geometry}
        material={materials['Color texture']}
        position={[256.839, 0, -284.892]}
        rotation={[0, -1.523, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026359.geometry}
        material={materials['Color texture']}
        position={[78.054, 0, -158.148]}
        rotation={[0, -0.274, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004360.geometry}
        material={materials['Color texture']}
        position={[81.831, 0, -163.184]}
        rotation={[0, -0.452, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024361.geometry}
        material={materials['Color texture']}
        position={[86.028, 0, -158.568]}
        rotation={[-Math.PI, 1.133, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002362.geometry}
        material={materials['Color texture']}
        position={[97.359, 0, -166.542]}
        rotation={[0, -0.779, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025363.geometry}
        material={materials['Color texture']}
        position={[92.743, 0, -174.516]}
        rotation={[-Math.PI, 0.48, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024364.geometry}
        material={materials['Color texture']}
        position={[90.225, 0, -187.106]}
        rotation={[Math.PI, -0.733, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002365.geometry}
        material={materials['Color texture']}
        position={[82.251, 0, -189.205]}
        rotation={[0, 0.758, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003366.geometry}
        material={materials['Color texture']}
        position={[99.038, 0, -200.117]}
        rotation={[0, 0.024, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004367.geometry}
        material={materials['Color texture']}
        position={[100.717, 0, -188.785]}
        rotation={[0, -1.496, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024368.geometry}
        material={materials['Color texture']}
        position={[107.851, 0, -208.51]}
        rotation={[Math.PI, -0.876, Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003369.geometry}
        material={materials['Color texture']}
        position={[117.504, 0, -214.386]}
        rotation={[0, 1.031, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025370.geometry}
        material={materials['Color texture']}
        position={[104.913, 0, -224.458]}
        rotation={[-Math.PI, 0.128, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023371.geometry}
        material={materials['Color texture']}
        position={[107.432, 0, -223.619]}
        rotation={[0, 1.238, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003372.geometry}
        material={materials['Color texture']}
        position={[117.924, 0, -233.691]}
        rotation={[0, -1.11, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002373.geometry}
        material={materials['Color texture']}
        position={[101.136, 0, -235.37]}
        rotation={[-Math.PI, 1.127, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002374.geometry}
        material={materials['Color texture']}
        position={[94.002, 0, -247.96]}
        rotation={[-Math.PI, 1.102, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023375.geometry}
        material={materials['Color texture']}
        position={[85.608, 0, -254.675]}
        rotation={[-Math.PI, 0.359, -Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002376.geometry}
        material={materials['Color texture']}
        position={[101.556, 0, -245.442]}
        rotation={[-Math.PI, 0.112, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002377.geometry}
        material={materials['Color texture']}
        position={[104.074, 0, -245.023]}
        rotation={[-Math.PI, 1.095, -Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004378.geometry}
        material={materials['Color texture']}
        position={[121.281, 0, -241.665]}
        rotation={[0, 1.108, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003379.geometry}
        material={materials['Color texture']}
        position={[126.317, 0, -229.075]}
        rotation={[0, 0.267, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002380.geometry}
        material={materials['Color texture']}
        position={[125.898, 0, -215.645]}
        rotation={[0, -1.491, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025381.geometry}
        material={materials['Color texture']}
        position={[118.763, 0, -200.117]}
        rotation={[0, -1.126, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002382.geometry}
        material={materials['Color texture']}
        position={[119.602, 0, -190.883]}
        rotation={[0, 0.25, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023383.geometry}
        material={materials['Color texture']}
        position={[127.576, 0, -195.08]}
        rotation={[-Math.PI, 1.343, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002384.geometry}
        material={materials['Color texture']}
        position={[134.711, 0, -210.609]}
        rotation={[Math.PI, -0.713, Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025385.geometry}
        material={materials['Color texture']}
        position={[137.229, 0, -208.51]}
        rotation={[-Math.PI, 1.248, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024386.geometry}
        material={materials['Color texture']}
        position={[135.55, 0, -220.261]}
        rotation={[-Math.PI, 0.385, -Math.PI]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026387.geometry}
        material={materials['Color texture']}
        position={[142.685, 0, -227.396]}
        rotation={[0, -0.187, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002388.geometry}
        material={materials['Color texture']}
        position={[137.649, 0, -241.665]}
        rotation={[Math.PI, -0.72, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025389.geometry}
        material={materials['Color texture']}
        position={[133.872, 0, -238.727]}
        rotation={[-Math.PI, 1.179, -Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023390.geometry}
        material={materials['Color texture']}
        position={[147.721, 0, -239.147]}
        rotation={[Math.PI, -1.178, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025391.geometry}
        material={materials['Color texture']}
        position={[157.374, 0, -242.085]}
        rotation={[Math.PI, -0.678, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026392.geometry}
        material={materials['Color texture']}
        position={[160.731, 0, -239.147]}
        rotation={[Math.PI, -1.498, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026393.geometry}
        material={materials['Color texture']}
        position={[163.669, 0, -243.344]}
        rotation={[Math.PI, -0.691, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025394.geometry}
        material={materials['Color texture']}
        position={[159.892, 0, -226.976]}
        rotation={[-Math.PI, 0.022, -Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023395.geometry}
        material={materials['Color texture']}
        position={[153.597, 0, -216.484]}
        rotation={[Math.PI, -0.979, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026396.geometry}
        material={materials['Color texture']}
        position={[147.721, 0, -213.966]}
        rotation={[0, 0.284, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003397.geometry}
        material={materials['Color texture']}
        position={[150.239, 0, -211.868]}
        rotation={[0, -0.537, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002398.geometry}
        material={materials['Color texture']}
        position={[155.695, 0, -206.412]}
        rotation={[-Math.PI, 1.184, -Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002399.geometry}
        material={materials['Color texture']}
        position={[175.42, 0, -217.323]}
        rotation={[0, 1.294, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026400.geometry}
        material={materials['Color texture']}
        position={[101.556, 0, -174.096]}
        rotation={[0, 1.236, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002401.geometry}
        material={materials['Color texture']}
        position={[104.494, 0, -171.998]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003402.geometry}
        material={materials['Color texture']}
        position={[111.628, 0, -178.293]}
        rotation={[0, 0.353, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026403.geometry}
        material={materials['Color texture']}
        position={[123.799, 0, -173.676]}
        rotation={[Math.PI, -0.371, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025404.geometry}
        material={materials['Color texture']}
        position={[133.872, 0, -180.391]}
        rotation={[0, 0.225, 0]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026405.geometry}
        material={materials['Color texture']}
        position={[130.514, 0, -176.614]}
        rotation={[0, 0.782, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004406.geometry}
        material={materials['Color texture']}
        position={[146.882, 0, -187.946]}
        rotation={[0, -0.237, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023407.geometry}
        material={materials['Color texture']}
        position={[169.964, 0, -170.319]}
        rotation={[Math.PI, -1.346, Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003408.geometry}
        material={materials['Color texture']}
        position={[208.995, 0, -182.07]}
        rotation={[-Math.PI, 1.414, -Math.PI]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023409.geometry}
        material={materials['Color texture']}
        position={[198.503, 0, -210.189]}
        rotation={[-Math.PI, 0.545, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002410.geometry}
        material={materials['Color texture']}
        position={[209.414, 0, -214.805]}
        rotation={[-Math.PI, 1.388, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023411.geometry}
        material={materials['Color texture']}
        position={[213.611, 0, -220.261]}
        rotation={[0, 0.291, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024412.geometry}
        material={materials['Color texture']}
        position={[193.467, 0, -230.334]}
        rotation={[0, -1.444, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026413.geometry}
        material={materials['Color texture']}
        position={[204.378, 0, -233.691]}
        rotation={[0, -0.692, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026414.geometry}
        material={materials['Color texture']}
        position={[193.886, 0, -250.059]}
        rotation={[-Math.PI, 1.486, -Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024415.geometry}
        material={materials['Color texture']}
        position={[197.244, 0, -258.452]}
        rotation={[-Math.PI, 1.016, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003416.geometry}
        material={materials['Color texture']}
        position={[182.555, 0, -253.836]}
        rotation={[0, -1.241, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003417.geometry}
        material={materials['Color texture']}
        position={[178.358, 0, -251.318]}
        rotation={[0, -0.499, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004418.geometry}
        material={materials['Color texture']}
        position={[187.591, 0, -248.38]}
        rotation={[0, 0.53, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024419.geometry}
        material={materials['Color texture']}
        position={[175, 0, -241.665]}
        rotation={[0, 1.173, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002420.geometry}
        material={materials['Color texture']}
        position={[198.083, 0, -243.344]}
        rotation={[Math.PI, -0.787, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026421.geometry}
        material={materials['Color texture']}
        position={[189.27, 0, -229.914]}
        rotation={[Math.PI, -0.425, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024422.geometry}
        material={materials['Color texture']}
        position={[190.109, 0, -222.779]}
        rotation={[Math.PI, -0.656, Math.PI]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002423.geometry}
        material={materials['Color texture']}
        position={[176.26, 0, -229.494]}
        rotation={[Math.PI, -0.633, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002424.geometry}
        material={materials['Color texture']}
        position={[166.187, 0, -200.536]}
        rotation={[Math.PI, -0.821, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002425.geometry}
        material={materials['Color texture']}
        position={[159.053, 0, -193.402]}
        rotation={[0, 0.839, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023426.geometry}
        material={materials['Color texture']}
        position={[162.41, 0, -191.303]}
        rotation={[Math.PI, -1.192, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003427.geometry}
        material={materials['Color texture']}
        position={[156.954, 0, -187.946]}
        rotation={[0, -0.753, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004428.geometry}
        material={materials['Color texture']}
        position={[172.063, 0, -166.962]}
        rotation={[0, 1.055, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002429.geometry}
        material={materials['Color texture']}
        position={[195.985, 0, -171.158]}
        rotation={[0, 0.182, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025430.geometry}
        material={materials['Color texture']}
        position={[196.404, 0, -200.536]}
        rotation={[Math.PI, -0.321, Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024431.geometry}
        material={materials['Color texture']}
        position={[201.44, 0, -208.09]}
        rotation={[Math.PI, -1.057, Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002432.geometry}
        material={materials['Color texture']}
        position={[235.435, 0, -224.878]}
        rotation={[-Math.PI, 0.117, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002433.geometry}
        material={materials['Color texture']}
        position={[242.569, 0, -231.593]}
        rotation={[0, 1.152, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004434.geometry}
        material={materials['Color texture']}
        position={[111.209, 0, -208.09]}
        rotation={[0, -1.045, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002435.geometry}
        material={materials['Color texture']}
        position={[101.976, 0, -198.018]}
        rotation={[0, 0.787, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002436.geometry}
        material={materials['Color texture']}
        position={[117.504, 0, -224.878]}
        rotation={[Math.PI, -0.584, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004437.geometry}
        material={materials['Color texture']}
        position={[145.203, 0, -224.878]}
        rotation={[-Math.PI, 0.476, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002438.geometry}
        material={materials['Color texture']}
        position={[220.326, 0, -242.504]}
        rotation={[-Math.PI, 1.325, -Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002439.geometry}
        material={materials['Color texture']}
        position={[235.435, 0, -249.219]}
        rotation={[0, -0.141, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003440.geometry}
        material={materials['Color texture']}
        position={[230.818, 0, -256.774]}
        rotation={[0, 0.306, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003441.geometry}
        material={materials['Color texture']}
        position={[221.166, 0, -262.23]}
        rotation={[0, 0.37, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002442.geometry}
        material={materials['Color texture']}
        position={[218.228, 0, -259.711]}
        rotation={[0, 0.366, 0]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004443.geometry}
        material={materials['Color texture']}
        position={[210.673, 0, -261.39]}
        rotation={[Math.PI, -0.352, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023444.geometry}
        material={materials['Color texture']}
        position={[216.549, 0, -250.478]}
        rotation={[Math.PI, -1.128, Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025445.geometry}
        material={materials['Color texture']}
        position={[239.632, 0, -247.121]}
        rotation={[Math.PI, -0.264, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003446.geometry}
        material={materials['Color texture']}
        position={[243.828, 0, -255.934]}
        rotation={[Math.PI, -0.612, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002447.geometry}
        material={materials['Color texture']}
        position={[250.963, 0, -250.478]}
        rotation={[Math.PI, -0.099, Math.PI]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024448.geometry}
        material={materials['Color texture']}
        position={[257.258, 0, -259.711]}
        rotation={[-Math.PI, 0.698, -Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002449.geometry}
        material={materials['Color texture']}
        position={[270.688, 0, -257.193]}
        rotation={[0, -0.139, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002450.geometry}
        material={materials['Color texture']}
        position={[272.787, 0, -259.292]}
        rotation={[Math.PI, -0.635, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004451.geometry}
        material={materials['Color texture']}
        position={[267.75, 0, -267.266]}
        rotation={[0, -0.32, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024452.geometry}
        material={materials['Color texture']}
        position={[277.403, 0, -268.525]}
        rotation={[0, -0.298, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003453.geometry}
        material={materials['Color texture']}
        position={[279.921, 0, -256.354]}
        rotation={[0, -0.564, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002454.geometry}
        material={materials['Color texture']}
        position={[284.957, 0, -268.105]}
        rotation={[0, 0.52, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023455.geometry}
        material={materials['Color texture']}
        position={[271.527, 0, -242.504]}
        rotation={[-Math.PI, 0.136, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002456.geometry}
        material={materials['Color texture']}
        position={[255.58, 0, -231.173]}
        rotation={[-Math.PI, 1.537, -Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003457.geometry}
        material={materials['Color texture']}
        position={[255.16, 0, -238.727]}
        rotation={[0, -1.037, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003458.geometry}
        material={materials['Color texture']}
        position={[251.383, 0, -236.629]}
        rotation={[0, 0.419, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026459.geometry}
        material={materials['Color texture']}
        position={[247.186, 0, -224.878]}
        rotation={[Math.PI, -1.284, Math.PI]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025460.geometry}
        material={materials['Color texture']}
        position={[243.409, 0, -218.583]}
        rotation={[0, 1.361, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023461.geometry}
        material={materials['Color texture']}
        position={[228.72, 0, -217.323]}
        rotation={[0, -1.283, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023462.geometry}
        material={materials['Color texture']}
        position={[224.943, 0, -228.235]}
        rotation={[0, 0.026, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003463.geometry}
        material={materials['Color texture']}
        position={[230.818, 0, -232.852]}
        rotation={[0, 0.058, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004464.geometry}
        material={materials['Color texture']}
        position={[231.658, 0, -230.334]}
        rotation={[0, -1.245, 0]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002465.geometry}
        material={materials['Color texture']}
        position={[261.455, 0, -225.297]}
        rotation={[-Math.PI, 0.994, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003466.geometry}
        material={materials['Color texture']}
        position={[258.098, 0, -223.199]}
        rotation={[0, -0.697, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025467.geometry}
        material={materials['Color texture']}
        position={[262.294, 0, -220.681]}
        rotation={[0, -0.959, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025468.geometry}
        material={materials['Color texture']}
        position={[276.144, 0, -227.816]}
        rotation={[0, -0.482, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026469.geometry}
        material={materials['Color texture']}
        position={[283.279, 0, -233.271]}
        rotation={[0, 0.425, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003470.geometry}
        material={materials['Color texture']}
        position={[279.501, 0, -234.95]}
        rotation={[0, -0.695, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026471.geometry}
        material={materials['Color texture']}
        position={[266.911, 0, -235.79]}
        rotation={[Math.PI, -0.612, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002472.geometry}
        material={materials['Color texture']}
        position={[286.216, 0, -243.764]}
        rotation={[0, -0.425, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002473.geometry}
        material={materials['Color texture']}
        position={[296.289, 0, -245.862]}
        rotation={[Math.PI, -1.229, Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026474.geometry}
        material={materials['Color texture']}
        position={[292.931, 0, -242.924]}
        rotation={[0, 1.569, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002475.geometry}
        material={materials['Color texture']}
        position={[295.869, 0, -239.147]}
        rotation={[Math.PI, -0.519, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002476.geometry}
        material={materials['Color texture']}
        position={[292.092, 0, -230.334]}
        rotation={[0, 0.396, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004477.geometry}
        material={materials['Color texture']}
        position={[292.092, 0, -223.619]}
        rotation={[Math.PI, -0.187, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026478.geometry}
        material={materials['Color texture']}
        position={[308.879, 0, -237.468]}
        rotation={[0, 0.424, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025479.geometry}
        material={materials['Color texture']}
        position={[176.679, 0, -244.183]}
        rotation={[0, -0.48, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024480.geometry}
        material={materials['Color texture']}
        position={[319.371, 0, -250.898]}
        rotation={[Math.PI, -0.037, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023481.geometry}
        material={materials['Color texture']}
        position={[314.335, 0, -247.96]}
        rotation={[Math.PI, -0.035, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024482.geometry}
        material={materials['Color texture']}
        position={[310.558, 0, -250.898]}
        rotation={[Math.PI, -0.277, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023483.geometry}
        material={materials['Color texture']}
        position={[330.283, 0, -250.059]}
        rotation={[Math.PI, -0.6, Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026484.geometry}
        material={materials['Color texture']}
        position={[332.381, 0, -249.219]}
        rotation={[0, -0.812, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026485.geometry}
        material={materials['Color texture']}
        position={[336.998, 0, -249.639]}
        rotation={[0, -1.022, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026486.geometry}
        material={materials['Color texture']}
        position={[330.283, 0, -238.308]}
        rotation={[0, -0.526, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002487.geometry}
        material={materials['Color texture']}
        position={[324.408, 0, -239.147]}
        rotation={[0, 0.9, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002488.geometry}
        material={materials['Color texture']}
        position={[354.625, 0, -244.603]}
        rotation={[Math.PI, -1.441, Math.PI]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024489.geometry}
        material={materials['Color texture']}
        position={[358.821, 0, -251.737]}
        rotation={[0, -0.344, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003490.geometry}
        material={materials['Color texture']}
        position={[361.759, 0, -236.629]}
        rotation={[0, -1.474, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026491.geometry}
        material={materials['Color texture']}
        position={[357.982, 0, -235.37]}
        rotation={[Math.PI, -0.722, Math.PI]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003492.geometry}
        material={materials['Color texture']}
        position={[360.5, 0, -232.432]}
        rotation={[0, 0.408, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023493.geometry}
        material={materials['Color texture']}
        position={[344.133, 0, -237.888]}
        rotation={[0, 0.683, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004494.geometry}
        material={materials['Color texture']}
        position={[375.189, 0, -230.334]}
        rotation={[0, -0.788, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025495.geometry}
        material={materials['Color texture']}
        position={[368.055, 0, -232.432]}
        rotation={[-Math.PI, 0.391, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023496.geometry}
        material={materials['Color texture']}
        position={[385.681, 0, -237.888]}
        rotation={[0, -1.289, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026497.geometry}
        material={materials['Color texture']}
        position={[397.432, 0, -224.038]}
        rotation={[0, -0.481, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003498.geometry}
        material={materials['Color texture']}
        position={[403.308, 0, -219.002]}
        rotation={[-Math.PI, 0.044, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026499.geometry}
        material={materials['Color texture']}
        position={[410.862, 0, -225.717]}
        rotation={[0, 0.966, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023500.geometry}
        material={materials['Color texture']}
        position={[406.246, 0, -237.049]}
        rotation={[0, -0.129, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024501.geometry}
        material={materials['Color texture']}
        position={[418.416, 0, -218.583]}
        rotation={[-Math.PI, 0.346, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023502.geometry}
        material={materials['Color texture']}
        position={[413.38, 0, -211.448]}
        rotation={[0, -0.777, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026503.geometry}
        material={materials['Color texture']}
        position={[414.639, 0, -209.35]}
        rotation={[-Math.PI, 0.319, -Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004504.geometry}
        material={materials['Color texture']}
        position={[499.835, 0, -205.572]}
        rotation={[0, -1.513, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023505.geometry}
        material={materials['Color texture']}
        position={[486.405, 0, -229.914]}
        rotation={[0, -0.326, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026506.geometry}
        material={materials['Color texture']}
        position={[483.467, 0, -226.557]}
        rotation={[0, 0.027, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004507.geometry}
        material={materials['Color texture']}
        position={[496.058, 0, -202.215]}
        rotation={[0, 1.446, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004508.geometry}
        material={materials['Color texture']}
        position={[499.835, 0, -200.536]}
        rotation={[0, 0.319, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002509.geometry}
        material={materials['Color texture']}
        position={[492.7, 0, -194.241]}
        rotation={[0, -0.754, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002510.geometry}
        material={materials['Color texture']}
        position={[515.363, 0, -185.008]}
        rotation={[0, -0.838, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002511.geometry}
        material={materials['Color texture']}
        position={[512.845, 0, -166.962]}
        rotation={[-Math.PI, 0.836, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002512.geometry}
        material={materials['Color texture']}
        position={[501.094, 0, -165.283]}
        rotation={[Math.PI, -1.549, Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025513.geometry}
        material={materials['Color texture']}
        position={[481.789, 0, -174.516]}
        rotation={[Math.PI, -0.073, Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002514.geometry}
        material={materials['Color texture']}
        position={[478.011, 0, -171.998]}
        rotation={[0, 0.864, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024515.geometry}
        material={materials['Color texture']}
        position={[470.457, 0, -183.329]}
        rotation={[0, 0.125, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002516.geometry}
        material={materials['Color texture']}
        position={[421.774, 0, -171.998]}
        rotation={[0, 0.164, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026517.geometry}
        material={materials['Color texture']}
        position={[428.489, 0, -177.873]}
        rotation={[0, 1.404, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023518.geometry}
        material={materials['Color texture']}
        position={[423.872, 0, -188.365]}
        rotation={[0, 1.228, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026519.geometry}
        material={materials['Color texture']}
        position={[425.131, 0, -194.661]}
        rotation={[Math.PI, -0.931, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002520.geometry}
        material={materials['Color texture']}
        position={[420.935, 0, -205.572]}
        rotation={[-Math.PI, 1.16, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023521.geometry}
        material={materials['Color texture']}
        position={[418.836, 0, -202.635]}
        rotation={[Math.PI, -0.116, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004522.geometry}
        material={materials['Color texture']}
        position={[421.774, 0, -200.536]}
        rotation={[0, 1.109, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025523.geometry}
        material={materials['Color texture']}
        position={[364.697, 0, -95.196]}
        rotation={[Math.PI, -1.231, Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024524.geometry}
        material={materials['Color texture']}
        position={[364.277, 0, -102.33]}
        rotation={[-Math.PI, 1.275, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002525.geometry}
        material={materials['Color texture']}
        position={[373.93, 0, -99.812]}
        rotation={[0, -0.329, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026526.geometry}
        material={materials['Color texture']}
        position={[457.867, 0, -170.739]}
        rotation={[0, -0.216, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004527.geometry}
        material={materials['Color texture']}
        position={[462.903, 0, -167.801]}
        rotation={[0, -1.34, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004528.geometry}
        material={materials['Color texture']}
        position={[474.234, 0, -161.506]}
        rotation={[Math.PI, -0.918, Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026529.geometry}
        material={materials['Color texture']}
        position={[470.457, 0, -158.148]}
        rotation={[Math.PI, -0.308, Math.PI]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026530.geometry}
        material={materials['Color texture']}
        position={[482.208, 0, -153.112]}
        rotation={[0, -0.031, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024531.geometry}
        material={materials['Color texture']}
        position={[485.985, 0, -152.273]}
        rotation={[0, -0.495, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002532.geometry}
        material={materials['Color texture']}
        position={[491.861, 0, -148.496]}
        rotation={[0, 0.77, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024533.geometry}
        material={materials['Color texture']}
        position={[476.752, 0, -140.522]}
        rotation={[Math.PI, -0.465, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002534.geometry}
        material={materials['Color texture']}
        position={[479.27, 0, -136.325]}
        rotation={[-Math.PI, 0.694, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002535.geometry}
        material={materials['Color texture']}
        position={[495.218, 0, -137.584]}
        rotation={[0, 0.659, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002536.geometry}
        material={materials['Color texture']}
        position={[520.819, 0, -153.112]}
        rotation={[-Math.PI, 0.18, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026537.geometry}
        material={materials['Color texture']}
        position={[524.177, 0, -151.853]}
        rotation={[Math.PI, -0.493, Math.PI]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024538.geometry}
        material={materials['Color texture']}
        position={[543.482, 0, -158.988]}
        rotation={[0, 0.914, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024539.geometry}
        material={materials['Color texture']}
        position={[559.43, 0, -151.014]}
        rotation={[Math.PI, -0.417, Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023540.geometry}
        material={materials['Color texture']}
        position={[556.492, 0, -148.076]}
        rotation={[-Math.PI, 0.396, -Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002541.geometry}
        material={materials['Color texture']}
        position={[540.124, 0, -146.397]}
        rotation={[Math.PI, -0.593, Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023542.geometry}
        material={materials['Color texture']}
        position={[561.109, 0, -139.262]}
        rotation={[Math.PI, -0.419, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023543.geometry}
        material={materials['Color texture']}
        position={[594.264, 0, -143.04]}
        rotation={[Math.PI, -0.101, Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003544.geometry}
        material={materials['Color texture']}
        position={[592.165, 0, -140.941]}
        rotation={[-Math.PI, 1.033, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002545.geometry}
        material={materials['Color texture']}
        position={[596.362, 0, -138.423]}
        rotation={[0, -1.019, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024546.geometry}
        material={materials['Color texture']}
        position={[586.709, 0, -135.485]}
        rotation={[Math.PI, -1.051, Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024547.geometry}
        material={materials['Color texture']}
        position={[570.761, 0, -127.092]}
        rotation={[0, 1.416, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002548.geometry}
        material={materials['Color texture']}
        position={[575.797, 0, -148.915]}
        rotation={[Math.PI, -0.714, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002549.geometry}
        material={materials['Color texture']}
        position={[589.227, 0, -122.475]}
        rotation={[Math.PI, -1.287, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025550.geometry}
        material={materials['Color texture']}
        position={[585.87, 0, -119.957]}
        rotation={[0, 1.54, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002551.geometry}
        material={materials['Color texture']}
        position={[561.109, 0, -116.18]}
        rotation={[0, -0.464, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003552.geometry}
        material={materials['Color texture']}
        position={[558.171, 0, -100.232]}
        rotation={[0, -0.688, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023553.geometry}
        material={materials['Color texture']}
        position={[583.771, 0, -96.455]}
        rotation={[-Math.PI, 0.445, -Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024554.geometry}
        material={materials['Color texture']}
        position={[579.575, 0, -103.17]}
        rotation={[-Math.PI, 1.401, -Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002555.geometry}
        material={materials['Color texture']}
        position={[576.637, 0, -99.393]}
        rotation={[-Math.PI, 0.827, -Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002556.geometry}
        material={materials['Color texture']}
        position={[565.725, 0, -107.367]}
        rotation={[0, 1.149, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003557.geometry}
        material={materials['Color texture']}
        position={[543.902, 0, -124.154]}
        rotation={[0, -1.245, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025558.geometry}
        material={materials['Color texture']}
        position={[529.213, 0, -138.843]}
        rotation={[Math.PI, -1.368, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023559.geometry}
        material={materials['Color texture']}
        position={[532.15, 0, -134.646]}
        rotation={[0, 0.843, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024560.geometry}
        material={materials['Color texture']}
        position={[527.954, 0, -131.708]}
        rotation={[0, -0.107, 0]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002561.geometry}
        material={materials['Color texture']}
        position={[508.648, 0, -138.843]}
        rotation={[0, 1.352, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002562.geometry}
        material={materials['Color texture']}
        position={[512.845, 0, -128.351]}
        rotation={[Math.PI, -0.233, Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024563.geometry}
        material={materials['Color texture']}
        position={[535.088, 0, -118.278]}
        rotation={[0, -0.521, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024564.geometry}
        material={materials['Color texture']}
        position={[530.891, 0, -114.921]}
        rotation={[0, -0.811, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004565.geometry}
        material={materials['Color texture']}
        position={[531.731, 0, -101.491]}
        rotation={[0, -0.143, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025566.geometry}
        material={materials['Color texture']}
        position={[523.757, 0, -103.589]}
        rotation={[0, -0.703, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003567.geometry}
        material={materials['Color texture']}
        position={[525.016, 0, -98.973]}
        rotation={[0, 0.281, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002568.geometry}
        material={materials['Color texture']}
        position={[520.399, 0, -98.553]}
        rotation={[Math.PI, -0.046, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025569.geometry}
        material={materials['Color texture']}
        position={[511.166, 0, -110.304]}
        rotation={[0, 1.422, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002570.geometry}
        material={materials['Color texture']}
        position={[516.622, 0, -121.216]}
        rotation={[0, 0.98, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025571.geometry}
        material={materials['Color texture']}
        position={[522.917, 0, -117.439]}
        rotation={[Math.PI, -1.223, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003572.geometry}
        material={materials['Color texture']}
        position={[491.441, 0, -122.056]}
        rotation={[0, -0.313, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004573.geometry}
        material={materials['Color texture']}
        position={[477.592, 0, -119.537]}
        rotation={[0, 0.173, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023574.geometry}
        material={materials['Color texture']}
        position={[428.069, 0, -158.148]}
        rotation={[0, 0.269, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002575.geometry}
        material={materials['Color texture']}
        position={[413.38, 0, -152.692]}
        rotation={[0, 0.275, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024576.geometry}
        material={materials['Color texture']}
        position={[416.738, 0, -145.558]}
        rotation={[0, 1.535, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023577.geometry}
        material={materials['Color texture']}
        position={[413.38, 0, -143.879]}
        rotation={[Math.PI, -0.373, Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024578.geometry}
        material={materials['Color texture']}
        position={[416.318, 0, -140.941]}
        rotation={[0, -0.548, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023579.geometry}
        material={materials['Color texture']}
        position={[413.38, 0, -130.449]}
        rotation={[0, 0.168, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025580.geometry}
        material={materials['Color texture']}
        position={[389.878, 0, -119.118]}
        rotation={[0, 0.349, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023581.geometry}
        material={materials['Color texture']}
        position={[384.002, 0, -113.662]}
        rotation={[0, 0.383, 0]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024582.geometry}
        material={materials['Color texture']}
        position={[396.173, 0, -111.144]}
        rotation={[Math.PI, -0.194, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024583.geometry}
        material={materials['Color texture']}
        position={[407.085, 0, -123.315]}
        rotation={[0, -0.275, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003584.geometry}
        material={materials['Color texture']}
        position={[409.603, 0, -119.957]}
        rotation={[0, 1.148, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004585.geometry}
        material={materials['Color texture']}
        position={[404.147, 0, -117.859]}
        rotation={[0, -0.956, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026586.geometry}
        material={materials['Color texture']}
        position={[354.625, 0, -102.33]}
        rotation={[0, -0.797, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024587.geometry}
        material={materials['Color texture']}
        position={[346.231, 1.616, -91.419]}
        rotation={[0, 0.937, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025588.geometry}
        material={materials['Color texture']}
        position={[354.625, 0, -78.828]}
        rotation={[Math.PI, -0.716, Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004589.geometry}
        material={materials['Color texture']}
        position={[365.117, 0, -72.953]}
        rotation={[0, 0.143, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004590.geometry}
        material={materials['Color texture']}
        position={[376.448, 0, -98.553]}
        rotation={[-Math.PI, 0.888, -Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026591.geometry}
        material={materials['Color texture']}
        position={[372.671, 0, -110.304]}
        rotation={[0, 0.969, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026592.geometry}
        material={materials['Color texture']}
        position={[386.521, 0, -110.724]}
        rotation={[-Math.PI, 1.255, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023593.geometry}
        material={materials['Color texture']}
        position={[381.484, 0, -107.786]}
        rotation={[-Math.PI, 0.115, -Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025594.geometry}
        material={materials['Color texture']}
        position={[495.638, 0, -120.377]}
        rotation={[0, -0.165, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024595.geometry}
        material={materials['Color texture']}
        position={[473.395, 0, -109.885]}
        rotation={[-Math.PI, 0.166, -Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026596.geometry}
        material={materials['Color texture']}
        position={[497.736, 0, -108.626]}
        rotation={[-Math.PI, 0.264, -Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026597.geometry}
        material={materials['Color texture']}
        position={[495.638, 0, -105.268]}
        rotation={[0, -1.173, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025598.geometry}
        material={materials['Color texture']}
        position={[499.835, 0, -103.17]}
        rotation={[0, 0.902, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003599.geometry}
        material={materials['Color texture']}
        position={[506.13, 0, -90.579]}
        rotation={[-Math.PI, 0.878, -Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002600.geometry}
        material={materials['Color texture']}
        position={[492.281, 0, -82.186]}
        rotation={[0, -0.867, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002601.geometry}
        material={materials['Color texture']}
        position={[487.244, 0, -81.346]}
        rotation={[0, -0.85, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002602.geometry}
        material={materials['Color texture']}
        position={[506.55, 0, -83.445]}
        rotation={[0, 0.389, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025603.geometry}
        material={materials['Color texture']}
        position={[504.032, 0, -80.507]}
        rotation={[-Math.PI, 1.271, -Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003604.geometry}
        material={materials['Color texture']}
        position={[506.13, 0, -76.73]}
        rotation={[0, 1.302, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024605.geometry}
        material={materials['Color texture']}
        position={[473.395, 0, -97.294]}
        rotation={[0, 1.406, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003606.geometry}
        material={materials['Color texture']}
        position={[522.078, 0, -85.123]}
        rotation={[0, 1.525, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003607.geometry}
        material={materials['Color texture']}
        position={[524.596, 0, -82.186]}
        rotation={[-Math.PI, 1.39, -Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023608.geometry}
        material={materials['Color texture']}
        position={[530.472, 0, -81.346]}
        rotation={[-Math.PI, 0.097, -Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023609.geometry}
        material={materials['Color texture']}
        position={[538.026, 0, -80.507]}
        rotation={[-Math.PI, 1.216, -Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002610.geometry}
        material={materials['Color texture']}
        position={[585.45, 0, -86.802]}
        rotation={[-Math.PI, 0.623, -Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002611.geometry}
        material={materials['Color texture']}
        position={[538.026, 0, -2.446]}
        rotation={[-Math.PI, 1.093, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025612.geometry}
        material={materials['Color texture']}
        position={[536.347, 0, 2.171]}
        rotation={[Math.PI, -0.889, Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002613.geometry}
        material={materials['Color texture']}
        position={[530.052, 0, 4.689]}
        rotation={[-Math.PI, 0.039, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024614.geometry}
        material={materials['Color texture']}
        position={[515.363, 0, -29.306]}
        rotation={[-Math.PI, 0.36, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026615.geometry}
        material={materials['Color texture']}
        position={[523.337, 0, -39.378]}
        rotation={[0, -0.425, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003616.geometry}
        material={materials['Color texture']}
        position={[499.835, 0, 3.43]}
        rotation={[0, 0.889, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023617.geometry}
        material={materials['Color texture']}
        position={[504.451, 0, 5.948]}
        rotation={[-Math.PI, 1.485, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025618.geometry}
        material={materials['Color texture']}
        position={[498.156, 0, -28.466]}
        rotation={[-Math.PI, 0.129, -Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002619.geometry}
        material={materials['Color texture']}
        position={[493.54, 0, -23.85]}
        rotation={[0, 0.692, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004620.geometry}
        material={materials['Color texture']}
        position={[496.897, 0, -22.171]}
        rotation={[Math.PI, -0.794, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002621.geometry}
        material={materials['Color texture']}
        position={[483.467, 0, -8.741]}
        rotation={[0, -1.13, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002622.geometry}
        material={materials['Color texture']}
        position={[483.887, 0, 0.912]}
        rotation={[0, -1.547, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024623.geometry}
        material={materials['Color texture']}
        position={[480.949, 0, 3.01]}
        rotation={[0, 1.476, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002624.geometry}
        material={materials['Color texture']}
        position={[483.467, 0, 12.663]}
        rotation={[-Math.PI, 0.653, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004625.geometry}
        material={materials['Color texture']}
        position={[489.763, 0, 17.279]}
        rotation={[0, 0.623, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025626.geometry}
        material={materials['Color texture']}
        position={[492.7, 0, 20.217]}
        rotation={[-Math.PI, 0.378, -Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002627.geometry}
        material={materials['Color texture']}
        position={[569.922, 0, -86.382]}
        rotation={[0, -1.167, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023628.geometry}
        material={materials['Color texture']}
        position={[564.886, 0, -84.284]}
        rotation={[-Math.PI, 0.838, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025629.geometry}
        material={materials['Color texture']}
        position={[568.243, 0, -81.346]}
        rotation={[0, -0.535, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025630.geometry}
        material={materials['Color texture']}
        position={[556.072, 0, -81.346]}
        rotation={[Math.PI, -0.616, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026631.geometry}
        material={materials['Color texture']}
        position={[540.544, 0, -71.694]}
        rotation={[0, -0.429, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002632.geometry}
        material={materials['Color texture']}
        position={[566.145, 0, -66.238]}
        rotation={[-Math.PI, 0.218, -Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003633.geometry}
        material={materials['Color texture']}
        position={[563.207, 0, -63.72]}
        rotation={[-Math.PI, 1.566, -Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004634.geometry}
        material={materials['Color texture']}
        position={[566.145, 0, -58.264]}
        rotation={[Math.PI, -1.38, Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025635.geometry}
        material={materials['Color texture']}
        position={[550.197, 0, -58.683]}
        rotation={[Math.PI, -0.529, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024636.geometry}
        material={materials['Color texture']}
        position={[544.741, 0, -62.041]}
        rotation={[0, -0.866, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024637.geometry}
        material={materials['Color texture']}
        position={[541.383, 0, -60.362]}
        rotation={[0, 0.979, 0]}
        scale={0.84}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002638.geometry}
        material={materials['Color texture']}
        position={[531.731, 0, -55.746]}
        rotation={[Math.PI, -0.663, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025639.geometry}
        material={materials['Color texture']}
        position={[516.622, 0, -63.3]}
        rotation={[0, 0.248, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002640.geometry}
        material={materials['Color texture']}
        position={[522.917, 0, -52.388]}
        rotation={[-Math.PI, 1.295, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003641.geometry}
        material={materials['Color texture']}
        position={[520.819, 0, -49.45]}
        rotation={[Math.PI, -0.894, Math.PI]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026642.geometry}
        material={materials['Color texture']}
        position={[509.068, 0, -49.87]}
        rotation={[0, 1.156, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023643.geometry}
        material={materials['Color texture']}
        position={[512.845, 0, -46.093]}
        rotation={[0, 1.481, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002644.geometry}
        material={materials['Color texture']}
        position={[504.032, 0, -41.476]}
        rotation={[Math.PI, -0.542, Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024645.geometry}
        material={materials['Color texture']}
        position={[530.052, 0, -23.43]}
        rotation={[0, -1.53, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002646.geometry}
        material={materials['Color texture']}
        position={[500.674, 0, -66.238]}
        rotation={[0, -0.968, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026647.geometry}
        material={materials['Color texture']}
        position={[495.638, 0, -63.3]}
        rotation={[0, -1.196, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002648.geometry}
        material={materials['Color texture']}
        position={[498.996, 0, -59.103]}
        rotation={[Math.PI, -0.687, Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025649.geometry}
        material={materials['Color texture']}
        position={[482.208, 0, -70.015]}
        rotation={[0, 1.501, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026650.geometry}
        material={materials['Color texture']}
        position={[483.467, 0, -56.165]}
        rotation={[0, -1.511, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026651.geometry}
        material={materials['Color texture']}
        position={[477.592, 0, -51.968]}
        rotation={[-Math.PI, 1.026, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002652.geometry}
        material={materials['Color texture']}
        position={[478.851, 0, -46.093]}
        rotation={[0, 0.17, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002653.geometry}
        material={materials['Color texture']}
        position={[474.654, 0, -43.575]}
        rotation={[0, 0.291, 0]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024654.geometry}
        material={materials['Color texture']}
        position={[478.851, 0, -41.057]}
        rotation={[0, -1.097, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026655.geometry}
        material={materials['Color texture']}
        position={[461.224, 0, -41.896]}
        rotation={[Math.PI, -1.045, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002656.geometry}
        material={materials['Color texture']}
        position={[461.644, 0, -56.165]}
        rotation={[Math.PI, -1.016, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002657.geometry}
        material={materials['Color texture']}
        position={[470.457, 0, -69.595]}
        rotation={[0, -0.775, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026658.geometry}
        material={materials['Color texture']}
        position={[472.975, 0, -79.248]}
        rotation={[Math.PI, -0.074, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002659.geometry}
        material={materials['Color texture']}
        position={[560.689, 0, -98.134]}
        rotation={[-Math.PI, 1.337, -Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002660.geometry}
        material={materials['Color texture']}
        position={[577.057, 0, -140.102]}
        rotation={[-Math.PI, 0.237, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002661.geometry}
        material={materials['Color texture']}
        position={[574.958, 0, -137.164]}
        rotation={[0, -0.532, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002662.geometry}
        material={materials['Color texture']}
        position={[502.773, 0, 32.388]}
        rotation={[Math.PI, -0.782, Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023663.geometry}
        material={materials['Color texture']}
        position={[499.415, 0, 44.978]}
        rotation={[-Math.PI, 0.332, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026664.geometry}
        material={materials['Color texture']}
        position={[490.602, 0, 50.854]}
        rotation={[-Math.PI, 0.684, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023665.geometry}
        material={materials['Color texture']}
        position={[481.369, 0, 55.47]}
        rotation={[0, -1.181, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004666.geometry}
        material={materials['Color texture']}
        position={[483.887, 0, 58.828]}
        rotation={[0, -1.365, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024667.geometry}
        material={materials['Color texture']}
        position={[476.752, 0, 63.444]}
        rotation={[-Math.PI, 0.447, -Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002668.geometry}
        material={materials['Color texture']}
        position={[477.592, 0, 72.258]}
        rotation={[Math.PI, -1.125, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023669.geometry}
        material={materials['Color texture']}
        position={[479.69, 0, 75.195]}
        rotation={[-Math.PI, 1.403, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003670.geometry}
        material={materials['Color texture']}
        position={[477.172, 0, 78.553]}
        rotation={[0, -0.156, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023671.geometry}
        material={materials['Color texture']}
        position={[491.022, 0, 73.517]}
        rotation={[0, 0.718, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004672.geometry}
        material={materials['Color texture']}
        position={[498.576, 0, 58.408]}
        rotation={[-Math.PI, 0.903, -Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026673.geometry}
        material={materials['Color texture']}
        position={[483.048, 0, 40.362]}
        rotation={[-Math.PI, 1.167, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002674.geometry}
        material={materials['Color texture']}
        position={[484.307, 0, 84.009]}
        rotation={[0, 0.798, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002675.geometry}
        material={materials['Color texture']}
        position={[439.401, 0, -171.578]}
        rotation={[-Math.PI, 0.701, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004676.geometry}
        material={materials['Color texture']}
        position={[442.338, 0, -169.06]}
        rotation={[0, 0.95, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023677.geometry}
        material={materials['Color texture']}
        position={[436.043, 0, -164.863]}
        rotation={[Math.PI, -0.974, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004678.geometry}
        material={materials['Color texture']}
        position={[454.509, 0, -151.014]}
        rotation={[0, -0.948, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002679.geometry}
        material={materials['Color texture']}
        position={[457.027, 0, -143.879]}
        rotation={[0, 1.288, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004680.geometry}
        material={materials['Color texture']}
        position={[453.25, 0, -140.102]}
        rotation={[0, -1.239, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024681.geometry}
        material={materials['Color texture']}
        position={[436.463, 0, -135.066]}
        rotation={[0, 0.573, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004682.geometry}
        material={materials['Color texture']}
        position={[432.266, 0, -141.781]}
        rotation={[-Math.PI, 1.22, -Math.PI]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002683.geometry}
        material={materials['Color texture']}
        position={[429.328, 0, -139.262]}
        rotation={[-Math.PI, 1.559, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004684.geometry}
        material={materials['Color texture']}
        position={[443.178, 0, -134.226]}
        rotation={[-Math.PI, 1.522, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024685.geometry}
        material={materials['Color texture']}
        position={[433.525, 0, -149.755]}
        rotation={[0, 0.629, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003686.geometry}
        material={materials['Color texture']}
        position={[459.126, 0, -127.931]}
        rotation={[Math.PI, -1.447, Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002687.geometry}
        material={materials['Color texture']}
        position={[455.349, 0, -125.413]}
        rotation={[0, -1.184, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002688.geometry}
        material={materials['Color texture']}
        position={[458.706, 0, -122.475]}
        rotation={[-Math.PI, 0.225, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023689.geometry}
        material={materials['Color texture']}
        position={[448.214, 0, -110.304]}
        rotation={[Math.PI, -1.187, Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024690.geometry}
        material={materials['Color texture']}
        position={[431.007, 0, -121.636]}
        rotation={[-Math.PI, 1.139, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026691.geometry}
        material={materials['Color texture']}
        position={[431.846, 0, -109.885]}
        rotation={[-Math.PI, 0.749, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023692.geometry}
        material={materials['Color texture']}
        position={[433.525, 0, -104.849]}
        rotation={[Math.PI, -0.971, Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004693.geometry}
        material={materials['Color texture']}
        position={[438.981, 0, -88.481]}
        rotation={[0, -1.121, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025694.geometry}
        material={materials['Color texture']}
        position={[441.499, 0, -87.222]}
        rotation={[Math.PI, -1.442, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025695.geometry}
        material={materials['Color texture']}
        position={[460.385, 0, -96.875]}
        rotation={[0, 0.822, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003696.geometry}
        material={materials['Color texture']}
        position={[456.188, 0, -95.196]}
        rotation={[Math.PI, -0.644, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003697.geometry}
        material={materials['Color texture']}
        position={[460.385, 0, -91.838]}
        rotation={[0, 0.857, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026698.geometry}
        material={materials['Color texture']}
        position={[455.768, 0, -83.025]}
        rotation={[0, -0.134, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002699.geometry}
        material={materials['Color texture']}
        position={[444.437, 0, -72.533]}
        rotation={[Math.PI, -0.436, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026700.geometry}
        material={materials['Color texture']}
        position={[433.105, 0, -66.657]}
        rotation={[0, 1.144, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002701.geometry}
        material={materials['Color texture']}
        position={[457.867, 0, -67.497]}
        rotation={[Math.PI, -0.407, Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023702.geometry}
        material={materials['Color texture']}
        position={[454.509, 0, -64.979]}
        rotation={[Math.PI, -0.72, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026703.geometry}
        material={materials['Color texture']}
        position={[450.312, 0, -55.746]}
        rotation={[0, 1.255, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025704.geometry}
        material={materials['Color texture']}
        position={[444.017, 0, -63.72]}
        rotation={[0, -0.16, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003705.geometry}
        material={materials['Color texture']}
        position={[447.794, 0, -94.776]}
        rotation={[-Math.PI, 1.536, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024706.geometry}
        material={materials['Color texture']}
        position={[461.644, 0, -114.921]}
        rotation={[Math.PI, -0.237, Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003707.geometry}
        material={materials['Color texture']}
        position={[457.867, 0, -111.563]}
        rotation={[0, 0.874, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002708.geometry}
        material={materials['Color texture']}
        position={[441.919, 0, -124.574]}
        rotation={[0, -1.179, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004709.geometry}
        material={materials['Color texture']}
        position={[436.463, 0, -43.575]}
        rotation={[0, -1.321, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003710.geometry}
        material={materials['Color texture']}
        position={[450.732, 0, -48.191]}
        rotation={[0, 1.472, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024711.geometry}
        material={materials['Color texture']}
        position={[448.634, 0, -44.414]}
        rotation={[-Math.PI, 0.128, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002712.geometry}
        material={materials['Color texture']}
        position={[458.706, 0, -29.306]}
        rotation={[-Math.PI, 1.362, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004713.geometry}
        material={materials['Color texture']}
        position={[460.385, 0, -28.886]}
        rotation={[-Math.PI, 1.247, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026714.geometry}
        material={materials['Color texture']}
        position={[473.395, 0, -23.01]}
        rotation={[0, -0.16, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025715.geometry}
        material={materials['Color texture']}
        position={[470.457, 0, -21.332]}
        rotation={[0, -0.219, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026716.geometry}
        material={materials['Color texture']}
        position={[462.063, 0, -15.876]}
        rotation={[Math.PI, -0.526, Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025717.geometry}
        material={materials['Color texture']}
        position={[469.198, 0, -36.021]}
        rotation={[0, 0.323, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002718.geometry}
        material={materials['Color texture']}
        position={[466.68, 0, -4.125]}
        rotation={[0, 1.132, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003719.geometry}
        material={materials['Color texture']}
        position={[464.582, 0, -2.446]}
        rotation={[0, -0.028, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024720.geometry}
        material={materials['Color texture']}
        position={[456.188, 0, -7.062]}
        rotation={[Math.PI, -0.985, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003721.geometry}
        material={materials['Color texture']}
        position={[457.867, 0, 8.466]}
        rotation={[Math.PI, -0.039, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024722.geometry}
        material={materials['Color texture']}
        position={[459.965, 0, 10.984]}
        rotation={[-Math.PI, 1.055, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004723.geometry}
        material={materials['Color texture']}
        position={[465.841, 0, 9.725]}
        rotation={[-Math.PI, 1.467, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004724.geometry}
        material={materials['Color texture']}
        position={[468.778, 0, 15.6]}
        rotation={[Math.PI, -1.065, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002725.geometry}
        material={materials['Color texture']}
        position={[464.162, 0, 19.378]}
        rotation={[0, -0.188, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002726.geometry}
        material={materials['Color texture']}
        position={[457.027, 0, 28.191]}
        rotation={[0, -0.231, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004727.geometry}
        material={materials['Color texture']}
        position={[459.126, 0, 30.289]}
        rotation={[Math.PI, -0.458, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025728.geometry}
        material={materials['Color texture']}
        position={[467.1, 0, 28.191]}
        rotation={[0, -0.916, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003729.geometry}
        material={materials['Color texture']}
        position={[466.68, 0, 38.263]}
        rotation={[0, 0.95, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023730.geometry}
        material={materials['Color texture']}
        position={[454.089, 0, 43.719]}
        rotation={[-Math.PI, 0.71, -Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002731.geometry}
        material={materials['Color texture']}
        position={[457.027, 0, 45.818]}
        rotation={[0, -0.06, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024732.geometry}
        material={materials['Color texture']}
        position={[467.1, 0, 50.434]}
        rotation={[-Math.PI, 0.433, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002733.geometry}
        material={materials['Color texture']}
        position={[459.126, 0, 64.284]}
        rotation={[-Math.PI, 0.417, -Math.PI]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023734.geometry}
        material={materials['Color texture']}
        position={[517.881, 0, -26.368]}
        rotation={[-Math.PI, 0.672, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024735.geometry}
        material={materials['Color texture']}
        position={[503.192, 0, -20.912]}
        rotation={[Math.PI, -1.382, Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025736.geometry}
        material={materials['Color texture']}
        position={[519.56, 0, 2.171]}
        rotation={[-Math.PI, 0.866, -Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002737.geometry}
        material={materials['Color texture']}
        position={[501.933, 0, 18.538]}
        rotation={[-Math.PI, 0.135, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002738.geometry}
        material={materials['Color texture']}
        position={[488.503, 0, 97.858]}
        rotation={[Math.PI, -1.198, Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003739.geometry}
        material={materials['Color texture']}
        position={[364.277, 0, -61.201]}
        rotation={[0, -0.572, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002740.geometry}
        material={materials['Color texture']}
        position={[366.795, 0, -58.264]}
        rotation={[0, 0.943, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002741.geometry}
        material={materials['Color texture']}
        position={[456.608, 0, -138.843]}
        rotation={[0, -0.539, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003742.geometry}
        material={materials['Color texture']}
        position={[421.774, 0, -133.807]}
        rotation={[0, -0.29, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026743.geometry}
        material={materials['Color texture']}
        position={[426.81, 0, -185.847]}
        rotation={[-Math.PI, 0.054, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025744.geometry}
        material={materials['Color texture']}
        position={[366.795, 0, -252.997]}
        rotation={[Math.PI, -0.871, Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025745.geometry}
        material={materials['Color texture']}
        position={[139.327, 0, -350.363]}
        rotation={[0, -1.102, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002746.geometry}
        material={materials['Color texture']}
        position={[143.105, 0, -348.684]}
        rotation={[0, 0.31, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025747.geometry}
        material={materials['Color texture']}
        position={[186.332, 0, -350.363]}
        rotation={[0, -1.289, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025748.geometry}
        material={materials['Color texture']}
        position={[198.083, 0, -342.389]}
        rotation={[-Math.PI, 1.483, -Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024749.geometry}
        material={materials['Color texture']}
        position={[227.88, 0, -340.71]}
        rotation={[Math.PI, -0.945, Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023750.geometry}
        material={materials['Color texture']}
        position={[298.807, 0, -364.212]}
        rotation={[Math.PI, -0.554, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003751.geometry}
        material={materials['Color texture']}
        position={[60.427, 0, -327.28]}
        rotation={[Math.PI, -0.033, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003752.geometry}
        material={materials['Color texture']}
        position={[57.07, 0, -322.244]}
        rotation={[0, 0.726, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002753.geometry}
        material={materials['Color texture']}
        position={[73.857, 0, -316.369]}
        rotation={[-Math.PI, 1.132, -Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002754.geometry}
        material={materials['Color texture']}
        position={[86.028, 0, -191.723]}
        rotation={[0, 0.139, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023755.geometry}
        material={materials['Color texture']}
        position={[104.913, 0, -190.044]}
        rotation={[Math.PI, -0.828, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025756.geometry}
        material={materials['Color texture']}
        position={[164.089, 0, -223.619]}
        rotation={[Math.PI, -0.576, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025757.geometry}
        material={materials['Color texture']}
        position={[259.776, 0, -231.173]}
        rotation={[Math.PI, -1.135, Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002758.geometry}
        material={materials['Color texture']}
        position={[313.076, 0, -235.37]}
        rotation={[-Math.PI, 0.067, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024759.geometry}
        material={materials['Color texture']}
        position={[141.006, 0, -239.986]}
        rotation={[0, 0.743, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003760.geometry}
        material={materials['Color texture']}
        position={[143.944, 0, -242.924]}
        rotation={[Math.PI, -0.712, Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002761.geometry}
        material={materials['Color texture']}
        position={[138.488, 0, -224.878]}
        rotation={[-Math.PI, 1.221, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004762.geometry}
        material={materials['Color texture']}
        position={[102.815, 0, -168.221]}
        rotation={[0, -0.915, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004763.geometry}
        material={materials['Color texture']}
        position={[134.711, 0, -175.355]}
        rotation={[0, -0.44, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026764.geometry}
        material={materials['Color texture']}
        position={[213.192, 0, -215.225]}
        rotation={[0, -0.225, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025765.geometry}
        material={materials['Color texture']}
        position={[84.769, 0, -300.001]}
        rotation={[Math.PI, -0.681, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024766.geometry}
        material={materials['Color texture']}
        position={[83.09, 0, -297.063]}
        rotation={[-Math.PI, 1.467, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026767.geometry}
        material={materials['Color texture']}
        position={[46.578, 0, -312.591]}
        rotation={[0, 1.388, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004768.geometry}
        material={materials['Color texture']}
        position={[63.785, 0, -337.353]}
        rotation={[-Math.PI, 0.428, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026769.geometry}
        material={materials['Color texture']}
        position={[394.075, 0, -222.779]}
        rotation={[0, 0.465, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004770.geometry}
        material={materials['Color texture']}
        position={[433.525, 0, -232.012]}
        rotation={[Math.PI, -0.688, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002771.geometry}
        material={materials['Color texture']}
        position={[430.168, 0, -219.422]}
        rotation={[Math.PI, -1.406, Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002772.geometry}
        material={materials['Color texture']}
        position={[436.882, 0, -218.163]}
        rotation={[0, -0.681, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003773.geometry}
        material={materials['Color texture']}
        position={[434.784, 0, -214.805]}
        rotation={[-Math.PI, 1.144, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023774.geometry}
        material={materials['Color texture']}
        position={[388.199, 0, -268.944]}
        rotation={[-Math.PI, 1.295, -Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003775.geometry}
        material={materials['Color texture']}
        position={[357.562, 0, -247.121]}
        rotation={[-Math.PI, 1.43, -Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026776.geometry}
        material={materials['Color texture']}
        position={[326.086, 0, -236.209]}
        rotation={[Math.PI, -1.081, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003777.geometry}
        material={materials['Color texture']}
        position={[345.811, 0, -247.96]}
        rotation={[0, -1.115, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004778.geometry}
        material={materials['Color texture']}
        position={[-457.042, 0, -119.537]}
        rotation={[0, 1.381, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023779.geometry}
        material={materials['Color texture']}
        position={[-383.178, 0, -161.925]}
        rotation={[-Math.PI, 0.587, -Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023780.geometry}
        material={materials['Color texture']}
        position={[-464.176, 0, -65.398]}
        rotation={[-Math.PI, 1.338, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003781.geometry}
        material={materials['Color texture']}
        position={[-486.839, 0, -16.295]}
        rotation={[0, -0.285, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025782.geometry}
        material={materials['Color texture']}
        position={[-520.833, 0, -38.119]}
        rotation={[-Math.PI, 0.128, -Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002783.geometry}
        material={materials['Color texture']}
        position={[-506.564, 0, -83.025]}
        rotation={[0, -0.817, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002784.geometry}
        material={materials['Color texture']}
        position={[-507.823, 0, -96.455]}
        rotation={[Math.PI, -0.062, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003785.geometry}
        material={materials['Color texture']}
        position={[-383.597, 0, -203.894]}
        rotation={[-Math.PI, 1.167, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004786.geometry}
        material={materials['Color texture']}
        position={[-469.213, 0, -90.999]}
        rotation={[0, 0.745, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004787.geometry}
        material={materials['Color texture']}
        position={[-291.687, 0, 32.388]}
        rotation={[0, -1.232, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025788.geometry}
        material={materials['Color texture']}
        position={[-306.795, 0, 39.942]}
        rotation={[0, 0.464, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003789.geometry}
        material={materials['Color texture']}
        position={[-315.189, 0, 32.807]}
        rotation={[-Math.PI, 1.337, -Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023790.geometry}
        material={materials['Color texture']}
        position={[-151.093, 0, -45.673]}
        rotation={[0, 0.661, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004791.geometry}
        material={materials['Color texture']}
        position={[-148.575, 0, -42.735]}
        rotation={[Math.PI, -0.854, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004792.geometry}
        material={materials['Color texture']}
        position={[-138.083, 0, -45.673]}
        rotation={[0, 0.299, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026793.geometry}
        material={materials['Color texture']}
        position={[-140.181, 0, -33.502]}
        rotation={[0, -0.371, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023794.geometry}
        material={materials['Color texture']}
        position={[-144.378, 0, -29.306]}
        rotation={[Math.PI, -1.287, Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026795.geometry}
        material={materials['Color texture']}
        position={[14.949, 0, -215.353]}
        rotation={[0, -0.722, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004796.geometry}
        material={materials['Color texture']}
        position={[6.136, 0, -212.835]}
        rotation={[0, 0.223, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026797.geometry}
        material={materials['Color texture']}
        position={[2.778, 0, -204.861]}
        rotation={[0, -0.614, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004798.geometry}
        material={materials['Color texture']}
        position={[4.457, 0, -201.084]}
        rotation={[Math.PI, -0.246, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003799.geometry}
        material={materials['Color texture']}
        position={[22.503, 0, -199.405]}
        rotation={[-Math.PI, 1.158, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023800.geometry}
        material={materials['Color texture']}
        position={[12.011, 0, -187.654]}
        rotation={[0, 1.219, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023801.geometry}
        material={materials['Color texture']}
        position={[7.815, 0, -186.395]}
        rotation={[0, -1.079, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023802.geometry}
        material={materials['Color texture']}
        position={[1.939, 0, -192.27]}
        rotation={[-Math.PI, 0.677, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023803.geometry}
        material={materials['Color texture']}
        position={[-4.776, 0, -199.405]}
        rotation={[0, 1.546, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026804.geometry}
        material={materials['Color texture']}
        position={[-13.17, 0, -191.851]}
        rotation={[0, -1.474, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024805.geometry}
        material={materials['Color texture']}
        position={[15.369, 0, -184.716]}
        rotation={[-Math.PI, 0.541, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003806.geometry}
        material={materials['Color texture']}
        position={[23.343, 0, -186.395]}
        rotation={[0, -1.446, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023807.geometry}
        material={materials['Color texture']}
        position={[22.503, 0, -183.457]}
        rotation={[0, 0.741, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004808.geometry}
        material={materials['Color texture']}
        position={[25.861, 0, -180.519]}
        rotation={[0, 1.286, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026809.geometry}
        material={materials['Color texture']}
        position={[32.996, 0, -175.063]}
        rotation={[0, -0.923, 0]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025810.geometry}
        material={materials['Color texture']}
        position={[15.789, 0, -176.322]}
        rotation={[0, 1.138, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023811.geometry}
        material={materials['Color texture']}
        position={[12.851, 0, -175.483]}
        rotation={[Math.PI, -0.23, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026812.geometry}
        material={materials['Color texture']}
        position={[2.778, 0, -180.1]}
        rotation={[Math.PI, -0.177, Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025813.geometry}
        material={materials['Color texture']}
        position={[1.1, 0, -178.841]}
        rotation={[-Math.PI, 0.739, -Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026814.geometry}
        material={materials['Color texture']}
        position={[-9.392, 0, -177.162]}
        rotation={[-Math.PI, 0.681, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004815.geometry}
        material={materials['Color texture']}
        position={[-18.625, 0, -185.136]}
        rotation={[0, 0.889, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024816.geometry}
        material={materials['Color texture']}
        position={[-16.107, 0, -183.037]}
        rotation={[0, 0.54, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002817.geometry}
        material={materials['Color texture']}
        position={[-19.465, 0, -180.1]}
        rotation={[0, 0.545, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002818.geometry}
        material={materials['Color texture']}
        position={[-4.776, 0, -187.234]}
        rotation={[0, 1.389, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026819.geometry}
        material={materials['Color texture']}
        position={[-3.097, 0, -173.804]}
        rotation={[0, 0.597, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024820.geometry}
        material={materials['Color texture']}
        position={[12.011, 0, -198.985]}
        rotation={[Math.PI, -1.289, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002821.geometry}
        material={materials['Color texture']}
        position={[72.865, 0, -169.608]}
        rotation={[-Math.PI, 0.816, -Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026822.geometry}
        material={materials['Color texture']}
        position={[68.669, 0, -167.509]}
        rotation={[0, 0.992, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025823.geometry}
        material={materials['Color texture']}
        position={[59.016, 0, -168.768]}
        rotation={[0, -1.319, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025824.geometry}
        material={materials['Color texture']}
        position={[54.819, 0, -166.25]}
        rotation={[Math.PI, -1.316, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004825.geometry}
        material={materials['Color texture']}
        position={[58.176, 0, -162.893]}
        rotation={[Math.PI, -0.307, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004826.geometry}
        material={materials['Color texture']}
        position={[46.006, 0, -165.83]}
        rotation={[0, 0.453, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023827.geometry}
        material={materials['Color texture']}
        position={[42.648, 0, -164.991]}
        rotation={[-Math.PI, 0.506, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003828.geometry}
        material={materials['Color texture']}
        position={[11.172, 0, -164.571]}
        rotation={[-Math.PI, 1.482, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004829.geometry}
        material={materials['Color texture']}
        position={[14.529, 0, -162.473]}
        rotation={[0, 0.263, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002830.geometry}
        material={materials['Color texture']}
        position={[28.379, 0, -163.732]}
        rotation={[0, 1.226, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025831.geometry}
        material={materials['Color texture']}
        position={[26.281, 0, -160.794]}
        rotation={[0, 1.476, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023832.geometry}
        material={materials['Color texture']}
        position={[31.736, 0, -158.696]}
        rotation={[0, 0.967, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023833.geometry}
        material={materials['Color texture']}
        position={[36.773, 0, -151.141]}
        rotation={[0, 1.21, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002834.geometry}
        material={materials['Color texture']}
        position={[32.576, 0, -149.043]}
        rotation={[Math.PI, -1.45, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002835.geometry}
        material={materials['Color texture']}
        position={[18.726, 0, -151.981]}
        rotation={[Math.PI, -0.011, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024836.geometry}
        material={materials['Color texture']}
        position={[21.664, 0, -150.302]}
        rotation={[Math.PI, -0.737, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023837.geometry}
        material={materials['Color texture']}
        position={[20.825, 0, -161.214]}
        rotation={[-Math.PI, 0.171, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025838.geometry}
        material={materials['Color texture']}
        position={[49.363, 0, -159.535]}
        rotation={[-Math.PI, 0.245, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003839.geometry}
        material={materials['Color texture']}
        position={[52.301, 0, -153.24]}
        rotation={[Math.PI, -0.599, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003840.geometry}
        material={materials['Color texture']}
        position={[69.928, 0, -158.696]}
        rotation={[Math.PI, -0.323, Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023841.geometry}
        material={materials['Color texture']}
        position={[66.57, 0, -156.597]}
        rotation={[Math.PI, -0.74, Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024842.geometry}
        material={materials['Color texture']}
        position={[72.865, 0, -150.722]}
        rotation={[0, 1.204, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003843.geometry}
        material={materials['Color texture']}
        position={[78.741, 0, -146.105]}
        rotation={[0, 0.8, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004844.geometry}
        material={materials['Color texture']}
        position={[75.803, 0, -143.168]}
        rotation={[Math.PI, -0.211, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004845.geometry}
        material={materials['Color texture']}
        position={[71.187, 0, -137.292]}
        rotation={[-Math.PI, 0.251, -Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003846.geometry}
        material={materials['Color texture']}
        position={[72.446, 0, -128.059]}
        rotation={[-Math.PI, 0.814, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026847.geometry}
        material={materials['Color texture']}
        position={[74.124, 0, -125.961]}
        rotation={[-Math.PI, 0.527, -Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003848.geometry}
        material={materials['Color texture']}
        position={[72.026, 0, -123.862]}
        rotation={[-Math.PI, 0.744, -Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003849.geometry}
        material={materials['Color texture']}
        position={[82.518, 0, -122.603]}
        rotation={[0, -0.307, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025850.geometry}
        material={materials['Color texture']}
        position={[77.482, 0, -116.728]}
        rotation={[-Math.PI, 0.026, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023851.geometry}
        material={materials['Color texture']}
        position={[84.617, 0, -109.173]}
        rotation={[0, -1.532, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002852.geometry}
        material={materials['Color texture']}
        position={[67.829, 0, -110.432]}
        rotation={[0, 1.484, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025853.geometry}
        material={materials['Color texture']}
        position={[-25.34, 0, -165.83]}
        rotation={[-Math.PI, 0.496, -Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004854.geometry}
        material={materials['Color texture']}
        position={[-21.563, 0, -163.312]}
        rotation={[0, 0.183, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004855.geometry}
        material={materials['Color texture']}
        position={[-22.822, 0, -156.597]}
        rotation={[0, -0.57, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002856.geometry}
        material={materials['Color texture']}
        position={[-8.133, 0, -162.893]}
        rotation={[0, 0.064, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003857.geometry}
        material={materials['Color texture']}
        position={[-4.776, 0, -160.374]}
        rotation={[0, -0.424, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003858.geometry}
        material={materials['Color texture']}
        position={[-7.714, 0, -149.882]}
        rotation={[0, 0.474, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002859.geometry}
        material={materials['Color texture']}
        position={[-14.429, 0, -154.079]}
        rotation={[0, -1.404, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023860.geometry}
        material={materials['Color texture']}
        position={[-14.429, 0, -144.846]}
        rotation={[0, 1.143, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004861.geometry}
        material={materials['Color texture']}
        position={[-11.911, 0, -142.748]}
        rotation={[0, 0.414, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003862.geometry}
        material={materials['Color texture']}
        position={[2.778, 0, -152.401]}
        rotation={[Math.PI, -0.945, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025863.geometry}
        material={materials['Color texture']}
        position={[6.136, 0, -150.302]}
        rotation={[-Math.PI, 1.392, -Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002864.geometry}
        material={materials['Color texture']}
        position={[8.654, 0, -144.007]}
        rotation={[-Math.PI, 0.631, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026865.geometry}
        material={materials['Color texture']}
        position={[0.26, 0, -144.007]}
        rotation={[Math.PI, -0.156, Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002866.geometry}
        material={materials['Color texture']}
        position={[-3.517, 0, -141.489]}
        rotation={[Math.PI, -0.374, Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003867.geometry}
        material={materials['Color texture']}
        position={[4.457, 0, -136.872]}
        rotation={[Math.PI, -0.259, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002868.geometry}
        material={materials['Color texture']}
        position={[-6.874, 0, -132.675]}
        rotation={[0, -1.488, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003869.geometry}
        material={materials['Color texture']}
        position={[-3.517, 0, -130.577]}
        rotation={[Math.PI, -0.356, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002870.geometry}
        material={materials['Color texture']}
        position={[12.011, 0, -133.095]}
        rotation={[0, -0.911, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024871.geometry}
        material={materials['Color texture']}
        position={[16.208, 0, -131.836]}
        rotation={[-Math.PI, 1.311, -Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025872.geometry}
        material={materials['Color texture']}
        position={[31.736, 0, -136.453]}
        rotation={[0, 0.732, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023873.geometry}
        material={materials['Color texture']}
        position={[27.959, 0, -131.416]}
        rotation={[-Math.PI, 0.27, -Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002874.geometry}
        material={materials['Color texture']}
        position={[26.7, 0, -137.292]}
        rotation={[-Math.PI, 0.67, -Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004875.geometry}
        material={materials['Color texture']}
        position={[23.343, 0, -119.246]}
        rotation={[0, -0.951, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003876.geometry}
        material={materials['Color texture']}
        position={[20.825, 0, -117.567]}
        rotation={[-Math.PI, 0.987, -Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023877.geometry}
        material={materials['Color texture']}
        position={[29.638, 0, -109.173]}
        rotation={[-Math.PI, 0.175, -Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002878.geometry}
        material={materials['Color texture']}
        position={[65.311, 0, -107.494]}
        rotation={[0, 1.249, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023879.geometry}
        material={materials['Color texture']}
        position={[56.917, 0, -99.521]}
        rotation={[-Math.PI, 1.025, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004880.geometry}
        material={materials['Color texture']}
        position={[59.855, 0, -98.261]}
        rotation={[Math.PI, -0.375, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024881.geometry}
        material={materials['Color texture']}
        position={[43.907, 0, -102.039]}
        rotation={[Math.PI, -0.128, Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003882.geometry}
        material={materials['Color texture']}
        position={[54.399, 0, -111.272]}
        rotation={[0, -0.447, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025883.geometry}
        material={materials['Color texture']}
        position={[51.462, 0, -110.013]}
        rotation={[-Math.PI, 0.638, -Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004884.geometry}
        material={materials['Color texture']}
        position={[-0.999, 0, -112.95]}
        rotation={[-Math.PI, 1.527, -Math.PI]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003885.geometry}
        material={materials['Color texture']}
        position={[0.68, 0, -110.013]}
        rotation={[0, 0.209, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024886.geometry}
        material={materials['Color texture']}
        position={[4.877, 0, -120.924]}
        rotation={[Math.PI, -1.499, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002887.geometry}
        material={materials['Color texture']}
        position={[11.592, 0, -111.691]}
        rotation={[0, 0.756, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004888.geometry}
        material={materials['Color texture']}
        position={[14.949, 0, -108.754]}
        rotation={[-Math.PI, 0.17, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002889.geometry}
        material={materials['Color texture']}
        position={[8.234, 0, -104.976]}
        rotation={[Math.PI, -0.218, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026890.geometry}
        material={materials['Color texture']}
        position={[10.333, 0, -97.422]}
        rotation={[Math.PI, -0.492, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002891.geometry}
        material={materials['Color texture']}
        position={[19.146, 0, -98.261]}
        rotation={[Math.PI, -0.185, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003892.geometry}
        material={materials['Color texture']}
        position={[17.048, 0, -96.583]}
        rotation={[Math.PI, -0.321, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002893.geometry}
        material={materials['Color texture']}
        position={[17.467, 0, -84.832]}
        rotation={[Math.PI, -0.491, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024894.geometry}
        material={materials['Color texture']}
        position={[24.602, 0, -90.287]}
        rotation={[0, -0.603, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023895.geometry}
        material={materials['Color texture']}
        position={[30.058, 0, -87.769]}
        rotation={[Math.PI, -1.198, Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002896.geometry}
        material={materials['Color texture']}
        position={[47.684, 0, -93.225]}
        rotation={[0, 1.249, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004897.geometry}
        material={materials['Color texture']}
        position={[55.239, 0, -83.992]}
        rotation={[Math.PI, -0.367, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024898.geometry}
        material={materials['Color texture']}
        position={[52.301, 0, -81.054]}
        rotation={[0, -0.305, 0]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024899.geometry}
        material={materials['Color texture']}
        position={[56.498, 0, -79.376]}
        rotation={[0, 1.516, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026900.geometry}
        material={materials['Color texture']}
        position={[25.861, 0, -77.277]}
        rotation={[0, -0.312, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025901.geometry}
        material={materials['Color texture']}
        position={[23.763, 0, -69.723]}
        rotation={[0, 0.199, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026902.geometry}
        material={materials['Color texture']}
        position={[29.638, 0, -67.205]}
        rotation={[0, 0.605, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025903.geometry}
        material={materials['Color texture']}
        position={[31.317, 0, -64.267]}
        rotation={[-Math.PI, 0.82, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004904.geometry}
        material={materials['Color texture']}
        position={[27.54, 0, -62.588]}
        rotation={[0, 0.496, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003905.geometry}
        material={materials['Color texture']}
        position={[35.514, 0, -76.858]}
        rotation={[Math.PI, -0.006, Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002906.geometry}
        material={materials['Color texture']}
        position={[38.032, 0, -86.51]}
        rotation={[Math.PI, -1.225, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024907.geometry}
        material={materials['Color texture']}
        position={[46.845, 0, -75.179]}
        rotation={[0, 1.09, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025908.geometry}
        material={materials['Color texture']}
        position={[44.747, 0, -73.08]}
        rotation={[-Math.PI, 0.051, -Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025909.geometry}
        material={materials['Color texture']}
        position={[50.203, 0, -70.562]}
        rotation={[0, -0.511, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002910.geometry}
        material={materials['Color texture']}
        position={[58.596, 0, -71.402]}
        rotation={[-Math.PI, 1.333, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004911.geometry}
        material={materials['Color texture']}
        position={[54.819, 0, -62.169]}
        rotation={[0, -0.173, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002912.geometry}
        material={materials['Color texture']}
        position={[38.451, 0, -63.847]}
        rotation={[-Math.PI, 0.359, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024913.geometry}
        material={materials['Color texture']}
        position={[30.477, 0, -49.159]}
        rotation={[-Math.PI, 0.15, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004914.geometry}
        material={materials['Color texture']}
        position={[37.612, 0, -54.614]}
        rotation={[0, -0.065, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024915.geometry}
        material={materials['Color texture']}
        position={[39.291, 0, -53.355]}
        rotation={[0, 0.544, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025916.geometry}
        material={materials['Color texture']}
        position={[44.747, 0, -60.91]}
        rotation={[0, 0.613, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024917.geometry}
        material={materials['Color texture']}
        position={[47.265, 0, -57.972]}
        rotation={[0, -0.262, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024918.geometry}
        material={materials['Color texture']}
        position={[45.586, 0, -55.454]}
        rotation={[0, 0.775, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023919.geometry}
        material={materials['Color texture']}
        position={[53.14, 0, -50.418]}
        rotation={[Math.PI, -0.487, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003920.geometry}
        material={materials['Color texture']}
        position={[49.363, 0, -47.06]}
        rotation={[0, -0.859, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002921.geometry}
        material={materials['Color texture']}
        position={[36.353, 0, -41.185]}
        rotation={[0, 0.768, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004922.geometry}
        material={materials['Color texture']}
        position={[39.291, 0, -38.667]}
        rotation={[0, -0.129, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002923.geometry}
        material={materials['Color texture']}
        position={[36.353, 0, -35.309]}
        rotation={[0, 1.401, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026924.geometry}
        material={materials['Color texture']}
        position={[43.068, 0, -47.06]}
        rotation={[Math.PI, -0.062, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002925.geometry}
        material={materials['Color texture']}
        position={[28.799, 0, -156.597]}
        rotation={[Math.PI, -0.394, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023926.geometry}
        material={materials['Color texture']}
        position={[56.917, 0, -153.24]}
        rotation={[Math.PI, -1.007, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026927.geometry}
        material={materials['Color texture']}
        position={[57.757, 0, -108.754]}
        rotation={[0, -1.468, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004928.geometry}
        material={materials['Color texture']}
        position={[26.281, 0, -106.655]}
        rotation={[0, 0.496, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024929.geometry}
        material={materials['Color texture']}
        position={[34.255, 0, -97.422]}
        rotation={[-Math.PI, 0.154, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026930.geometry}
        material={materials['Color texture']}
        position={[95.528, 0, -101.619]}
        rotation={[-Math.PI, 0.588, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026931.geometry}
        material={materials['Color texture']}
        position={[91.751, 0, -98.681]}
        rotation={[0, 0.613, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024932.geometry}
        material={materials['Color texture']}
        position={[72.865, 0, -94.904]}
        rotation={[-Math.PI, 1.128, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025933.geometry}
        material={materials['Color texture']}
        position={[74.964, 0, -92.806]}
        rotation={[Math.PI, -1.322, Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026934.geometry}
        material={materials['Color texture']}
        position={[69.508, 0, -87.35]}
        rotation={[-Math.PI, 0.642, -Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023935.geometry}
        material={materials['Color texture']}
        position={[66.57, 0, -75.599]}
        rotation={[Math.PI, -0.357, Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026936.geometry}
        material={materials['Color texture']}
        position={[70.347, 0, -73.5]}
        rotation={[Math.PI, -0.913, Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002937.geometry}
        material={materials['Color texture']}
        position={[66.99, 0, -69.723]}
        rotation={[Math.PI, -0.462, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026938.geometry}
        material={materials['Color texture']}
        position={[99.725, 0, -79.376]}
        rotation={[0, -0.172, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025939.geometry}
        material={materials['Color texture']}
        position={[95.528, 0, -74.34]}
        rotation={[0, 1.055, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025940.geometry}
        material={materials['Color texture']}
        position={[96.368, 0, -91.127]}
        rotation={[-Math.PI, 0.908, -Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025941.geometry}
        material={materials['Color texture']}
        position={[87.135, 0, -89.028]}
        rotation={[-Math.PI, 0.419, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026942.geometry}
        material={materials['Color texture']}
        position={[88.394, 0, -80.215]}
        rotation={[Math.PI, -0.016, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004943.geometry}
        material={materials['Color texture']}
        position={[90.912, 0, -78.956]}
        rotation={[0, -0.189, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026944.geometry}
        material={materials['Color texture']}
        position={[101.823, 0, -65.946]}
        rotation={[0, -0.323, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002945.geometry}
        material={materials['Color texture']}
        position={[82.098, 0, -70.982]}
        rotation={[0, 1.324, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023946.geometry}
        material={materials['Color texture']}
        position={[85.456, 0, -68.464]}
        rotation={[0, -0.887, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004947.geometry}
        material={materials['Color texture']}
        position={[80, 0, -64.267]}
        rotation={[-Math.PI, 0.167, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002948.geometry}
        material={materials['Color texture']}
        position={[72.026, 0, -64.267]}
        rotation={[0, 0.831, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024949.geometry}
        material={materials['Color texture']}
        position={[68.249, 0, -56.713]}
        rotation={[0, -1.382, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002950.geometry}
        material={materials['Color texture']}
        position={[62.793, 0, -59.651]}
        rotation={[-Math.PI, 0.252, -Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025951.geometry}
        material={materials['Color texture']}
        position={[64.891, 0, -56.713]}
        rotation={[0, 1.071, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003952.geometry}
        material={materials['Color texture']}
        position={[61.114, 0, -44.542]}
        rotation={[0, 0.239, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023953.geometry}
        material={materials['Color texture']}
        position={[61.954, 0, -39.086]}
        rotation={[0, 0.494, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023954.geometry}
        material={materials['Color texture']}
        position={[77.902, 0, -49.578]}
        rotation={[Math.PI, -0.204, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024955.geometry}
        material={materials['Color texture']}
        position={[75.383, 0, -46.64]}
        rotation={[-Math.PI, 0.342, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003956.geometry}
        material={materials['Color texture']}
        position={[78.741, 0, -44.122]}
        rotation={[0, 0.421, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002957.geometry}
        material={materials['Color texture']}
        position={[94.269, 0, -57.133]}
        rotation={[Math.PI, -0.07, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002958.geometry}
        material={materials['Color texture']}
        position={[96.787, 0, -55.034]}
        rotation={[-Math.PI, 1.093, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002959.geometry}
        material={materials['Color texture']}
        position={[106.44, 0, -57.133]}
        rotation={[0, 0.072, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024960.geometry}
        material={materials['Color texture']}
        position={[111.476, 0, -54.195]}
        rotation={[-Math.PI, 0.675, -Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025961.geometry}
        material={materials['Color texture']}
        position={[109.378, 0, -51.257]}
        rotation={[0, -0.971, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002962.geometry}
        material={materials['Color texture']}
        position={[104.761, 0, -52.516]}
        rotation={[0, 1.161, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026963.geometry}
        material={materials['Color texture']}
        position={[100.145, 0, -44.122]}
        rotation={[0, 0.967, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002964.geometry}
        material={materials['Color texture']}
        position={[87.554, 0, -52.516]}
        rotation={[0, -0.824, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004965.geometry}
        material={materials['Color texture']}
        position={[89.653, 0, -50.837]}
        rotation={[0, 1.348, 0]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024966.geometry}
        material={materials['Color texture']}
        position={[87.135, 0, -47.9]}
        rotation={[Math.PI, -0.637, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023967.geometry}
        material={materials['Color texture']}
        position={[90.072, 0, -34.47]}
        rotation={[-Math.PI, 0.956, -Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023968.geometry}
        material={materials['Color texture']}
        position={[76.643, 0, -36.988]}
        rotation={[-Math.PI, 1.423, -Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002969.geometry}
        material={materials['Color texture']}
        position={[74.964, 0, -33.63]}
        rotation={[0, -0.315, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024970.geometry}
        material={materials['Color texture']}
        position={[80.839, 0, -32.371]}
        rotation={[0, 0.106, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026971.geometry}
        material={materials['Color texture']}
        position={[85.456, 0, -40.765]}
        rotation={[0, -0.652, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025972.geometry}
        material={materials['Color texture']}
        position={[99.305, 0, -34.05]}
        rotation={[0, 0.583, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003973.geometry}
        material={materials['Color texture']}
        position={[114.834, 0, -32.371]}
        rotation={[0, 1.001, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004974.geometry}
        material={materials['Color texture']}
        position={[116.093, 0, -39.506]}
        rotation={[0, 1.182, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026975.geometry}
        material={materials['Color texture']}
        position={[113.155, 0, -39.086]}
        rotation={[-Math.PI, 0.876, -Math.PI]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024976.geometry}
        material={materials['Color texture']}
        position={[121.549, 0, -34.889]}
        rotation={[0, 1.244, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003977.geometry}
        material={materials['Color texture']}
        position={[118.191, 0, -35.729]}
        rotation={[Math.PI, -0.554, Math.PI]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree026978.geometry}
        material={materials['Color texture']}
        position={[109.797, 0, -30.273]}
        rotation={[0, -1.012, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024979.geometry}
        material={materials['Color texture']}
        position={[101.823, 0, -31.112]}
        rotation={[0, -1.303, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003980.geometry}
        material={materials['Color texture']}
        position={[95.528, 0, -27.755]}
        rotation={[Math.PI, -0.412, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003981.geometry}
        material={materials['Color texture']}
        position={[67.41, 0, -27.335]}
        rotation={[0, -0.117, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003982.geometry}
        material={materials['Color texture']}
        position={[55.239, 0, -26.076]}
        rotation={[0, -0.994, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023983.geometry}
        material={materials['Color texture']}
        position={[48.943, 0, -23.978]}
        rotation={[-Math.PI, 1.424, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003984.geometry}
        material={materials['Color texture']}
        position={[43.907, 0, -25.656]}
        rotation={[0, 0.762, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025985.geometry}
        material={materials['Color texture']}
        position={[45.586, 0, -19.781]}
        rotation={[Math.PI, -1.312, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002986.geometry}
        material={materials['Color texture']}
        position={[52.721, 0, -36.988]}
        rotation={[Math.PI, -0.922, Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023987.geometry}
        material={materials['Color texture']}
        position={[58.596, 0, -22.719]}
        rotation={[-Math.PI, 0.634, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004988.geometry}
        material={materials['Color texture']}
        position={[72.865, 0, -16.843]}
        rotation={[Math.PI, -1.34, Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025989.geometry}
        material={materials['Color texture']}
        position={[67.829, 0, -15.584]}
        rotation={[0, 0.925, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree023990.geometry}
        material={materials['Color texture']}
        position={[79.161, 0, -18.102]}
        rotation={[0, 0.426, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004991.geometry}
        material={materials['Color texture']}
        position={[81.259, 0, -99.101]}
        rotation={[0, -0.471, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024992.geometry}
        material={materials['Color texture']}
        position={[91.331, 0, -16.004]}
        rotation={[-Math.PI, 0.77, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025993.geometry}
        material={materials['Color texture']}
        position={[93.43, 0, -13.066]}
        rotation={[0, -0.257, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2003994.geometry}
        material={materials['Color texture']}
        position={[90.912, 0, -10.967]}
        rotation={[0, 1.452, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3004995.geometry}
        material={materials['Color texture']}
        position={[95.948, 0, 1.623]}
        rotation={[0, -0.993, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree024996.geometry}
        material={materials['Color texture']}
        position={[100.564, 0, -2.154]}
        rotation={[0, -0.885, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree025997.geometry}
        material={materials['Color texture']}
        position={[104.342, 0, 1.203]}
        rotation={[0, -0.468, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree2002998.geometry}
        material={materials['Color texture']}
        position={[81.679, 0, 2.882]}
        rotation={[Math.PI, -0.809, Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree3002999.geometry}
        material={materials['Color texture']}
        position={[55.658, 0, -12.226]}
        rotation={[-Math.PI, 1.244, -Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241000.geometry}
        material={materials['Color texture']}
        position={[58.596, 0, -9.289]}
        rotation={[0, -1.121, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241001.geometry}
        material={materials['Color texture']}
        position={[56.498, 0, -5.931]}
        rotation={[0, 0.88, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261002.geometry}
        material={materials['Color texture']}
        position={[66.15, 0, -5.512]}
        rotation={[-Math.PI, 0.204, -Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021003.geometry}
        material={materials['Color texture']}
        position={[77.482, 0, -8.03]}
        rotation={[-Math.PI, 0.608, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261004.geometry}
        material={materials['Color texture']}
        position={[74.964, 0, -2.993]}
        rotation={[Math.PI, -0.711, Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241005.geometry}
        material={materials['Color texture']}
        position={[73.705, 0, 7.079]}
        rotation={[Math.PI, -1.376, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021006.geometry}
        material={materials['Color texture']}
        position={[75.803, 0, 8.758]}
        rotation={[-Math.PI, 0.53, -Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241007.geometry}
        material={materials['Color texture']}
        position={[93.85, 0, 11.276]}
        rotation={[0, -1.039, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261008.geometry}
        material={materials['Color texture']}
        position={[86.715, 0, 14.214]}
        rotation={[0, -0.746, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041009.geometry}
        material={materials['Color texture']}
        position={[97.207, 0, 17.991]}
        rotation={[-Math.PI, 1.155, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261010.geometry}
        material={materials['Color texture']}
        position={[105.181, 0, 20.089]}
        rotation={[Math.PI, -0.81, Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021011.geometry}
        material={materials['Color texture']}
        position={[115.673, 0, 7.918]}
        rotation={[0, 0.444, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241012.geometry}
        material={materials['Color texture']}
        position={[124.067, 0, -26.915]}
        rotation={[0, 0.951, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231013.geometry}
        material={materials['Color texture']}
        position={[121.549, 0, -25.237]}
        rotation={[0, 0.269, 0]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031014.geometry}
        material={materials['Color texture']}
        position={[108.119, 0, -21.46]}
        rotation={[0, 1.113, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251015.geometry}
        material={materials['Color texture']}
        position={[111.896, 0, -18.941]}
        rotation={[-Math.PI, 0.084, -Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031016.geometry}
        material={materials['Color texture']}
        position={[108.119, 0, -16.423]}
        rotation={[0, 1.51, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251017.geometry}
        material={materials['Color texture']}
        position={[99.305, 0, -21.04]}
        rotation={[-Math.PI, 1.19, -Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241018.geometry}
        material={materials['Color texture']}
        position={[100.984, 0, -17.263]}
        rotation={[Math.PI, -0.372, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021019.geometry}
        material={materials['Color texture']}
        position={[83.357, 0, -25.237]}
        rotation={[0, 1.186, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251020.geometry}
        material={materials['Color texture']}
        position={[125.326, 0, -18.941]}
        rotation={[-Math.PI, 0.683, -Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041021.geometry}
        material={materials['Color texture']}
        position={[121.129, 0, -16.423]}
        rotation={[0, -1.158, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231022.geometry}
        material={materials['Color texture']}
        position={[124.486, 0, -9.289]}
        rotation={[0, -0.11, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251023.geometry}
        material={materials['Color texture']}
        position={[118.191, 0, -5.092]}
        rotation={[0, 1.198, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021024.geometry}
        material={materials['Color texture']}
        position={[113.155, 0, -3.413]}
        rotation={[-Math.PI, 1.215, -Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241025.geometry}
        material={materials['Color texture']}
        position={[117.771, 0, -0.895]}
        rotation={[0, 0.285, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021026.geometry}
        material={materials['Color texture']}
        position={[124.486, 0, -0.475]}
        rotation={[-Math.PI, 0.763, -Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231027.geometry}
        material={materials['Color texture']}
        position={[103.083, 0, -11.387]}
        rotation={[-Math.PI, 1.121, -Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021028.geometry}
        material={materials['Color texture']}
        position={[86.295, 0, -172.965]}
        rotation={[-Math.PI, 1.39, -Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041029.geometry}
        material={materials['Color texture']}
        position={[82.938, 0, -172.965]}
        rotation={[0, 0.321, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041030.geometry}
        material={materials['Color texture']}
        position={[134.559, 0, -9.708]}
        rotation={[Math.PI, -1.264, Math.PI]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231031.geometry}
        material={materials['Color texture']}
        position={[138.336, 0, -7.61]}
        rotation={[Math.PI, -1.539, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251032.geometry}
        material={materials['Color texture']}
        position={[134.978, 0, -3.413]}
        rotation={[0, 0.048, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021033.geometry}
        material={materials['Color texture']}
        position={[144.211, 0, -3.833]}
        rotation={[Math.PI, -1.026, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021034.geometry}
        material={materials['Color texture']}
        position={[137.916, 0, 4.141]}
        rotation={[-Math.PI, 0.287, -Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031035.geometry}
        material={materials['Color texture']}
        position={[135.398, 0, 6.659]}
        rotation={[0, 1.245, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041036.geometry}
        material={materials['Color texture']}
        position={[137.497, 0, 10.017]}
        rotation={[0, -0.103, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241037.geometry}
        material={materials['Color texture']}
        position={[129.942, 0, 11.276]}
        rotation={[-Math.PI, 0.945, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041038.geometry}
        material={materials['Color texture']}
        position={[126.165, 0, 5.4]}
        rotation={[-Math.PI, 1.136, -Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251039.geometry}
        material={materials['Color texture']}
        position={[121.549, 0, 20.089]}
        rotation={[0, -0.93, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031040.geometry}
        material={materials['Color texture']}
        position={[125.326, 0, 21.768]}
        rotation={[-Math.PI, 1.115, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241041.geometry}
        material={materials['Color texture']}
        position={[119.45, 0, 12.954]}
        rotation={[0, 0.457, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031042.geometry}
        material={materials['Color texture']}
        position={[107.279, 0, 9.597]}
        rotation={[0, -0.927, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041043.geometry}
        material={materials['Color texture']}
        position={[113.155, 0, 17.991]}
        rotation={[-Math.PI, 0.936, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261044.geometry}
        material={materials['Color texture']}
        position={[115.253, 0, 20.509]}
        rotation={[Math.PI, -1.01, Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031045.geometry}
        material={materials['Color texture']}
        position={[114.834, 0, 27.224]}
        rotation={[Math.PI, -0.959, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041046.geometry}
        material={materials['Color texture']}
        position={[122.388, 0, 30.161]}
        rotation={[0, -0.925, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261047.geometry}
        material={materials['Color texture']}
        position={[152.185, 0, 21.348]}
        rotation={[Math.PI, -0.892, Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021048.geometry}
        material={materials['Color texture']}
        position={[158.481, 0, 21.768]}
        rotation={[0, 0.479, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251049.geometry}
        material={materials['Color texture']}
        position={[155.963, 0, 25.545]}
        rotation={[Math.PI, -1.44, Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231050.geometry}
        material={materials['Color texture']}
        position={[152.605, 0, 25.965]}
        rotation={[-Math.PI, 0.094, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261051.geometry}
        material={materials['Color texture']}
        position={[135.398, 0, 31.421]}
        rotation={[0, 1.476, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231052.geometry}
        material={materials['Color texture']}
        position={[138.756, 0, 33.519]}
        rotation={[0, 0.227, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041053.geometry}
        material={materials['Color texture']}
        position={[134.559, 0, 36.037]}
        rotation={[0, -1.049, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031054.geometry}
        material={materials['Color texture']}
        position={[137.497, 0, 39.394]}
        rotation={[0, -0.719, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261055.geometry}
        material={materials['Color texture']}
        position={[125.745, 0, 33.519]}
        rotation={[Math.PI, -1.303, Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231056.geometry}
        material={materials['Color texture']}
        position={[132.041, 0, 40.654]}
        rotation={[-Math.PI, 0.356, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021057.geometry}
        material={materials['Color texture']}
        position={[142.952, 0, 34.358]}
        rotation={[0, 0.626, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231058.geometry}
        material={materials['Color texture']}
        position={[143.792, 0, 23.447]}
        rotation={[-Math.PI, 1.57, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021059.geometry}
        material={materials['Color texture']}
        position={[154.284, 0, 11.276]}
        rotation={[-Math.PI, 1.198, -Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251060.geometry}
        material={materials['Color texture']}
        position={[156.802, 0, 12.535]}
        rotation={[0, -1.547, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251061.geometry}
        material={materials['Color texture']}
        position={[73.285, 0, -166.25]}
        rotation={[Math.PI, -0.858, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261062.geometry}
        material={materials['Color texture']}
        position={[35.514, 0, -63.008]}
        rotation={[Math.PI, -1.05, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031063.geometry}
        material={materials['Color texture']}
        position={[33.415, 0, -59.651]}
        rotation={[-Math.PI, 1.506, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041064.geometry}
        material={materials['Color texture']}
        position={[79.58, 0, -96.583]}
        rotation={[Math.PI, -0.134, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021065.geometry}
        material={materials['Color texture']}
        position={[142.533, 0, 51.565]}
        rotation={[Math.PI, -0.258, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021066.geometry}
        material={materials['Color texture']}
        position={[146.73, 0, 52.405]}
        rotation={[0, 1.347, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251067.geometry}
        material={materials['Color texture']}
        position={[153.025, 0, 38.555]}
        rotation={[0, -1.563, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251068.geometry}
        material={materials['Color texture']}
        position={[149.667, 0, 40.234]}
        rotation={[-Math.PI, 1.472, -Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041069.geometry}
        material={materials['Color texture']}
        position={[160.579, 0, 41.493]}
        rotation={[Math.PI, -0.891, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261070.geometry}
        material={materials['Color texture']}
        position={[167.714, 0, 44.011]}
        rotation={[Math.PI, -0.097, Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261071.geometry}
        material={materials['Color texture']}
        position={[168.553, 0, 50.306]}
        rotation={[-Math.PI, 0.343, -Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251072.geometry}
        material={materials['Color texture']}
        position={[158.481, 0, 54.503]}
        rotation={[-Math.PI, 0.984, -Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231073.geometry}
        material={materials['Color texture']}
        position={[156.382, 0, 57.441]}
        rotation={[0, -0.122, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021074.geometry}
        material={materials['Color texture']}
        position={[149.248, 0, 64.995]}
        rotation={[0, 0.327, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251075.geometry}
        material={materials['Color texture']}
        position={[141.274, 0, 65.415]}
        rotation={[-Math.PI, 0.216, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021076.geometry}
        material={materials['Color texture']}
        position={[144.211, 0, 71.29]}
        rotation={[-Math.PI, 0.693, -Math.PI]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241077.geometry}
        material={materials['Color texture']}
        position={[147.149, 0, 74.648]}
        rotation={[-Math.PI, 0.63, -Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241078.geometry}
        material={materials['Color texture']}
        position={[147.989, 0, 86.819]}
        rotation={[0, 1.398, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031079.geometry}
        material={materials['Color texture']}
        position={[152.185, 0, 89.756]}
        rotation={[-Math.PI, 0.41, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261080.geometry}
        material={materials['Color texture']}
        position={[149.667, 0, 92.694]}
        rotation={[Math.PI, -1.212, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031081.geometry}
        material={materials['Color texture']}
        position={[157.222, 0, 74.228]}
        rotation={[0, -1.518, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021082.geometry}
        material={materials['Color texture']}
        position={[163.937, 0, 67.933]}
        rotation={[Math.PI, -0.468, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041083.geometry}
        material={materials['Color texture']}
        position={[166.874, 0, 69.612]}
        rotation={[Math.PI, -1.156, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231084.geometry}
        material={materials['Color texture']}
        position={[164.356, 0, 72.969]}
        rotation={[0, -0.198, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021085.geometry}
        material={materials['Color texture']}
        position={[171.071, 0, 61.218]}
        rotation={[-Math.PI, 0.783, -Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021086.geometry}
        material={materials['Color texture']}
        position={[179.045, 0, 58.28]}
        rotation={[-Math.PI, 1.062, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021087.geometry}
        material={materials['Color texture']}
        position={[182.403, 0, 62.477]}
        rotation={[0, 0.94, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021088.geometry}
        material={materials['Color texture']}
        position={[179.884, 0, 67.094]}
        rotation={[0, 0.062, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021089.geometry}
        material={materials['Color texture']}
        position={[184.081, 0, 70.031]}
        rotation={[Math.PI, -1.548, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251090.geometry}
        material={materials['Color texture']}
        position={[163.097, 0, 85.14]}
        rotation={[0, 1.191, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261091.geometry}
        material={materials['Color texture']}
        position={[161.838, 0, 89.756]}
        rotation={[0, -0.961, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251092.geometry}
        material={materials['Color texture']}
        position={[168.553, 0, 96.052]}
        rotation={[Math.PI, -0.491, Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031093.geometry}
        material={materials['Color texture']}
        position={[152.185, 0, 100.668]}
        rotation={[-Math.PI, 1.248, -Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231094.geometry}
        material={materials['Color texture']}
        position={[154.704, 0, 102.767]}
        rotation={[Math.PI, -1.159, Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021095.geometry}
        material={materials['Color texture']}
        position={[152.605, 0, 105.285]}
        rotation={[-Math.PI, 0.623, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231096.geometry}
        material={materials['Color texture']}
        position={[161.418, 0, 98.15]}
        rotation={[Math.PI, -0.456, Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021097.geometry}
        material={materials['Color texture']}
        position={[164.776, 0, 103.186]}
        rotation={[0, 1.18, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031098.geometry}
        material={materials['Color texture']}
        position={[163.097, 0, 106.544]}
        rotation={[Math.PI, -1.408, Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021099.geometry}
        material={materials['Color texture']}
        position={[144.631, 0, 55.762]}
        rotation={[Math.PI, -1.228, Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231100.geometry}
        material={materials['Color texture']}
        position={[153.864, 0, 48.628]}
        rotation={[-Math.PI, 1.361, -Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261101.geometry}
        material={materials['Color texture']}
        position={[159.74, 0, 114.098]}
        rotation={[0, 0.465, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041102.geometry}
        material={materials['Color texture']}
        position={[155.123, 0, 113.678]}
        rotation={[Math.PI, -0.307, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041103.geometry}
        material={materials['Color texture']}
        position={[171.911, 0, 111.58]}
        rotation={[Math.PI, -1.558, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261104.geometry}
        material={materials['Color texture']}
        position={[176.107, 0, 113.259]}
        rotation={[0, 1.065, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231105.geometry}
        material={materials['Color texture']}
        position={[172.75, 0, 117.875]}
        rotation={[-Math.PI, 0.318, -Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041106.geometry}
        material={materials['Color texture']}
        position={[179.465, 0, 108.642]}
        rotation={[-Math.PI, 1.218, -Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031107.geometry}
        material={materials['Color texture']}
        position={[197.511, 0, 99.829]}
        rotation={[0, 1.061, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021108.geometry}
        material={materials['Color texture']}
        position={[210.941, 0, 99.829]}
        rotation={[Math.PI, -0.021, Math.PI]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231109.geometry}
        material={materials['Color texture']}
        position={[215.558, 0, 100.248]}
        rotation={[0, 0.151, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251110.geometry}
        material={materials['Color texture']}
        position={[214.298, 0, 103.186]}
        rotation={[0, -1.505, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261111.geometry}
        material={materials['Color texture']}
        position={[205.065, 0, 105.704]}
        rotation={[0, 1.372, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261112.geometry}
        material={materials['Color texture']}
        position={[202.547, 0, 109.062]}
        rotation={[-Math.PI, 0.976, -Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241113.geometry}
        material={materials['Color texture']}
        position={[194.573, 0, 109.062]}
        rotation={[0, -1.13, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231114.geometry}
        material={materials['Color texture']}
        position={[196.672, 0, 79.264]}
        rotation={[0, -1.058, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261115.geometry}
        material={materials['Color texture']}
        position={[179.045, 0, 77.586]}
        rotation={[-Math.PI, 0.494, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021116.geometry}
        material={materials['Color texture']}
        position={[174.429, 0, 80.104]}
        rotation={[0, 0.107, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021117.geometry}
        material={materials['Color texture']}
        position={[169.812, 0, 78.845]}
        rotation={[0, -0.058, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241118.geometry}
        material={materials['Color texture']}
        position={[184.501, 0, 80.943]}
        rotation={[Math.PI, -0.539, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031119.geometry}
        material={materials['Color texture']}
        position={[189.957, 0, 77.586]}
        rotation={[Math.PI, -1.48, Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041120.geometry}
        material={materials['Color texture']}
        position={[154.704, 0, 82.622]}
        rotation={[Math.PI, -0.053, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021121.geometry}
        material={materials['Color texture']}
        position={[189.117, 0, 117.875]}
        rotation={[Math.PI, -0.669, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031122.geometry}
        material={materials['Color texture']}
        position={[200.869, 0, 126.688]}
        rotation={[-Math.PI, 0.898, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241123.geometry}
        material={materials['Color texture']}
        position={[207.164, 0, 129.626]}
        rotation={[Math.PI, -1.116, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261124.geometry}
        material={materials['Color texture']}
        position={[199.19, 0, 145.574]}
        rotation={[Math.PI, -0.01, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251125.geometry}
        material={materials['Color texture']}
        position={[207.584, 0, 110.741]}
        rotation={[-Math.PI, 0.532, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241126.geometry}
        material={materials['Color texture']}
        position={[202.967, 0, 117.875]}
        rotation={[-Math.PI, 1.395, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021127.geometry}
        material={materials['Color texture']}
        position={[206.324, 0, 119.134]}
        rotation={[-Math.PI, 0.427, -Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261128.geometry}
        material={materials['Color texture']}
        position={[217.236, 0, 112]}
        rotation={[Math.PI, -0.15, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021129.geometry}
        material={materials['Color texture']}
        position={[220.174, 0, 113.678]}
        rotation={[Math.PI, -0.908, Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021130.geometry}
        material={materials['Color texture']}
        position={[216.817, 0, 116.196]}
        rotation={[0, 0.91, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241131.geometry}
        material={materials['Color texture']}
        position={[221.013, 0, 120.393]}
        rotation={[0, 0.119, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261132.geometry}
        material={materials['Color texture']}
        position={[224.371, 0, 117.455]}
        rotation={[0, 0.536, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021133.geometry}
        material={materials['Color texture']}
        position={[218.495, 0, 123.331]}
        rotation={[0, -0.944, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021134.geometry}
        material={materials['Color texture']}
        position={[221.013, 0, 126.688]}
        rotation={[0, 1.319, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251135.geometry}
        material={materials['Color texture']}
        position={[213.879, 0, 123.751]}
        rotation={[0, -1.441, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041136.geometry}
        material={materials['Color texture']}
        position={[226.889, 0, 105.285]}
        rotation={[0, 0.497, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251137.geometry}
        material={materials['Color texture']}
        position={[233.184, 0, 106.124]}
        rotation={[0, 1.22, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021138.geometry}
        material={materials['Color texture']}
        position={[239.06, 0, 120.393]}
        rotation={[0, -0.289, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251139.geometry}
        material={materials['Color texture']}
        position={[236.542, 0, 120.813]}
        rotation={[-Math.PI, 1.36, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021140.geometry}
        material={materials['Color texture']}
        position={[237.801, 0, 125.01]}
        rotation={[0, 1.294, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251141.geometry}
        material={materials['Color texture']}
        position={[231.086, 0, 127.108]}
        rotation={[-Math.PI, 0.74, -Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031142.geometry}
        material={materials['Color texture']}
        position={[231.505, 0, 116.616]}
        rotation={[-Math.PI, 1.105, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021143.geometry}
        material={materials['Color texture']}
        position={[228.148, 0, 129.207]}
        rotation={[Math.PI, -0.916, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031144.geometry}
        material={materials['Color texture']}
        position={[231.505, 0, 131.725]}
        rotation={[-Math.PI, 1.39, -Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261145.geometry}
        material={materials['Color texture']}
        position={[242.417, 0, 132.564]}
        rotation={[0, 0.151, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021146.geometry}
        material={materials['Color texture']}
        position={[246.614, 0, 133.403]}
        rotation={[Math.PI, -0.664, Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021147.geometry}
        material={materials['Color texture']}
        position={[244.096, 0, 135.922]}
        rotation={[0, 1.257, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021148.geometry}
        material={materials['Color texture']}
        position={[248.293, 0, 141.377]}
        rotation={[0, 1.037, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261149.geometry}
        material={materials['Color texture']}
        position={[251.65, 0, 143.056]}
        rotation={[0, 1.553, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241150.geometry}
        material={materials['Color texture']}
        position={[244.096, 0, 143.476]}
        rotation={[Math.PI, -0.193, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251151.geometry}
        material={materials['Color texture']}
        position={[226.05, 0, 136.341]}
        rotation={[0, -0.393, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231152.geometry}
        material={materials['Color texture']}
        position={[194.154, 0, 118.715]}
        rotation={[0, -0.322, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231153.geometry}
        material={materials['Color texture']}
        position={[192.475, 0, 127.108]}
        rotation={[Math.PI, -0.023, Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251154.geometry}
        material={materials['Color texture']}
        position={[192.055, 0, 121.233]}
        rotation={[Math.PI, -1.35, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261155.geometry}
        material={materials['Color texture']}
        position={[235.283, 0, 141.797]}
        rotation={[-Math.PI, 0.322, -Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041156.geometry}
        material={materials['Color texture']}
        position={[258.365, 0, 153.548]}
        rotation={[0, -0.924, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021157.geometry}
        material={materials['Color texture']}
        position={[254.588, 0, 151.45]}
        rotation={[0, -0.157, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031158.geometry}
        material={materials['Color texture']}
        position={[252.909, 0, 156.066]}
        rotation={[0, -1.031, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261159.geometry}
        material={materials['Color texture']}
        position={[245.775, 0, 151.869]}
        rotation={[0, -0.415, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241160.geometry}
        material={materials['Color texture']}
        position={[241.998, 0, 154.807]}
        rotation={[0, 1.286, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251161.geometry}
        material={materials['Color texture']}
        position={[236.542, 0, 162.781]}
        rotation={[-Math.PI, 1.136, -Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231162.geometry}
        material={materials['Color texture']}
        position={[239.899, 0, 162.781]}
        rotation={[Math.PI, -0.293, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041163.geometry}
        material={materials['Color texture']}
        position={[229.407, 0, 159.004]}
        rotation={[-Math.PI, 0.843, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251164.geometry}
        material={materials['Color texture']}
        position={[247.873, 0, 163.201]}
        rotation={[Math.PI, -0.679, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251165.geometry}
        material={materials['Color texture']}
        position={[210.941, 0, 130.466]}
        rotation={[0, -0.374, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261166.geometry}
        material={materials['Color texture']}
        position={[229.407, 0, 108.222]}
        rotation={[0, 1.271, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251167.geometry}
        material={materials['Color texture']}
        position={[181.983, 0, 117.036]}
        rotation={[-Math.PI, 0.107, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041168.geometry}
        material={materials['Color texture']}
        position={[265.08, 0, 160.683]}
        rotation={[Math.PI, -0.1, Math.PI]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241169.geometry}
        material={materials['Color texture']}
        position={[261.723, 0, 162.781]}
        rotation={[0, -1.354, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021170.geometry}
        material={materials['Color texture']}
        position={[279.349, 0, 160.263]}
        rotation={[-Math.PI, 0.998, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031171.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 166.558]}
        rotation={[-Math.PI, 1.548, -Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021172.geometry}
        material={materials['Color texture']}
        position={[281.867, 0, 181.247]}
        rotation={[-Math.PI, 0.743, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031173.geometry}
        material={materials['Color texture']}
        position={[278.09, 0, 179.988]}
        rotation={[-Math.PI, 1.384, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041174.geometry}
        material={materials['Color texture']}
        position={[276.831, 0, 184.605]}
        rotation={[0, 0.815, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041175.geometry}
        material={materials['Color texture']}
        position={[271.795, 0, 185.024]}
        rotation={[-Math.PI, 0.787, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241176.geometry}
        material={materials['Color texture']}
        position={[262.982, 0, 183.346]}
        rotation={[0, 0.323, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031177.geometry}
        material={materials['Color texture']}
        position={[249.972, 0, 172.854]}
        rotation={[-Math.PI, 0.578, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251178.geometry}
        material={materials['Color texture']}
        position={[252.49, 0, 174.532]}
        rotation={[Math.PI, -1.475, Math.PI]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251179.geometry}
        material={materials['Color texture']}
        position={[249.972, 0, 177.89]}
        rotation={[0, 1.465, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231180.geometry}
        material={materials['Color texture']}
        position={[260.464, 0, 176.211]}
        rotation={[0, -0.786, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031181.geometry}
        material={materials['Color texture']}
        position={[256.267, 0, 190.061]}
        rotation={[-Math.PI, 0.815, -Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031182.geometry}
        material={materials['Color texture']}
        position={[265.08, 0, 192.159]}
        rotation={[0, -0.337, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021183.geometry}
        material={materials['Color texture']}
        position={[267.178, 0, 193.838]}
        rotation={[0, 1.154, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041184.geometry}
        material={materials['Color texture']}
        position={[268.857, 0, 200.972]}
        rotation={[0, 1.56, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231185.geometry}
        material={materials['Color texture']}
        position={[264.66, 0, 206.848]}
        rotation={[-Math.PI, 0.562, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251186.geometry}
        material={materials['Color texture']}
        position={[271.795, 0, 208.107]}
        rotation={[-Math.PI, 1.154, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031187.geometry}
        material={materials['Color texture']}
        position={[273.474, 0, 216.92]}
        rotation={[Math.PI, -0.942, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261188.geometry}
        material={materials['Color texture']}
        position={[268.438, 0, 220.697]}
        rotation={[Math.PI, -1.296, Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241189.geometry}
        material={materials['Color texture']}
        position={[272.634, 0, 225.734]}
        rotation={[-Math.PI, 0.868, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231190.geometry}
        material={materials['Color texture']}
        position={[270.536, 0, 229.93]}
        rotation={[0, -1.248, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021191.geometry}
        material={materials['Color texture']}
        position={[175.268, 0, 26.804]}
        rotation={[0, 0.134, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231192.geometry}
        material={materials['Color texture']}
        position={[167.294, 0, 16.732]}
        rotation={[-Math.PI, 0.455, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031193.geometry}
        material={materials['Color texture']}
        position={[179.045, 0, 27.643]}
        rotation={[-Math.PI, 1.289, -Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041194.geometry}
        material={materials['Color texture']}
        position={[175.268, 0, 33.099]}
        rotation={[Math.PI, -0.111, Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231195.geometry}
        material={materials['Color texture']}
        position={[280.608, 3.842, -31.532]}
        rotation={[Math.PI, -0.38, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021196.geometry}
        material={materials['Color texture']}
        position={[276.831, 9.543, -33.63]}
        rotation={[0, -0.167, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231197.geometry}
        material={materials['Color texture']}
        position={[275.572, 3.101, -28.594]}
        rotation={[-Math.PI, 1.229, -Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031198.geometry}
        material={materials['Color texture']}
        position={[272.215, 6.681, -29.014]}
        rotation={[0, 0.814, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021199.geometry}
        material={materials['Color texture']}
        position={[267.178, 2.586, -22.299]}
        rotation={[-Math.PI, 0.462, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041200.geometry}
        material={materials['Color texture']}
        position={[269.697, 0, -18.941]}
        rotation={[0, 1.177, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251201.geometry}
        material={materials['Color texture']}
        position={[266.339, 0, -16.423]}
        rotation={[0, 0.898, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261202.geometry}
        material={materials['Color texture']}
        position={[267.178, 0, -9.289]}
        rotation={[-Math.PI, 0.053, -Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251203.geometry}
        material={materials['Color texture']}
        position={[260.044, 0, -9.289]}
        rotation={[Math.PI, -0.143, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031204.geometry}
        material={materials['Color texture']}
        position={[255.847, 1.271, -9.289]}
        rotation={[0, -0.792, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231205.geometry}
        material={materials['Color texture']}
        position={[253.749, 1.311, -7.19]}
        rotation={[-Math.PI, 0.962, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251206.geometry}
        material={materials['Color texture']}
        position={[257.945, 0, -6.771]}
        rotation={[0, 1.388, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251207.geometry}
        material={materials['Color texture']}
        position={[259.205, 0, -0.895]}
        rotation={[0, -0.381, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261208.geometry}
        material={materials['Color texture']}
        position={[257.106, 0, 3.721]}
        rotation={[0, 1.436, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031209.geometry}
        material={materials['Color texture']}
        position={[245.775, 1.177, 2.882]}
        rotation={[0, 0.736, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261210.geometry}
        material={materials['Color texture']}
        position={[242.837, 0.867, 4.981]}
        rotation={[0, -0.121, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251211.geometry}
        material={materials['Color texture']}
        position={[247.453, 0, 6.659]}
        rotation={[0, -0.649, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021212.geometry}
        material={materials['Color texture']}
        position={[244.096, 0, 10.856]}
        rotation={[Math.PI, -0.419, Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231213.geometry}
        material={materials['Color texture']}
        position={[243.676, 0, 16.312]}
        rotation={[Math.PI, -1.232, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021214.geometry}
        material={materials['Color texture']}
        position={[238.64, 0, 16.312]}
        rotation={[0, 1.435, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021215.geometry}
        material={materials['Color texture']}
        position={[237.381, 0, 24.706]}
        rotation={[-Math.PI, 0.109, -Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251216.geometry}
        material={materials['Color texture']}
        position={[228.987, 0, 25.965]}
        rotation={[Math.PI, -0.331, Math.PI]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021217.geometry}
        material={materials['Color texture']}
        position={[223.951, 0, 25.125]}
        rotation={[0, 0.078, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041218.geometry}
        material={materials['Color texture']}
        position={[223.531, 0, 28.902]}
        rotation={[-Math.PI, 0.53, -Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021219.geometry}
        material={materials['Color texture']}
        position={[219.335, 0, 25.545]}
        rotation={[0, 1.162, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231220.geometry}
        material={materials['Color texture']}
        position={[215.138, 0, 27.643]}
        rotation={[Math.PI, -1.016, Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241221.geometry}
        material={materials['Color texture']}
        position={[216.397, 0, 33.939]}
        rotation={[0, 0.67, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021222.geometry}
        material={materials['Color texture']}
        position={[218.076, 0, 37.296]}
        rotation={[0, 0.347, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031223.geometry}
        material={materials['Color texture']}
        position={[212.62, 0, 38.975]}
        rotation={[0, 0.745, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031224.geometry}
        material={materials['Color texture']}
        position={[201.708, 0, 28.483]}
        rotation={[0, 0.542, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241225.geometry}
        material={materials['Color texture']}
        position={[205.905, 0, 27.224]}
        rotation={[0, -0.118, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241226.geometry}
        material={materials['Color texture']}
        position={[194.573, 0, 27.224]}
        rotation={[Math.PI, -1.325, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251227.geometry}
        material={materials['Color texture']}
        position={[192.055, 0, 30.161]}
        rotation={[0, 0.468, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021228.geometry}
        material={materials['Color texture']}
        position={[187.019, 0, 27.224]}
        rotation={[0, -0.182, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031229.geometry}
        material={materials['Color texture']}
        position={[188.278, 0, 36.037]}
        rotation={[0, -0.319, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231230.geometry}
        material={materials['Color texture']}
        position={[181.144, 0, 41.073]}
        rotation={[Math.PI, -0.121, Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031231.geometry}
        material={materials['Color texture']}
        position={[184.501, 0, 45.69]}
        rotation={[0, -0.93, 0]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241232.geometry}
        material={materials['Color texture']}
        position={[179.884, 0, 48.208]}
        rotation={[0, -0.664, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021233.geometry}
        material={materials['Color texture']}
        position={[195.413, 0, 44.85]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021234.geometry}
        material={materials['Color texture']}
        position={[198.351, 0, 46.109]}
        rotation={[0, -1.433, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261235.geometry}
        material={materials['Color texture']}
        position={[194.993, 0, 49.047]}
        rotation={[0, -1.329, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241236.geometry}
        material={materials['Color texture']}
        position={[189.537, 0, 54.923]}
        rotation={[0, -0.692, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041237.geometry}
        material={materials['Color texture']}
        position={[191.636, 0, 57.441]}
        rotation={[-Math.PI, 0.007, -Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031238.geometry}
        material={materials['Color texture']}
        position={[194.993, 0, 62.477]}
        rotation={[0, 1.158, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031239.geometry}
        material={materials['Color texture']}
        position={[196.252, 0, 54.923]}
        rotation={[0, -0.645, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021240.geometry}
        material={materials['Color texture']}
        position={[191.216, 0, 62.897]}
        rotation={[0, -0.137, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021241.geometry}
        material={materials['Color texture']}
        position={[207.164, 0, 59.959]}
        rotation={[-Math.PI, 0.29, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021242.geometry}
        material={materials['Color texture']}
        position={[217.236, 0, 49.047]}
        rotation={[-Math.PI, 0.612, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041243.geometry}
        material={materials['Color texture']}
        position={[220.594, 0, 51.565]}
        rotation={[Math.PI, -0.72, Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031244.geometry}
        material={materials['Color texture']}
        position={[217.656, 0, 55.342]}
        rotation={[0, 0.059, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231245.geometry}
        material={materials['Color texture']}
        position={[231.086, 0, 44.431]}
        rotation={[0, 0.299, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021246.geometry}
        material={materials['Color texture']}
        position={[234.024, 0, 45.69]}
        rotation={[Math.PI, -0.529, Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041247.geometry}
        material={materials['Color texture']}
        position={[230.666, 0, 50.306]}
        rotation={[Math.PI, -1.191, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021248.geometry}
        material={materials['Color texture']}
        position={[226.889, 0, 55.342]}
        rotation={[0, -0.994, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231249.geometry}
        material={materials['Color texture']}
        position={[224.791, 0, 59.959]}
        rotation={[-Math.PI, 0.869, -Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041250.geometry}
        material={materials['Color texture']}
        position={[241.998, 0, 56.601]}
        rotation={[0, 1.383, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231251.geometry}
        material={materials['Color texture']}
        position={[240.319, 0, 49.887]}
        rotation={[0, 0.184, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251252.geometry}
        material={materials['Color texture']}
        position={[234.024, 0, 31.84]}
        rotation={[Math.PI, -0.927, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251253.geometry}
        material={materials['Color texture']}
        position={[222.692, 0, 43.172]}
        rotation={[0, -0.049, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041254.geometry}
        material={materials['Color texture']}
        position={[206.324, 0, 34.358]}
        rotation={[Math.PI, -0.195, Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231255.geometry}
        material={materials['Color texture']}
        position={[205.065, 0, 30.581]}
        rotation={[0, 1.125, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031256.geometry}
        material={materials['Color texture']}
        position={[204.646, 0, 67.933]}
        rotation={[Math.PI, -1.354, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241257.geometry}
        material={materials['Color texture']}
        position={[209.262, 0, 70.451]}
        rotation={[0, 1.279, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251258.geometry}
        material={materials['Color texture']}
        position={[205.485, 0, 76.746]}
        rotation={[-Math.PI, 0.873, -Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021259.geometry}
        material={materials['Color texture']}
        position={[233.604, 0, 63.736]}
        rotation={[Math.PI, -0.734, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251260.geometry}
        material={materials['Color texture']}
        position={[227.309, 0, 67.513]}
        rotation={[Math.PI, -1.498, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231261.geometry}
        material={materials['Color texture']}
        position={[230.246, 0, 69.612]}
        rotation={[-Math.PI, 0.431, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041262.geometry}
        material={materials['Color texture']}
        position={[244.935, 0, 36.876]}
        rotation={[0, 1.513, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261263.geometry}
        material={materials['Color texture']}
        position={[336.846, 0, -10.967]}
        rotation={[-Math.PI, 1.403, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041264.geometry}
        material={materials['Color texture']}
        position={[322.577, 0, -23.978]}
        rotation={[-Math.PI, 0.198, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231265.geometry}
        material={materials['Color texture']}
        position={[315.022, 0, -24.397]}
        rotation={[0, -0.174, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231266.geometry}
        material={materials['Color texture']}
        position={[316.701, 0, -21.879]}
        rotation={[-Math.PI, 1.488, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251267.geometry}
        material={materials['Color texture']}
        position={[307.888, 0, -21.46]}
        rotation={[0, -0.561, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231268.geometry}
        material={materials['Color texture']}
        position={[294.458, 0, -23.558]}
        rotation={[Math.PI, -1.518, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021269.geometry}
        material={materials['Color texture']}
        position={[291.1, 0, -20.62]}
        rotation={[Math.PI, -0.493, Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261270.geometry}
        material={materials['Color texture']}
        position={[296.556, 0, -18.102]}
        rotation={[Math.PI, -0.455, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231271.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, -20.2]}
        rotation={[0, -0.248, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231272.geometry}
        material={materials['Color texture']}
        position={[281.448, 0, -21.879]}
        rotation={[Math.PI, -0.364, Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021273.geometry}
        material={materials['Color texture']}
        position={[276.412, 0, -7.19]}
        rotation={[-Math.PI, 0.909, -Math.PI]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021274.geometry}
        material={materials['Color texture']}
        position={[283.126, 0, -9.708]}
        rotation={[0, -0.988, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021275.geometry}
        material={materials['Color texture']}
        position={[286.064, 0, -8.449]}
        rotation={[-Math.PI, 1.128, -Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021276.geometry}
        material={materials['Color texture']}
        position={[283.546, 0, -3.833]}
        rotation={[0, -1.099, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021277.geometry}
        material={materials['Color texture']}
        position={[296.976, 0, -8.449]}
        rotation={[Math.PI, -0.191, Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251278.geometry}
        material={materials['Color texture']}
        position={[303.271, 0, -13.486]}
        rotation={[0, -0.808, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231279.geometry}
        material={materials['Color texture']}
        position={[306.209, 0, -10.967]}
        rotation={[Math.PI, -1.438, Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031280.geometry}
        material={materials['Color texture']}
        position={[309.147, 0, -14.325]}
        rotation={[0, -0.955, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251281.geometry}
        material={materials['Color texture']}
        position={[314.183, 0, -9.289]}
        rotation={[0, 1.276, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041282.geometry}
        material={materials['Color texture']}
        position={[319.639, 0, -9.289]}
        rotation={[-Math.PI, 0.103, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021283.geometry}
        material={materials['Color texture']}
        position={[325.934, 0, -13.066]}
        rotation={[0, 0.306, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021284.geometry}
        material={materials['Color texture']}
        position={[325.095, 0, -9.708]}
        rotation={[-Math.PI, 1.082, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251285.geometry}
        material={materials['Color texture']}
        position={[257.945, 0, 12.954]}
        rotation={[-Math.PI, 0.674, -Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231286.geometry}
        material={materials['Color texture']}
        position={[268.857, 0, 5.4]}
        rotation={[Math.PI, -1.51, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021287.geometry}
        material={materials['Color texture']}
        position={[272.215, 0, 5.82]}
        rotation={[-Math.PI, 1.271, -Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031288.geometry}
        material={materials['Color texture']}
        position={[272.634, 0, -0.475]}
        rotation={[0, -0.049, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021289.geometry}
        material={materials['Color texture']}
        position={[268.018, 0, 11.695]}
        rotation={[Math.PI, -1.198, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261290.geometry}
        material={materials['Color texture']}
        position={[271.795, 0, 9.597]}
        rotation={[Math.PI, -1.394, Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241291.geometry}
        material={materials['Color texture']}
        position={[247.873, 0, 25.545]}
        rotation={[-Math.PI, 1.437, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241292.geometry}
        material={materials['Color texture']}
        position={[251.231, 0, 26.804]}
        rotation={[0, 0.214, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021293.geometry}
        material={materials['Color texture']}
        position={[257.526, 0, 22.187]}
        rotation={[-Math.PI, 0.839, -Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021294.geometry}
        material={materials['Color texture']}
        position={[261.303, 0, 22.607]}
        rotation={[0, 0.489, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261295.geometry}
        material={materials['Color texture']}
        position={[259.205, 0, 25.125]}
        rotation={[-Math.PI, 0.546, -Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021296.geometry}
        material={materials['Color texture']}
        position={[269.697, 0, 24.286]}
        rotation={[-Math.PI, 0.147, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041297.geometry}
        material={materials['Color texture']}
        position={[270.116, 0, 29.322]}
        rotation={[0, 0.383, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231298.geometry}
        material={materials['Color texture']}
        position={[268.018, 0, 27.224]}
        rotation={[Math.PI, -1.139, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261299.geometry}
        material={materials['Color texture']}
        position={[264.66, 0, 33.519]}
        rotation={[0, 0.958, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251300.geometry}
        material={materials['Color texture']}
        position={[255.008, 0, 36.457]}
        rotation={[-Math.PI, 1.022, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021301.geometry}
        material={materials['Color texture']}
        position={[290.261, 0, 2.882]}
        rotation={[-Math.PI, 0.089, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251302.geometry}
        material={materials['Color texture']}
        position={[287.323, 0, 4.981]}
        rotation={[0, 0.399, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231303.geometry}
        material={materials['Color texture']}
        position={[281.028, 0, 7.918]}
        rotation={[0, -1.01, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041304.geometry}
        material={materials['Color texture']}
        position={[284.385, 0, 13.374]}
        rotation={[0, -0.15, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021305.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 14.214]}
        rotation={[0, -0.267, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231306.geometry}
        material={materials['Color texture']}
        position={[289.841, 0, 12.954]}
        rotation={[0, 1.289, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031307.geometry}
        material={materials['Color texture']}
        position={[284.805, 0, 20.509]}
        rotation={[Math.PI, -0.955, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021308.geometry}
        material={materials['Color texture']}
        position={[281.028, 0, 29.322]}
        rotation={[-Math.PI, 0.228, -Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241309.geometry}
        material={materials['Color texture']}
        position={[303.691, 0, -1.734]}
        rotation={[0, -0.099, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021310.geometry}
        material={materials['Color texture']}
        position={[305.789, 0, 0.364]}
        rotation={[0, 0.761, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251311.geometry}
        material={materials['Color texture']}
        position={[303.271, 0, 1.623]}
        rotation={[0, 0.448, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031312.geometry}
        material={materials['Color texture']}
        position={[309.566, 0, -0.056]}
        rotation={[0, 1.464, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021313.geometry}
        material={materials['Color texture']}
        position={[315.862, 0, -0.056]}
        rotation={[-Math.PI, 0.317, -Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261314.geometry}
        material={materials['Color texture']}
        position={[326.773, 0, 0.784]}
        rotation={[Math.PI, -0.66, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251315.geometry}
        material={materials['Color texture']}
        position={[324.675, 0, 2.462]}
        rotation={[0, 0.085, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241316.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 4.141]}
        rotation={[0, 1.336, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021317.geometry}
        material={materials['Color texture']}
        position={[335.587, 0, -0.475]}
        rotation={[-Math.PI, 0.551, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021318.geometry}
        material={materials['Color texture']}
        position={[339.364, 0, 2.043]}
        rotation={[Math.PI, -0.504, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021319.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 1.203]}
        rotation={[Math.PI, -0.674, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251320.geometry}
        material={materials['Color texture']}
        position={[341.043, 0, 4.981]}
        rotation={[0, -0.284, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261321.geometry}
        material={materials['Color texture']}
        position={[336.006, 0, 6.24]}
        rotation={[0, -0.973, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021322.geometry}
        material={materials['Color texture']}
        position={[342.302, 0, 10.017]}
        rotation={[-Math.PI, 0.26, -Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021323.geometry}
        material={materials['Color texture']}
        position={[347.758, 0, 4.981]}
        rotation={[-Math.PI, 0.211, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231324.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 3.302]}
        rotation={[0, 0.614, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261325.geometry}
        material={materials['Color texture']}
        position={[353.633, 0, 6.24]}
        rotation={[0, 1.408, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031326.geometry}
        material={materials['Color texture']}
        position={[358.669, 0, 7.079]}
        rotation={[0, -1.314, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241327.geometry}
        material={materials['Color texture']}
        position={[354.892, 0, 14.214]}
        rotation={[Math.PI, -1.363, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241328.geometry}
        material={materials['Color texture']}
        position={[350.276, 0, 18.83]}
        rotation={[0, 0.32, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031329.geometry}
        material={materials['Color texture']}
        position={[343.561, 0, 14.214]}
        rotation={[Math.PI, -0.676, Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261330.geometry}
        material={materials['Color texture']}
        position={[336.426, 0, 22.187]}
        rotation={[Math.PI, -0.325, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231331.geometry}
        material={materials['Color texture']}
        position={[319.219, 0, 7.079]}
        rotation={[0, 0.072, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031332.geometry}
        material={materials['Color texture']}
        position={[322.157, 0, 8.758]}
        rotation={[Math.PI, -0.93, Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261333.geometry}
        material={materials['Color texture']}
        position={[317.121, 0, 10.017]}
        rotation={[Math.PI, -0.953, Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031334.geometry}
        material={materials['Color texture']}
        position={[309.566, 0, 6.659]}
        rotation={[Math.PI, -0.112, Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041335.geometry}
        material={materials['Color texture']}
        position={[300.753, 0, 11.276]}
        rotation={[0, -1.386, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041336.geometry}
        material={materials['Color texture']}
        position={[304.53, 0, 14.633]}
        rotation={[-Math.PI, 0.08, -Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021337.geometry}
        material={materials['Color texture']}
        position={[299.914, 0, 19.25]}
        rotation={[Math.PI, -1.525, Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261338.geometry}
        material={materials['Color texture']}
        position={[296.556, 0, 13.794]}
        rotation={[0, -0.646, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041339.geometry}
        material={materials['Color texture']}
        position={[313.763, 0, 16.312]}
        rotation={[0, 0.73, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041340.geometry}
        material={materials['Color texture']}
        position={[314.603, 0, 20.928]}
        rotation={[0, 0.505, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251341.geometry}
        material={materials['Color texture']}
        position={[322.577, 0, 17.571]}
        rotation={[Math.PI, -0.147, Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241342.geometry}
        material={materials['Color texture']}
        position={[330.97, 0, 15.473]}
        rotation={[0, 0.152, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021343.geometry}
        material={materials['Color texture']}
        position={[329.711, 0, 17.991]}
        rotation={[-Math.PI, 0.128, -Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031344.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 28.902]}
        rotation={[-Math.PI, 1.049, -Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231345.geometry}
        material={materials['Color texture']}
        position={[327.613, 0, 30.581]}
        rotation={[-Math.PI, 0.117, -Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031346.geometry}
        material={materials['Color texture']}
        position={[319.639, 0, 30.581]}
        rotation={[Math.PI, -1.056, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041347.geometry}
        material={materials['Color texture']}
        position={[316.701, 0, 33.939]}
        rotation={[0, -0.724, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251348.geometry}
        material={materials['Color texture']}
        position={[322.577, 0, 36.037]}
        rotation={[0, -0.443, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041349.geometry}
        material={materials['Color texture']}
        position={[309.147, 0, 32.68]}
        rotation={[-Math.PI, 0.084, -Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031350.geometry}
        material={materials['Color texture']}
        position={[303.691, 0, 32.26]}
        rotation={[-Math.PI, 0.826, -Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251351.geometry}
        material={materials['Color texture']}
        position={[306.629, 0, 36.457]}
        rotation={[-Math.PI, 0.904, -Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031352.geometry}
        material={materials['Color texture']}
        position={[299.494, 0, 39.814]}
        rotation={[Math.PI, -1.368, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031353.geometry}
        material={materials['Color texture']}
        position={[293.618, 0, 34.778]}
        rotation={[-Math.PI, 0.72, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251354.geometry}
        material={materials['Color texture']}
        position={[292.779, 0, 37.716]}
        rotation={[0, -0.719, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041355.geometry}
        material={materials['Color texture']}
        position={[295.717, 0, 37.716]}
        rotation={[Math.PI, -1.196, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021356.geometry}
        material={materials['Color texture']}
        position={[295.717, 0, 42.752]}
        rotation={[0, -1.509, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231357.geometry}
        material={materials['Color texture']}
        position={[300.333, 0, 42.332]}
        rotation={[Math.PI, -0.842, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021358.geometry}
        material={materials['Color texture']}
        position={[285.225, 0, 36.457]}
        rotation={[0, 0.029, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251359.geometry}
        material={materials['Color texture']}
        position={[279.349, 0, 38.135]}
        rotation={[Math.PI, -1.281, Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031360.geometry}
        material={materials['Color texture']}
        position={[275.572, 0, 36.037]}
        rotation={[0, 0.007, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261361.geometry}
        material={materials['Color texture']}
        position={[276.831, 0, 40.654]}
        rotation={[0, -0.771, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251362.geometry}
        material={materials['Color texture']}
        position={[281.028, 0, 42.752]}
        rotation={[0, 0.211, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241363.geometry}
        material={materials['Color texture']}
        position={[272.634, 0, 46.109]}
        rotation={[Math.PI, -0.949, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021364.geometry}
        material={materials['Color texture']}
        position={[251.231, 0, 45.69]}
        rotation={[0, 0.932, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251365.geometry}
        material={materials['Color texture']}
        position={[254.168, 0, 46.949]}
        rotation={[Math.PI, -1.038, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231366.geometry}
        material={materials['Color texture']}
        position={[254.168, 0, 49.887]}
        rotation={[-Math.PI, 1.149, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241367.geometry}
        material={materials['Color texture']}
        position={[259.205, 0, 45.69]}
        rotation={[0, 0.261, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041368.geometry}
        material={materials['Color texture']}
        position={[265.5, 0, 48.208]}
        rotation={[0, -1.22, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251369.geometry}
        material={materials['Color texture']}
        position={[264.66, 0, 53.664]}
        rotation={[0, -0.237, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021370.geometry}
        material={materials['Color texture']}
        position={[267.598, 0, 52.405]}
        rotation={[-Math.PI, 1.508, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261371.geometry}
        material={materials['Color texture']}
        position={[253.329, 0, 55.762]}
        rotation={[0, -0.68, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031372.geometry}
        material={materials['Color texture']}
        position={[255.427, 0, 57.021]}
        rotation={[-Math.PI, 0.322, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041373.geometry}
        material={materials['Color texture']}
        position={[251.65, 0, 62.477]}
        rotation={[-Math.PI, 1.371, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031374.geometry}
        material={materials['Color texture']}
        position={[280.189, 0, 51.565]}
        rotation={[0, -0.379, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021375.geometry}
        material={materials['Color texture']}
        position={[284.385, 0, 51.565]}
        rotation={[0, 0.577, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031376.geometry}
        material={materials['Color texture']}
        position={[292.359, 0, 48.208]}
        rotation={[Math.PI, -1.346, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241377.geometry}
        material={materials['Color texture']}
        position={[294.458, 0, 50.306]}
        rotation={[0, 1.034, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251378.geometry}
        material={materials['Color texture']}
        position={[292.359, 0, 53.664]}
        rotation={[0, 0.217, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251379.geometry}
        material={materials['Color texture']}
        position={[305.37, 0, 49.047]}
        rotation={[-Math.PI, 0.921, -Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231380.geometry}
        material={materials['Color texture']}
        position={[310.826, 0, 42.332]}
        rotation={[0, -0.51, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031381.geometry}
        material={materials['Color texture']}
        position={[309.147, 0, 50.306]}
        rotation={[Math.PI, -0.831, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231382.geometry}
        material={materials['Color texture']}
        position={[288.582, 0, -17.682]}
        rotation={[Math.PI, -1.492, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251383.geometry}
        material={materials['Color texture']}
        position={[304.111, 0, -27.335]}
        rotation={[Math.PI, -0.202, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231384.geometry}
        material={materials['Color texture']}
        position={[289.002, 0, -5.931]}
        rotation={[-Math.PI, 0.7, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251385.geometry}
        material={materials['Color texture']}
        position={[281.028, 0, -4.253]}
        rotation={[0, 0.891, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021386.geometry}
        material={materials['Color texture']}
        position={[209.262, 0, 50.726]}
        rotation={[0, 0.603, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021387.geometry}
        material={materials['Color texture']}
        position={[363.706, 0, 12.535]}
        rotation={[0, 0.994, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021388.geometry}
        material={materials['Color texture']}
        position={[367.063, 0, 14.633]}
        rotation={[0, 0.753, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041389.geometry}
        material={materials['Color texture']}
        position={[364.545, 0, 17.571]}
        rotation={[0, -0.035, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261390.geometry}
        material={materials['Color texture']}
        position={[376.716, 0, 18.41]}
        rotation={[Math.PI, -0.307, Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021391.geometry}
        material={materials['Color texture']}
        position={[388.047, 0, 22.187]}
        rotation={[Math.PI, -0.27, Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021392.geometry}
        material={materials['Color texture']}
        position={[385.949, 0, 24.286]}
        rotation={[0, -1.229, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031393.geometry}
        material={materials['Color texture']}
        position={[388.886, 0, 27.224]}
        rotation={[-Math.PI, 0.552, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261394.geometry}
        material={materials['Color texture']}
        position={[397.7, 0, 31.421]}
        rotation={[-Math.PI, 0.041, -Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031395.geometry}
        material={materials['Color texture']}
        position={[392.664, 0, 34.778]}
        rotation={[0, 0.413, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241396.geometry}
        material={materials['Color texture']}
        position={[383.85, 0, 31.84]}
        rotation={[Math.PI, -0.656, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231397.geometry}
        material={materials['Color texture']}
        position={[347.758, 0, 26.804]}
        rotation={[-Math.PI, 1.181, -Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261398.geometry}
        material={materials['Color texture']}
        position={[335.587, 0, 37.296]}
        rotation={[-Math.PI, 1.46, -Math.PI]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241399.geometry}
        material={materials['Color texture']}
        position={[270.956, 0, 58.28]}
        rotation={[-Math.PI, 1.442, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041400.geometry}
        material={materials['Color texture']}
        position={[256.686, 0, 65.415]}
        rotation={[0, -1, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261401.geometry}
        material={materials['Color texture']}
        position={[252.07, 0, 72.969]}
        rotation={[0, -0.389, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021402.geometry}
        material={materials['Color texture']}
        position={[257.106, 0, 75.907]}
        rotation={[Math.PI, -0.07, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241403.geometry}
        material={materials['Color texture']}
        position={[440.088, 0, 153.128]}
        rotation={[0, 0.365, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031404.geometry}
        material={materials['Color texture']}
        position={[429.176, 0, 156.486]}
        rotation={[Math.PI, -0.403, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231405.geometry}
        material={materials['Color texture']}
        position={[431.694, 0, 159.843]}
        rotation={[Math.PI, -0.693, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041406.geometry}
        material={materials['Color texture']}
        position={[429.176, 0, 163.621]}
        rotation={[-Math.PI, 1.384, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041407.geometry}
        material={materials['Color texture']}
        position={[441.347, 0, 165.299]}
        rotation={[Math.PI, -1.524, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241408.geometry}
        material={materials['Color texture']}
        position={[439.248, 0, 167.817]}
        rotation={[-Math.PI, 0.65, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251409.geometry}
        material={materials['Color texture']}
        position={[419.523, 0, 166.139]}
        rotation={[-Math.PI, 0.964, -Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231410.geometry}
        material={materials['Color texture']}
        position={[414.067, 0, 166.558]}
        rotation={[0, -0.192, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251411.geometry}
        material={materials['Color texture']}
        position={[411.549, 0, 171.175]}
        rotation={[0, 0.782, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241412.geometry}
        material={materials['Color texture']}
        position={[416.586, 0, 169.916]}
        rotation={[-Math.PI, 1.108, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041413.geometry}
        material={materials['Color texture']}
        position={[402.736, 0, 168.657]}
        rotation={[Math.PI, -1.563, Math.PI]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241414.geometry}
        material={materials['Color texture']}
        position={[398.959, 0, 169.496]}
        rotation={[0, -0.93, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041415.geometry}
        material={materials['Color texture']}
        position={[401.057, 0, 173.693]}
        rotation={[0, 0.044, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031416.geometry}
        material={materials['Color texture']}
        position={[401.897, 0, 177.89]}
        rotation={[0, -0.93, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021417.geometry}
        material={materials['Color texture']}
        position={[410.29, 0, 186.283]}
        rotation={[0, -0.513, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231418.geometry}
        material={materials['Color texture']}
        position={[403.575, 0, 188.382]}
        rotation={[Math.PI, -1.366, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231419.geometry}
        material={materials['Color texture']}
        position={[393.923, 0, 207.268]}
        rotation={[0, -0.189, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021420.geometry}
        material={materials['Color texture']}
        position={[389.306, 0, 211.045]}
        rotation={[Math.PI, -0.933, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041421.geometry}
        material={materials['Color texture']}
        position={[384.69, 0, 172.854]}
        rotation={[-Math.PI, 1.244, -Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041422.geometry}
        material={materials['Color texture']}
        position={[388.047, 0, 174.532]}
        rotation={[0, -1.012, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241423.geometry}
        material={materials['Color texture']}
        position={[381.332, 0, 178.309]}
        rotation={[0, -0.737, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041424.geometry}
        material={materials['Color texture']}
        position={[375.457, 0, 172.014]}
        rotation={[Math.PI, -0.802, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021425.geometry}
        material={materials['Color texture']}
        position={[370.42, 0, 177.89]}
        rotation={[Math.PI, -1.446, Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021426.geometry}
        material={materials['Color texture']}
        position={[376.296, 0, 183.346]}
        rotation={[0, -0.688, 0]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261427.geometry}
        material={materials['Color texture']}
        position={[373.778, 0, 184.185]}
        rotation={[-Math.PI, 1.237, -Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021428.geometry}
        material={materials['Color texture']}
        position={[375.037, 0, 187.962]}
        rotation={[-Math.PI, 1.449, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261429.geometry}
        material={materials['Color texture']}
        position={[387.208, 0, 186.283]}
        rotation={[0, 0.582, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021430.geometry}
        material={materials['Color texture']}
        position={[396.021, 0, 179.149]}
        rotation={[0, 0.149, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241431.geometry}
        material={materials['Color texture']}
        position={[398.539, 0, 182.087]}
        rotation={[0, 0.084, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021432.geometry}
        material={materials['Color texture']}
        position={[394.342, 0, 183.765]}
        rotation={[-Math.PI, 0.966, -Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231433.geometry}
        material={materials['Color texture']}
        position={[394.762, 0, 193.838]}
        rotation={[Math.PI, -1.54, Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251434.geometry}
        material={materials['Color texture']}
        position={[389.306, 0, 198.874]}
        rotation={[0, 0.712, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261435.geometry}
        material={materials['Color texture']}
        position={[385.529, 0, 201.812]}
        rotation={[0, -0.168, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021436.geometry}
        material={materials['Color texture']}
        position={[381.752, 0, 211.045]}
        rotation={[-Math.PI, 0.741, -Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041437.geometry}
        material={materials['Color texture']}
        position={[383.431, 0, 214.822]}
        rotation={[Math.PI, -1.101, Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031438.geometry}
        material={materials['Color texture']}
        position={[379.654, 0, 216.501]}
        rotation={[0, 1.321, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021439.geometry}
        material={materials['Color texture']}
        position={[375.037, 0, 221.956]}
        rotation={[Math.PI, -0.203, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241440.geometry}
        material={materials['Color texture']}
        position={[373.778, 0, 206.428]}
        rotation={[Math.PI, -1.406, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261441.geometry}
        material={materials['Color texture']}
        position={[364.125, 0, 180.408]}
        rotation={[0, -1.142, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021442.geometry}
        material={materials['Color texture']}
        position={[365.804, 0, 182.926]}
        rotation={[-Math.PI, 0.767, -Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021443.geometry}
        material={materials['Color texture']}
        position={[362.446, 0, 183.346]}
        rotation={[0, 0.952, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021444.geometry}
        material={materials['Color texture']}
        position={[367.902, 0, 188.802]}
        rotation={[0, 0.081, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241445.geometry}
        material={materials['Color texture']}
        position={[364.545, 0, 192.579]}
        rotation={[Math.PI, -0.376, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251446.geometry}
        material={materials['Color texture']}
        position={[372.519, 0, 196.775]}
        rotation={[0, -0.881, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021447.geometry}
        material={materials['Color texture']}
        position={[369.581, 0, 198.454]}
        rotation={[Math.PI, -0.569, Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241448.geometry}
        material={materials['Color texture']}
        position={[362.866, 0, 201.812]}
        rotation={[Math.PI, -1.296, Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241449.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 198.874]}
        rotation={[0, -1.355, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231450.geometry}
        material={materials['Color texture']}
        position={[332.229, 0, 201.812]}
        rotation={[-Math.PI, 0.042, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261451.geometry}
        material={materials['Color texture']}
        position={[351.535, 0, 190.48]}
        rotation={[0, -1.035, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261452.geometry}
        material={materials['Color texture']}
        position={[348.597, 0, 195.097]}
        rotation={[-Math.PI, 0.421, -Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041453.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 199.294]}
        rotation={[0, -0.748, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261454.geometry}
        material={materials['Color texture']}
        position={[348.177, 0, 204.749]}
        rotation={[0, 0.471, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041455.geometry}
        material={materials['Color texture']}
        position={[316.701, 0, 204.33]}
        rotation={[0, 0.294, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261456.geometry}
        material={materials['Color texture']}
        position={[321.318, 0, 206.428]}
        rotation={[-Math.PI, 0.991, -Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041457.geometry}
        material={materials['Color texture']}
        position={[317.96, 0, 209.366]}
        rotation={[-Math.PI, 0.96, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021458.geometry}
        material={materials['Color texture']}
        position={[337.266, 0, 208.527]}
        rotation={[0, -0.556, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041459.geometry}
        material={materials['Color texture']}
        position={[341.043, 0, 211.045]}
        rotation={[0, 0.361, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261460.geometry}
        material={materials['Color texture']}
        position={[335.167, 0, 213.982]}
        rotation={[Math.PI, -0.284, Math.PI]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231461.geometry}
        material={materials['Color texture']}
        position={[348.177, 0, 221.117]}
        rotation={[0, 1.321, 0]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021462.geometry}
        material={materials['Color texture']}
        position={[350.276, 0, 213.982]}
        rotation={[Math.PI, -0.465, Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031463.geometry}
        material={materials['Color texture']}
        position={[378.814, 0, 232.449]}
        rotation={[Math.PI, -0.29, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261464.geometry}
        material={materials['Color texture']}
        position={[406.093, 0, 211.464]}
        rotation={[-Math.PI, 1.037, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251465.geometry}
        material={materials['Color texture']}
        position={[416.166, 0, 192.159]}
        rotation={[0, 0.566, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041466.geometry}
        material={materials['Color texture']}
        position={[462.751, 0, 166.558]}
        rotation={[Math.PI, -0.539, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031467.geometry}
        material={materials['Color texture']}
        position={[309.566, 0, 215.661]}
        rotation={[Math.PI, -0.394, Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241468.geometry}
        material={materials['Color texture']}
        position={[307.888, 0, 217.34]}
        rotation={[0, 0.533, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251469.geometry}
        material={materials['Color texture']}
        position={[310.826, 0, 221.956]}
        rotation={[-Math.PI, 1.455, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241470.geometry}
        material={materials['Color texture']}
        position={[299.914, 0, 221.537]}
        rotation={[Math.PI, -0.009, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241471.geometry}
        material={materials['Color texture']}
        position={[318.38, 0, 234.967]}
        rotation={[Math.PI, -1.531, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261472.geometry}
        material={materials['Color texture']}
        position={[331.81, 0, 227.832]}
        rotation={[0, -1.425, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021473.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 229.511]}
        rotation={[Math.PI, -0.14, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031474.geometry}
        material={materials['Color texture']}
        position={[343.561, 0, 237.485]}
        rotation={[0, 1.511, 0]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021475.geometry}
        material={materials['Color texture']}
        position={[368.322, 0, 213.563]}
        rotation={[-Math.PI, 0.832, -Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241476.geometry}
        material={materials['Color texture']}
        position={[396.441, 0, 38.555]}
        rotation={[-Math.PI, 0.662, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231477.geometry}
        material={materials['Color texture']}
        position={[394.762, 0, 43.172]}
        rotation={[-Math.PI, 0.126, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031478.geometry}
        material={materials['Color texture']}
        position={[400.638, 0, 45.69]}
        rotation={[0, -1.373, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021479.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 49.047]}
        rotation={[0, -1.037, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231480.geometry}
        material={materials['Color texture']}
        position={[403.156, 0, 49.047]}
        rotation={[0, -0.836, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031481.geometry}
        material={materials['Color texture']}
        position={[409.871, 0, 54.083]}
        rotation={[0, -0.56, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241482.geometry}
        material={materials['Color texture']}
        position={[406.513, 0, 57.441]}
        rotation={[-Math.PI, 0.004, -Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231483.geometry}
        material={materials['Color texture']}
        position={[422.461, 0, 61.218]}
        rotation={[0, -0.308, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021484.geometry}
        material={materials['Color texture']}
        position={[427.078, 0, 61.218]}
        rotation={[0, -0.778, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261485.geometry}
        material={materials['Color texture']}
        position={[426.658, 0, 67.094]}
        rotation={[0, -0.068, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231486.geometry}
        material={materials['Color texture']}
        position={[419.104, 0, 72.13]}
        rotation={[Math.PI, -0.11, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251487.geometry}
        material={materials['Color texture']}
        position={[424.14, 0, 73.389]}
        rotation={[0, 0.959, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231488.geometry}
        material={materials['Color texture']}
        position={[440.088, 0, 70.871]}
        rotation={[Math.PI, -0.92, Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031489.geometry}
        material={materials['Color texture']}
        position={[437.15, 0, 73.389]}
        rotation={[0, -1.461, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261490.geometry}
        material={materials['Color texture']}
        position={[442.186, 0, 78.005]}
        rotation={[0, -0.705, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251491.geometry}
        material={materials['Color texture']}
        position={[430.855, 0, 80.104]}
        rotation={[0, 0.314, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241492.geometry}
        material={materials['Color texture']}
        position={[426.238, 0, 83.461]}
        rotation={[0, 0.081, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231493.geometry}
        material={materials['Color texture']}
        position={[421.202, 0, 95.632]}
        rotation={[0, -1.416, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031494.geometry}
        material={materials['Color texture']}
        position={[427.917, 0, 98.57]}
        rotation={[0, 0.295, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251495.geometry}
        material={materials['Color texture']}
        position={[422.881, 0, 103.606]}
        rotation={[-Math.PI, 0.771, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261496.geometry}
        material={materials['Color texture']}
        position={[424.56, 0, 97.73]}
        rotation={[-Math.PI, 0.16, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241497.geometry}
        material={materials['Color texture']}
        position={[362.866, 0, 24.706]}
        rotation={[-Math.PI, 0.965, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041498.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 28.902]}
        rotation={[-Math.PI, 0.949, -Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021499.geometry}
        material={materials['Color texture']}
        position={[268.857, 0, 62.477]}
        rotation={[Math.PI, -0.083, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251500.geometry}
        material={materials['Color texture']}
        position={[272.634, 0, 65.415]}
        rotation={[0, 1.184, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031501.geometry}
        material={materials['Color texture']}
        position={[268.018, 0, 70.871]}
        rotation={[-Math.PI, 1.441, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021502.geometry}
        material={materials['Color texture']}
        position={[271.375, 0, 78.425]}
        rotation={[Math.PI, -0.633, Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041503.geometry}
        material={materials['Color texture']}
        position={[257.945, 0, 84.301]}
        rotation={[0, 0.121, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251504.geometry}
        material={materials['Color texture']}
        position={[263.821, 0, 85.979]}
        rotation={[0, -0.63, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021505.geometry}
        material={materials['Color texture']}
        position={[252.07, 0, 91.855]}
        rotation={[-Math.PI, 1.224, -Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041506.geometry}
        material={materials['Color texture']}
        position={[244.935, 0, 72.969]}
        rotation={[0, -1.224, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231507.geometry}
        material={materials['Color texture']}
        position={[249.552, 0, 85.979]}
        rotation={[0, 1.125, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251508.geometry}
        material={materials['Color texture']}
        position={[268.857, 0, 88.497]}
        rotation={[0, -0.384, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041509.geometry}
        material={materials['Color texture']}
        position={[275.572, 0, 90.596]}
        rotation={[Math.PI, -0.678, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041510.geometry}
        material={materials['Color texture']}
        position={[278.51, 0, 86.819]}
        rotation={[0, 0.393, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261511.geometry}
        material={materials['Color texture']}
        position={[280.189, 0, 90.176]}
        rotation={[Math.PI, -0.746, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041512.geometry}
        material={materials['Color texture']}
        position={[288.163, 0, 80.104]}
        rotation={[0, 0.84, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041513.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, 67.513]}
        rotation={[0, 0.955, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021514.geometry}
        material={materials['Color texture']}
        position={[289.841, 0, 68.772]}
        rotation={[Math.PI, -0.049, Math.PI]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251515.geometry}
        material={materials['Color texture']}
        position={[287.323, 0, 72.969]}
        rotation={[0, -1.085, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021516.geometry}
        material={materials['Color texture']}
        position={[283.126, 0, 77.586]}
        rotation={[0, 0.105, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251517.geometry}
        material={materials['Color texture']}
        position={[296.137, 0, 75.907]}
        rotation={[0, 0.762, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021518.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 49.047]}
        rotation={[0, -0.604, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021519.geometry}
        material={materials['Color texture']}
        position={[322.996, 0, 49.887]}
        rotation={[Math.PI, -0.997, Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261520.geometry}
        material={materials['Color texture']}
        position={[329.711, 0, 51.565]}
        rotation={[Math.PI, -0.226, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241521.geometry}
        material={materials['Color texture']}
        position={[335.167, 0, 51.565]}
        rotation={[0, 1.135, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031522.geometry}
        material={materials['Color texture']}
        position={[334.328, 0, 57.861]}
        rotation={[-Math.PI, 1.226, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031523.geometry}
        material={materials['Color texture']}
        position={[330.97, 0, 58.28]}
        rotation={[-Math.PI, 1.304, -Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031524.geometry}
        material={materials['Color texture']}
        position={[322.577, 0, 58.28]}
        rotation={[Math.PI, -1.519, Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031525.geometry}
        material={materials['Color texture']}
        position={[321.318, 0, 61.218]}
        rotation={[0, -0.633, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021526.geometry}
        material={materials['Color texture']}
        position={[317.121, 0, 67.513]}
        rotation={[Math.PI, -1.003, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021527.geometry}
        material={materials['Color texture']}
        position={[320.898, 0, 70.451]}
        rotation={[Math.PI, -0.948, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021528.geometry}
        material={materials['Color texture']}
        position={[317.96, 0, 74.228]}
        rotation={[Math.PI, -1.01, Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021529.geometry}
        material={materials['Color texture']}
        position={[313.344, 0, 71.29]}
        rotation={[0, 1.14, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021530.geometry}
        material={materials['Color texture']}
        position={[311.665, 0, 77.586]}
        rotation={[0, -0.833, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041531.geometry}
        material={materials['Color texture']}
        position={[305.37, 0, 85.979]}
        rotation={[Math.PI, -0.537, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021532.geometry}
        material={materials['Color texture']}
        position={[345.659, 0, 36.457]}
        rotation={[Math.PI, -1.474, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231533.geometry}
        material={materials['Color texture']}
        position={[349.017, 0, 38.135]}
        rotation={[0, 0.552, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261534.geometry}
        material={materials['Color texture']}
        position={[353.213, 0, 32.68]}
        rotation={[0, 1.156, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021535.geometry}
        material={materials['Color texture']}
        position={[356.571, 0, 38.135]}
        rotation={[0, 0.944, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261536.geometry}
        material={materials['Color texture']}
        position={[354.053, 0, 45.69]}
        rotation={[-Math.PI, 0.685, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021537.geometry}
        material={materials['Color texture']}
        position={[350.276, 0, 48.628]}
        rotation={[0, -0.621, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251538.geometry}
        material={materials['Color texture']}
        position={[356.991, 0, 51.565]}
        rotation={[Math.PI, -0.921, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031539.geometry}
        material={materials['Color texture']}
        position={[347.758, 0, 53.244]}
        rotation={[-Math.PI, 0.307, -Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231540.geometry}
        material={materials['Color texture']}
        position={[349.856, 0, 60.379]}
        rotation={[-Math.PI, 0.726, -Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261541.geometry}
        material={materials['Color texture']}
        position={[342.302, 0, 61.218]}
        rotation={[Math.PI, -0.504, Math.PI]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021542.geometry}
        material={materials['Color texture']}
        position={[343.98, 0, 65.415]}
        rotation={[0, 1.384, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231543.geometry}
        material={materials['Color texture']}
        position={[340.203, 0, 68.353]}
        rotation={[Math.PI, -1.019, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251544.geometry}
        material={materials['Color texture']}
        position={[367.063, 0, 41.493]}
        rotation={[0, 0.338, 0]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251545.geometry}
        material={materials['Color texture']}
        position={[369.581, 0, 44.431]}
        rotation={[-Math.PI, 0.018, -Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261546.geometry}
        material={materials['Color texture']}
        position={[365.804, 0, 47.368]}
        rotation={[Math.PI, -0.649, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231547.geometry}
        material={materials['Color texture']}
        position={[370.42, 0, 27.643]}
        rotation={[0, 0.45, 0]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021548.geometry}
        material={materials['Color texture']}
        position={[373.778, 0, 28.902]}
        rotation={[-Math.PI, 0.873, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031549.geometry}
        material={materials['Color texture']}
        position={[370.42, 0, 34.358]}
        rotation={[0, 0.144, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251550.geometry}
        material={materials['Color texture']}
        position={[376.716, 0, 38.135]}
        rotation={[-Math.PI, 1.002, -Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021551.geometry}
        material={materials['Color texture']}
        position={[383.011, 0, 43.591]}
        rotation={[-Math.PI, 1.085, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261552.geometry}
        material={materials['Color texture']}
        position={[380.913, 0, 46.529]}
        rotation={[-Math.PI, 1.082, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041553.geometry}
        material={materials['Color texture']}
        position={[386.368, 0, 49.887]}
        rotation={[0, 0.039, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251554.geometry}
        material={materials['Color texture']}
        position={[376.296, 0, 53.244]}
        rotation={[-Math.PI, 0.64, -Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251555.geometry}
        material={materials['Color texture']}
        position={[374.617, 0, 55.342]}
        rotation={[Math.PI, -1.151, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031556.geometry}
        material={materials['Color texture']}
        position={[368.742, 0, 56.182]}
        rotation={[0, -1.327, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021557.geometry}
        material={materials['Color texture']}
        position={[371.26, 0, 56.601]}
        rotation={[Math.PI, -0.536, Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031558.geometry}
        material={materials['Color texture']}
        position={[380.913, 0, 54.083]}
        rotation={[-Math.PI, 1.105, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251559.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 60.379]}
        rotation={[0, -0.948, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021560.geometry}
        material={materials['Color texture']}
        position={[356.151, 0, 64.995]}
        rotation={[0, 1.568, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251561.geometry}
        material={materials['Color texture']}
        position={[360.768, 0, 64.995]}
        rotation={[0, 1.262, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031562.geometry}
        material={materials['Color texture']}
        position={[359.509, 0, 67.513]}
        rotation={[Math.PI, -0.253, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231563.geometry}
        material={materials['Color texture']}
        position={[349.436, 0, 73.808]}
        rotation={[0, -0.292, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241564.geometry}
        material={materials['Color texture']}
        position={[346.079, 0, 75.907]}
        rotation={[0, 0.694, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251565.geometry}
        material={materials['Color texture']}
        position={[349.436, 0, 77.586]}
        rotation={[0, -0.676, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041566.geometry}
        material={materials['Color texture']}
        position={[339.364, 0, 81.782]}
        rotation={[-Math.PI, 0.27, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021567.geometry}
        material={materials['Color texture']}
        position={[334.328, 0, 79.684]}
        rotation={[Math.PI, -1.311, Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231568.geometry}
        material={materials['Color texture']}
        position={[331.81, 0, 82.202]}
        rotation={[-Math.PI, 0.404, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021569.geometry}
        material={materials['Color texture']}
        position={[325.514, 0, 77.586]}
        rotation={[Math.PI, -0.308, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021570.geometry}
        material={materials['Color texture']}
        position={[324.675, 0, 79.684]}
        rotation={[0, 1.52, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021571.geometry}
        material={materials['Color texture']}
        position={[321.318, 0, 83.041]}
        rotation={[0, 0.073, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261572.geometry}
        material={materials['Color texture']}
        position={[323.836, 0, 84.301]}
        rotation={[0, -1.273, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261573.geometry}
        material={materials['Color texture']}
        position={[317.96, 0, 86.399]}
        rotation={[-Math.PI, 0.881, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021574.geometry}
        material={materials['Color texture']}
        position={[313.763, 0, 92.694]}
        rotation={[-Math.PI, 0.167, -Math.PI]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251575.geometry}
        material={materials['Color texture']}
        position={[296.556, 0, 84.301]}
        rotation={[0, 0.625, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241576.geometry}
        material={materials['Color texture']}
        position={[294.458, 0, 86.399]}
        rotation={[Math.PI, -0.189, Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231577.geometry}
        material={materials['Color texture']}
        position={[295.717, 0, 89.337]}
        rotation={[Math.PI, -1.397, Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241578.geometry}
        material={materials['Color texture']}
        position={[287.323, 0, 90.596]}
        rotation={[0, -0.116, 0]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041579.geometry}
        material={materials['Color texture']}
        position={[282.707, 0, 100.248]}
        rotation={[-Math.PI, 0.183, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241580.geometry}
        material={materials['Color texture']}
        position={[286.904, 0, 104.865]}
        rotation={[0, -1.057, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231581.geometry}
        material={materials['Color texture']}
        position={[289.841, 0, 106.124]}
        rotation={[Math.PI, -0.947, Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021582.geometry}
        material={materials['Color texture']}
        position={[304.95, 0, 95.212]}
        rotation={[-Math.PI, 0.361, -Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031583.geometry}
        material={materials['Color texture']}
        position={[302.432, 0, 96.471]}
        rotation={[0, 1.546, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241584.geometry}
        material={materials['Color texture']}
        position={[306.209, 0, 99.409]}
        rotation={[0, 1.346, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231585.geometry}
        material={materials['Color texture']}
        position={[300.333, 0, 102.347]}
        rotation={[0, -0.475, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251586.geometry}
        material={materials['Color texture']}
        position={[295.717, 0, 99.829]}
        rotation={[-Math.PI, 1.464, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231587.geometry}
        material={materials['Color texture']}
        position={[336.426, 0, 85.14]}
        rotation={[0, 1.44, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261588.geometry}
        material={materials['Color texture']}
        position={[331.81, 0, 88.497]}
        rotation={[Math.PI, -1.53, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261589.geometry}
        material={materials['Color texture']}
        position={[396.021, 0, 55.762]}
        rotation={[0, 1.248, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021590.geometry}
        material={materials['Color texture']}
        position={[393.503, 0, 58.28]}
        rotation={[-Math.PI, 0.459, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261591.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 61.638]}
        rotation={[-Math.PI, 0.331, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021592.geometry}
        material={materials['Color texture']}
        position={[389.306, 0, 62.897]}
        rotation={[-Math.PI, 1.522, -Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251593.geometry}
        material={materials['Color texture']}
        position={[384.27, 0, 65.415]}
        rotation={[Math.PI, -1.56, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261594.geometry}
        material={materials['Color texture']}
        position={[376.296, 0, 62.897]}
        rotation={[0, 0.105, 0]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241595.geometry}
        material={materials['Color texture']}
        position={[377.555, 0, 71.71]}
        rotation={[0, -1.177, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041596.geometry}
        material={materials['Color texture']}
        position={[373.358, 0, 73.389]}
        rotation={[Math.PI, -1.43, Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231597.geometry}
        material={materials['Color texture']}
        position={[382.172, 0, 77.166]}
        rotation={[0, -0.619, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041598.geometry}
        material={materials['Color texture']}
        position={[366.643, 0, 71.71]}
        rotation={[Math.PI, -1.364, Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261599.geometry}
        material={materials['Color texture']}
        position={[409.031, 0, 62.057]}
        rotation={[-Math.PI, 0.973, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041600.geometry}
        material={materials['Color texture']}
        position={[406.093, 0, 66.254]}
        rotation={[0, 0.294, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041601.geometry}
        material={materials['Color texture']}
        position={[399.379, 0, 69.192]}
        rotation={[Math.PI, -1.286, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261602.geometry}
        material={materials['Color texture']}
        position={[404.415, 0, 70.871]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261603.geometry}
        material={materials['Color texture']}
        position={[408.612, 0, 72.549]}
        rotation={[Math.PI, -0.787, Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021604.geometry}
        material={materials['Color texture']}
        position={[414.487, 0, 69.192]}
        rotation={[0, -0.043, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021605.geometry}
        material={materials['Color texture']}
        position={[415.746, 0, 80.104]}
        rotation={[0, -0.57, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231606.geometry}
        material={materials['Color texture']}
        position={[412.808, 0, 82.622]}
        rotation={[0, 0.197, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241607.geometry}
        material={materials['Color texture']}
        position={[415.746, 0, 85.979]}
        rotation={[Math.PI, -1.025, Math.PI]}
        scale={0.84}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241608.geometry}
        material={materials['Color texture']}
        position={[405.254, 0, 88.497]}
        rotation={[Math.PI, -0.346, Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231609.geometry}
        material={materials['Color texture']}
        position={[391.824, 0, 72.549]}
        rotation={[0, -1.038, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241610.geometry}
        material={materials['Color texture']}
        position={[390.146, 0, 76.327]}
        rotation={[-Math.PI, 0.397, -Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031611.geometry}
        material={materials['Color texture']}
        position={[395.601, 0, 76.746]}
        rotation={[Math.PI, -1.421, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231612.geometry}
        material={materials['Color texture']}
        position={[387.627, 0, 85.14]}
        rotation={[Math.PI, -0.999, Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021613.geometry}
        material={materials['Color texture']}
        position={[385.109, 0, 91.855]}
        rotation={[0, 0.237, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251614.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 88.497]}
        rotation={[0, -0.566, 0]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021615.geometry}
        material={materials['Color texture']}
        position={[404.415, 0, 78.425]}
        rotation={[0, -0.477, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021616.geometry}
        material={materials['Color texture']}
        position={[411.549, 0, 94.373]}
        rotation={[-Math.PI, 0.407, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241617.geometry}
        material={materials['Color texture']}
        position={[407.772, 0, 96.052]}
        rotation={[Math.PI, -1.32, Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021618.geometry}
        material={materials['Color texture']}
        position={[411.969, 0, 98.989]}
        rotation={[0, 1.105, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021619.geometry}
        material={materials['Color texture']}
        position={[398.959, 0, 95.212]}
        rotation={[Math.PI, -0.078, Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251620.geometry}
        material={materials['Color texture']}
        position={[396.441, 0, 96.471]}
        rotation={[0, -0.285, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231621.geometry}
        material={materials['Color texture']}
        position={[398.959, 0, 101.508]}
        rotation={[-Math.PI, 0.85, -Math.PI]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021622.geometry}
        material={materials['Color texture']}
        position={[405.674, 0, 104.865]}
        rotation={[0, 0.351, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241623.geometry}
        material={materials['Color texture']}
        position={[404.834, 0, 108.222]}
        rotation={[Math.PI, -0.227, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021624.geometry}
        material={materials['Color texture']}
        position={[408.612, 0, 109.481]}
        rotation={[0, 0.722, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261625.geometry}
        material={materials['Color texture']}
        position={[417.005, 0, 105.704]}
        rotation={[-Math.PI, 0.909, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041626.geometry}
        material={materials['Color texture']}
        position={[437.57, 0, 89.337]}
        rotation={[0, 1.035, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021627.geometry}
        material={materials['Color texture']}
        position={[367.483, 0, 80.523]}
        rotation={[-Math.PI, 0.99, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261628.geometry}
        material={materials['Color texture']}
        position={[365.804, 0, 85.979]}
        rotation={[0, -0.386, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241629.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 85.14]}
        rotation={[Math.PI, -1.229, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261630.geometry}
        material={materials['Color texture']}
        position={[350.276, 0, 89.337]}
        rotation={[Math.PI, -0.836, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251631.geometry}
        material={materials['Color texture']}
        position={[355.732, 0, 89.756]}
        rotation={[0, -0.768, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261632.geometry}
        material={materials['Color texture']}
        position={[344.82, 0, 87.238]}
        rotation={[0, 0.007, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241633.geometry}
        material={materials['Color texture']}
        position={[369.161, 0, 92.694]}
        rotation={[Math.PI, -1.189, Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231634.geometry}
        material={materials['Color texture']}
        position={[372.939, 0, 93.534]}
        rotation={[-Math.PI, 1.246, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241635.geometry}
        material={materials['Color texture']}
        position={[372.099, 0, 99.829]}
        rotation={[Math.PI, -1.307, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261636.geometry}
        material={materials['Color texture']}
        position={[378.814, 0, 97.73]}
        rotation={[0, -0.335, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021637.geometry}
        material={materials['Color texture']}
        position={[386.368, 0, 100.668]}
        rotation={[0, 0.021, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021638.geometry}
        material={materials['Color texture']}
        position={[384.27, 0, 104.445]}
        rotation={[-Math.PI, 1.479, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261639.geometry}
        material={materials['Color texture']}
        position={[390.565, 0, 104.865]}
        rotation={[0, -0.026, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241640.geometry}
        material={materials['Color texture']}
        position={[397.7, 0, 108.222]}
        rotation={[0, -1.078, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041641.geometry}
        material={materials['Color texture']}
        position={[395.182, 0, 113.678]}
        rotation={[0, 1.545, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231642.geometry}
        material={materials['Color texture']}
        position={[390.565, 0, 117.036]}
        rotation={[0, 0.995, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021643.geometry}
        material={materials['Color texture']}
        position={[383.011, 0, 112]}
        rotation={[0, -0.11, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241644.geometry}
        material={materials['Color texture']}
        position={[385.529, 0, 115.357]}
        rotation={[Math.PI, -0.827, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251645.geometry}
        material={materials['Color texture']}
        position={[380.913, 0, 117.875]}
        rotation={[Math.PI, -0.951, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021646.geometry}
        material={materials['Color texture']}
        position={[381.332, 0, 124.59]}
        rotation={[-Math.PI, 0.11, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241647.geometry}
        material={materials['Color texture']}
        position={[368.322, 0, 108.222]}
        rotation={[0, -0.035, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231648.geometry}
        material={materials['Color texture']}
        position={[370.42, 0, 137.6]}
        rotation={[-Math.PI, 0.15, -Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031649.geometry}
        material={materials['Color texture']}
        position={[411.969, 0, 117.875]}
        rotation={[0, -0.191, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041650.geometry}
        material={materials['Color texture']}
        position={[360.768, 0, 96.052]}
        rotation={[-Math.PI, 0.686, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041651.geometry}
        material={materials['Color texture']}
        position={[362.866, 0, 98.15]}
        rotation={[0, -1.16, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021652.geometry}
        material={materials['Color texture']}
        position={[359.509, 0, 100.248]}
        rotation={[Math.PI, -0.169, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231653.geometry}
        material={materials['Color texture']}
        position={[327.193, 0, 95.212]}
        rotation={[-Math.PI, 0.391, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031654.geometry}
        material={materials['Color texture']}
        position={[324.675, 0, 97.311]}
        rotation={[0, -1.053, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261655.geometry}
        material={materials['Color texture']}
        position={[328.872, 0, 99.409]}
        rotation={[0, 0.955, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031656.geometry}
        material={materials['Color texture']}
        position={[318.799, 0, 102.347]}
        rotation={[Math.PI, -0.425, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021657.geometry}
        material={materials['Color texture']}
        position={[315.022, 0, 104.865]}
        rotation={[Math.PI, -1.005, Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041658.geometry}
        material={materials['Color texture']}
        position={[320.059, 0, 107.383]}
        rotation={[0, -0.821, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251659.geometry}
        material={materials['Color texture']}
        position={[315.442, 0, 109.062]}
        rotation={[0, 0.055, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041660.geometry}
        material={materials['Color texture']}
        position={[310.826, 0, 107.803]}
        rotation={[0, -0.466, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041661.geometry}
        material={materials['Color texture']}
        position={[325.095, 0, 107.803]}
        rotation={[0, 1.492, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241662.geometry}
        material={materials['Color texture']}
        position={[315.862, 0, 114.098]}
        rotation={[Math.PI, -0.107, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021663.geometry}
        material={materials['Color texture']}
        position={[303.271, 0, 109.481]}
        rotation={[0, -0.098, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231664.geometry}
        material={materials['Color texture']}
        position={[300.333, 0, 111.16]}
        rotation={[0, -1.243, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021665.geometry}
        material={materials['Color texture']}
        position={[305.37, 0, 114.518]}
        rotation={[0, 0.712, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021666.geometry}
        material={materials['Color texture']}
        position={[300.753, 0, 115.777]}
        rotation={[0, 1.262, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021667.geometry}
        material={materials['Color texture']}
        position={[296.556, 0, 117.455]}
        rotation={[Math.PI, -0.053, Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041668.geometry}
        material={materials['Color texture']}
        position={[289.422, 0, 116.616]}
        rotation={[-Math.PI, 0.268, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031669.geometry}
        material={materials['Color texture']}
        position={[287.323, 0, 123.751]}
        rotation={[0, -0.596, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021670.geometry}
        material={materials['Color texture']}
        position={[290.261, 0, 132.984]}
        rotation={[-Math.PI, 0.603, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031671.geometry}
        material={materials['Color texture']}
        position={[299.494, 0, 124.59]}
        rotation={[0, 1.391, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021672.geometry}
        material={materials['Color texture']}
        position={[301.173, 0, 126.688]}
        rotation={[0, -1.422, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041673.geometry}
        material={materials['Color texture']}
        position={[298.235, 0, 129.626]}
        rotation={[Math.PI, -0.818, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241674.geometry}
        material={materials['Color texture']}
        position={[305.789, 0, 133.403]}
        rotation={[0, -0.904, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041675.geometry}
        material={materials['Color texture']}
        position={[293.199, 0, 126.269]}
        rotation={[-Math.PI, 0.23, -Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231676.geometry}
        material={materials['Color texture']}
        position={[318.799, 0, 121.233]}
        rotation={[0, 1.206, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231677.geometry}
        material={materials['Color texture']}
        position={[320.898, 0, 123.751]}
        rotation={[-Math.PI, 1.214, -Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021678.geometry}
        material={materials['Color texture']}
        position={[317.54, 0, 125.849]}
        rotation={[Math.PI, -0.269, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021679.geometry}
        material={materials['Color texture']}
        position={[311.245, 0, 122.911]}
        rotation={[0, -0.018, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031680.geometry}
        material={materials['Color texture']}
        position={[313.763, 0, 133.403]}
        rotation={[Math.PI, -0.127, Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021681.geometry}
        material={materials['Color texture']}
        position={[317.121, 0, 136.341]}
        rotation={[-Math.PI, 0.266, -Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041682.geometry}
        material={materials['Color texture']}
        position={[340.203, 0, 96.052]}
        rotation={[0, 0.821, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031683.geometry}
        material={materials['Color texture']}
        position={[343.561, 0, 97.311]}
        rotation={[-Math.PI, 1.325, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231684.geometry}
        material={materials['Color texture']}
        position={[340.623, 0, 99.829]}
        rotation={[-Math.PI, 0.605, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021685.geometry}
        material={materials['Color texture']}
        position={[349.856, 0, 101.508]}
        rotation={[Math.PI, -0.459, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251686.geometry}
        material={materials['Color texture']}
        position={[347.758, 0, 104.026]}
        rotation={[Math.PI, -1.21, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261687.geometry}
        material={materials['Color texture']}
        position={[351.535, 0, 106.124]}
        rotation={[0, 0.198, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251688.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 108.642]}
        rotation={[Math.PI, -1.101, Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261689.geometry}
        material={materials['Color texture']}
        position={[356.151, 0, 110.741]}
        rotation={[Math.PI, -0.296, Math.PI]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261690.geometry}
        material={materials['Color texture']}
        position={[361.187, 0, 113.259]}
        rotation={[-Math.PI, 0.199, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241691.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 117.875]}
        rotation={[0, 1.487, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021692.geometry}
        material={materials['Color texture']}
        position={[368.322, 0, 117.875]}
        rotation={[0, 1.216, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231693.geometry}
        material={materials['Color texture']}
        position={[376.716, 0, 106.124]}
        rotation={[0, -0.836, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251694.geometry}
        material={materials['Color texture']}
        position={[372.099, 0, 119.554]}
        rotation={[-Math.PI, 1.265, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251695.geometry}
        material={materials['Color texture']}
        position={[374.617, 0, 122.492]}
        rotation={[Math.PI, -0.028, Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041696.geometry}
        material={materials['Color texture']}
        position={[369.161, 0, 123.751]}
        rotation={[0, -0.655, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241697.geometry}
        material={materials['Color texture']}
        position={[369.161, 0, 129.207]}
        rotation={[-Math.PI, 1.104, -Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261698.geometry}
        material={materials['Color texture']}
        position={[361.607, 0, 132.564]}
        rotation={[Math.PI, -0.501, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021699.geometry}
        material={materials['Color texture']}
        position={[361.607, 0, 121.233]}
        rotation={[0, 1.549, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021700.geometry}
        material={materials['Color texture']}
        position={[358.25, 0, 124.59]}
        rotation={[0, -0.495, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231701.geometry}
        material={materials['Color texture']}
        position={[335.167, 0, 107.803]}
        rotation={[Math.PI, -0.587, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041702.geometry}
        material={materials['Color texture']}
        position={[337.266, 0, 109.481]}
        rotation={[Math.PI, -1.114, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041703.geometry}
        material={materials['Color texture']}
        position={[334.747, 0, 114.518]}
        rotation={[Math.PI, -1.142, Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261704.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 112.839]}
        rotation={[0, -1.065, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241705.geometry}
        material={materials['Color texture']}
        position={[348.597, 0, 114.098]}
        rotation={[0, -0.222, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031706.geometry}
        material={materials['Color texture']}
        position={[345.659, 0, 116.196]}
        rotation={[0, 1.019, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231707.geometry}
        material={materials['Color texture']}
        position={[339.784, 0, 121.233]}
        rotation={[0, -1.526, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261708.geometry}
        material={materials['Color texture']}
        position={[332.229, 0, 124.59]}
        rotation={[Math.PI, -1.274, Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021709.geometry}
        material={materials['Color texture']}
        position={[328.033, 0, 129.207]}
        rotation={[0, -1.155, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031710.geometry}
        material={materials['Color texture']}
        position={[332.229, 0, 131.305]}
        rotation={[0, -0.476, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261711.geometry}
        material={materials['Color texture']}
        position={[323.416, 0, 136.761]}
        rotation={[-Math.PI, 0.112, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231712.geometry}
        material={materials['Color texture']}
        position={[325.934, 0, 139.279]}
        rotation={[0, 1.459, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241713.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 137.6]}
        rotation={[Math.PI, -0.644, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021714.geometry}
        material={materials['Color texture']}
        position={[326.354, 0, 134.243]}
        rotation={[Math.PI, -1.543, Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241715.geometry}
        material={materials['Color texture']}
        position={[334.328, 0, 132.144]}
        rotation={[Math.PI, -0.399, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251716.geometry}
        material={materials['Color texture']}
        position={[335.167, 0, 127.108]}
        rotation={[Math.PI, -0.82, Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031717.geometry}
        material={materials['Color texture']}
        position={[324.255, 0, 146.833]}
        rotation={[0, 1.184, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251718.geometry}
        material={materials['Color texture']}
        position={[322.996, 0, 151.03]}
        rotation={[0, 1.031, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261719.geometry}
        material={materials['Color texture']}
        position={[325.095, 0, 152.289]}
        rotation={[-Math.PI, 0.327, -Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021720.geometry}
        material={materials['Color texture']}
        position={[330.551, 0, 147.253]}
        rotation={[0, -0.713, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021721.geometry}
        material={materials['Color texture']}
        position={[335.167, 0, 140.958]}
        rotation={[0, 0.7, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261722.geometry}
        material={materials['Color texture']}
        position={[351.535, 0, 128.787]}
        rotation={[Math.PI, -1.153, Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241723.geometry}
        material={materials['Color texture']}
        position={[346.918, 0, 131.305]}
        rotation={[0, 1.028, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251724.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 136.341]}
        rotation={[0, 0.755, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041725.geometry}
        material={materials['Color texture']}
        position={[349.436, 0, 133.823]}
        rotation={[Math.PI, -0.571, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041726.geometry}
        material={materials['Color texture']}
        position={[346.918, 0, 138.44]}
        rotation={[-Math.PI, 0.876, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031727.geometry}
        material={materials['Color texture']}
        position={[356.571, 0, 135.502]}
        rotation={[Math.PI, -0.091, Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241728.geometry}
        material={materials['Color texture']}
        position={[340.203, 0, 144.315]}
        rotation={[0, 0.244, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231729.geometry}
        material={materials['Color texture']}
        position={[324.255, 0, 116.196]}
        rotation={[0, 0.355, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021730.geometry}
        material={materials['Color texture']}
        position={[330.551, 0, 109.481]}
        rotation={[-Math.PI, 0.42, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021731.geometry}
        material={materials['Color texture']}
        position={[320.478, 0, 92.274]}
        rotation={[Math.PI, -0.673, Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021732.geometry}
        material={materials['Color texture']}
        position={[260.883, 0, 97.73]}
        rotation={[-Math.PI, 1.326, -Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251733.geometry}
        material={materials['Color texture']}
        position={[270.116, 0, 98.57]}
        rotation={[Math.PI, -1.546, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041734.geometry}
        material={materials['Color texture']}
        position={[275.152, 0, 105.285]}
        rotation={[0, 0.154, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041735.geometry}
        material={materials['Color texture']}
        position={[270.536, 0, 106.963]}
        rotation={[Math.PI, -1, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231736.geometry}
        material={materials['Color texture']}
        position={[261.723, 0, 109.481]}
        rotation={[-Math.PI, 0.729, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021737.geometry}
        material={materials['Color texture']}
        position={[264.241, 0, 114.098]}
        rotation={[0, 0.932, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261738.geometry}
        material={materials['Color texture']}
        position={[257.945, 0, 114.098]}
        rotation={[-Math.PI, 0.082, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041739.geometry}
        material={materials['Color texture']}
        position={[252.07, 0, 114.937]}
        rotation={[0, -1.155, 0]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041740.geometry}
        material={materials['Color texture']}
        position={[256.686, 0, 102.767]}
        rotation={[0, -0.581, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231741.geometry}
        material={materials['Color texture']}
        position={[254.168, 0, 122.911]}
        rotation={[Math.PI, -0.03, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021742.geometry}
        material={materials['Color texture']}
        position={[255.427, 0, 123.751]}
        rotation={[-Math.PI, 0.265, -Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021743.geometry}
        material={materials['Color texture']}
        position={[254.168, 0, 126.688]}
        rotation={[Math.PI, -0.574, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261744.geometry}
        material={materials['Color texture']}
        position={[266.339, 0, 120.393]}
        rotation={[0, 0.934, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251745.geometry}
        material={materials['Color texture']}
        position={[280.608, 0, 114.937]}
        rotation={[0, 0.795, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231746.geometry}
        material={materials['Color texture']}
        position={[278.51, 0, 116.616]}
        rotation={[0, -1.254, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251747.geometry}
        material={materials['Color texture']}
        position={[279.769, 0, 121.652]}
        rotation={[Math.PI, -0.576, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251748.geometry}
        material={materials['Color texture']}
        position={[271.795, 0, 122.072]}
        rotation={[-Math.PI, 0.896, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231749.geometry}
        material={materials['Color texture']}
        position={[275.152, 0, 128.787]}
        rotation={[0, -0.883, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031750.geometry}
        material={materials['Color texture']}
        position={[272.215, 0, 131.725]}
        rotation={[Math.PI, -0.816, Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021751.geometry}
        material={materials['Color texture']}
        position={[267.598, 0, 135.922]}
        rotation={[0, 1.204, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261752.geometry}
        material={materials['Color texture']}
        position={[280.608, 0, 133.403]}
        rotation={[0, 0.248, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261753.geometry}
        material={materials['Color texture']}
        position={[266.759, 0, 143.056]}
        rotation={[0, 0.898, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021754.geometry}
        material={materials['Color texture']}
        position={[259.624, 0, 128.367]}
        rotation={[0, 0.055, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261755.geometry}
        material={materials['Color texture']}
        position={[258.785, 0, 119.134]}
        rotation={[Math.PI, -0.421, Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251756.geometry}
        material={materials['Color texture']}
        position={[274.313, 0, 142.217]}
        rotation={[-Math.PI, 0.865, -Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031757.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 140.118]}
        rotation={[-Math.PI, 0.594, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241758.geometry}
        material={materials['Color texture']}
        position={[293.199, 0, 139.699]}
        rotation={[0, -0.812, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021759.geometry}
        material={materials['Color texture']}
        position={[288.163, 0, 144.735]}
        rotation={[-Math.PI, 1.562, -Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251760.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, 146.833]}
        rotation={[0, 0.114, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241761.geometry}
        material={materials['Color texture']}
        position={[289.002, 0, 147.673]}
        rotation={[-Math.PI, 1.066, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041762.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, 151.869]}
        rotation={[0, -0.185, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021763.geometry}
        material={materials['Color texture']}
        position={[276.412, 0, 147.673]}
        rotation={[Math.PI, -1.18, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251764.geometry}
        material={materials['Color texture']}
        position={[307.888, 0, 140.538]}
        rotation={[-Math.PI, 0.977, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251765.geometry}
        material={materials['Color texture']}
        position={[325.934, 0, 163.621]}
        rotation={[0, -1.327, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231766.geometry}
        material={materials['Color texture']}
        position={[312.085, 0, 152.289]}
        rotation={[Math.PI, -0.127, Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241767.geometry}
        material={materials['Color texture']}
        position={[308.727, 0, 153.968]}
        rotation={[-Math.PI, 0.582, -Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031768.geometry}
        material={materials['Color texture']}
        position={[295.297, 0, 146.414]}
        rotation={[Math.PI, -0.458, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031769.geometry}
        material={materials['Color texture']}
        position={[298.235, 0, 147.673]}
        rotation={[-Math.PI, 0.847, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241770.geometry}
        material={materials['Color texture']}
        position={[295.297, 0, 151.45]}
        rotation={[-Math.PI, 1.531, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031771.geometry}
        material={materials['Color texture']}
        position={[302.012, 0, 151.45]}
        rotation={[Math.PI, -1.225, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041772.geometry}
        material={materials['Color texture']}
        position={[298.655, 0, 158.584]}
        rotation={[Math.PI, -0.264, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031773.geometry}
        material={materials['Color texture']}
        position={[294.038, 0, 159.424]}
        rotation={[0, 1.025, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261774.geometry}
        material={materials['Color texture']}
        position={[296.137, 0, 162.362]}
        rotation={[0, -0.783, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021775.geometry}
        material={materials['Color texture']}
        position={[302.012, 0, 162.781]}
        rotation={[-Math.PI, 0.722, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261776.geometry}
        material={materials['Color texture']}
        position={[314.183, 0, 161.942]}
        rotation={[0, 0.928, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021777.geometry}
        material={materials['Color texture']}
        position={[308.307, 0, 164.88]}
        rotation={[0, 1.047, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251778.geometry}
        material={materials['Color texture']}
        position={[301.592, 0, 175.372]}
        rotation={[0, 1.33, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231779.geometry}
        material={materials['Color texture']}
        position={[291.94, 0, 169.916]}
        rotation={[0, 0.118, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021780.geometry}
        material={materials['Color texture']}
        position={[294.878, 0, 172.854]}
        rotation={[Math.PI, -0.213, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021781.geometry}
        material={materials['Color texture']}
        position={[291.1, 0, 178.729]}
        rotation={[Math.PI, -1.338, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261782.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 192.998]}
        rotation={[0, -1.365, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021783.geometry}
        material={materials['Color texture']}
        position={[288.582, 0, 188.802]}
        rotation={[-Math.PI, 1.447, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231784.geometry}
        material={materials['Color texture']}
        position={[295.717, 0, 184.605]}
        rotation={[-Math.PI, 0.748, -Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261785.geometry}
        material={materials['Color texture']}
        position={[294.038, 0, 186.703]}
        rotation={[Math.PI, -1.013, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021786.geometry}
        material={materials['Color texture']}
        position={[290.261, 0, 196.356]}
        rotation={[0, 1.202, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021787.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 200.133]}
        rotation={[0, 0.554, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231788.geometry}
        material={materials['Color texture']}
        position={[283.966, 0, 201.392]}
        rotation={[Math.PI, -1.119, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251789.geometry}
        material={materials['Color texture']}
        position={[313.763, 0, 171.175]}
        rotation={[-Math.PI, 0.678, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261790.geometry}
        material={materials['Color texture']}
        position={[320.898, 0, 165.719]}
        rotation={[Math.PI, -0.993, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251791.geometry}
        material={materials['Color texture']}
        position={[323.416, 0, 169.496]}
        rotation={[0, 0.574, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251792.geometry}
        material={materials['Color texture']}
        position={[319.219, 0, 177.89]}
        rotation={[-Math.PI, 0.91, -Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231793.geometry}
        material={materials['Color texture']}
        position={[321.318, 0, 180.828]}
        rotation={[Math.PI, -0.897, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241794.geometry}
        material={materials['Color texture']}
        position={[324.255, 0, 187.542]}
        rotation={[0, -0.095, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021795.geometry}
        material={materials['Color texture']}
        position={[320.478, 0, 190.061]}
        rotation={[Math.PI, -0.709, Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261796.geometry}
        material={materials['Color texture']}
        position={[302.432, 0, 185.024]}
        rotation={[Math.PI, -0.665, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261797.geometry}
        material={materials['Color texture']}
        position={[310.406, 0, 180.408]}
        rotation={[Math.PI, -1.412, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031798.geometry}
        material={materials['Color texture']}
        position={[312.924, 0, 182.506]}
        rotation={[0, 1.254, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241799.geometry}
        material={materials['Color texture']}
        position={[309.566, 0, 187.123]}
        rotation={[0, 1.279, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021800.geometry}
        material={materials['Color texture']}
        position={[315.022, 0, 190.48]}
        rotation={[-Math.PI, 0.715, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251801.geometry}
        material={materials['Color texture']}
        position={[304.95, 0, 193.838]}
        rotation={[0, -1.292, 0]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021802.geometry}
        material={materials['Color texture']}
        position={[301.592, 0, 197.195]}
        rotation={[0, 0.081, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031803.geometry}
        material={materials['Color texture']}
        position={[311.245, 0, 197.195]}
        rotation={[-Math.PI, 1.4, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241804.geometry}
        material={materials['Color texture']}
        position={[294.878, 0, 205.589]}
        rotation={[0, 1.175, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021805.geometry}
        material={materials['Color texture']}
        position={[298.655, 0, 207.268]}
        rotation={[Math.PI, -1.086, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231806.geometry}
        material={materials['Color texture']}
        position={[292.359, 0, 211.884]}
        rotation={[0, -1.359, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231807.geometry}
        material={materials['Color texture']}
        position={[286.064, 0, 210.205]}
        rotation={[Math.PI, -1.343, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241808.geometry}
        material={materials['Color texture']}
        position={[282.707, 0, 219.438]}
        rotation={[Math.PI, -0.939, Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021809.geometry}
        material={materials['Color texture']}
        position={[288.582, 0, 218.599]}
        rotation={[-Math.PI, 0.377, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041810.geometry}
        material={materials['Color texture']}
        position={[304.95, 0, 201.812]}
        rotation={[0, -1.514, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031811.geometry}
        material={materials['Color texture']}
        position={[433.793, 0, 106.963]}
        rotation={[Math.PI, -0.895, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241812.geometry}
        material={materials['Color texture']}
        position={[434.632, 0, 109.901]}
        rotation={[Math.PI, -1.41, Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261813.geometry}
        material={materials['Color texture']}
        position={[439.668, 0, 112]}
        rotation={[0, 0.754, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251814.geometry}
        material={materials['Color texture']}
        position={[448.062, 0, 119.134]}
        rotation={[0, -0.859, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231815.geometry}
        material={materials['Color texture']}
        position={[457.714, 0, 122.072]}
        rotation={[0, -1.251, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041816.geometry}
        material={materials['Color texture']}
        position={[454.357, 0, 126.269]}
        rotation={[0, -0.685, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251817.geometry}
        material={materials['Color texture']}
        position={[458.134, 0, 127.108]}
        rotation={[Math.PI, -1.383, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241818.geometry}
        material={materials['Color texture']}
        position={[451.839, 0, 130.885]}
        rotation={[0, -1.011, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241819.geometry}
        material={materials['Color texture']}
        position={[428.756, 0, 112.419]}
        rotation={[-Math.PI, 0.183, -Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251820.geometry}
        material={materials['Color texture']}
        position={[424.979, 0, 114.937]}
        rotation={[-Math.PI, 0.592, -Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261821.geometry}
        material={materials['Color texture']}
        position={[430.435, 0, 118.295]}
        rotation={[0, -0.168, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021822.geometry}
        material={materials['Color texture']}
        position={[435.891, 0, 121.233]}
        rotation={[0, -1.172, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241823.geometry}
        material={materials['Color texture']}
        position={[437.989, 0, 128.787]}
        rotation={[0, 0.332, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241824.geometry}
        material={materials['Color texture']}
        position={[431.694, 0, 130.046]}
        rotation={[0, -0.867, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241825.geometry}
        material={materials['Color texture']}
        position={[434.632, 0, 133.403]}
        rotation={[-Math.PI, 0.921, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031826.geometry}
        material={materials['Color texture']}
        position={[440.088, 0, 132.564]}
        rotation={[-Math.PI, 0.552, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231827.geometry}
        material={materials['Color texture']}
        position={[444.704, 0, 126.688]}
        rotation={[-Math.PI, 0.858, -Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031828.geometry}
        material={materials['Color texture']}
        position={[432.953, 0, 139.699]}
        rotation={[Math.PI, -1.223, Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261829.geometry}
        material={materials['Color texture']}
        position={[440.507, 0, 140.958]}
        rotation={[Math.PI, -1.222, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031830.geometry}
        material={materials['Color texture']}
        position={[425.399, 0, 147.253]}
        rotation={[0, 0.874, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251831.geometry}
        material={materials['Color texture']}
        position={[423.72, 0, 124.59]}
        rotation={[Math.PI, -0.418, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041832.geometry}
        material={materials['Color texture']}
        position={[418.264, 0, 125.429]}
        rotation={[Math.PI, -0.777, Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021833.geometry}
        material={materials['Color texture']}
        position={[423.3, 0, 130.046]}
        rotation={[-Math.PI, 0.859, -Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031834.geometry}
        material={materials['Color texture']}
        position={[420.363, 0, 131.305]}
        rotation={[Math.PI, -1.28, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241835.geometry}
        material={materials['Color texture']}
        position={[424.14, 0, 135.922]}
        rotation={[Math.PI, -0.684, Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021836.geometry}
        material={materials['Color texture']}
        position={[419.943, 0, 140.958]}
        rotation={[0, 0.946, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021837.geometry}
        material={materials['Color texture']}
        position={[411.13, 0, 137.6]}
        rotation={[Math.PI, -1.098, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021838.geometry}
        material={materials['Color texture']}
        position={[404.415, 0, 122.492]}
        rotation={[0, 0.192, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241839.geometry}
        material={materials['Color texture']}
        position={[396.441, 0, 127.948]}
        rotation={[0, 1.566, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251840.geometry}
        material={materials['Color texture']}
        position={[398.539, 0, 130.046]}
        rotation={[-Math.PI, 0.995, -Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031841.geometry}
        material={materials['Color texture']}
        position={[395.601, 0, 132.984]}
        rotation={[0, 0.469, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261842.geometry}
        material={materials['Color texture']}
        position={[400.638, 0, 135.502]}
        rotation={[0, 1.431, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261843.geometry}
        material={materials['Color texture']}
        position={[405.674, 0, 144.735]}
        rotation={[0, 0.21, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031844.geometry}
        material={materials['Color texture']}
        position={[414.067, 0, 147.253]}
        rotation={[0, 0.695, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251845.geometry}
        material={materials['Color texture']}
        position={[414.067, 0, 138.02]}
        rotation={[-Math.PI, 0.668, -Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231846.geometry}
        material={materials['Color texture']}
        position={[405.674, 0, 129.207]}
        rotation={[-Math.PI, 1.421, -Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031847.geometry}
        material={materials['Color texture']}
        position={[411.13, 0, 150.191]}
        rotation={[0, 1.487, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261848.geometry}
        material={materials['Color texture']}
        position={[415.326, 0, 153.968]}
        rotation={[0, 0.07, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231849.geometry}
        material={materials['Color texture']}
        position={[419.523, 0, 148.512]}
        rotation={[0, -0.213, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041850.geometry}
        material={materials['Color texture']}
        position={[402.736, 0, 158.584]}
        rotation={[Math.PI, -1.145, Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241851.geometry}
        material={materials['Color texture']}
        position={[399.798, 0, 150.61]}
        rotation={[-Math.PI, 0.81, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031852.geometry}
        material={materials['Color texture']}
        position={[394.762, 0, 141.377]}
        rotation={[Math.PI, -0.874, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021853.geometry}
        material={materials['Color texture']}
        position={[391.824, 0, 144.315]}
        rotation={[Math.PI, -0.307, Math.PI]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241854.geometry}
        material={materials['Color texture']}
        position={[389.306, 0, 138.02]}
        rotation={[0, -0.372, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261855.geometry}
        material={materials['Color texture']}
        position={[382.172, 0, 135.082]}
        rotation={[0, 0.42, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261856.geometry}
        material={materials['Color texture']}
        position={[379.234, 0, 137.6]}
        rotation={[Math.PI, -1.286, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031857.geometry}
        material={materials['Color texture']}
        position={[382.591, 0, 140.538]}
        rotation={[0, 0.928, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031858.geometry}
        material={materials['Color texture']}
        position={[378.814, 0, 152.709]}
        rotation={[0, 1.334, 0]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231859.geometry}
        material={materials['Color texture']}
        position={[384.27, 0, 147.253]}
        rotation={[Math.PI, -0.246, Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231860.geometry}
        material={materials['Color texture']}
        position={[391.824, 0, 156.906]}
        rotation={[0, 1.355, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041861.geometry}
        material={materials['Color texture']}
        position={[388.467, 0, 159.004]}
        rotation={[-Math.PI, 1.016, -Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021862.geometry}
        material={materials['Color texture']}
        position={[381.752, 0, 158.584]}
        rotation={[Math.PI, -0.985, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021863.geometry}
        material={materials['Color texture']}
        position={[372.099, 0, 146.833]}
        rotation={[-Math.PI, 1.024, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041864.geometry}
        material={materials['Color texture']}
        position={[368.742, 0, 147.673]}
        rotation={[-Math.PI, 1.188, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241865.geometry}
        material={materials['Color texture']}
        position={[372.519, 0, 151.45]}
        rotation={[-Math.PI, 0.692, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241866.geometry}
        material={materials['Color texture']}
        position={[367.063, 0, 152.709]}
        rotation={[-Math.PI, 0.191, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021867.geometry}
        material={materials['Color texture']}
        position={[364.545, 0, 146.833]}
        rotation={[Math.PI, -0.133, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261868.geometry}
        material={materials['Color texture']}
        position={[369.581, 0, 156.906]}
        rotation={[0, 0.839, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231869.geometry}
        material={materials['Color texture']}
        position={[374.198, 0, 161.102]}
        rotation={[0, 1.012, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231870.geometry}
        material={materials['Color texture']}
        position={[366.643, 0, 164.88]}
        rotation={[0, -0.028, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231871.geometry}
        material={materials['Color texture']}
        position={[356.151, 0, 142.636]}
        rotation={[Math.PI, -0.07, Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231872.geometry}
        material={materials['Color texture']}
        position={[347.758, 0, 149.351]}
        rotation={[Math.PI, -0.007, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041873.geometry}
        material={materials['Color texture']}
        position={[355.732, 0, 153.128]}
        rotation={[0, 0.024, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041874.geometry}
        material={materials['Color texture']}
        position={[357.83, 0, 155.227]}
        rotation={[0, -0.75, 0]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231875.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 158.584]}
        rotation={[Math.PI, -1.282, Math.PI]}
        scale={0.84}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021876.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 160.683]}
        rotation={[-Math.PI, 0.214, -Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021877.geometry}
        material={materials['Color texture']}
        position={[359.089, 0, 168.657]}
        rotation={[0, -1.197, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041878.geometry}
        material={materials['Color texture']}
        position={[351.535, 0, 167.398]}
        rotation={[Math.PI, -1.369, Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031879.geometry}
        material={materials['Color texture']}
        position={[377.975, 0, 141.797]}
        rotation={[0, -0.291, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231880.geometry}
        material={materials['Color texture']}
        position={[341.882, 0, 153.548]}
        rotation={[Math.PI, -0.295, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261881.geometry}
        material={materials['Color texture']}
        position={[334.747, 0, 154.807]}
        rotation={[Math.PI, -0.938, Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031882.geometry}
        material={materials['Color texture']}
        position={[337.266, 0, 158.165]}
        rotation={[Math.PI, -0.705, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231883.geometry}
        material={materials['Color texture']}
        position={[332.649, 0, 159.843]}
        rotation={[-Math.PI, 0.726, -Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021884.geometry}
        material={materials['Color texture']}
        position={[344.4, 0, 163.621]}
        rotation={[Math.PI, -0.261, Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021885.geometry}
        material={materials['Color texture']}
        position={[348.597, 0, 161.102]}
        rotation={[0, -1.524, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031886.geometry}
        material={materials['Color texture']}
        position={[341.462, 0, 166.558]}
        rotation={[0, -1.335, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251887.geometry}
        material={materials['Color texture']}
        position={[344.82, 0, 169.916]}
        rotation={[0, 0.493, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261888.geometry}
        material={materials['Color texture']}
        position={[333.488, 0, 169.916]}
        rotation={[-Math.PI, 0.97, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031889.geometry}
        material={materials['Color texture']}
        position={[328.452, 0, 172.014]}
        rotation={[-Math.PI, 1.029, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021890.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 173.693]}
        rotation={[-Math.PI, 0.983, -Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241891.geometry}
        material={materials['Color texture']}
        position={[327.613, 0, 179.569]}
        rotation={[-Math.PI, 0.715, -Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261892.geometry}
        material={materials['Color texture']}
        position={[331.81, 0, 179.988]}
        rotation={[Math.PI, -0.123, Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231893.geometry}
        material={materials['Color texture']}
        position={[337.685, 0, 181.247]}
        rotation={[-Math.PI, 1.028, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231894.geometry}
        material={materials['Color texture']}
        position={[354.473, 0, 173.273]}
        rotation={[0, -0.617, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261895.geometry}
        material={materials['Color texture']}
        position={[350.695, 0, 174.532]}
        rotation={[-Math.PI, 0.575, -Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261896.geometry}
        material={materials['Color texture']}
        position={[346.079, 0, 179.569]}
        rotation={[0, 1.307, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021897.geometry}
        material={materials['Color texture']}
        position={[403.156, 0, 137.181]}
        rotation={[-Math.PI, 1.333, -Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031898.geometry}
        material={materials['Color texture']}
        position={[451, 0, 109.062]}
        rotation={[Math.PI, -0.995, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031899.geometry}
        material={materials['Color texture']}
        position={[453.518, 0, 88.497]}
        rotation={[0, -0.127, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241900.geometry}
        material={materials['Color texture']}
        position={[458.554, 0, 80.104]}
        rotation={[0, 0.858, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021901.geometry}
        material={materials['Color texture']}
        position={[464.849, 0, 92.274]}
        rotation={[0, -0.034, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041902.geometry}
        material={materials['Color texture']}
        position={[141.274, 0, 41.913]}
        rotation={[0, 0.412, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041903.geometry}
        material={materials['Color texture']}
        position={[154.704, 0, 66.674]}
        rotation={[Math.PI, -0.502, Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241904.geometry}
        material={materials['Color texture']}
        position={[153.025, 0, 67.094]}
        rotation={[Math.PI, -1, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021905.geometry}
        material={materials['Color texture']}
        position={[147.989, 0, 28.902]}
        rotation={[Math.PI, -1.566, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251906.geometry}
        material={materials['Color texture']}
        position={[171.071, 0, 35.617]}
        rotation={[0, 0.811, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021907.geometry}
        material={materials['Color texture']}
        position={[174.429, 0, 36.876]}
        rotation={[-Math.PI, 0.542, -Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251908.geometry}
        material={materials['Color texture']}
        position={[191.636, 0, 68.353]}
        rotation={[0, 0.73, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041909.geometry}
        material={materials['Color texture']}
        position={[151.346, 0, 51.146]}
        rotation={[-Math.PI, 0.782, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241910.geometry}
        material={materials['Color texture']}
        position={[149.667, 0, 54.503]}
        rotation={[0, -1.492, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241911.geometry}
        material={materials['Color texture']}
        position={[157.641, 0, 92.694]}
        rotation={[-Math.PI, 0.928, -Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261912.geometry}
        material={materials['Color texture']}
        position={[206.744, 0, 96.891]}
        rotation={[0, -0.134, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031913.geometry}
        material={materials['Color texture']}
        position={[241.998, 0, 109.062]}
        rotation={[Math.PI, -0.583, Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021914.geometry}
        material={materials['Color texture']}
        position={[278.51, 0, 0.364]}
        rotation={[Math.PI, -0.033, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021915.geometry}
        material={materials['Color texture']}
        position={[344.4, 0, 20.089]}
        rotation={[0, 0.241, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041916.geometry}
        material={materials['Color texture']}
        position={[343.561, 0, 40.654]}
        rotation={[0, -1.463, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031917.geometry}
        material={materials['Color texture']}
        position={[342.302, 0, 42.332]}
        rotation={[Math.PI, -0.336, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021918.geometry}
        material={materials['Color texture']}
        position={[338.944, 0, 44.431]}
        rotation={[-Math.PI, 0.155, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031919.geometry}
        material={materials['Color texture']}
        position={[341.882, 0, 29.742]}
        rotation={[0, 0.274, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031920.geometry}
        material={materials['Color texture']}
        position={[312.924, 0, 57.441]}
        rotation={[-Math.PI, 1.441, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251921.geometry}
        material={materials['Color texture']}
        position={[307.048, 0, 63.736]}
        rotation={[Math.PI, -0.926, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041922.geometry}
        material={materials['Color texture']}
        position={[299.914, 0, 62.057]}
        rotation={[0, 0.627, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021923.geometry}
        material={materials['Color texture']}
        position={[302.432, 0, 64.156]}
        rotation={[0, 0.009, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231924.geometry}
        material={materials['Color texture']}
        position={[281.028, 0, 58.28]}
        rotation={[0, -0.101, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231925.geometry}
        material={materials['Color texture']}
        position={[220.594, 0, 59.539]}
        rotation={[Math.PI, -0.423, Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261926.geometry}
        material={materials['Color texture']}
        position={[203.806, 0, 49.887]}
        rotation={[0, 0.272, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021927.geometry}
        material={materials['Color texture']}
        position={[93.01, 0, -0.895]}
        rotation={[-Math.PI, 0.611, -Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021928.geometry}
        material={materials['Color texture']}
        position={[99.725, 0, 2.043]}
        rotation={[Math.PI, -1.53, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231929.geometry}
        material={materials['Color texture']}
        position={[98.886, 0, -10.128]}
        rotation={[-Math.PI, 0.591, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031930.geometry}
        material={materials['Color texture']}
        position={[75.803, 0, -26.915]}
        rotation={[Math.PI, -1.334, Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231931.geometry}
        material={materials['Color texture']}
        position={[70.347, 0, -42.024]}
        rotation={[0, -0.922, 0]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251932.geometry}
        material={materials['Color texture']}
        position={[68.249, 0, -39.926]}
        rotation={[Math.PI, -0.655, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251933.geometry}
        material={materials['Color texture']}
        position={[71.187, 0, -36.988]}
        rotation={[0, -1.109, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031934.geometry}
        material={materials['Color texture']}
        position={[74.124, 0, -106.655]}
        rotation={[Math.PI, -0.09, Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021935.geometry}
        material={materials['Color texture']}
        position={[82.098, 0, -115.468]}
        rotation={[0, -1.052, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031936.geometry}
        material={materials['Color texture']}
        position={[93.85, 0, -95.324]}
        rotation={[Math.PI, -0.752, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231937.geometry}
        material={materials['Color texture']}
        position={[101.404, 0, -98.681]}
        rotation={[0, 1.486, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241938.geometry}
        material={materials['Color texture']}
        position={[116.932, 0, -26.076]}
        rotation={[-Math.PI, 0.763, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241939.geometry}
        material={materials['Color texture']}
        position={[82.938, 0, -57.552]}
        rotation={[0, -1.225, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251940.geometry}
        material={materials['Color texture']}
        position={[95.948, 0, -69.303]}
        rotation={[-Math.PI, 0.765, -Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251941.geometry}
        material={materials['Color texture']}
        position={[93.43, 0, -67.625]}
        rotation={[0, 0.572, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231942.geometry}
        material={materials['Color texture']}
        position={[32.996, 0, -86.93]}
        rotation={[Math.PI, -0.994, Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021943.geometry}
        material={materials['Color texture']}
        position={[31.317, 0, -83.153]}
        rotation={[-Math.PI, 0.346, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021944.geometry}
        material={materials['Color texture']}
        position={[37.612, 0, -73.08]}
        rotation={[0, -1.501, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231945.geometry}
        material={materials['Color texture']}
        position={[31.736, 0, -77.277]}
        rotation={[0, 1.494, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241946.geometry}
        material={materials['Color texture']}
        position={[24.182, 0, -135.613]}
        rotation={[0, 1.421, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031947.geometry}
        material={materials['Color texture']}
        position={[11.592, 0, -160.794]}
        rotation={[0, 1.077, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231948.geometry}
        material={materials['Color texture']}
        position={[45.166, 0, -161.634]}
        rotation={[0, -0.071, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251949.geometry}
        material={materials['Color texture']}
        position={[48.524, 0, -149.463]}
        rotation={[-Math.PI, 1.002, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261950.geometry}
        material={materials['Color texture']}
        position={[38.451, 0, -159.535]}
        rotation={[0, -0.804, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261951.geometry}
        material={materials['Color texture']}
        position={[70.347, 0, -13.905]}
        rotation={[Math.PI, -1.408, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041952.geometry}
        material={materials['Color texture']}
        position={[62.793, 0, -17.263]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241953.geometry}
        material={materials['Color texture']}
        position={[69.088, 0, -5.092]}
        rotation={[-Math.PI, 1.28, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251954.geometry}
        material={materials['Color texture']}
        position={[67.829, 0, 0.364]}
        rotation={[-Math.PI, 0.771, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021955.geometry}
        material={materials['Color texture']}
        position={[148.828, 0, 12.535]}
        rotation={[Math.PI, -1.516, Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241956.geometry}
        material={materials['Color texture']}
        position={[20.825, 0, -211.576]}
        rotation={[0, -0.835, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041957.geometry}
        material={materials['Color texture']}
        position={[12.011, 0, -208.638]}
        rotation={[Math.PI, -0.488, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261958.geometry}
        material={materials['Color texture']}
        position={[327.193, 0, 290.784]}
        rotation={[0, 0.462, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261959.geometry}
        material={materials['Color texture']}
        position={[331.81, 0, 260.987]}
        rotation={[-Math.PI, 1.526, -Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241960.geometry}
        material={materials['Color texture']}
        position={[283.966, 0, 283.23]}
        rotation={[-Math.PI, 0.756, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021961.geometry}
        material={materials['Color texture']}
        position={[91.751, 0, -47.06]}
        rotation={[-Math.PI, 1.172, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021962.geometry}
        material={materials['Color texture']}
        position={[67.41, 0, -64.267]}
        rotation={[0, 0.994, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021963.geometry}
        material={materials['Color texture']}
        position={[76.643, 0, -75.599]}
        rotation={[Math.PI, -1.337, Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021964.geometry}
        material={materials['Color texture']}
        position={[73.285, 0, -90.287]}
        rotation={[0, -0.871, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021965.geometry}
        material={materials['Color texture']}
        position={[81.259, 0, -90.287]}
        rotation={[0, 0.146, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041966.geometry}
        material={materials['Color texture']}
        position={[48.104, 0, -68.464]}
        rotation={[0, -0.1, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261967.geometry}
        material={materials['Color texture']}
        position={[69.508, 0, -105.816]}
        rotation={[Math.PI, -0.095, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231968.geometry}
        material={materials['Color texture']}
        position={[61.534, 0, -103.298]}
        rotation={[0, 1.042, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251969.geometry}
        material={materials['Color texture']}
        position={[53.98, 0, -21.46]}
        rotation={[0, -0.837, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251970.geometry}
        material={materials['Color texture']}
        position={[35.514, 0, -48.739]}
        rotation={[0, 0.932, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021971.geometry}
        material={materials['Color texture']}
        position={[29.638, 0, -59.651]}
        rotation={[0, 1.541, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031972.geometry}
        material={materials['Color texture']}
        position={[43.068, 0, -68.884]}
        rotation={[-Math.PI, 1.13, -Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241973.geometry}
        material={materials['Color texture']}
        position={[32.156, 0, -73.92]}
        rotation={[0, -1.091, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231974.geometry}
        material={materials['Color texture']}
        position={[86.295, 0, -21.879]}
        rotation={[0, -0.062, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021975.geometry}
        material={materials['Color texture']}
        position={[84.197, 0, -36.568]}
        rotation={[0, 0.352, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231976.geometry}
        material={materials['Color texture']}
        position={[95.528, 0, -39.506]}
        rotation={[0, 1.041, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241977.geometry}
        material={materials['Color texture']}
        position={[104.342, 0, -36.988]}
        rotation={[Math.PI, -0.563, Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241978.geometry}
        material={materials['Color texture']}
        position={[110.637, 0, -47.48]}
        rotation={[0, -0.639, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261979.geometry}
        material={materials['Color texture']}
        position={[102.243, 0, -62.169]}
        rotation={[-Math.PI, 0.369, -Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021980.geometry}
        material={materials['Color texture']}
        position={[89.653, 0, -74.34]}
        rotation={[0, -1.175, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261981.geometry}
        material={materials['Color texture']}
        position={[75.803, 0, -68.044]}
        rotation={[Math.PI, -0.833, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261982.geometry}
        material={materials['Color texture']}
        position={[72.446, 0, -54.195]}
        rotation={[0, 0.072, 0]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041983.geometry}
        material={materials['Color texture']}
        position={[50.203, 0, -65.526]}
        rotation={[0, 0.924, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241984.geometry}
        material={materials['Color texture']}
        position={[56.917, 0, -68.884]}
        rotation={[Math.PI, -0.755, Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261985.geometry}
        material={materials['Color texture']}
        position={[66.99, 0, -83.573]}
        rotation={[0, -0.404, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041986.geometry}
        material={materials['Color texture']}
        position={[86.295, 0, -34.05]}
        rotation={[0, -0.309, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041987.geometry}
        material={materials['Color texture']}
        position={[83.357, 0, -50.837]}
        rotation={[Math.PI, -0.037, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0231988.geometry}
        material={materials['Color texture']}
        position={[110.217, 0, -2.574]}
        rotation={[Math.PI, -0.498, Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0261989.geometry}
        material={materials['Color texture']}
        position={[111.476, 0, 1.623]}
        rotation={[0, 0.167, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20021990.geometry}
        material={materials['Color texture']}
        position={[128.683, 0, -5.092]}
        rotation={[0, 0.372, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041991.geometry}
        material={materials['Color texture']}
        position={[132.88, 0, -2.993]}
        rotation={[0, -1.54, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20031992.geometry}
        material={materials['Color texture']}
        position={[130.362, 0, -0.475]}
        rotation={[0, 0.086, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241993.geometry}
        material={materials['Color texture']}
        position={[132.46, 0, 0.364]}
        rotation={[-Math.PI, 0.44, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30021994.geometry}
        material={materials['Color texture']}
        position={[138.756, 0, -1.734]}
        rotation={[Math.PI, -0.986, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251995.geometry}
        material={materials['Color texture']}
        position={[147.149, 0, -0.056]}
        rotation={[Math.PI, -1.493, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0251996.geometry}
        material={materials['Color texture']}
        position={[145.471, 0, 12.535]}
        rotation={[-Math.PI, 0.203, -Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241997.geometry}
        material={materials['Color texture']}
        position={[151.766, 0, 13.794]}
        rotation={[0, 0.444, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0241998.geometry}
        material={materials['Color texture']}
        position={[111.896, 0, 10.856]}
        rotation={[-Math.PI, 0.177, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30041999.geometry}
        material={materials['Color texture']}
        position={[97.207, 0, -5.512]}
        rotation={[0, 0.125, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262000.geometry}
        material={materials['Color texture']}
        position={[103.922, 0, -24.397]}
        rotation={[0, 1.339, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242001.geometry}
        material={materials['Color texture']}
        position={[115.253, 0, -25.656]}
        rotation={[0, -0.716, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022002.geometry}
        material={materials['Color texture']}
        position={[109.378, 0, -36.988]}
        rotation={[0, 1.401, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232003.geometry}
        material={materials['Color texture']}
        position={[63.213, 0, -10.548]}
        rotation={[-Math.PI, 0.559, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042004.geometry}
        material={materials['Color texture']}
        position={[53.14, 0, -26.496]}
        rotation={[0, 0.547, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032005.geometry}
        material={materials['Color texture']}
        position={[46.425, 0, -26.915]}
        rotation={[0, -0.925, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032006.geometry}
        material={materials['Color texture']}
        position={[43.068, 0, -35.729]}
        rotation={[0, -0.662, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042007.geometry}
        material={materials['Color texture']}
        position={[41.809, 0, -56.713]}
        rotation={[0, 1.476, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032008.geometry}
        material={materials['Color texture']}
        position={[65.311, 0, -64.267]}
        rotation={[0, 0.917, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042009.geometry}
        material={materials['Color texture']}
        position={[185.76, 0, 37.716]}
        rotation={[Math.PI, -0.799, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232010.geometry}
        material={materials['Color texture']}
        position={[184.501, 0, 28.483]}
        rotation={[-Math.PI, 0.245, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262011.geometry}
        material={materials['Color texture']}
        position={[213.459, 0, 51.565]}
        rotation={[0, -0.257, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262012.geometry}
        material={materials['Color texture']}
        position={[213.879, 0, 59.12]}
        rotation={[0, 0.992, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262013.geometry}
        material={materials['Color texture']}
        position={[260.464, 0, 33.519]}
        rotation={[-Math.PI, 0.483, -Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252014.geometry}
        material={materials['Color texture']}
        position={[255.427, 0, 27.224]}
        rotation={[0, 0.127, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022015.geometry}
        material={materials['Color texture']}
        position={[249.972, 0, 31.84]}
        rotation={[0, -1.052, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252016.geometry}
        material={materials['Color texture']}
        position={[292.779, 0, 7.499]}
        rotation={[0, 0.602, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022017.geometry}
        material={materials['Color texture']}
        position={[305.37, 0, 7.499]}
        rotation={[0, 0.797, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042018.geometry}
        material={materials['Color texture']}
        position={[293.618, 0, -14.745]}
        rotation={[0, -1.487, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032019.geometry}
        material={materials['Color texture']}
        position={[291.52, 0, -11.387]}
        rotation={[0, 0.392, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242020.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, -14.745]}
        rotation={[0, -1.155, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262021.geometry}
        material={materials['Color texture']}
        position={[281.448, 0, -16.843]}
        rotation={[-Math.PI, 0.191, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022022.geometry}
        material={materials['Color texture']}
        position={[302.852, 0, -8.03]}
        rotation={[Math.PI, -1.368, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022023.geometry}
        material={materials['Color texture']}
        position={[302.012, 0, -21.46]}
        rotation={[Math.PI, -1.02, Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232024.geometry}
        material={materials['Color texture']}
        position={[300.753, 0, -18.522]}
        rotation={[0, -1.037, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262025.geometry}
        material={materials['Color texture']}
        position={[321.737, 0, -16.843]}
        rotation={[0, 0.984, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252026.geometry}
        material={materials['Color texture']}
        position={[318.799, 0, -16.004]}
        rotation={[0, 0.565, 0]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252027.geometry}
        material={materials['Color texture']}
        position={[312.504, 0, -18.941]}
        rotation={[-Math.PI, 1, -Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022028.geometry}
        material={materials['Color texture']}
        position={[320.898, 0, -4.253]}
        rotation={[Math.PI, -0.045, Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262029.geometry}
        material={materials['Color texture']}
        position={[321.737, 0, -1.315]}
        rotation={[0, 0.072, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042030.geometry}
        material={materials['Color texture']}
        position={[315.022, 0, -5.092]}
        rotation={[Math.PI, -0.361, Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252031.geometry}
        material={materials['Color texture']}
        position={[310.406, 0, -6.771]}
        rotation={[-Math.PI, 1.531, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242032.geometry}
        material={materials['Color texture']}
        position={[336.006, 0, 27.224]}
        rotation={[Math.PI, -1.483, Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252033.geometry}
        material={materials['Color texture']}
        position={[329.292, 0, 34.778]}
        rotation={[Math.PI, -1.515, Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242034.geometry}
        material={materials['Color texture']}
        position={[313.344, 0, 28.902]}
        rotation={[0, -0.712, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022035.geometry}
        material={materials['Color texture']}
        position={[297.396, 0, 31.421]}
        rotation={[Math.PI, -0.628, Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022036.geometry}
        material={materials['Color texture']}
        position={[302.012, 0, 36.457]}
        rotation={[Math.PI, -0.591, Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022037.geometry}
        material={materials['Color texture']}
        position={[305.789, 0, 42.332]}
        rotation={[0, -0.572, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032038.geometry}
        material={materials['Color texture']}
        position={[299.074, 0, 49.047]}
        rotation={[-Math.PI, 0.29, -Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262039.geometry}
        material={materials['Color texture']}
        position={[302.012, 0, 53.244]}
        rotation={[0, -1.43, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232040.geometry}
        material={materials['Color texture']}
        position={[288.163, 0, 44.85]}
        rotation={[-Math.PI, 1.172, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262041.geometry}
        material={materials['Color texture']}
        position={[286.484, 0, 46.529]}
        rotation={[-Math.PI, 0.708, -Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242042.geometry}
        material={materials['Color texture']}
        position={[278.09, 0, 44.85]}
        rotation={[-Math.PI, 1.413, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262043.geometry}
        material={materials['Color texture']}
        position={[275.992, 0, 50.306]}
        rotation={[0, 1.485, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022044.geometry}
        material={materials['Color texture']}
        position={[270.956, 0, 34.358]}
        rotation={[-Math.PI, 1.29, -Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042045.geometry}
        material={materials['Color texture']}
        position={[266.759, 0, 37.716]}
        rotation={[0, 1.09, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022046.geometry}
        material={materials['Color texture']}
        position={[262.142, 0, 38.975]}
        rotation={[Math.PI, -0.556, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042047.geometry}
        material={materials['Color texture']}
        position={[252.07, 0, 39.814]}
        rotation={[-Math.PI, 0.164, -Math.PI]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042048.geometry}
        material={materials['Color texture']}
        position={[227.728, 0, 45.69]}
        rotation={[0, -1.209, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262049.geometry}
        material={materials['Color texture']}
        position={[223.951, 0, 47.788]}
        rotation={[0, -0.854, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252050.geometry}
        material={materials['Color texture']}
        position={[228.568, 0, 31.84]}
        rotation={[0, 0.959, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042051.geometry}
        material={materials['Color texture']}
        position={[223.112, 0, 34.778]}
        rotation={[0, 0.909, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042052.geometry}
        material={materials['Color texture']}
        position={[210.521, 0, 28.902]}
        rotation={[0, -1.109, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242053.geometry}
        material={materials['Color texture']}
        position={[209.682, 0, 34.778]}
        rotation={[Math.PI, -0.101, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022054.geometry}
        material={materials['Color texture']}
        position={[198.77, 0, 34.358]}
        rotation={[0, 1.322, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042055.geometry}
        material={materials['Color texture']}
        position={[201.288, 0, 39.394]}
        rotation={[0, 0.059, 0]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022056.geometry}
        material={materials['Color texture']}
        position={[129.942, 0, 28.902]}
        rotation={[Math.PI, -0.853, Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262057.geometry}
        material={materials['Color texture']}
        position={[131.621, 0, 34.358]}
        rotation={[0, -0.134, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242058.geometry}
        material={materials['Color texture']}
        position={[131.201, 0, 18.83]}
        rotation={[Math.PI, -1.566, Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232059.geometry}
        material={materials['Color texture']}
        position={[162.258, 0, 16.312]}
        rotation={[0, -1.404, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232060.geometry}
        material={materials['Color texture']}
        position={[173.17, 0, 18.83]}
        rotation={[0, 0.453, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232061.geometry}
        material={materials['Color texture']}
        position={[182.822, 0, 53.244]}
        rotation={[-Math.PI, 0.526, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022062.geometry}
        material={materials['Color texture']}
        position={[184.921, 0, 56.182]}
        rotation={[Math.PI, -1.345, Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022063.geometry}
        material={materials['Color texture']}
        position={[188.278, 0, 59.959]}
        rotation={[-Math.PI, 1.247, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262064.geometry}
        material={materials['Color texture']}
        position={[187.858, 0, 64.156]}
        rotation={[0, 0.999, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032065.geometry}
        material={materials['Color texture']}
        position={[199.61, 0, 70.451]}
        rotation={[0, -1.075, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232066.geometry}
        material={materials['Color texture']}
        position={[202.128, 0, 73.808]}
        rotation={[Math.PI, -0.515, Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022067.geometry}
        material={materials['Color texture']}
        position={[214.298, 0, 67.094]}
        rotation={[0, -1.02, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242068.geometry}
        material={materials['Color texture']}
        position={[261.303, 0, 64.575]}
        rotation={[-Math.PI, 1.554, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252069.geometry}
        material={materials['Color texture']}
        position={[264.66, 0, 66.254]}
        rotation={[0, -0.015, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032070.geometry}
        material={materials['Color texture']}
        position={[261.723, 0, 69.612]}
        rotation={[0, 0.464, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042071.geometry}
        material={materials['Color texture']}
        position={[264.241, 0, 78.425]}
        rotation={[0, 0.775, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232072.geometry}
        material={materials['Color texture']}
        position={[267.598, 0, 80.943]}
        rotation={[-Math.PI, 1.234, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022073.geometry}
        material={materials['Color texture']}
        position={[280.189, 0, 66.674]}
        rotation={[-Math.PI, 0.458, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232074.geometry}
        material={materials['Color texture']}
        position={[277.251, 0, 68.353]}
        rotation={[Math.PI, -0.732, Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242075.geometry}
        material={materials['Color texture']}
        position={[311.245, 0, 81.782]}
        rotation={[Math.PI, -0.663, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262076.geometry}
        material={materials['Color texture']}
        position={[313.344, 0, 83.041]}
        rotation={[0, -0.396, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232077.geometry}
        material={materials['Color texture']}
        position={[329.711, 0, 63.736]}
        rotation={[-Math.PI, 0.051, -Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042078.geometry}
        material={materials['Color texture']}
        position={[325.934, 0, 64.575]}
        rotation={[-Math.PI, 0.921, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242079.geometry}
        material={materials['Color texture']}
        position={[325.934, 0, 67.513]}
        rotation={[0, -1.252, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252080.geometry}
        material={materials['Color texture']}
        position={[328.033, 0, 69.192]}
        rotation={[0, 0.878, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232081.geometry}
        material={materials['Color texture']}
        position={[341.043, 0, 75.068]}
        rotation={[Math.PI, -1.562, Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042082.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 71.71]}
        rotation={[Math.PI, -1.396, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252083.geometry}
        material={materials['Color texture']}
        position={[357.41, 0, 73.389]}
        rotation={[Math.PI, -0.858, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262084.geometry}
        material={materials['Color texture']}
        position={[354.473, 0, 75.907]}
        rotation={[Math.PI, -1.337, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242085.geometry}
        material={materials['Color texture']}
        position={[363.286, 0, 38.975]}
        rotation={[0, 0.349, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262086.geometry}
        material={materials['Color texture']}
        position={[361.607, 0, 41.913]}
        rotation={[Math.PI, -1.2, Math.PI]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022087.geometry}
        material={materials['Color texture']}
        position={[361.607, 0, 45.27]}
        rotation={[-Math.PI, 1.534, -Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022088.geometry}
        material={materials['Color texture']}
        position={[370.84, 0, 20.928]}
        rotation={[Math.PI, -0.884, Math.PI]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022089.geometry}
        material={materials['Color texture']}
        position={[391.405, 0, 93.534]}
        rotation={[Math.PI, -0.494, Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022090.geometry}
        material={materials['Color texture']}
        position={[391.824, 0, 95.632]}
        rotation={[0, -0.287, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262091.geometry}
        material={materials['Color texture']}
        position={[393.923, 0, 100.248]}
        rotation={[0, -0.207, 0]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042092.geometry}
        material={materials['Color texture']}
        position={[381.332, 0, 93.114]}
        rotation={[-Math.PI, 0.717, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032093.geometry}
        material={materials['Color texture']}
        position={[383.011, 0, 97.311]}
        rotation={[0, -0.789, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042094.geometry}
        material={materials['Color texture']}
        position={[381.332, 0, 102.347]}
        rotation={[0, -0.308, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042095.geometry}
        material={materials['Color texture']}
        position={[378.814, 0, 107.383]}
        rotation={[-Math.PI, 0.284, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232096.geometry}
        material={materials['Color texture']}
        position={[372.519, 0, 104.445]}
        rotation={[0, -0.098, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262097.geometry}
        material={materials['Color texture']}
        position={[368.322, 0, 97.73]}
        rotation={[0, -0.551, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252098.geometry}
        material={materials['Color texture']}
        position={[362.027, 0, 85.56]}
        rotation={[Math.PI, -1.272, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022099.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 89.337]}
        rotation={[-Math.PI, 0.71, -Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232100.geometry}
        material={materials['Color texture']}
        position={[350.695, 0, 83.461]}
        rotation={[0, 0.678, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262101.geometry}
        material={materials['Color texture']}
        position={[338.525, 0, 88.078]}
        rotation={[Math.PI, -1.184, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022102.geometry}
        material={materials['Color texture']}
        position={[336.006, 0, 92.694]}
        rotation={[-Math.PI, 1.222, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252103.geometry}
        material={materials['Color texture']}
        position={[332.649, 0, 95.632]}
        rotation={[Math.PI, -1.383, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252104.geometry}
        material={materials['Color texture']}
        position={[327.193, 0, 88.078]}
        rotation={[0, 0.948, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042105.geometry}
        material={materials['Color texture']}
        position={[315.022, 0, 96.891]}
        rotation={[Math.PI, -1.444, Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262106.geometry}
        material={materials['Color texture']}
        position={[311.245, 0, 100.248]}
        rotation={[Math.PI, -0.2, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022107.geometry}
        material={materials['Color texture']}
        position={[308.727, 0, 103.606]}
        rotation={[-Math.PI, 0.77, -Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232108.geometry}
        material={materials['Color texture']}
        position={[290.681, 0, 97.73]}
        rotation={[0, -0.908, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252109.geometry}
        material={materials['Color texture']}
        position={[296.137, 0, 104.865]}
        rotation={[-Math.PI, 0.924, -Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032110.geometry}
        material={materials['Color texture']}
        position={[297.396, 0, 109.062]}
        rotation={[0, 1.062, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022111.geometry}
        material={materials['Color texture']}
        position={[295.297, 0, 110.741]}
        rotation={[Math.PI, -1.346, Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022112.geometry}
        material={materials['Color texture']}
        position={[304.95, 0, 123.751]}
        rotation={[-Math.PI, 0.818, -Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022113.geometry}
        material={materials['Color texture']}
        position={[307.888, 0, 127.528]}
        rotation={[0, -1.474, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022114.geometry}
        material={materials['Color texture']}
        position={[309.986, 0, 130.885]}
        rotation={[Math.PI, -1.541, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232115.geometry}
        material={materials['Color texture']}
        position={[320.059, 0, 131.725]}
        rotation={[0, -0.514, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042116.geometry}
        material={materials['Color texture']}
        position={[330.551, 0, 118.715]}
        rotation={[0, 1.317, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042117.geometry}
        material={materials['Color texture']}
        position={[328.033, 0, 121.233]}
        rotation={[0, -1.472, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022118.geometry}
        material={materials['Color texture']}
        position={[326.354, 0, 123.331]}
        rotation={[0, 1.454, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252119.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 104.865]}
        rotation={[Math.PI, -0.533, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022120.geometry}
        material={materials['Color texture']}
        position={[346.079, 0, 109.062]}
        rotation={[-Math.PI, 0.605, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032121.geometry}
        material={materials['Color texture']}
        position={[273.054, 0, 82.622]}
        rotation={[-Math.PI, 0.924, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022122.geometry}
        material={materials['Color texture']}
        position={[279.769, 0, 80.943]}
        rotation={[Math.PI, -0.568, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262123.geometry}
        material={materials['Color texture']}
        position={[281.448, 0, 83.041]}
        rotation={[0, 1.003, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042124.geometry}
        material={materials['Color texture']}
        position={[283.546, 0, 84.72]}
        rotation={[0, 0.513, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262125.geometry}
        material={materials['Color texture']}
        position={[277.671, 0, 94.373]}
        rotation={[-Math.PI, 0.239, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242126.geometry}
        material={materials['Color texture']}
        position={[285.645, 0, 93.953]}
        rotation={[-Math.PI, 0.97, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262127.geometry}
        material={materials['Color texture']}
        position={[295.297, 0, 68.772]}
        rotation={[0, -0.125, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262128.geometry}
        material={materials['Color texture']}
        position={[299.494, 0, 71.29]}
        rotation={[0, -0.949, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252129.geometry}
        material={materials['Color texture']}
        position={[315.442, 0, 64.156]}
        rotation={[Math.PI, -1.563, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262130.geometry}
        material={materials['Color texture']}
        position={[318.799, 0, 52.405]}
        rotation={[0, -1.055, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232131.geometry}
        material={materials['Color texture']}
        position={[328.452, 0, 8.758]}
        rotation={[0, 1.219, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242132.geometry}
        material={materials['Color texture']}
        position={[325.514, 0, 12.535]}
        rotation={[0, 1.103, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262133.geometry}
        material={materials['Color texture']}
        position={[291.94, 0, 17.571]}
        rotation={[0, -1.336, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022134.geometry}
        material={materials['Color texture']}
        position={[289.002, 0, 32.68]}
        rotation={[-Math.PI, 0.66, -Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252135.geometry}
        material={materials['Color texture']}
        position={[275.572, 0, 10.017]}
        rotation={[0, -1.567, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262136.geometry}
        material={materials['Color texture']}
        position={[276.831, 0, 15.053]}
        rotation={[0, -1.448, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232137.geometry}
        material={materials['Color texture']}
        position={[279.349, 0, 19.25]}
        rotation={[0, -0.308, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032138.geometry}
        material={materials['Color texture']}
        position={[284.385, 0, -0.056]}
        rotation={[0, -0.581, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242139.geometry}
        material={materials['Color texture']}
        position={[310.826, 0, 12.535]}
        rotation={[Math.PI, -1.203, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032140.geometry}
        material={materials['Color texture']}
        position={[151.346, 0, 31.001]}
        rotation={[-Math.PI, 1.042, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242141.geometry}
        material={materials['Color texture']}
        position={[150.507, 0, 33.519]}
        rotation={[-Math.PI, 0.008, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252142.geometry}
        material={materials['Color texture']}
        position={[146.73, 0, 36.457]}
        rotation={[0, 1.239, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022143.geometry}
        material={materials['Color texture']}
        position={[147.569, 0, 45.69]}
        rotation={[-Math.PI, 0.021, -Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022144.geometry}
        material={materials['Color texture']}
        position={[161.418, 0, 48.208]}
        rotation={[Math.PI, -0.061, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252145.geometry}
        material={materials['Color texture']}
        position={[152.605, 0, 57.021]}
        rotation={[0, -0.41, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042146.geometry}
        material={materials['Color texture']}
        position={[150.926, 0, 71.71]}
        rotation={[0, 1.389, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032147.geometry}
        material={materials['Color texture']}
        position={[153.025, 0, 75.068]}
        rotation={[Math.PI, -0.647, Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252148.geometry}
        material={materials['Color texture']}
        position={[150.507, 0, 75.487]}
        rotation={[Math.PI, -0.576, Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232149.geometry}
        material={materials['Color texture']}
        position={[141.693, 0, 61.218]}
        rotation={[0, 0.099, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022150.geometry}
        material={materials['Color texture']}
        position={[212.62, 0, 106.544]}
        rotation={[0, -1.326, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232151.geometry}
        material={materials['Color texture']}
        position={[225.21, 0, 107.803]}
        rotation={[Math.PI, -0.31, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022152.geometry}
        material={materials['Color texture']}
        position={[227.309, 0, 113.259]}
        rotation={[0, 0.147, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022153.geometry}
        material={materials['Color texture']}
        position={[219.754, 0, 130.466]}
        rotation={[0, 0.868, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232154.geometry}
        material={materials['Color texture']}
        position={[228.148, 0, 120.813]}
        rotation={[0, 0.921, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022155.geometry}
        material={materials['Color texture']}
        position={[211.361, 0, 114.518]}
        rotation={[Math.PI, -1.08, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022156.geometry}
        material={materials['Color texture']}
        position={[199.19, 0, 113.259]}
        rotation={[0, 1.057, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242157.geometry}
        material={materials['Color texture']}
        position={[200.869, 0, 161.522]}
        rotation={[-Math.PI, 0.778, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042158.geometry}
        material={materials['Color texture']}
        position={[257.106, 0, 161.522]}
        rotation={[Math.PI, -0.152, Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262159.geometry}
        material={materials['Color texture']}
        position={[249.972, 0, 148.092]}
        rotation={[0, -1.561, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022160.geometry}
        material={materials['Color texture']}
        position={[282.287, 0, 144.315]}
        rotation={[Math.PI, -0.845, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232161.geometry}
        material={materials['Color texture']}
        position={[288.582, 0, 151.869]}
        rotation={[0, -0.352, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022162.geometry}
        material={materials['Color texture']}
        position={[291.52, 0, 156.906]}
        rotation={[0, -0.631, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022163.geometry}
        material={materials['Color texture']}
        position={[304.53, 0, 155.227]}
        rotation={[-Math.PI, 1.423, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252164.geometry}
        material={materials['Color texture']}
        position={[309.147, 0, 159.004]}
        rotation={[0, -1.346, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232165.geometry}
        material={materials['Color texture']}
        position={[299.914, 0, 138.44]}
        rotation={[-Math.PI, 0.489, -Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032166.geometry}
        material={materials['Color texture']}
        position={[303.691, 0, 139.699]}
        rotation={[0, -0.937, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232167.geometry}
        material={materials['Color texture']}
        position={[274.313, 0, 135.082]}
        rotation={[-Math.PI, 1.543, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262168.geometry}
        material={materials['Color texture']}
        position={[292.779, 0, 118.715]}
        rotation={[0, -0.131, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032169.geometry}
        material={materials['Color texture']}
        position={[441.767, 0, 117.036]}
        rotation={[0, 1.56, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022170.geometry}
        material={materials['Color texture']}
        position={[441.347, 0, 121.652]}
        rotation={[0, -0.214, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042171.geometry}
        material={materials['Color texture']}
        position={[428.337, 0, 130.046]}
        rotation={[0, -1.446, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032172.geometry}
        material={materials['Color texture']}
        position={[429.176, 0, 135.082]}
        rotation={[0, -0.872, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032173.geometry}
        material={materials['Color texture']}
        position={[430.435, 0, 141.797]}
        rotation={[-Math.PI, 0.615, -Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042174.geometry}
        material={materials['Color texture']}
        position={[429.596, 0, 144.735]}
        rotation={[0, 0.529, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262175.geometry}
        material={materials['Color texture']}
        position={[416.586, 0, 130.885]}
        rotation={[0, -0.202, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042176.geometry}
        material={materials['Color texture']}
        position={[420.782, 0, 115.777]}
        rotation={[-Math.PI, 0.233, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032177.geometry}
        material={materials['Color texture']}
        position={[417.845, 0, 117.455]}
        rotation={[0, -0.194, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022178.geometry}
        material={materials['Color texture']}
        position={[420.363, 0, 119.554]}
        rotation={[Math.PI, -0.486, Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252179.geometry}
        material={materials['Color texture']}
        position={[408.192, 0, 121.652]}
        rotation={[0, 1.281, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242180.geometry}
        material={materials['Color texture']}
        position={[401.897, 0, 128.787]}
        rotation={[0, 0.242, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022181.geometry}
        material={materials['Color texture']}
        position={[398.959, 0, 140.958]}
        rotation={[0, 1.291, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022182.geometry}
        material={materials['Color texture']}
        position={[385.529, 0, 139.699]}
        rotation={[-Math.PI, 0.693, -Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252183.geometry}
        material={materials['Color texture']}
        position={[386.788, 0, 142.217]}
        rotation={[-Math.PI, 0.372, -Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022184.geometry}
        material={materials['Color texture']}
        position={[378.814, 0, 147.253]}
        rotation={[-Math.PI, 1.203, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232185.geometry}
        material={materials['Color texture']}
        position={[373.358, 0, 140.958]}
        rotation={[0, 1.442, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022186.geometry}
        material={materials['Color texture']}
        position={[366.224, 0, 141.797]}
        rotation={[0, -0.231, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252187.geometry}
        material={materials['Color texture']}
        position={[364.125, 0, 156.906]}
        rotation={[0, 1.347, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242188.geometry}
        material={materials['Color texture']}
        position={[364.125, 0, 160.263]}
        rotation={[0, -1.478, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032189.geometry}
        material={materials['Color texture']}
        position={[370.84, 0, 163.201]}
        rotation={[0, -1.414, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262190.geometry}
        material={materials['Color texture']}
        position={[377.135, 0, 157.745]}
        rotation={[0, -1.284, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252191.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 155.647]}
        rotation={[0, -0.201, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022192.geometry}
        material={materials['Color texture']}
        position={[399.379, 0, 158.584]}
        rotation={[0, -0.052, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262193.geometry}
        material={materials['Color texture']}
        position={[406.093, 0, 151.03]}
        rotation={[0, 0.483, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242194.geometry}
        material={materials['Color texture']}
        position={[408.612, 0, 155.227]}
        rotation={[0, -0.667, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022195.geometry}
        material={materials['Color texture']}
        position={[410.71, 0, 143.056]}
        rotation={[-Math.PI, 0.793, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032196.geometry}
        material={materials['Color texture']}
        position={[408.612, 0, 131.305]}
        rotation={[0, 1.209, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022197.geometry}
        material={materials['Color texture']}
        position={[407.353, 0, 135.082]}
        rotation={[0, -0.501, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252198.geometry}
        material={materials['Color texture']}
        position={[426.238, 0, 140.538]}
        rotation={[0, 1.392, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022199.geometry}
        material={materials['Color texture']}
        position={[343.561, 0, 157.745]}
        rotation={[-Math.PI, 0.304, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242200.geometry}
        material={materials['Color texture']}
        position={[341.043, 0, 160.683]}
        rotation={[0, 1.373, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262201.geometry}
        material={materials['Color texture']}
        position={[377.135, 0, 146.414]}
        rotation={[0, 0.784, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232202.geometry}
        material={materials['Color texture']}
        position={[382.591, 0, 144.315]}
        rotation={[0, -1.55, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232203.geometry}
        material={materials['Color texture']}
        position={[395.601, 0, 172.854]}
        rotation={[0, -0.585, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032204.geometry}
        material={materials['Color texture']}
        position={[393.083, 0, 174.952]}
        rotation={[0, -0.337, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252205.geometry}
        material={materials['Color texture']}
        position={[391.824, 0, 174.952]}
        rotation={[-Math.PI, 0.525, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242206.geometry}
        material={materials['Color texture']}
        position={[390.565, 0, 179.149]}
        rotation={[Math.PI, -0.607, Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042207.geometry}
        material={materials['Color texture']}
        position={[383.85, 0, 180.828]}
        rotation={[0, 0.77, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232208.geometry}
        material={materials['Color texture']}
        position={[375.876, 0, 177.05]}
        rotation={[0, 0.324, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262209.geometry}
        material={materials['Color texture']}
        position={[380.913, 0, 186.283]}
        rotation={[0, 0.91, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022210.geometry}
        material={materials['Color texture']}
        position={[383.011, 0, 188.382]}
        rotation={[0, 0.421, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232211.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 189.641]}
        rotation={[0, 0.849, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022212.geometry}
        material={materials['Color texture']}
        position={[397.28, 0, 190.9]}
        rotation={[0, -0.059, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042213.geometry}
        material={materials['Color texture']}
        position={[378.394, 0, 200.972]}
        rotation={[0, -1.451, 0]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252214.geometry}
        material={materials['Color texture']}
        position={[378.394, 0, 204.33]}
        rotation={[-Math.PI, 0.218, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232215.geometry}
        material={materials['Color texture']}
        position={[381.332, 0, 205.589]}
        rotation={[0, -0.775, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232216.geometry}
        material={materials['Color texture']}
        position={[367.483, 0, 202.651]}
        rotation={[Math.PI, -0.881, Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232217.geometry}
        material={materials['Color texture']}
        position={[359.928, 0, 188.382]}
        rotation={[-Math.PI, 1.313, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262218.geometry}
        material={materials['Color texture']}
        position={[357.41, 0, 190.9]}
        rotation={[-Math.PI, 1.528, -Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252219.geometry}
        material={materials['Color texture']}
        position={[355.732, 0, 184.605]}
        rotation={[0, 0.609, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022220.geometry}
        material={materials['Color texture']}
        position={[317.54, 0, 184.185]}
        rotation={[0, 0.456, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242221.geometry}
        material={materials['Color texture']}
        position={[317.96, 0, 168.237]}
        rotation={[0, -1.534, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242222.geometry}
        material={materials['Color texture']}
        position={[317.96, 0, 170.755]}
        rotation={[-Math.PI, 0.095, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242223.geometry}
        material={materials['Color texture']}
        position={[315.442, 0, 174.532]}
        rotation={[0, 1.112, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032224.geometry}
        material={materials['Color texture']}
        position={[321.318, 0, 174.113]}
        rotation={[-Math.PI, 0.38, -Math.PI]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022225.geometry}
        material={materials['Color texture']}
        position={[304.95, 0, 188.802]}
        rotation={[Math.PI, -0.048, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232226.geometry}
        material={materials['Color texture']}
        position={[307.468, 0, 180.408]}
        rotation={[0, 0.108, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042227.geometry}
        material={materials['Color texture']}
        position={[316.701, 0, 194.257]}
        rotation={[0, 1.251, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252228.geometry}
        material={materials['Color texture']}
        position={[308.307, 0, 195.936]}
        rotation={[-Math.PI, 1.308, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042229.geometry}
        material={materials['Color texture']}
        position={[297.396, 0, 199.713]}
        rotation={[-Math.PI, 1.495, -Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262230.geometry}
        material={materials['Color texture']}
        position={[325.514, 0, 200.553]}
        rotation={[0, -0.928, 0]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262231.geometry}
        material={materials['Color texture']}
        position={[330.131, 0, 204.749]}
        rotation={[Math.PI, -0.821, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042232.geometry}
        material={materials['Color texture']}
        position={[333.069, 0, 206.848]}
        rotation={[Math.PI, -1.492, Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022233.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 202.231]}
        rotation={[0, -1.246, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022234.geometry}
        material={materials['Color texture']}
        position={[344.4, 0, 190.061]}
        rotation={[0, 0.312, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232235.geometry}
        material={materials['Color texture']}
        position={[340.203, 0, 191.739]}
        rotation={[-Math.PI, 0.069, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262236.geometry}
        material={materials['Color texture']}
        position={[334.328, 0, 195.097]}
        rotation={[0, 0.595, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242237.geometry}
        material={materials['Color texture']}
        position={[343.141, 0, 194.677]}
        rotation={[0, -1.258, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032238.geometry}
        material={materials['Color texture']}
        position={[339.784, 0, 198.035]}
        rotation={[Math.PI, -0.921, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022239.geometry}
        material={materials['Color texture']}
        position={[360.768, 0, 197.615]}
        rotation={[Math.PI, -0.413, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232240.geometry}
        material={materials['Color texture']}
        position={[372.939, 0, 198.874]}
        rotation={[0, 1.285, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022241.geometry}
        material={materials['Color texture']}
        position={[385.949, 0, 205.589]}
        rotation={[Math.PI, -1.312, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232242.geometry}
        material={materials['Color texture']}
        position={[385.949, 0, 219.438]}
        rotation={[0, 1.493, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252243.geometry}
        material={materials['Color texture']}
        position={[424.56, 0, 167.817]}
        rotation={[0, -0.628, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032244.geometry}
        material={materials['Color texture']}
        position={[430.015, 0, 173.273]}
        rotation={[-Math.PI, 0.625, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262245.geometry}
        material={materials['Color texture']}
        position={[438.409, 0, 157.325]}
        rotation={[0, -1.303, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232246.geometry}
        material={materials['Color texture']}
        position={[445.124, 0, 159.424]}
        rotation={[0, -0.803, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232247.geometry}
        material={materials['Color texture']}
        position={[448.062, 0, 164.88]}
        rotation={[Math.PI, -1.252, Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252248.geometry}
        material={materials['Color texture']}
        position={[449.74, 0, 146.833]}
        rotation={[0, -1.005, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032249.geometry}
        material={materials['Color texture']}
        position={[456.036, 0, 143.476]}
        rotation={[0, 0.392, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022250.geometry}
        material={materials['Color texture']}
        position={[464.429, 0, 145.574]}
        rotation={[0, 1.026, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232251.geometry}
        material={materials['Color texture']}
        position={[456.875, 0, 158.165]}
        rotation={[0, 0.636, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022252.geometry}
        material={materials['Color texture']}
        position={[444.285, 0, 155.647]}
        rotation={[-Math.PI, 0.596, -Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042253.geometry}
        material={materials['Color texture']}
        position={[434.212, 0, 164.88]}
        rotation={[0, 1.121, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242254.geometry}
        material={materials['Color texture']}
        position={[274.313, 0, 154.807]}
        rotation={[0, 0.525, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262255.geometry}
        material={materials['Color texture']}
        position={[272.634, 0, 71.71]}
        rotation={[0, 0.941, 0]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262256.geometry}
        material={materials['Color texture']}
        position={[237.801, 0, 57.021]}
        rotation={[Math.PI, -0.169, Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032257.geometry}
        material={materials['Color texture']}
        position={[232.345, 0, 56.601]}
        rotation={[0, 0.333, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042258.geometry}
        material={materials['Color texture']}
        position={[246.614, 0, 40.654]}
        rotation={[-Math.PI, 1.262, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262259.geometry}
        material={materials['Color texture']}
        position={[247.873, 0, 44.011]}
        rotation={[-Math.PI, 1.104, -Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262260.geometry}
        material={materials['Color texture']}
        position={[339.784, 0, 54.503]}
        rotation={[-Math.PI, 0.474, -Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262261.geometry}
        material={materials['Color texture']}
        position={[363.286, 0, 53.244]}
        rotation={[Math.PI, -0.012, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262262.geometry}
        material={materials['Color texture']}
        position={[364.125, 0, 59.539]}
        rotation={[-Math.PI, 0.775, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042263.geometry}
        material={materials['Color texture']}
        position={[365.804, 0, 63.736]}
        rotation={[0, 0.537, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032264.geometry}
        material={materials['Color texture']}
        position={[388.467, 0, 55.762]}
        rotation={[Math.PI, -0.977, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022265.geometry}
        material={materials['Color texture']}
        position={[388.047, 0, 70.451]}
        rotation={[-Math.PI, 1.045, -Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232266.geometry}
        material={materials['Color texture']}
        position={[393.083, 0, 66.674]}
        rotation={[0, 1.527, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242267.geometry}
        material={materials['Color texture']}
        position={[386.368, 0, 78.845]}
        rotation={[0, 0.257, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042268.geometry}
        material={materials['Color texture']}
        position={[383.85, 0, 83.041]}
        rotation={[0, 1.499, 0]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022269.geometry}
        material={materials['Color texture']}
        position={[364.545, 0, 90.176]}
        rotation={[0, -0.614, 0]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242270.geometry}
        material={materials['Color texture']}
        position={[365.804, 0, 104.026]}
        rotation={[0, 1.404, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022271.geometry}
        material={materials['Color texture']}
        position={[419.523, 0, 88.917]}
        rotation={[Math.PI, -0.073, Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022272.geometry}
        material={materials['Color texture']}
        position={[423.3, 0, 83.881]}
        rotation={[-Math.PI, 1.173, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032273.geometry}
        material={materials['Color texture']}
        position={[423.3, 0, 78.005]}
        rotation={[0, -1.376, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252274.geometry}
        material={materials['Color texture']}
        position={[419.104, 0, 64.995]}
        rotation={[0, -1.203, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032275.geometry}
        material={materials['Color texture']}
        position={[376.716, 0, 41.493]}
        rotation={[Math.PI, -0.068, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232276.geometry}
        material={materials['Color texture']}
        position={[375.457, 0, 46.109]}
        rotation={[0, 0.084, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022277.geometry}
        material={materials['Color texture']}
        position={[385.529, 0, 56.601]}
        rotation={[0, -0.755, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022278.geometry}
        material={materials['Color texture']}
        position={[355.312, 0, 25.545]}
        rotation={[0, -0.843, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042279.geometry}
        material={materials['Color texture']}
        position={[103.083, 0, 11.695]}
        rotation={[-Math.PI, 0.164, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042280.geometry}
        material={materials['Color texture']}
        position={[110.217, 0, 16.312]}
        rotation={[Math.PI, -1.084, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232281.geometry}
        material={materials['Color texture']}
        position={[89.653, 0, -2.154]}
        rotation={[0, 1.286, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022282.geometry}
        material={materials['Color texture']}
        position={[69.508, 0, -34.889]}
        rotation={[0, 1.291, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232283.geometry}
        material={materials['Color texture']}
        position={[72.026, 0, -25.237]}
        rotation={[0, 1.223, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252284.geometry}
        material={materials['Color texture']}
        position={[64.052, 0, -32.791]}
        rotation={[-Math.PI, 0.33, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032285.geometry}
        material={materials['Color texture']}
        position={[24.182, 0, -129.318]}
        rotation={[0, -0.24, 0]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022286.geometry}
        material={materials['Color texture']}
        position={[14.949, 0, -157.856]}
        rotation={[0, 0.148, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262287.geometry}
        material={materials['Color texture']}
        position={[25.441, 0, -156.597]}
        rotation={[0, 0.636, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242288.geometry}
        material={materials['Color texture']}
        position={[29.638, 0, -149.463]}
        rotation={[-Math.PI, 0.032, -Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022289.geometry}
        material={materials['Color texture']}
        position={[34.255, 0, -144.427]}
        rotation={[-Math.PI, 0.812, -Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262290.geometry}
        material={materials['Color texture']}
        position={[19.566, 0, -138.131]}
        rotation={[0, -1.07, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252291.geometry}
        material={materials['Color texture']}
        position={[14.529, 0, -141.908]}
        rotation={[0, 0.108, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022292.geometry}
        material={materials['Color texture']}
        position={[2.359, 0, -163.732]}
        rotation={[0, -1.35, 0]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262293.geometry}
        material={materials['Color texture']}
        position={[-0.579, 0, -157.856]}
        rotation={[0, -0.84, 0]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032294.geometry}
        material={materials['Color texture']}
        position={[-3.097, 0, -152.401]}
        rotation={[0, -0.345, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242295.geometry}
        material={materials['Color texture']}
        position={[-0.159, 0, -147.364]}
        rotation={[0, -0.501, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022296.geometry}
        material={materials['Color texture']}
        position={[3.618, 0, -147.364]}
        rotation={[Math.PI, -1.017, Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232297.geometry}
        material={materials['Color texture']}
        position={[4.877, 0, -143.168]}
        rotation={[-Math.PI, 1.193, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032298.geometry}
        material={materials['Color texture']}
        position={[2.778, 0, -139.81]}
        rotation={[Math.PI, -0.504, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022299.geometry}
        material={materials['Color texture']}
        position={[-1.418, 0, -138.551]}
        rotation={[Math.PI, -0.81, Math.PI]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022300.geometry}
        material={materials['Color texture']}
        position={[-7.294, 0, -146.105]}
        rotation={[0, 1.215, 0]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242301.geometry}
        material={materials['Color texture']}
        position={[-12.75, 0, -151.561]}
        rotation={[0, 0.142, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022302.geometry}
        material={materials['Color texture']}
        position={[-19.045, 0, -152.401]}
        rotation={[Math.PI, -1.465, Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032303.geometry}
        material={materials['Color texture']}
        position={[-16.107, 0, -164.152]}
        rotation={[0, 1.218, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242304.geometry}
        material={materials['Color texture']}
        position={[-19.465, 0, -170.027]}
        rotation={[Math.PI, -0.17, Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042305.geometry}
        material={materials['Color texture']}
        position={[-12.75, 0, -167.929]}
        rotation={[-Math.PI, 0.723, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252306.geometry}
        material={materials['Color texture']}
        position={[-11.071, 0, -162.473]}
        rotation={[0, -0.48, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242307.geometry}
        material={materials['Color texture']}
        position={[-6.874, 0, -157.437]}
        rotation={[Math.PI, -0.868, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232308.geometry}
        material={materials['Color texture']}
        position={[-10.232, 0, -157.017]}
        rotation={[0, -0.128, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042309.geometry}
        material={materials['Color texture']}
        position={[-3.517, 0, -167.089]}
        rotation={[0, 0.54, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262310.geometry}
        material={materials['Color texture']}
        position={[0.68, 0, -124.701]}
        rotation={[Math.PI, -1.214, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042311.geometry}
        material={materials['Color texture']}
        position={[3.618, 0, -132.256]}
        rotation={[0, 0.058, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022312.geometry}
        material={materials['Color texture']}
        position={[16.628, 0, -124.701]}
        rotation={[-Math.PI, 0.908, -Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022313.geometry}
        material={materials['Color texture']}
        position={[25.861, 0, -125.541]}
        rotation={[Math.PI, -0.114, Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032314.geometry}
        material={materials['Color texture']}
        position={[27.54, 0, -114.629]}
        rotation={[Math.PI, -0.999, Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022315.geometry}
        material={materials['Color texture']}
        position={[25.022, 0, -112.111]}
        rotation={[-Math.PI, 1.469, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032316.geometry}
        material={materials['Color texture']}
        position={[27.12, 0, -102.039]}
        rotation={[0, 0.775, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262317.geometry}
        material={materials['Color texture']}
        position={[30.477, 0, -99.94]}
        rotation={[-Math.PI, 0.315, -Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022318.geometry}
        material={materials['Color texture']}
        position={[39.291, 0, -99.94]}
        rotation={[-Math.PI, 0.373, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262319.geometry}
        material={materials['Color texture']}
        position={[51.881, 0, -99.94]}
        rotation={[Math.PI, -0.917, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252320.geometry}
        material={materials['Color texture']}
        position={[68.669, 0, -102.039]}
        rotation={[-Math.PI, 0.471, -Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242321.geometry}
        material={materials['Color texture']}
        position={[74.124, 0, -119.665]}
        rotation={[0, -0.761, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032322.geometry}
        material={materials['Color texture']}
        position={[74.124, 0, -113.37]}
        rotation={[0, 0.318, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252323.geometry}
        material={materials['Color texture']}
        position={[79.58, 0, -126.38]}
        rotation={[0, -0.109, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262324.geometry}
        material={materials['Color texture']}
        position={[78.321, 0, -139.81]}
        rotation={[0, -1.49, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042325.geometry}
        material={materials['Color texture']}
        position={[77.062, 0, -170.867]}
        rotation={[0, -0.487, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022326.geometry}
        material={materials['Color texture']}
        position={[66.99, 0, -167.509]}
        rotation={[0, 0.358, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022327.geometry}
        material={materials['Color texture']}
        position={[63.632, 0, -162.053]}
        rotation={[0, -0.665, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252328.geometry}
        material={materials['Color texture']}
        position={[55.239, 0, -161.634]}
        rotation={[-Math.PI, 0.618, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022329.geometry}
        material={materials['Color texture']}
        position={[51.462, 0, -168.348]}
        rotation={[0, 1.178, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032330.geometry}
        material={materials['Color texture']}
        position={[36.773, 0, -166.25]}
        rotation={[0, 0.019, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042331.geometry}
        material={materials['Color texture']}
        position={[16.208, 0, -149.882]}
        rotation={[Math.PI, -0.255, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032332.geometry}
        material={materials['Color texture']}
        position={[11.172, 0, -152.82]}
        rotation={[0, 0.569, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242333.geometry}
        material={materials['Color texture']}
        position={[22.503, 0, -157.437]}
        rotation={[Math.PI, -1.322, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022334.geometry}
        material={materials['Color texture']}
        position={[22.923, 0, -167.929]}
        rotation={[Math.PI, -1.567, Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022335.geometry}
        material={materials['Color texture']}
        position={[9.913, 0, -182.618]}
        rotation={[0, -1.443, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242336.geometry}
        material={materials['Color texture']}
        position={[10.333, 0, -215.353]}
        rotation={[Math.PI, -0.894, Math.PI]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232337.geometry}
        material={materials['Color texture']}
        position={[2.359, 0, -211.995]}
        rotation={[-Math.PI, 1.022, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022338.geometry}
        material={materials['Color texture']}
        position={[6.975, 0, -206.959]}
        rotation={[Math.PI, -1.386, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262339.geometry}
        material={materials['Color texture']}
        position={[11.172, 0, -200.244]}
        rotation={[0, -0.467, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232340.geometry}
        material={materials['Color texture']}
        position={[7.395, 0, -193.11]}
        rotation={[Math.PI, -0.051, Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262341.geometry}
        material={materials['Color texture']}
        position={[7.395, 0, -191.851]}
        rotation={[Math.PI, -0.952, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042342.geometry}
        material={materials['Color texture']}
        position={[12.851, 0, -194.788]}
        rotation={[0, -1.204, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232343.geometry}
        material={materials['Color texture']}
        position={[20.825, 0, -195.208]}
        rotation={[Math.PI, -1.37, Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232344.geometry}
        material={materials['Color texture']}
        position={[17.467, 0, -207.379]}
        rotation={[-Math.PI, 0.085, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042345.geometry}
        material={materials['Color texture']}
        position={[18.307, 0, -217.032]}
        rotation={[0, -0.975, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032346.geometry}
        material={materials['Color texture']}
        position={[-1.418, 0, -206.959]}
        rotation={[-Math.PI, 0.917, -Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022347.geometry}
        material={materials['Color texture']}
        position={[0.68, 0, -198.985]}
        rotation={[0, -0.841, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262348.geometry}
        material={materials['Color texture']}
        position={[14.529, 0, -204.861]}
        rotation={[Math.PI, -0.47, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252349.geometry}
        material={materials['Color texture']}
        position={[21.664, 0, -204.441]}
        rotation={[Math.PI, -1.486, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022350.geometry}
        material={materials['Color texture']}
        position={[16.628, 0, -192.69]}
        rotation={[-Math.PI, 1.026, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032351.geometry}
        material={materials['Color texture']}
        position={[19.146, 0, -183.037]}
        rotation={[0, -0.69, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042352.geometry}
        material={materials['Color texture']}
        position={[20.825, 0, -178.841]}
        rotation={[0, 0.124, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232353.geometry}
        material={materials['Color texture']}
        position={[-1.838, 0, -184.296]}
        rotation={[-Math.PI, 0.47, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022354.geometry}
        material={materials['Color texture']}
        position={[-6.035, 0, -179.68]}
        rotation={[Math.PI, -0.051, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252355.geometry}
        material={materials['Color texture']}
        position={[-15.268, 0, -176.742]}
        rotation={[Math.PI, -0.029, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022356.geometry}
        material={materials['Color texture']}
        position={[-11.491, 0, -183.457]}
        rotation={[0, -1.23, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042357.geometry}
        material={materials['Color texture']}
        position={[-9.812, 0, -189.752]}
        rotation={[0, 0.632, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242358.geometry}
        material={materials['Color texture']}
        position={[-15.268, 0, -190.172]}
        rotation={[0, 0.826, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242359.geometry}
        material={materials['Color texture']}
        position={[-24.081, 0, -177.162]}
        rotation={[0, 1.217, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032360.geometry}
        material={materials['Color texture']}
        position={[30.477, 0, -175.903]}
        rotation={[0, 0.012, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262361.geometry}
        material={materials['Color texture']}
        position={[32.996, 0, -164.991]}
        rotation={[0, -1.404, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022362.geometry}
        material={materials['Color texture']}
        position={[36.773, 0, -157.017]}
        rotation={[-Math.PI, 1.241, -Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252363.geometry}
        material={materials['Color texture']}
        position={[41.809, 0, -175.063]}
        rotation={[-Math.PI, 1.362, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042364.geometry}
        material={materials['Color texture']}
        position={[54.399, 0, -175.903]}
        rotation={[Math.PI, -0.041, Math.PI]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022365.geometry}
        material={materials['Color texture']}
        position={[14.949, 0, -104.137]}
        rotation={[0, 1.201, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022366.geometry}
        material={materials['Color texture']}
        position={[10.333, 0, -118.826]}
        rotation={[-Math.PI, 1.066, -Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022367.geometry}
        material={materials['Color texture']}
        position={[27.959, 0, -92.386]}
        rotation={[0, 0.86, 0]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232368.geometry}
        material={materials['Color texture']}
        position={[216.817, 0, 41.913]}
        rotation={[Math.PI, -0.309, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252369.geometry}
        material={materials['Color texture']}
        position={[-104.715, 0, -141.858]}
        rotation={[0, 0.072, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042370.geometry}
        material={materials['Color texture']}
        position={[-86.322, 0, -157.244]}
        rotation={[0, -0.604, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042371.geometry}
        material={materials['Color texture']}
        position={[-52.897, 0, -160.781]}
        rotation={[Math.PI, -0.03, Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032372.geometry}
        material={materials['Color texture']}
        position={[-42.109, 0, -133.899]}
        rotation={[-Math.PI, 0.49, -Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262373.geometry}
        material={materials['Color texture']}
        position={[-45.646, 0, -117.982]}
        rotation={[Math.PI, -1.319, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042374.geometry}
        material={materials['Color texture']}
        position={[-33.62, 0, -128.947]}
        rotation={[Math.PI, -0.295, Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042375.geometry}
        material={materials['Color texture']}
        position={[-97.11, 0, -119.397]}
        rotation={[0, 0.893, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232376.geometry}
        material={materials['Color texture']}
        position={[-88.975, 0, -140.973]}
        rotation={[0, -1.001, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022377.geometry}
        material={materials['Color texture']}
        position={[-71.29, 0, -140.973]}
        rotation={[-Math.PI, 0.141, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042378.geometry}
        material={materials['Color texture']}
        position={[-83.316, 0, -137.436]}
        rotation={[Math.PI, -0.995, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032379.geometry}
        material={materials['Color texture']}
        position={[-108.96, 0, -154.414]}
        rotation={[-Math.PI, 1.157, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022380.geometry}
        material={materials['Color texture']}
        position={[-113.912, 0, -171.746]}
        rotation={[0, 0.519, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022381.geometry}
        material={materials['Color texture']}
        position={[-99.763, 0, -173.514]}
        rotation={[0, -0.113, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262382.geometry}
        material={materials['Color texture']}
        position={[-92.689, 0, -168.209]}
        rotation={[Math.PI, -0.753, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032383.geometry}
        material={materials['Color texture']}
        position={[-72.705, 0, -167.678]}
        rotation={[0, 1.334, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252384.geometry}
        material={materials['Color texture']}
        position={[-114.619, 0, -137.967]}
        rotation={[0, 1.298, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022385.geometry}
        material={materials['Color texture']}
        position={[-107.722, 0, -111.439]}
        rotation={[Math.PI, -1.091, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032386.geometry}
        material={materials['Color texture']}
        position={[-96.403, 0, -105.249]}
        rotation={[-Math.PI, 0.839, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252387.geometry}
        material={materials['Color texture']}
        position={[-83.139, 0, -118.159]}
        rotation={[0, -0.108, 0]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242388.geometry}
        material={materials['Color texture']}
        position={[-64.216, 0, -114.268]}
        rotation={[0, -0.934, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042389.geometry}
        material={materials['Color texture']}
        position={[-56.965, 0, -126.118]}
        rotation={[-Math.PI, 0.947, -Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022390.geometry}
        material={materials['Color texture']}
        position={[-57.495, 0, -151.761]}
        rotation={[0, -1.453, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232391.geometry}
        material={materials['Color texture']}
        position={[-70.936, 0, -159.012]}
        rotation={[0, -0.448, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252392.geometry}
        material={materials['Color texture']}
        position={[-138.141, 0, -128.594]}
        rotation={[Math.PI, -1.233, Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042393.geometry}
        material={materials['Color texture']}
        position={[-130.182, 0, -106.664]}
        rotation={[Math.PI, -0.894, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252394.geometry}
        material={materials['Color texture']}
        position={[-136.018, 0, -105.426]}
        rotation={[Math.PI, -0.556, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022395.geometry}
        material={materials['Color texture']}
        position={[-147.867, 0, -98.705]}
        rotation={[0, 0.146, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262396.geometry}
        material={materials['Color texture']}
        position={[-165.376, 0, -97.821]}
        rotation={[-Math.PI, 1.116, -Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032397.geometry}
        material={materials['Color texture']}
        position={[-171.389, 0, -94.461]}
        rotation={[Math.PI, -0.089, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032398.geometry}
        material={materials['Color texture']}
        position={[-172.45, 0, -107.902]}
        rotation={[Math.PI, -1.29, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042399.geometry}
        material={materials['Color texture']}
        position={[-185.007, 0, -106.664]}
        rotation={[0, 1.321, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032400.geometry}
        material={materials['Color texture']}
        position={[-191.904, 0, -103.657]}
        rotation={[0, 1.549, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232401.geometry}
        material={materials['Color texture']}
        position={[-199.863, 0, -104.541]}
        rotation={[0, 0.138, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252402.geometry}
        material={materials['Color texture']}
        position={[-200.747, 0, -91.454]}
        rotation={[0, -1.422, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242403.geometry}
        material={materials['Color texture']}
        position={[-195.264, 0, -109.493]}
        rotation={[-Math.PI, 0.082, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042404.geometry}
        material={materials['Color texture']}
        position={[-192.612, 0, -121.343]}
        rotation={[0, 0.263, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242405.geometry}
        material={materials['Color texture']}
        position={[-199.686, 0, -124.703]}
        rotation={[Math.PI, -0.342, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022406.geometry}
        material={materials['Color texture']}
        position={[-195.441, 0, -130.008]}
        rotation={[-Math.PI, 0.878, -Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042407.geometry}
        material={materials['Color texture']}
        position={[-196.856, 0, -137.79]}
        rotation={[Math.PI, -1.147, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262408.geometry}
        material={materials['Color texture']}
        position={[-204.814, 0, -136.198]}
        rotation={[-Math.PI, 0.904, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242409.geometry}
        material={materials['Color texture']}
        position={[-208.705, 0, -140.443]}
        rotation={[-Math.PI, 0.374, -Math.PI]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042410.geometry}
        material={materials['Color texture']}
        position={[-213.657, 0, -149.109]}
        rotation={[Math.PI, -0.285, Math.PI]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242411.geometry}
        material={materials['Color texture']}
        position={[-199.863, 0, -152.292]}
        rotation={[-Math.PI, 1.399, -Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232412.geometry}
        material={materials['Color texture']}
        position={[-202.692, 0, -165.91]}
        rotation={[-Math.PI, 0.179, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242413.geometry}
        material={materials['Color texture']}
        position={[-209.943, 0, -163.964]}
        rotation={[-Math.PI, 0.362, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022414.geometry}
        material={materials['Color texture']}
        position={[-186.245, 0, -171.392]}
        rotation={[Math.PI, -0.566, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252415.geometry}
        material={materials['Color texture']}
        position={[-183.592, 0, -157.598]}
        rotation={[-Math.PI, 0.103, -Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232416.geometry}
        material={materials['Color texture']}
        position={[-194.734, 0, -157.421]}
        rotation={[0, -0.07, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042417.geometry}
        material={materials['Color texture']}
        position={[-174.219, 0, -172.1]}
        rotation={[0, 0.52, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252418.geometry}
        material={materials['Color texture']}
        position={[-163.431, 0, -163.257]}
        rotation={[0, -1.445, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242419.geometry}
        material={materials['Color texture']}
        position={[-145.392, 0, -161.488]}
        rotation={[0, -0.134, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022420.geometry}
        material={materials['Color texture']}
        position={[-151.581, 0, -173.868]}
        rotation={[0, 1.403, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232421.geometry}
        material={materials['Color texture']}
        position={[-134.073, 0, -146.81]}
        rotation={[0, 0.125, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252422.geometry}
        material={materials['Color texture']}
        position={[-131.066, 0, -130.362]}
        rotation={[0, 0.382, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022423.geometry}
        material={materials['Color texture']}
        position={[-155.826, 0, -134.607]}
        rotation={[Math.PI, -1.538, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252424.geometry}
        material={materials['Color texture']}
        position={[-150.167, 0, -145.748]}
        rotation={[0, -0.159, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242425.geometry}
        material={materials['Color texture']}
        position={[-159.894, 0, -147.871]}
        rotation={[0, -0.535, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032426.geometry}
        material={materials['Color texture']}
        position={[-165.376, 0, -148.048]}
        rotation={[-Math.PI, 1.01, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022427.geometry}
        material={materials['Color texture']}
        position={[-177.048, 0, -146.279]}
        rotation={[Math.PI, -1.55, Math.PI]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042428.geometry}
        material={materials['Color texture']}
        position={[-181.47, 0, -143.803]}
        rotation={[-Math.PI, 1.158, -Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022429.geometry}
        material={materials['Color texture']}
        position={[-193.673, 0, -144.334]}
        rotation={[Math.PI, -1.166, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032430.geometry}
        material={materials['Color texture']}
        position={[-185.891, 0, -139.382]}
        rotation={[0, 1.093, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262431.geometry}
        material={materials['Color texture']}
        position={[-187.836, 0, -127.356]}
        rotation={[-Math.PI, 1.555, -Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242432.geometry}
        material={materials['Color texture']}
        position={[-152.819, 0, -159.72]}
        rotation={[-Math.PI, 0.378, -Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032433.geometry}
        material={materials['Color texture']}
        position={[-155.649, 0, -163.788]}
        rotation={[0, 0.995, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242434.geometry}
        material={materials['Color texture']}
        position={[-144.684, 0, -118.69]}
        rotation={[-Math.PI, 0.865, -Math.PI]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252435.geometry}
        material={materials['Color texture']}
        position={[-148.575, 0, -128.77]}
        rotation={[Math.PI, -1.433, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022436.geometry}
        material={materials['Color texture']}
        position={[-152.996, 0, -115.86]}
        rotation={[0, -1.061, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232437.geometry}
        material={materials['Color texture']}
        position={[-142.739, 0, -110.024]}
        rotation={[0, 0.302, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262438.geometry}
        material={materials['Color texture']}
        position={[-267.951, 0, -130.362]}
        rotation={[0, 1.378, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022439.geometry}
        material={materials['Color texture']}
        position={[-251.327, 0, -152.292]}
        rotation={[0, -1.128, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022440.geometry}
        material={materials['Color texture']}
        position={[-227.275, 0, -141.327]}
        rotation={[0, -0.899, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022441.geometry}
        material={materials['Color texture']}
        position={[-218.432, 0, -96.406]}
        rotation={[0, 0.636, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242442.geometry}
        material={materials['Color texture']}
        position={[-243.899, 0, -99.943]}
        rotation={[Math.PI, -1.391, Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262443.geometry}
        material={materials['Color texture']}
        position={[-268.659, 0, -141.681]}
        rotation={[0, -1.382, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042444.geometry}
        material={materials['Color texture']}
        position={[-236.118, 0, -154.768]}
        rotation={[Math.PI, -1.433, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262445.geometry}
        material={materials['Color texture']}
        position={[-221.969, 0, -127.886]}
        rotation={[Math.PI, -0.993, Math.PI]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252446.geometry}
        material={materials['Color texture']}
        position={[-230.458, 0, -94.638]}
        rotation={[0, -0.54, 0]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232447.geometry}
        material={materials['Color texture']}
        position={[-197.21, 0, -73.769]}
        rotation={[Math.PI, -0.756, Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022448.geometry}
        material={materials['Color texture']}
        position={[-140.616, 0, -92.162]}
        rotation={[0, -0.392, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232449.geometry}
        material={materials['Color texture']}
        position={[-160.07, 0, -83.319]}
        rotation={[0, -0.864, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242450.geometry}
        material={materials['Color texture']}
        position={[-153.704, 0, -58.206]}
        rotation={[-Math.PI, 0.175, -Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242451.geometry}
        material={materials['Color texture']}
        position={[-178.463, 0, -52.546]}
        rotation={[Math.PI, -0.515, Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032452.geometry}
        material={materials['Color texture']}
        position={[-188.013, 0, -86.502]}
        rotation={[0, -1.358, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232453.geometry}
        material={materials['Color texture']}
        position={[-115.857, 0, -103.48]}
        rotation={[0, -1.239, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262454.geometry}
        material={materials['Color texture']}
        position={[-124.7, 0, -94.284]}
        rotation={[0, -1.399, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032455.geometry}
        material={materials['Color texture']}
        position={[-139.555, 0, -79.428]}
        rotation={[-Math.PI, 1.193, -Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232456.geometry}
        material={materials['Color texture']}
        position={[409.854, 0, -22.282]}
        rotation={[-Math.PI, 0.475, -Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032457.geometry}
        material={materials['Color texture']}
        position={[-78.579, 0, -104.643]}
        rotation={[0, -0.702, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262458.geometry}
        material={materials['Color texture']}
        position={[-67.956, 0, -97.088]}
        rotation={[0, 1.313, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022459.geometry}
        material={materials['Color texture']}
        position={[-49.542, 0, -111.489]}
        rotation={[0, 1.244, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022460.geometry}
        material={materials['Color texture']}
        position={[-38.211, 0, -102.754]}
        rotation={[0, -0.032, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042461.geometry}
        material={materials['Color texture']}
        position={[-33.843, 0, -112.079]}
        rotation={[-Math.PI, 0.48, -Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042462.geometry}
        material={materials['Color texture']}
        position={[-20.387, 0, -114.676]}
        rotation={[0, 1.183, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032463.geometry}
        material={materials['Color texture']}
        position={[-24.518, 0, -105.941]}
        rotation={[0, 1.279, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232464.geometry}
        material={materials['Color texture']}
        position={[-98.999, 0, -92.131]}
        rotation={[0, 0.276, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232465.geometry}
        material={materials['Color texture']}
        position={[-87.313, 0, -101.574]}
        rotation={[Math.PI, -0.68, Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042466.geometry}
        material={materials['Color texture']}
        position={[-113.072, 0, -299.539]}
        rotation={[0, -1.389, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022467.geometry}
        material={materials['Color texture']}
        position={[-123.984, 0, -288.418]}
        rotation={[Math.PI, -0.296, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032468.geometry}
        material={materials['Color texture']}
        position={[-133.637, 0, -293.034]}
        rotation={[Math.PI, -1.07, Math.PI]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022469.geometry}
        material={materials['Color texture']}
        position={[-138.043, 0, -288.418]}
        rotation={[0, 0.231, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232470.geometry}
        material={materials['Color texture']}
        position={[-133.217, 0, -288.628]}
        rotation={[Math.PI, -0.202, Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042471.geometry}
        material={materials['Color texture']}
        position={[-119.577, 0, -291.985]}
        rotation={[-Math.PI, 1.071, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242472.geometry}
        material={materials['Color texture']}
        position={[-159.867, 0, -297.651]}
        rotation={[0, 0.863, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252473.geometry}
        material={materials['Color texture']}
        position={[-174.975, 0, -296.392]}
        rotation={[0, 0.479, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232474.geometry}
        material={materials['Color texture']}
        position={[-173.297, 0, -287.578]}
        rotation={[Math.PI, -1.446, Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252475.geometry}
        material={materials['Color texture']}
        position={[-157.349, 0, -287.159]}
        rotation={[-Math.PI, 1.41, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042476.geometry}
        material={materials['Color texture']}
        position={[-145.807, 0, -293.664]}
        rotation={[-Math.PI, 0.428, -Math.PI]}
        scale={0.985}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032477.geometry}
        material={materials['Color texture']}
        position={[-147.906, 0, -290.726]}
        rotation={[0, 1.421, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022478.geometry}
        material={materials['Color texture']}
        position={[-170.569, 0, -286.949]}
        rotation={[0, -0.218, 0]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252479.geometry}
        material={materials['Color texture']}
        position={[-174.346, 0, -290.516]}
        rotation={[-Math.PI, 0.795, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042480.geometry}
        material={materials['Color texture']}
        position={[-114.65, 0, 96.53]}
        rotation={[0, -1.133, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032481.geometry}
        material={materials['Color texture']}
        position={[-76.405, 0, 90.729]}
        rotation={[0, -0.222, 0]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252482.geometry}
        material={materials['Color texture']}
        position={[-63.925, 0, 124.254]}
        rotation={[0, -0.896, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042483.geometry}
        material={materials['Color texture']}
        position={[-86.439, 0, 136.98]}
        rotation={[-Math.PI, 1.185, -Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022484.geometry}
        material={materials['Color texture']}
        position={[-110.421, 0, 128.17]}
        rotation={[0, 1.23, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022485.geometry}
        material={materials['Color texture']}
        position={[-82.279, 0, 110.306]}
        rotation={[0, 1.549, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022486.geometry}
        material={materials['Color texture']}
        position={[-95.004, 0, 99.783]}
        rotation={[0, -0.554, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242487.geometry}
        material={materials['Color texture']}
        position={[-97.206, 0, 124.989]}
        rotation={[-Math.PI, 1.1, -Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262488.geometry}
        material={materials['Color texture']}
        position={[-246.317, 0, 8.513]}
        rotation={[-Math.PI, 1.195, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252489.geometry}
        material={materials['Color texture']}
        position={[-201.999, 0, -12.891]}
        rotation={[0, 0.72, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262490.geometry}
        material={materials['Color texture']}
        position={[-184.801, 0, -20.589]}
        rotation={[-Math.PI, 0.167, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252491.geometry}
        material={materials['Color texture']}
        position={[-163.22, 0, 21.523]}
        rotation={[Math.PI, -0.725, Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232492.geometry}
        material={materials['Color texture']}
        position={[-143.996, 0, 1.115]}
        rotation={[0, -0.675, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262493.geometry}
        material={materials['Color texture']}
        position={[-109.081, 0, -66.61]}
        rotation={[-Math.PI, 0.356, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232494.geometry}
        material={materials['Color texture']}
        position={[-108.242, 0, -32.616]}
        rotation={[Math.PI, -1.152, Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262495.geometry}
        material={materials['Color texture']}
        position={[-51.165, 0, -26.74]}
        rotation={[0, 0.53, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022496.geometry}
        material={materials['Color texture']}
        position={[-70.05, 0, -7.015]}
        rotation={[-Math.PI, 0.419, -Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022497.geometry}
        material={materials['Color texture']}
        position={[-100.268, 0, -8.694]}
        rotation={[-Math.PI, 0.655, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232498.geometry}
        material={materials['Color texture']}
        position={[-122.93, 0, 26.56]}
        rotation={[0, 0.396, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262499.geometry}
        material={materials['Color texture']}
        position={[-97.749, 0, 14.389]}
        rotation={[0, -1.478, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262500.geometry}
        material={materials['Color texture']}
        position={[-55.362, 0, -78.781]}
        rotation={[0, 0.357, 0]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042501.geometry}
        material={materials['Color texture']}
        position={[-351.238, 0, -105.221]}
        rotation={[-Math.PI, 0.142, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032502.geometry}
        material={materials['Color texture']}
        position={[-336.129, 0, -131.241]}
        rotation={[Math.PI, -0.231, Math.PI]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032503.geometry}
        material={materials['Color texture']}
        position={[-295, 0, -94.729]}
        rotation={[-Math.PI, 1.257, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022504.geometry}
        material={materials['Color texture']}
        position={[-241.281, 0, -78.361]}
        rotation={[0, -1.398, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232505.geometry}
        material={materials['Color texture']}
        position={[-254.291, 0, -41.429]}
        rotation={[-Math.PI, 0.766, -Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242506.geometry}
        material={materials['Color texture']}
        position={[-339.906, 0, -42.268]}
        rotation={[0, -0.684, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042507.geometry}
        material={materials['Color texture']}
        position={[-360.471, 0, -74.164]}
        rotation={[0, -0.043, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242508.geometry}
        material={materials['Color texture']}
        position={[-422.584, 0, -40.17]}
        rotation={[Math.PI, -1.296, Math.PI]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252509.geometry}
        material={materials['Color texture']}
        position={[-443.148, 0, -38.072]}
        rotation={[-Math.PI, 0.59, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032510.geometry}
        material={materials['Color texture']}
        position={[-439.371, 0, -75.843]}
        rotation={[0, -0.232, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042511.geometry}
        material={materials['Color texture']}
        position={[-306.332, 0, -136.697]}
        rotation={[-Math.PI, 0.728, -Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022512.geometry}
        material={materials['Color texture']}
        position={[-292.902, 0, -124.526]}
        rotation={[Math.PI, -0.164, Math.PI]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252513.geometry}
        material={materials['Color texture']}
        position={[-285.348, 0, -146.35]}
        rotation={[Math.PI, -1.191, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242514.geometry}
        material={materials['Color texture']}
        position={[-292.482, 0, -136.697]}
        rotation={[0, 1.11, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262515.geometry}
        material={materials['Color texture']}
        position={[-280.731, 0, -116.552]}
        rotation={[0, -1.312, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262516.geometry}
        material={materials['Color texture']}
        position={[247.038, 39.77, -103.711]}
        rotation={[-Math.PI, 0.27, -Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242517.geometry}
        material={materials['Color texture']}
        position={[263.385, 21.149, -162.401]}
        rotation={[0, 0.501, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042518.geometry}
        material={materials['Color texture']}
        position={[258.798, 19.851, -161.487]}
        rotation={[0, -0.562, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022519.geometry}
        material={materials['Color texture']}
        position={[248.968, 21.051, -161.318]}
        rotation={[0, -0.153, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022520.geometry}
        material={materials['Color texture']}
        position={[249.863, 22.785, -154.828]}
        rotation={[0, 1.5, 0]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042521.geometry}
        material={materials['Color texture']}
        position={[279.506, 35.47, -142.922]}
        rotation={[Math.PI, -1.272, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232522.geometry}
        material={materials['Color texture']}
        position={[207.76, 32.24, -131.446]}
        rotation={[-Math.PI, 0.989, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252523.geometry}
        material={materials['Color texture']}
        position={[216.626, 35.586, -130.803]}
        rotation={[0, 1.474, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022524.geometry}
        material={materials['Color texture']}
        position={[128.706, 6.475, -148.81]}
        rotation={[Math.PI, -1.323, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242525.geometry}
        material={materials['Color texture']}
        position={[175.509, 18.354, -94.925]}
        rotation={[0, -1.516, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242526.geometry}
        material={materials['Color texture']}
        position={[371.291, 8.688, -190.925]}
        rotation={[-Math.PI, 0.789, -Math.PI]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232527.geometry}
        material={materials['Color texture']}
        position={[368.622, 7.521, -181.636]}
        rotation={[-Math.PI, 0.87, -Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032528.geometry}
        material={materials['Color texture']}
        position={[364.18, 7.091, -174.689]}
        rotation={[0, -1.022, 0]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022529.geometry}
        material={materials['Color texture']}
        position={[363.588, 6.908, -161.058]}
        rotation={[-Math.PI, 0.176, -Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042530.geometry}
        material={materials['Color texture']}
        position={[268.016, 37.645, -90.271]}
        rotation={[0, 1.182, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032531.geometry}
        material={materials['Color texture']}
        position={[295.528, 11.013, -54.395]}
        rotation={[Math.PI, -1.371, Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242532.geometry}
        material={materials['Color texture']}
        position={[294.503, 11.081, -54.306]}
        rotation={[Math.PI, -1.531, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022533.geometry}
        material={materials['Color texture']}
        position={[291.455, 17.529, -65.433]}
        rotation={[0, -1.018, 0]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232534.geometry}
        material={materials['Color texture']}
        position={[267.296, 23.558, -61.912]}
        rotation={[0, -0.548, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252535.geometry}
        material={materials['Color texture']}
        position={[265.309, 23.626, -61.067]}
        rotation={[0, 1.426, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042536.geometry}
        material={materials['Color texture']}
        position={[258.142, 26.085, -56.61]}
        rotation={[0, 1.022, 0]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032537.geometry}
        material={materials['Color texture']}
        position={[190.524, 22.455, -77.008]}
        rotation={[0, -0.01, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252538.geometry}
        material={materials['Color texture']}
        position={[303.389, 37.566, -145.198]}
        rotation={[-Math.PI, 0.253, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232539.geometry}
        material={materials['Color texture']}
        position={[302.602, 37.606, -145.49]}
        rotation={[-Math.PI, 0.506, -Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042540.geometry}
        material={materials['Color texture']}
        position={[295.861, 37.266, -146.327]}
        rotation={[Math.PI, -1.058, Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022541.geometry}
        material={materials['Color texture']}
        position={[324.629, 5.649, -208.77]}
        rotation={[Math.PI, -1.046, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242542.geometry}
        material={materials['Color texture']}
        position={[326.587, 7.121, -203.742]}
        rotation={[-Math.PI, 0.789, -Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262543.geometry}
        material={materials['Color texture']}
        position={[332.102, 6.461, -208.923]}
        rotation={[-Math.PI, 1.143, -Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032544.geometry}
        material={materials['Color texture']}
        position={[144.538, 8.541, -142.561]}
        rotation={[0, -0.317, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042545.geometry}
        material={materials['Color texture']}
        position={[140.061, 8.541, -143.68]}
        rotation={[Math.PI, -1.346, Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022546.geometry}
        material={materials['Color texture']}
        position={[191.169, 14.124, -5.651]}
        rotation={[0, -1.31, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022547.geometry}
        material={materials['Color texture']}
        position={[194.004, 14.203, -10.497]}
        rotation={[Math.PI, -1.178, Math.PI]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022548.geometry}
        material={materials['Color texture']}
        position={[194.004, 13.913, -10.497]}
        rotation={[0, 0.114, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032549.geometry}
        material={materials['Color texture']}
        position={[191.087, 32.202, -44.172]}
        rotation={[-Math.PI, 0.097, -Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042550.geometry}
        material={materials['Color texture']}
        position={[190.971, 32.413, -42.385]}
        rotation={[Math.PI, -0.915, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032551.geometry}
        material={materials['Color texture']}
        position={[322.11, 0, -33.257]}
        rotation={[0, -1.094, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252552.geometry}
        material={materials['Color texture']}
        position={[333.302, 0, -44.822]}
        rotation={[0, -1.463, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242553.geometry}
        material={materials['Color texture']}
        position={[402.316, 0.235, -207.472]}
        rotation={[-Math.PI, 1.435, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032554.geometry}
        material={materials['Color texture']}
        position={[404.928, 1.531, -203.742]}
        rotation={[Math.PI, -0.894, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022555.geometry}
        material={materials['Color texture']}
        position={[407.166, 1.802, -198.146]}
        rotation={[Math.PI, -1.085, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252556.geometry}
        material={materials['Color texture']}
        position={[245.759, 23.603, -155.973]}
        rotation={[0, -0.959, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042557.geometry}
        material={materials['Color texture']}
        position={[244.041, 27.342, -151.954]}
        rotation={[0, -0.973, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232558.geometry}
        material={materials['Color texture']}
        position={[239.955, 26.766, -151.546]}
        rotation={[-Math.PI, 0.681, -Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022559.geometry}
        material={materials['Color texture']}
        position={[239.577, 29.395, -148.007]}
        rotation={[0, 0.088, 0]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242560.geometry}
        material={materials['Color texture']}
        position={[231.949, 28.749, -147.929]}
        rotation={[Math.PI, -1.305, Math.PI]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022561.geometry}
        material={materials['Color texture']}
        position={[227.193, 30.394, -144.467]}
        rotation={[-Math.PI, 0.806, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042562.geometry}
        material={materials['Color texture']}
        position={[229.314, 31.512, -138.761]}
        rotation={[Math.PI, -0.413, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242563.geometry}
        material={materials['Color texture']}
        position={[232.87, 31.045, -142.794]}
        rotation={[0, 0.462, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232564.geometry}
        material={materials['Color texture']}
        position={[250.35, 22.789, -155.02]}
        rotation={[Math.PI, -0.752, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042565.geometry}
        material={materials['Color texture']}
        position={[263.385, 21.632, -162.401]}
        rotation={[Math.PI, -1.383, Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022566.geometry}
        material={materials['Color texture']}
        position={[312.892, 25.01, -161.709]}
        rotation={[-Math.PI, 1.301, -Math.PI]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032567.geometry}
        material={materials['Color texture']}
        position={[310.466, 27.15, -163.289]}
        rotation={[Math.PI, -1.11, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042568.geometry}
        material={materials['Color texture']}
        position={[307.831, 25.016, -167.87]}
        rotation={[0, -1.342, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022569.geometry}
        material={materials['Color texture']}
        position={[189.756, 29.048, -108.889]}
        rotation={[0, 0.49, 0]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262570.geometry}
        material={materials['Color texture']}
        position={[185.203, 28.726, -111.226]}
        rotation={[0, 1.059, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252571.geometry}
        material={materials['Color texture']}
        position={[190.31, 29.659, -115.898]}
        rotation={[0, -0.062, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042572.geometry}
        material={materials['Color texture']}
        position={[181.079, 30.817, -114.479]}
        rotation={[0, -0.549, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242573.geometry}
        material={materials['Color texture']}
        position={[155.662, 15.941, -122.705]}
        rotation={[Math.PI, -0.722, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232574.geometry}
        material={materials['Color texture']}
        position={[192.745, 21.855, -140.502]}
        rotation={[Math.PI, -0.822, Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022575.geometry}
        material={materials['Color texture']}
        position={[192.745, 21.773, -140.502]}
        rotation={[Math.PI, -1.034, Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022576.geometry}
        material={materials['Color texture']}
        position={[114.427, 7.897, -109.526]}
        rotation={[-Math.PI, 0.307, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262577.geometry}
        material={materials['Color texture']}
        position={[115.309, 7.894, -110.122]}
        rotation={[0, -1.557, 0]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252578.geometry}
        material={materials['Color texture']}
        position={[411.743, 0, -23.331]}
        rotation={[0, -0.201, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262579.geometry}
        material={materials['Color texture']}
        position={[413.841, 0, -24.59]}
        rotation={[Math.PI, -0.191, Math.PI]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022580.geometry}
        material={materials['Color texture']}
        position={[415.52, 0, -25.43]}
        rotation={[0, 0.622, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232581.geometry}
        material={materials['Color texture']}
        position={[416.989, 0, -26.059]}
        rotation={[-Math.PI, 0.307, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022582.geometry}
        material={materials['Color texture']}
        position={[418.877, 0, -27.108]}
        rotation={[-Math.PI, 0.699, -Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022583.geometry}
        material={materials['Color texture']}
        position={[420.556, 0, -27.948]}
        rotation={[0, 1.522, 0]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252584.geometry}
        material={materials['Color texture']}
        position={[422.654, 0, -28.997]}
        rotation={[0, -0.22, 0]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042585.geometry}
        material={materials['Color texture']}
        position={[424.543, 0, -30.466]}
        rotation={[Math.PI, -0.649, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232586.geometry}
        material={materials['Color texture']}
        position={[426.012, 0, -30.886]}
        rotation={[0, 1.473, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022587.geometry}
        material={materials['Color texture']}
        position={[427.481, 0, -31.725]}
        rotation={[Math.PI, -0.065, Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032588.geometry}
        material={materials['Color texture']}
        position={[429.999, 0, -32.564]}
        rotation={[Math.PI, -1.269, Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252589.geometry}
        material={materials['Color texture']}
        position={[431.048, 0, -33.613]}
        rotation={[Math.PI, -0.901, Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022590.geometry}
        material={materials['Color texture']}
        position={[433.356, 0, -34.453]}
        rotation={[-Math.PI, 1.096, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022591.geometry}
        material={materials['Color texture']}
        position={[434.825, 0, -35.082]}
        rotation={[-Math.PI, 1.294, -Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022592.geometry}
        material={materials['Color texture']}
        position={[428.74, 0, -32.145]}
        rotation={[-Math.PI, 0.669, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232593.geometry}
        material={materials['Color texture']}
        position={[415.94, 0, -18.085]}
        rotation={[0, 1.163, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022594.geometry}
        material={materials['Color texture']}
        position={[418.038, 0, -19.344]}
        rotation={[-Math.PI, 0.425, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252595.geometry}
        material={materials['Color texture']}
        position={[419.717, 0, -20.184]}
        rotation={[0, -1.211, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022596.geometry}
        material={materials['Color texture']}
        position={[421.186, 0, -20.813]}
        rotation={[0, 0.939, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232597.geometry}
        material={materials['Color texture']}
        position={[423.074, 0, -21.862]}
        rotation={[-Math.PI, 0.981, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242598.geometry}
        material={materials['Color texture']}
        position={[424.753, 0, -22.702]}
        rotation={[Math.PI, -0.699, Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252599.geometry}
        material={materials['Color texture']}
        position={[426.851, 0, -23.751]}
        rotation={[0, 1.225, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242600.geometry}
        material={materials['Color texture']}
        position={[428.74, 0, -25.22]}
        rotation={[Math.PI, -0.539, Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252601.geometry}
        material={materials['Color texture']}
        position={[430.209, 0, -25.639]}
        rotation={[0, -1.488, 0]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022602.geometry}
        material={materials['Color texture']}
        position={[431.678, 0, -26.479]}
        rotation={[0, 0.771, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022603.geometry}
        material={materials['Color texture']}
        position={[434.196, 0, -27.318]}
        rotation={[Math.PI, -0.362, Math.PI]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232604.geometry}
        material={materials['Color texture']}
        position={[435.245, 0, -28.367]}
        rotation={[0, -0.822, 0]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022605.geometry}
        material={materials['Color texture']}
        position={[437.553, 0, -29.207]}
        rotation={[0, 0.01, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242606.geometry}
        material={materials['Color texture']}
        position={[439.022, 0, -29.836]}
        rotation={[Math.PI, -0.668, Math.PI]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242607.geometry}
        material={materials['Color texture']}
        position={[432.937, 0, -26.899]}
        rotation={[Math.PI, -1.223, Math.PI]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242608.geometry}
        material={materials['Color texture']}
        position={[414.051, 0, -17.036]}
        rotation={[Math.PI, -1.441, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032609.geometry}
        material={materials['Color texture']}
        position={[421.605, 0, -13.469]}
        rotation={[Math.PI, -0.367, Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022610.geometry}
        material={materials['Color texture']}
        position={[423.704, 0, -14.728]}
        rotation={[0, -0.966, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032611.geometry}
        material={materials['Color texture']}
        position={[425.382, 0, -15.567]}
        rotation={[0, 1.428, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022612.geometry}
        material={materials['Color texture']}
        position={[426.851, 0, -16.197]}
        rotation={[0, -1.284, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252613.geometry}
        material={materials['Color texture']}
        position={[428.74, 0, -17.246]}
        rotation={[0, 1.458, 0]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252614.geometry}
        material={materials['Color texture']}
        position={[430.419, 0, -18.085]}
        rotation={[0, -0.308, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042615.geometry}
        material={materials['Color texture']}
        position={[432.517, 0, -19.134]}
        rotation={[Math.PI, -0.189, Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252616.geometry}
        material={materials['Color texture']}
        position={[434.406, 0, -20.603]}
        rotation={[0, 0.641, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022617.geometry}
        material={materials['Color texture']}
        position={[435.874, 0, -21.023]}
        rotation={[0, -1.543, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022618.geometry}
        material={materials['Color texture']}
        position={[437.343, 0, -21.862]}
        rotation={[0, 1.113, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232619.geometry}
        material={materials['Color texture']}
        position={[439.861, 0, -22.702]}
        rotation={[0, 1.213, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032620.geometry}
        material={materials['Color texture']}
        position={[440.911, 0, -23.751]}
        rotation={[Math.PI, -1.036, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232621.geometry}
        material={materials['Color texture']}
        position={[443.219, 0, -24.59]}
        rotation={[Math.PI, -0.802, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242622.geometry}
        material={materials['Color texture']}
        position={[444.688, 0, -25.22]}
        rotation={[Math.PI, -1.386, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262623.geometry}
        material={materials['Color texture']}
        position={[438.602, 0, -22.282]}
        rotation={[0, -0.684, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262624.geometry}
        material={materials['Color texture']}
        position={[419.717, 0, -12.419]}
        rotation={[Math.PI, -0.852, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042625.geometry}
        material={materials['Color texture']}
        position={[426.222, 0, -7.803]}
        rotation={[-Math.PI, 0.644, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022626.geometry}
        material={materials['Color texture']}
        position={[428.32, 0, -9.062]}
        rotation={[0, -1.342, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232627.geometry}
        material={materials['Color texture']}
        position={[429.999, 0, -9.901]}
        rotation={[0, -0.623, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022628.geometry}
        material={materials['Color texture']}
        position={[431.468, 0, -10.531]}
        rotation={[0, -1.253, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022629.geometry}
        material={materials['Color texture']}
        position={[433.356, 0, -11.58]}
        rotation={[-Math.PI, 0.268, -Math.PI]}
        scale={0.997}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042630.geometry}
        material={materials['Color texture']}
        position={[435.035, 0, -12.419]}
        rotation={[Math.PI, -1.498, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262631.geometry}
        material={materials['Color texture']}
        position={[437.134, 0, -13.469]}
        rotation={[-Math.PI, 0.437, -Math.PI]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042632.geometry}
        material={materials['Color texture']}
        position={[439.022, 0, -14.938]}
        rotation={[0, 1.221, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242633.geometry}
        material={materials['Color texture']}
        position={[440.491, 0, -15.357]}
        rotation={[0, -0.527, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042634.geometry}
        material={materials['Color texture']}
        position={[441.96, 0, -16.197]}
        rotation={[-Math.PI, 1.252, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232635.geometry}
        material={materials['Color texture']}
        position={[444.478, 0, -17.036]}
        rotation={[0, -1.554, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022636.geometry}
        material={materials['Color texture']}
        position={[445.527, 0, -18.085]}
        rotation={[Math.PI, -0.787, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022637.geometry}
        material={materials['Color texture']}
        position={[447.835, 0, -18.925]}
        rotation={[0, 0.469, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232638.geometry}
        material={materials['Color texture']}
        position={[449.304, 0, -19.554]}
        rotation={[Math.PI, -1.526, Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042639.geometry}
        material={materials['Color texture']}
        position={[443.219, 0, -16.616]}
        rotation={[Math.PI, -0.682, Math.PI]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022640.geometry}
        material={materials['Color texture']}
        position={[424.333, 0, -6.754]}
        rotation={[0, -0.849, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032641.geometry}
        material={materials['Color texture']}
        position={[405.657, 0, 23.044]}
        rotation={[0, 0.207, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042642.geometry}
        material={materials['Color texture']}
        position={[407.546, 0, 21.994]}
        rotation={[Math.PI, -1.514, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032643.geometry}
        material={materials['Color texture']}
        position={[409.644, 0, 20.735]}
        rotation={[Math.PI, -0.668, Math.PI]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032644.geometry}
        material={materials['Color texture']}
        position={[411.323, 0, 19.896]}
        rotation={[0, 1.025, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262645.geometry}
        material={materials['Color texture']}
        position={[412.792, 0, 19.267]}
        rotation={[Math.PI, -0.279, Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262646.geometry}
        material={materials['Color texture']}
        position={[414.68, 0, 18.217]}
        rotation={[0, -1.385, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042647.geometry}
        material={materials['Color texture']}
        position={[416.359, 0, 17.378]}
        rotation={[0, 0.183, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022648.geometry}
        material={materials['Color texture']}
        position={[418.458, 0, 16.329]}
        rotation={[0, 0.751, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032649.geometry}
        material={materials['Color texture']}
        position={[420.346, 0, 14.86]}
        rotation={[0, 0.885, 0]}
        scale={0.924}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022650.geometry}
        material={materials['Color texture']}
        position={[421.815, 0, 14.44]}
        rotation={[Math.PI, -0.082, Math.PI]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242651.geometry}
        material={materials['Color texture']}
        position={[423.284, 0, 13.601]}
        rotation={[0, -1.208, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042652.geometry}
        material={materials['Color texture']}
        position={[425.802, 0, 12.761]}
        rotation={[0, 0.656, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232653.geometry}
        material={materials['Color texture']}
        position={[426.851, 0, 11.712]}
        rotation={[-Math.PI, 0.564, -Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042654.geometry}
        material={materials['Color texture']}
        position={[429.16, 0, 10.873]}
        rotation={[0, 0.5, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242655.geometry}
        material={materials['Color texture']}
        position={[430.628, 0, 10.243]}
        rotation={[Math.PI, -1.163, Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262656.geometry}
        material={materials['Color texture']}
        position={[424.543, 0, 13.181]}
        rotation={[0, 0.829, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022657.geometry}
        material={materials['Color texture']}
        position={[411.743, 0, 27.241]}
        rotation={[0, -0.138, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032658.geometry}
        material={materials['Color texture']}
        position={[413.841, 0, 25.981]}
        rotation={[Math.PI, -1.498, Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232659.geometry}
        material={materials['Color texture']}
        position={[415.52, 0, 25.142]}
        rotation={[0, -1.006, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232660.geometry}
        material={materials['Color texture']}
        position={[416.989, 0, 24.513]}
        rotation={[0, -0.107, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232661.geometry}
        material={materials['Color texture']}
        position={[418.877, 0, 23.463]}
        rotation={[Math.PI, -0.454, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022662.geometry}
        material={materials['Color texture']}
        position={[420.556, 0, 22.624]}
        rotation={[Math.PI, -0.836, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232663.geometry}
        material={materials['Color texture']}
        position={[422.654, 0, 21.575]}
        rotation={[0, -0.717, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022664.geometry}
        material={materials['Color texture']}
        position={[424.543, 0, 20.106]}
        rotation={[Math.PI, -0.385, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022665.geometry}
        material={materials['Color texture']}
        position={[426.012, 0, 19.686]}
        rotation={[0, -1.268, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032666.geometry}
        material={materials['Color texture']}
        position={[427.481, 0, 18.847]}
        rotation={[0, 0.296, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032667.geometry}
        material={materials['Color texture']}
        position={[429.999, 0, 18.008]}
        rotation={[Math.PI, -0.946, Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242668.geometry}
        material={materials['Color texture']}
        position={[431.048, 0, 16.958]}
        rotation={[Math.PI, -0.474, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022669.geometry}
        material={materials['Color texture']}
        position={[433.356, 0, 16.119]}
        rotation={[0, -1.325, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042670.geometry}
        material={materials['Color texture']}
        position={[434.825, 0, 15.489]}
        rotation={[Math.PI, -0.363, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232671.geometry}
        material={materials['Color texture']}
        position={[428.74, 0, 18.427]}
        rotation={[-Math.PI, 1.113, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022672.geometry}
        material={materials['Color texture']}
        position={[409.854, 0, 28.29]}
        rotation={[-Math.PI, 0.598, -Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232673.geometry}
        material={materials['Color texture']}
        position={[417.408, 0, 31.857]}
        rotation={[0, 0.233, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232674.geometry}
        material={materials['Color texture']}
        position={[419.507, 0, 30.598]}
        rotation={[0, -1.361, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042675.geometry}
        material={materials['Color texture']}
        position={[421.186, 0, 29.759]}
        rotation={[0, 0.758, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262676.geometry}
        material={materials['Color texture']}
        position={[422.654, 0, 29.129]}
        rotation={[0, -0.173, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032677.geometry}
        material={materials['Color texture']}
        position={[424.543, 0, 28.08]}
        rotation={[0, 0.858, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262678.geometry}
        material={materials['Color texture']}
        position={[426.222, 0, 27.241]}
        rotation={[0, -0.026, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022679.geometry}
        material={materials['Color texture']}
        position={[428.32, 0, 26.191]}
        rotation={[0, 0.397, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242680.geometry}
        material={materials['Color texture']}
        position={[430.209, 0, 24.722]}
        rotation={[-Math.PI, 1.497, -Math.PI]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252681.geometry}
        material={materials['Color texture']}
        position={[431.678, 0, 24.303]}
        rotation={[0, -0.089, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022682.geometry}
        material={materials['Color texture']}
        position={[433.147, 0, 23.463]}
        rotation={[0, -1.219, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032683.geometry}
        material={materials['Color texture']}
        position={[435.665, 0, 22.624]}
        rotation={[Math.PI, -0.995, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022684.geometry}
        material={materials['Color texture']}
        position={[436.714, 0, 21.575]}
        rotation={[-Math.PI, 0.712, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232685.geometry}
        material={materials['Color texture']}
        position={[439.022, 0, 20.735]}
        rotation={[Math.PI, -0.635, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042686.geometry}
        material={materials['Color texture']}
        position={[440.491, 0, 20.106]}
        rotation={[0, -0.424, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032687.geometry}
        material={materials['Color texture']}
        position={[434.406, 0, 23.044]}
        rotation={[0, 1.564, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252688.geometry}
        material={materials['Color texture']}
        position={[415.52, 0, 32.906]}
        rotation={[Math.PI, -0.403, Math.PI]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022689.geometry}
        material={materials['Color texture']}
        position={[422.025, 0, 37.523]}
        rotation={[0, -1.052, 0]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232690.geometry}
        material={materials['Color texture']}
        position={[424.123, 0, 36.264]}
        rotation={[-Math.PI, 0.902, -Math.PI]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032691.geometry}
        material={materials['Color texture']}
        position={[425.802, 0, 35.424]}
        rotation={[0, -1.264, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022692.geometry}
        material={materials['Color texture']}
        position={[427.271, 0, 34.795]}
        rotation={[0, 0.914, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232693.geometry}
        material={materials['Color texture']}
        position={[429.16, 0, 33.746]}
        rotation={[0, -0.48, 0]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042694.geometry}
        material={materials['Color texture']}
        position={[430.838, 0, 32.906]}
        rotation={[0, 1.239, 0]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242695.geometry}
        material={materials['Color texture']}
        position={[432.937, 0, 31.857]}
        rotation={[0, 0.316, 0]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262696.geometry}
        material={materials['Color texture']}
        position={[434.825, 0, 30.388]}
        rotation={[0, -1.412, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252697.geometry}
        material={materials['Color texture']}
        position={[436.294, 0, 29.968]}
        rotation={[Math.PI, -1.452, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032698.geometry}
        material={materials['Color texture']}
        position={[437.763, 0, 29.129]}
        rotation={[0, 1.323, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252699.geometry}
        material={materials['Color texture']}
        position={[440.281, 0, 28.29]}
        rotation={[0, 0.509, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252700.geometry}
        material={materials['Color texture']}
        position={[441.33, 0, 27.241]}
        rotation={[0, 0.305, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232701.geometry}
        material={materials['Color texture']}
        position={[443.639, 0, 26.401]}
        rotation={[0, 0.01, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262702.geometry}
        material={materials['Color texture']}
        position={[445.107, 0, 25.772]}
        rotation={[0, 0.612, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042703.geometry}
        material={materials['Color texture']}
        position={[439.022, 0, 28.709]}
        rotation={[Math.PI, -1.27, Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252704.geometry}
        material={materials['Color texture']}
        position={[420.136, 0, 38.572]}
        rotation={[-Math.PI, 0.405, -Math.PI]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022705.geometry}
        material={materials['Color texture']}
        position={[341.026, 0, -36.132]}
        rotation={[-Math.PI, 0.343, -Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022706.geometry}
        material={materials['Color texture']}
        position={[342.915, 0, -37.181]}
        rotation={[Math.PI, -1.035, Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242707.geometry}
        material={materials['Color texture']}
        position={[345.013, 0, -38.44]}
        rotation={[0, 1.472, 0]}
        scale={0.948}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262708.geometry}
        material={materials['Color texture']}
        position={[346.692, 0, -39.279]}
        rotation={[Math.PI, -1.101, Math.PI]}
        scale={0.914}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242709.geometry}
        material={materials['Color texture']}
        position={[348.161, 0, -39.909]}
        rotation={[Math.PI, -1.151, Math.PI]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042710.geometry}
        material={materials['Color texture']}
        position={[350.049, 0, -40.958]}
        rotation={[-Math.PI, 0.697, -Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252711.geometry}
        material={materials['Color texture']}
        position={[351.728, 0, -41.797]}
        rotation={[-Math.PI, 0.123, -Math.PI]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032712.geometry}
        material={materials['Color texture']}
        position={[353.826, 0, -42.846]}
        rotation={[Math.PI, -0.178, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022713.geometry}
        material={materials['Color texture']}
        position={[355.715, 0, -44.315]}
        rotation={[0, -0.254, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232714.geometry}
        material={materials['Color texture']}
        position={[357.184, 0, -44.735]}
        rotation={[0, -1.077, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022715.geometry}
        material={materials['Color texture']}
        position={[358.653, 0, -45.574]}
        rotation={[0, 1.532, 0]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032716.geometry}
        material={materials['Color texture']}
        position={[361.171, 0, -46.414]}
        rotation={[Math.PI, -1.508, Math.PI]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232717.geometry}
        material={materials['Color texture']}
        position={[362.22, 0, -47.463]}
        rotation={[-Math.PI, 1.226, -Math.PI]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042718.geometry}
        material={materials['Color texture']}
        position={[364.528, 0, -48.302]}
        rotation={[Math.PI, -1.251, Math.PI]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032719.geometry}
        material={materials['Color texture']}
        position={[365.997, 0, -48.932]}
        rotation={[0, 0.925, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022720.geometry}
        material={materials['Color texture']}
        position={[359.912, 0, -45.994]}
        rotation={[Math.PI, -1.532, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032721.geometry}
        material={materials['Color texture']}
        position={[347.112, 0, -31.935]}
        rotation={[0, 0.042, 0]}
        scale={0.963}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022722.geometry}
        material={materials['Color texture']}
        position={[349.21, 0, -33.194]}
        rotation={[Math.PI, -1.227, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022723.geometry}
        material={materials['Color texture']}
        position={[350.889, 0, -34.033]}
        rotation={[Math.PI, -0.769, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022724.geometry}
        material={materials['Color texture']}
        position={[352.358, 0, -34.663]}
        rotation={[0, 0.015, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252725.geometry}
        material={materials['Color texture']}
        position={[354.246, 0, -35.712]}
        rotation={[0, -0.617, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022726.geometry}
        material={materials['Color texture']}
        position={[355.925, 0, -36.551]}
        rotation={[0, 0.873, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022727.geometry}
        material={materials['Color texture']}
        position={[358.023, 0, -37.6]}
        rotation={[0, -1.296, 0]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252728.geometry}
        material={materials['Color texture']}
        position={[359.912, 0, -39.069]}
        rotation={[0, -0.873, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252729.geometry}
        material={materials['Color texture']}
        position={[361.381, 0, -39.489]}
        rotation={[-Math.PI, 0.391, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042730.geometry}
        material={materials['Color texture']}
        position={[362.85, 0, -40.328]}
        rotation={[Math.PI, -0.605, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242731.geometry}
        material={materials['Color texture']}
        position={[365.368, 0, -41.168]}
        rotation={[0, -0.118, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032732.geometry}
        material={materials['Color texture']}
        position={[366.417, 0, -42.217]}
        rotation={[0, 1.309, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042733.geometry}
        material={materials['Color texture']}
        position={[368.725, 0, -43.056]}
        rotation={[Math.PI, -0.798, Math.PI]}
        scale={0.869}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042734.geometry}
        material={materials['Color texture']}
        position={[370.194, 0, -43.686]}
        rotation={[0, 0.127, 0]}
        scale={0.913}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242735.geometry}
        material={materials['Color texture']}
        position={[364.109, 0, -40.748]}
        rotation={[-Math.PI, 1.439, -Math.PI]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252736.geometry}
        material={materials['Color texture']}
        position={[345.223, 0, -30.886]}
        rotation={[0, -0.747, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032737.geometry}
        material={materials['Color texture']}
        position={[389.937, 0, 11.505]}
        rotation={[-Math.PI, 1.473, -Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032738.geometry}
        material={materials['Color texture']}
        position={[388.238, 0, 10.17]}
        rotation={[0, 0.881, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252739.geometry}
        material={materials['Color texture']}
        position={[367.379, 0, -7.854]}
        rotation={[0, 0.352, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022740.geometry}
        material={materials['Color texture']}
        position={[365.745, 0, -9.636]}
        rotation={[Math.PI, -1.514, Math.PI]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022741.geometry}
        material={materials['Color texture']}
        position={[364.549, 0, -11.283]}
        rotation={[Math.PI, -0.857, Math.PI]}
        scale={0.844}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252742.geometry}
        material={materials['Color texture']}
        position={[381.992, 0, 5.056]}
        rotation={[Math.PI, -0.213, Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022743.geometry}
        material={materials['Color texture']}
        position={[380.568, 0, 3.833]}
        rotation={[Math.PI, -1.179, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022744.geometry}
        material={materials['Color texture']}
        position={[378.788, 0, 2.305]}
        rotation={[0, -1.295, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242745.geometry}
        material={materials['Color texture']}
        position={[376.702, 0, 1.133]}
        rotation={[Math.PI, -0.616, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232746.geometry}
        material={materials['Color texture']}
        position={[375.746, 0, -0.059]}
        rotation={[0, -0.939, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232747.geometry}
        material={materials['Color texture']}
        position={[374.404, 0, -1.088]}
        rotation={[Math.PI, -1.139, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022748.geometry}
        material={materials['Color texture']}
        position={[372.654, 0, -3.084]}
        rotation={[0, 0.983, 0]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042749.geometry}
        material={materials['Color texture']}
        position={[371.281, 0, -3.645]}
        rotation={[Math.PI, -0.776, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252750.geometry}
        material={materials['Color texture']}
        position={[369.613, 0, -5.448]}
        rotation={[0, -1.554, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232751.geometry}
        material={materials['Color texture']}
        position={[368.463, 0, -6.559]}
        rotation={[Math.PI, -1.453, Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042752.geometry}
        material={materials['Color texture']}
        position={[373.529, 0, -2.086]}
        rotation={[0, -0.836, 0]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232753.geometry}
        material={materials['Color texture']}
        position={[370.535, 0, -13.987]}
        rotation={[0, -0.602, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032754.geometry}
        material={materials['Color texture']}
        position={[368.118, 0, -16.949]}
        rotation={[Math.PI, -0.371, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022755.geometry}
        material={materials['Color texture']}
        position={[388.051, 0, 1.6]}
        rotation={[0, 1, 0]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232756.geometry}
        material={materials['Color texture']}
        position={[386.902, 0, 0.489]}
        rotation={[-Math.PI, 1.155, -Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022757.geometry}
        material={materials['Color texture']}
        position={[385.203, 0, -0.845]}
        rotation={[Math.PI, -0.794, Math.PI]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022758.geometry}
        material={materials['Color texture']}
        position={[383.779, 0, -2.068]}
        rotation={[-Math.PI, 0.211, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022759.geometry}
        material={materials['Color texture']}
        position={[381.999, 0, -3.596]}
        rotation={[-Math.PI, 0.291, -Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022760.geometry}
        material={materials['Color texture']}
        position={[379.913, 0, -4.768]}
        rotation={[0, 1.13, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262761.geometry}
        material={materials['Color texture']}
        position={[378.957, 0, -5.96]}
        rotation={[0, 0.892, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232762.geometry}
        material={materials['Color texture']}
        position={[377.615, 0, -6.989]}
        rotation={[0, 1.323, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042763.geometry}
        material={materials['Color texture']}
        position={[375.865, 0, -8.986]}
        rotation={[-Math.PI, 0.064, -Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042764.geometry}
        material={materials['Color texture']}
        position={[374.492, 0, -9.546]}
        rotation={[0, 1.424, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042765.geometry}
        material={materials['Color texture']}
        position={[372.824, 0, -11.349]}
        rotation={[Math.PI, -0.801, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242766.geometry}
        material={materials['Color texture']}
        position={[371.674, 0, -12.46]}
        rotation={[0, 0.157, 0]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022767.geometry}
        material={materials['Color texture']}
        position={[376.74, 0, -7.987]}
        rotation={[0, 0.667, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252768.geometry}
        material={materials['Color texture']}
        position={[369.366, 0, -15.45]}
        rotation={[-Math.PI, 0.885, -Math.PI]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022769.geometry}
        material={materials['Color texture']}
        position={[393.51, 0, -2.742]}
        rotation={[Math.PI, -0.606, Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262770.geometry}
        material={materials['Color texture']}
        position={[391.537, 0, -4.189]}
        rotation={[0, 0.131, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232771.geometry}
        material={materials['Color texture']}
        position={[390.113, 0, -5.412]}
        rotation={[Math.PI, -0.451, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242772.geometry}
        material={materials['Color texture']}
        position={[388.964, 0, -6.522]}
        rotation={[0, -0.356, 0]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022773.geometry}
        material={materials['Color texture']}
        position={[387.265, 0, -7.857]}
        rotation={[0, -0.079, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262774.geometry}
        material={materials['Color texture']}
        position={[385.841, 0, -9.08]}
        rotation={[-Math.PI, 0.439, -Math.PI]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042775.geometry}
        material={materials['Color texture']}
        position={[384.06, 0, -10.608]}
        rotation={[Math.PI, -1.059, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022776.geometry}
        material={materials['Color texture']}
        position={[381.975, 0, -11.78]}
        rotation={[0, 1.055, 0]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022777.geometry}
        material={materials['Color texture']}
        position={[381.019, 0, -12.972]}
        rotation={[Math.PI, -0.78, Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032778.geometry}
        material={materials['Color texture']}
        position={[379.676, 0, -14.001]}
        rotation={[0, 0.177, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232779.geometry}
        material={materials['Color texture']}
        position={[377.927, 0, -15.997]}
        rotation={[0, -0.693, 0]}
        scale={0.995}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042780.geometry}
        material={materials['Color texture']}
        position={[376.553, 0, -16.558]}
        rotation={[Math.PI, -0.573, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022781.geometry}
        material={materials['Color texture']}
        position={[374.885, 0, -18.361]}
        rotation={[0, -1.039, 0]}
        scale={0.848}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032782.geometry}
        material={materials['Color texture']}
        position={[373.736, 0, -19.471]}
        rotation={[-Math.PI, 0.372, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032783.geometry}
        material={materials['Color texture']}
        position={[378.801, 0, -14.999]}
        rotation={[0, 1.141, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042784.geometry}
        material={materials['Color texture']}
        position={[372.546, 0, -20.713]}
        rotation={[Math.PI, -0.787, Math.PI]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232785.geometry}
        material={materials['Color texture']}
        position={[396.946, 0, -9.193]}
        rotation={[Math.PI, -0.653, Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252786.geometry}
        material={materials['Color texture']}
        position={[394.972, 0, -10.64]}
        rotation={[Math.PI, -0.484, Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232787.geometry}
        material={materials['Color texture']}
        position={[393.548, 0, -11.863]}
        rotation={[0, -1.375, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232788.geometry}
        material={materials['Color texture']}
        position={[392.399, 0, -12.973]}
        rotation={[-Math.PI, 0.75, -Math.PI]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032789.geometry}
        material={materials['Color texture']}
        position={[390.7, 0, -14.308]}
        rotation={[0, 0.436, 0]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252790.geometry}
        material={materials['Color texture']}
        position={[389.276, 0, -15.53]}
        rotation={[0, -1.464, 0]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022791.geometry}
        material={materials['Color texture']}
        position={[387.496, 0, -17.058]}
        rotation={[0, 0.348, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022792.geometry}
        material={materials['Color texture']}
        position={[385.41, 0, -18.231]}
        rotation={[0, -1.1, 0]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022793.geometry}
        material={materials['Color texture']}
        position={[384.454, 0, -19.422]}
        rotation={[-Math.PI, 1.291, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042794.geometry}
        material={materials['Color texture']}
        position={[383.111, 0, -20.451]}
        rotation={[0, -1.394, 0]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042795.geometry}
        material={materials['Color texture']}
        position={[381.362, 0, -22.448]}
        rotation={[Math.PI, -1.422, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032796.geometry}
        material={materials['Color texture']}
        position={[379.988, 0, -23.009]}
        rotation={[0, 0.292, 0]}
        scale={0.93}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042797.geometry}
        material={materials['Color texture']}
        position={[378.32, 0, -24.812]}
        rotation={[0, -1.051, 0]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262798.geometry}
        material={materials['Color texture']}
        position={[377.171, 0, -25.922]}
        rotation={[Math.PI, -0.77, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032799.geometry}
        material={materials['Color texture']}
        position={[382.237, 0, -21.45]}
        rotation={[Math.PI, -1.265, Math.PI]}
        scale={0.862}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022800.geometry}
        material={materials['Color texture']}
        position={[398.645, 0, -7.858]}
        rotation={[0, -0.188, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252801.geometry}
        material={materials['Color texture']}
        position={[514.568, 0, -345.279]}
        rotation={[Math.PI, -0.951, Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262802.geometry}
        material={materials['Color texture']}
        position={[444.9, 0, -308.347]}
        rotation={[-Math.PI, 0.528, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042803.geometry}
        material={materials['Color texture']}
        position={[489.806, 0, -302.891]}
        rotation={[0, 1.178, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022804.geometry}
        material={materials['Color texture']}
        position={[477.216, 0, -344.02]}
        rotation={[0, 1.05, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032805.geometry}
        material={materials['Color texture']}
        position={[546.464, 0, -321.777]}
        rotation={[0, -0.933, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032806.geometry}
        material={materials['Color texture']}
        position={[541.427, 0, -350.316]}
        rotation={[Math.PI, -0.882, Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022807.geometry}
        material={materials['Color texture']}
        position={[491.065, 0, -365.004]}
        rotation={[Math.PI, -1.176, Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232808.geometry}
        material={materials['Color texture']}
        position={[441.123, 0, -290.721]}
        rotation={[0, 0.3, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252809.geometry}
        material={materials['Color texture']}
        position={[498.2, 0, -277.291]}
        rotation={[0, 0.288, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042810.geometry}
        material={materials['Color texture']}
        position={[449.936, 0, -251.27]}
        rotation={[Math.PI, -1.509, Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022811.geometry}
        material={materials['Color texture']}
        position={[490.646, 0, -261.343]}
        rotation={[0, 0.033, 0]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042812.geometry}
        material={materials['Color texture']}
        position={[461.268, 0, -220.634]}
        rotation={[0, -0.952, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252813.geometry}
        material={materials['Color texture']}
        position={[505.335, 0, -220.634]}
        rotation={[Math.PI, -0.311, Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262814.geometry}
        material={materials['Color texture']}
        position={[419.719, 0, -313.383]}
        rotation={[Math.PI, -1.301, Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242815.geometry}
        material={materials['Color texture']}
        position={[415.522, 0, -294.078]}
        rotation={[0, 0.823, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022816.geometry}
        material={materials['Color texture']}
        position={[217.432, 0, -352.834]}
        rotation={[Math.PI, -1.412, Math.PI]}
        scale={0.87}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252817.geometry}
        material={materials['Color texture']}
        position={[261.919, 0, -302.472]}
        rotation={[-Math.PI, 0.909, -Math.PI]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242818.geometry}
        material={materials['Color texture']}
        position={[306.825, 0, -330.171]}
        rotation={[-Math.PI, 0.396, -Math.PI]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262819.geometry}
        material={materials['Color texture']}
        position={[283.742, 0, -356.191]}
        rotation={[-Math.PI, 0.834, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262820.geometry}
        material={materials['Color texture']}
        position={[240.515, 0, -328.492]}
        rotation={[Math.PI, -0.787, Math.PI]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252821.geometry}
        material={materials['Color texture']}
        position={[205.261, 0, -331.849]}
        rotation={[-Math.PI, 1.4, -Math.PI]}
        scale={0.962}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252822.geometry}
        material={materials['Color texture']}
        position={[185.117, 0, -400.258]}
        rotation={[Math.PI, -1.412, Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022823.geometry}
        material={materials['Color texture']}
        position={[227.505, 0, -316.741]}
        rotation={[Math.PI, -0.654, Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032824.geometry}
        material={materials['Color texture']}
        position={[268.634, 0, -297.016]}
        rotation={[Math.PI, -1.059, Math.PI]}
        scale={0.89}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042825.geometry}
        material={materials['Color texture']}
        position={[126.781, 0, -367.942]}
        rotation={[0, 1.06, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042826.geometry}
        material={materials['Color texture']}
        position={[77.678, 0, -359.129]}
        rotation={[0, -0.386, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022827.geometry}
        material={materials['Color texture']}
        position={[71.383, 0, -327.653]}
        rotation={[Math.PI, -0.19, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262828.geometry}
        material={materials['Color texture']}
        position={[151.542, 0, -339.823]}
        rotation={[0, -1.341, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032829.geometry}
        material={materials['Color texture']}
        position={[153.221, 0, -308.767]}
        rotation={[0, -0.463, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032830.geometry}
        material={materials['Color texture']}
        position={[175.044, 0, -320.938]}
        rotation={[-Math.PI, 1.447, -Math.PI]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032831.geometry}
        material={materials['Color texture']}
        position={[237.997, 0, -348.637]}
        rotation={[-Math.PI, 1.164, -Math.PI]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022832.geometry}
        material={materials['Color texture']}
        position={[298.431, 0, -311.705]}
        rotation={[-Math.PI, 0.987, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242833.geometry}
        material={materials['Color texture']}
        position={[-554.569, 0, 294.017]}
        rotation={[-Math.PI, 0.973, -Math.PI]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252834.geometry}
        material={materials['Color texture']}
        position={[-583.947, 0, 301.361]}
        rotation={[0, 0.106, 0]}
        scale={0.858}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232835.geometry}
        material={materials['Color texture']}
        position={[-598.111, 0, 365.888]}
        rotation={[Math.PI, -0.022, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252836.geometry}
        material={materials['Color texture']}
        position={[-625.915, 0, 314.476]}
        rotation={[Math.PI, -0.739, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232837.geometry}
        material={materials['Color texture']}
        position={[-695.687, 0, 334.411]}
        rotation={[0, -0.104, 0]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042838.geometry}
        material={materials['Color texture']}
        position={[-662.113, 0, 411.528]}
        rotation={[0, -1.005, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032839.geometry}
        material={materials['Color texture']}
        position={[-627.489, 0, 384.773]}
        rotation={[Math.PI, -0.725, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262840.geometry}
        material={materials['Color texture']}
        position={[-600.734, 0, 401.036]}
        rotation={[0, -0.984, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242841.geometry}
        material={materials['Color texture']}
        position={[-639.555, 0, 418.348]}
        rotation={[Math.PI, -1.286, Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022842.geometry}
        material={materials['Color texture']}
        position={[-611.226, 0, 384.773]}
        rotation={[0, -0.499, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022843.geometry}
        material={materials['Color texture']}
        position={[-618.046, 0, 369.035]}
        rotation={[-Math.PI, 0.751, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252844.geometry}
        material={materials['Color texture']}
        position={[-613.849, 0, 317.099]}
        rotation={[Math.PI, -0.322, Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252845.geometry}
        material={materials['Color texture']}
        position={[-543.552, 0, 322.87]}
        rotation={[0, 0.543, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032846.geometry}
        material={materials['Color texture']}
        position={[-543.028, 0, 349.1]}
        rotation={[0, -0.501, 0]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252847.geometry}
        material={materials['Color texture']}
        position={[-541.454, 0, 366.412]}
        rotation={[0, -1.014, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022848.geometry}
        material={materials['Color texture']}
        position={[-771.23, 0, 354.871]}
        rotation={[0, 0.086, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262849.geometry}
        material={materials['Color texture']}
        position={[-685.195, 0, 353.822]}
        rotation={[Math.PI, -0.739, Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242850.geometry}
        material={materials['Color texture']}
        position={[-565.061, 0, 313.952]}
        rotation={[-Math.PI, 0.386, -Math.PI]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262851.geometry}
        material={materials['Color texture']}
        position={[-569.258, 0, 300.312]}
        rotation={[0, -0.238, 0]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042852.geometry}
        material={materials['Color texture']}
        position={[-448.599, 0, 324.444]}
        rotation={[0, 0.896, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252853.geometry}
        material={materials['Color texture']}
        position={[-430.238, 0, 318.149]}
        rotation={[-Math.PI, 0.59, -Math.PI]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032854.geometry}
        material={materials['Color texture']}
        position={[-412.401, 0, 272.508]}
        rotation={[-Math.PI, 0.399, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252855.geometry}
        material={materials['Color texture']}
        position={[-415.024, 0, 288.246]}
        rotation={[0, 1.564, 0]}
        scale={0.927}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022856.geometry}
        material={materials['Color texture']}
        position={[-395.09, 0, 338.084]}
        rotation={[0, -0.033, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022857.geometry}
        material={materials['Color texture']}
        position={[-519.421, 0, 316.575]}
        rotation={[0, -0.704, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242858.geometry}
        material={materials['Color texture']}
        position={[-662.637, 0, 457.169]}
        rotation={[0, 0.843, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022859.geometry}
        material={materials['Color texture']}
        position={[-483.018, 0, -55.698]}
        rotation={[0, -0.649, 0]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022860.geometry}
        material={materials['Color texture']}
        position={[-495.609, 0, -43.108]}
        rotation={[Math.PI, -1.471, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032861.geometry}
        material={materials['Color texture']}
        position={[-485.536, 0, -46.885]}
        rotation={[0, 0.54, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022862.geometry}
        material={materials['Color texture']}
        position={[-511.557, 0, -44.367]}
        rotation={[0, -1.445, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022863.geometry}
        material={materials['Color texture']}
        position={[-511.137, 0, -21.284]}
        rotation={[0, -1.488, 0]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232864.geometry}
        material={materials['Color texture']}
        position={[-536.318, 0, 12.29]}
        rotation={[0, 0.235, 0]}
        scale={0.861}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042865.geometry}
        material={materials['Color texture']}
        position={[-589.618, 0, 14.808]}
        rotation={[0, 0.868, 0]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242866.geometry}
        material={materials['Color texture']}
        position={[-579.965, 0, 1.798]}
        rotation={[0, 0.084, 0]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242867.geometry}
        material={materials['Color texture']}
        position={[-587.519, 0, 37.891]}
        rotation={[0, -0.152, 0]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242868.geometry}
        material={materials['Color texture']}
        position={[-573.25, 0, 60.134]}
        rotation={[Math.PI, -0.709, Math.PI]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252869.geometry}
        material={materials['Color texture']}
        position={[-550.587, 0, 35.793]}
        rotation={[Math.PI, -1.393, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232870.geometry}
        material={materials['Color texture']}
        position={[-571.991, 0, -34.714]}
        rotation={[-Math.PI, 0.318, -Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262871.geometry}
        material={materials['Color texture']}
        position={[-521.629, 0, -4.917]}
        rotation={[0, -0.608, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262872.geometry}
        material={materials['Color texture']}
        position={[-514.494, 0, -9.953]}
        rotation={[0, -0.402, 0]}
        scale={0.857}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032873.geometry}
        material={materials['Color texture']}
        position={[-457.418, 0, -149.288]}
        rotation={[Math.PI, -0.634, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242874.geometry}
        material={materials['Color texture']}
        position={[-476.303, 0, -148.868]}
        rotation={[-Math.PI, 1.544, -Math.PI]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242875.geometry}
        material={materials['Color texture']}
        position={[-478.821, 0, -135.438]}
        rotation={[Math.PI, -1.54, Math.PI]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232876.geometry}
        material={materials['Color texture']}
        position={[-514.075, 0, -134.599]}
        rotation={[0, 1.495, 0]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022877.geometry}
        material={materials['Color texture']}
        position={[-502.324, 0, -85.496]}
        rotation={[-Math.PI, 1.007, -Math.PI]}
        scale={0.953}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022878.geometry}
        material={materials['Color texture']}
        position={[-549.328, 0, -90.532]}
        rotation={[0, 0.859, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022879.geometry}
        material={materials['Color texture']}
        position={[-587.1, 0, -92.211]}
        rotation={[Math.PI, -1.259, Math.PI]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262880.geometry}
        material={materials['Color texture']}
        position={[-600.949, 0, -71.227]}
        rotation={[0, -1.459, 0]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262881.geometry}
        material={materials['Color texture']}
        position={[-561.079, 0, -66.19]}
        rotation={[Math.PI, -1.449, Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032882.geometry}
        material={materials['Color texture']}
        position={[-535.059, 0, -76.263]}
        rotation={[0, 0.509, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032883.geometry}
        material={materials['Color texture']}
        position={[-60.444, 0, -201.4]}
        rotation={[Math.PI, -0.206, Math.PI]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242884.geometry}
        material={materials['Color texture']}
        position={[-52.89, 0, -186.712]}
        rotation={[Math.PI, -0.054, Math.PI]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032885.geometry}
        material={materials['Color texture']}
        position={[-31.486, 0, -198.463]}
        rotation={[0, 0.686, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022886.geometry}
        material={materials['Color texture']}
        position={[-20.154, 0, -210.633]}
        rotation={[Math.PI, -0.868, Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042887.geometry}
        material={materials['Color texture']}
        position={[-43.657, 0, -212.312]}
        rotation={[0, 1.462, 0]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252888.geometry}
        material={materials['Color texture']}
        position={[53.793, 0, -191.757]}
        rotation={[-Math.PI, 0.527, -Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032889.geometry}
        material={materials['Color texture']}
        position={[37.426, 0, -224.493]}
        rotation={[0, 0.459, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262890.geometry}
        material={materials['Color texture']}
        position={[25.674, 0, -231.208]}
        rotation={[Math.PI, -0.666, Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252891.geometry}
        material={materials['Color texture']}
        position={[21.897, 0, -238.342]}
        rotation={[Math.PI, -0.673, Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232892.geometry}
        material={materials['Color texture']}
        position={[57.151, 0, -264.782]}
        rotation={[-Math.PI, 0.717, -Math.PI]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022893.geometry}
        material={materials['Color texture']}
        position={[62.606, 0, -267.72]}
        rotation={[Math.PI, -0.256, Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252894.geometry}
        material={materials['Color texture']}
        position={[41.203, 0, -292.901]}
        rotation={[-Math.PI, 0.165, -Math.PI]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252895.geometry}
        material={materials['Color texture']}
        position={[58.41, 0, -281.989]}
        rotation={[Math.PI, -0.316, Math.PI]}
        scale={0.925}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022896.geometry}
        material={materials['Color texture']}
        position={[59.249, 0, -221.555]}
        rotation={[Math.PI, -0.085, Math.PI]}
        scale={0.993}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262897.geometry}
        material={materials['Color texture']}
        position={[78.135, 0, -221.975]}
        rotation={[0, -0.331, 0]}
        scale={0.952}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232898.geometry}
        material={materials['Color texture']}
        position={[29.452, 0, -237.083]}
        rotation={[-Math.PI, 0.565, -Math.PI]}
        scale={0.892}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042899.geometry}
        material={materials['Color texture']}
        position={[40.363, 0, -184.203]}
        rotation={[Math.PI, -0.352, Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252900.geometry}
        material={materials['Color texture']}
        position={[26.514, 0, -259.326]}
        rotation={[0, 1.406, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042901.geometry}
        material={materials['Color texture']}
        position={[-420.905, 0, 62.233]}
        rotation={[Math.PI, -1.031, Math.PI]}
        scale={0.845}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242902.geometry}
        material={materials['Color texture']}
        position={[-364.668, 0, 89.932]}
        rotation={[Math.PI, -0.605, Math.PI]}
        scale={0.933}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242903.geometry}
        material={materials['Color texture']}
        position={[-421.745, 0, 107.978]}
        rotation={[-Math.PI, 0.151, -Math.PI]}
        scale={0.968}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042904.geometry}
        material={materials['Color texture']}
        position={[-441.05, 0, 129.801]}
        rotation={[0, -0.678, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262905.geometry}
        material={materials['Color texture']}
        position={[-349.139, 0, 76.921]}
        rotation={[0, -0.915, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252906.geometry}
        material={materials['Color texture']}
        position={[-346.621, 0, 121.408]}
        rotation={[Math.PI, -1.364, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022907.geometry}
        material={materials['Color texture']}
        position={[-459.516, 0, 89.932]}
        rotation={[0, 0.04, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262908.geometry}
        material={materials['Color texture']}
        position={[-443.988, 0, 59.295]}
        rotation={[0, 0.994, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022909.geometry}
        material={materials['Color texture']}
        position={[-357.113, 0, 50.481]}
        rotation={[-Math.PI, 1.429, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252910.geometry}
        material={materials['Color texture']}
        position={[-400.76, 0, 30.337]}
        rotation={[0, -1.167, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042911.geometry}
        material={materials['Color texture']}
        position={[369.357, 0, -312.124]}
        rotation={[0, -0.581, 0]}
        scale={0.841}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252912.geometry}
        material={materials['Color texture']}
        position={[338.301, 0, -312.544]}
        rotation={[0, 0.45, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252913.geometry}
        material={materials['Color texture']}
        position={[371.875, 0, -275.192]}
        rotation={[Math.PI, -1.455, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262914.geometry}
        material={materials['Color texture']}
        position={[292.136, 0, -299.954]}
        rotation={[0, 1.449, 0]}
        scale={0.984}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032915.geometry}
        material={materials['Color texture']}
        position={[378.171, 0, -328.492]}
        rotation={[0, 1.41, 0]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022916.geometry}
        material={materials['Color texture']}
        position={[308.084, 0, -268.058]}
        rotation={[-Math.PI, 1.38, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262917.geometry}
        material={materials['Color texture']}
        position={[474.278, 0, -237.421]}
        rotation={[0, -0.694, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022918.geometry}
        material={materials['Color texture']}
        position={[449.936, 0, -267.218]}
        rotation={[-Math.PI, 0.471, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262919.geometry}
        material={materials['Color texture']}
        position={[-481.339, 0, -207.623]}
        rotation={[Math.PI, -1.028, Math.PI]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022920.geometry}
        material={materials['Color texture']}
        position={[-477.562, 0, -184.961]}
        rotation={[0, -0.489, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262921.geometry}
        material={materials['Color texture']}
        position={[-445.247, 0, -250.011]}
        rotation={[Math.PI, -0.663, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032922.geometry}
        material={materials['Color texture']}
        position={[-423.423, 0, -272.255]}
        rotation={[0, -0.081, 0]}
        scale={0.941}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032923.geometry}
        material={materials['Color texture']}
        position={[-403.279, 0, -239.1]}
        rotation={[Math.PI, -1.508, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022924.geometry}
        material={materials['Color texture']}
        position={[-379.357, 0, -247.493]}
        rotation={[-Math.PI, 0.616, -Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262925.geometry}
        material={materials['Color texture']}
        position={[527.997, 0, 103.781]}
        rotation={[-Math.PI, 1.274, -Math.PI]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042926.geometry}
        material={materials['Color texture']}
        position={[581.717, 0, 94.968]}
        rotation={[Math.PI, -0.983, Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022927.geometry}
        material={materials['Color texture']}
        position={[531.355, 0, 127.703]}
        rotation={[0, -0.4, 0]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232928.geometry}
        material={materials['Color texture']}
        position={[489.387, 0, 121.828]}
        rotation={[-Math.PI, 0.283, -Math.PI]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242929.geometry}
        material={materials['Color texture']}
        position={[463.786, 0, 110.916]}
        rotation={[0, 0.58, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242930.geometry}
        material={materials['Color texture']}
        position={[488.128, 0, 110.916]}
        rotation={[0, 1.477, 0]}
        scale={0.951}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022931.geometry}
        material={materials['Color texture']}
        position={[514.568, 0, 117.211]}
        rotation={[-Math.PI, 1.039, -Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252932.geometry}
        material={materials['Color texture']}
        position={[634.597, 0, 106.719]}
        rotation={[-Math.PI, 1.41, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022933.geometry}
        material={materials['Color texture']}
        position={[599.763, 0, 96.227]}
        rotation={[Math.PI, -1.38, Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242934.geometry}
        material={materials['Color texture']}
        position={[550.66, 0, 93.289]}
        rotation={[0, -0.866, 0]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262935.geometry}
        material={materials['Color texture']}
        position={[568.707, 0, 132.739]}
        rotation={[0, -1.123, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042936.geometry}
        material={materials['Color texture']}
        position={[505.335, 0, 90.771]}
        rotation={[-Math.PI, 0.359, -Math.PI]}
        scale={0.944}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042937.geometry}
        material={materials['Color texture']}
        position={[-457.808, 0, 166.689]}
        rotation={[0, 0.098, 0]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252938.geometry}
        material={materials['Color texture']}
        position={[-482.989, 0, 144.446]}
        rotation={[-Math.PI, 1.473, -Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022939.geometry}
        material={materials['Color texture']}
        position={[-451.512, 0, 151.161]}
        rotation={[Math.PI, -0.247, Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032940.geometry}
        material={materials['Color texture']}
        position={[-527.055, 0, 63.867]}
        rotation={[0, -1.114, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022941.geometry}
        material={materials['Color texture']}
        position={[-511.107, 0, 73.939]}
        rotation={[Math.PI, -1.167, Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032942.geometry}
        material={materials['Color texture']}
        position={[-535.869, 0, 94.503]}
        rotation={[-Math.PI, 0.748, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262943.geometry}
        material={materials['Color texture']}
        position={[-505.232, 0, 90.726]}
        rotation={[0, -0.877, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232944.geometry}
        material={materials['Color texture']}
        position={[-493.061, 0, 97.861]}
        rotation={[Math.PI, -1.32, Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232945.geometry}
        material={materials['Color texture']}
        position={[-472.497, 0, 167.528]}
        rotation={[-Math.PI, 0.824, -Math.PI]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032946.geometry}
        material={materials['Color texture']}
        position={[-482.569, 0, 123.881]}
        rotation={[Math.PI, -0.96, Math.PI]}
        scale={0.849}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022947.geometry}
        material={materials['Color texture']}
        position={[-514.045, 0, 109.612]}
        rotation={[Math.PI, -0.156, Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022948.geometry}
        material={materials['Color texture']}
        position={[-548.039, 0, 71.841]}
        rotation={[0, -0.173, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032949.geometry}
        material={materials['Color texture']}
        position={[-495.999, 0, 76.037]}
        rotation={[0, -0.626, 0]}
        scale={0.847}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022950.geometry}
        material={materials['Color texture']}
        position={[-515.724, 0, 50.437]}
        rotation={[0, 1.419, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262951.geometry}
        material={materials['Color texture']}
        position={[-487.186, 0, 160.394]}
        rotation={[0, -0.922, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022952.geometry}
        material={materials['Color texture']}
        position={[340.343, 0, 226.153]}
        rotation={[Math.PI, -0.861, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022953.geometry}
        material={materials['Color texture']}
        position={[292.499, 0, 237.904]}
        rotation={[-Math.PI, 0.661, -Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262954.geometry}
        material={materials['Color texture']}
        position={[314.323, 0, 284.909]}
        rotation={[Math.PI, -1.439, Math.PI]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262955.geometry}
        material={materials['Color texture']}
        position={[292.08, 0, 269.8]}
        rotation={[Math.PI, -0.588, Math.PI]}
        scale={0.987}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022956.geometry}
        material={materials['Color texture']}
        position={[328.172, 0, 245.039]}
        rotation={[0, 0.007, 0]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032957.geometry}
        material={materials['Color texture']}
        position={[321.457, 0, 219.858]}
        rotation={[-Math.PI, 0.122, -Math.PI]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022958.geometry}
        material={materials['Color texture']}
        position={[324.815, 0, 212.723]}
        rotation={[-Math.PI, 0.359, -Math.PI]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242959.geometry}
        material={materials['Color texture']}
        position={[316.841, 0, 217.76]}
        rotation={[Math.PI, -0.659, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042960.geometry}
        material={materials['Color texture']}
        position={[289.562, 0, 243.36]}
        rotation={[-Math.PI, 0.834, -Math.PI]}
        scale={0.872}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022961.geometry}
        material={materials['Color texture']}
        position={[286.624, 0, 267.282]}
        rotation={[Math.PI, -1.508, Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042962.geometry}
        material={materials['Color texture']}
        position={[286.624, 0, 274.417]}
        rotation={[0, 0.972, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022963.geometry}
        material={materials['Color texture']}
        position={[389.866, 0, 247.137]}
        rotation={[-Math.PI, 0.532, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042964.geometry}
        material={materials['Color texture']}
        position={[393.643, 0, 251.754]}
        rotation={[Math.PI, -0.789, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232965.geometry}
        material={materials['Color texture']}
        position={[409.591, 0, 245.878]}
        rotation={[0, -0.261, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022966.geometry}
        material={materials['Color texture']}
        position={[318.52, 0, 265.603]}
        rotation={[0, -1.273, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252967.geometry}
        material={materials['Color texture']}
        position={[450.3, 0, 157.745]}
        rotation={[0, 1.492, 0]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262968.geometry}
        material={materials['Color texture']}
        position={[453.658, 0, 151.869]}
        rotation={[0, 1.034, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262969.geometry}
        material={materials['Color texture']}
        position={[460.372, 0, 153.128]}
        rotation={[0, 1.405, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252970.geometry}
        material={materials['Color texture']}
        position={[245.915, 0, 187.542]}
        rotation={[Math.PI, -0.437, Math.PI]}
        scale={0.91}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042971.geometry}
        material={materials['Color texture']}
        position={[242.977, 0, 202.651]}
        rotation={[0, 1.518, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032972.geometry}
        material={materials['Color texture']}
        position={[258.925, 0, 200.133]}
        rotation={[-Math.PI, 0.234, -Math.PI]}
        scale={0.915}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262973.geometry}
        material={materials['Color texture']}
        position={[68.445, 0, -307.508]}
        rotation={[-Math.PI, 1.248, -Math.PI]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242974.geometry}
        material={materials['Color texture']}
        position={[44.103, 0, -314.223]}
        rotation={[-Math.PI, 1.266, -Math.PI]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262975.geometry}
        material={materials['Color texture']}
        position={[85.652, 0, -288.622]}
        rotation={[-Math.PI, 0.974, -Math.PI]}
        scale={0.881}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032976.geometry}
        material={materials['Color texture']}
        position={[-569.024, 0, 84.431]}
        rotation={[Math.PI, -0.396, Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30022977.geometry}
        material={materials['Color texture']}
        position={[-589.588, 0, 78.975]}
        rotation={[0, 0.788, 0]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252978.geometry}
        material={materials['Color texture']}
        position={[-576.578, 0, 77.296]}
        rotation={[Math.PI, -0.669, Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022979.geometry}
        material={materials['Color texture']}
        position={[-216.944, 0, -336.681]}
        rotation={[Math.PI, -0.178, Math.PI]}
        scale={0.886}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232980.geometry}
        material={materials['Color texture']}
        position={[-132.587, 0, -264.915]}
        rotation={[-Math.PI, 1.043, -Math.PI]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242981.geometry}
        material={materials['Color texture']}
        position={[-84.744, 0, -242.672]}
        rotation={[0, -1.01, 0]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242982.geometry}
        material={materials['Color texture']}
        position={[-63.759, 0, -304.366]}
        rotation={[0, -0.131, 0]}
        scale={0.853}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262983.geometry}
        material={materials['Color texture']}
        position={[-182.949, 0, -223.367]}
        rotation={[Math.PI, -0.427, Math.PI]}
        scale={0.871}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232984.geometry}
        material={materials['Color texture']}
        position={[-66.697, 0, -223.787]}
        rotation={[Math.PI, -0.233, Math.PI]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022985.geometry}
        material={materials['Color texture']}
        position={[-246.321, 0, -261.978]}
        rotation={[-Math.PI, 0.051, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252986.geometry}
        material={materials['Color texture']}
        position={[-268.565, 0, -277.506]}
        rotation={[0, 1.207, 0]}
        scale={0.856}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022987.geometry}
        material={materials['Color texture']}
        position={[-250.938, 0, -324.091]}
        rotation={[-Math.PI, 0.856, -Math.PI]}
        scale={0.979}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232988.geometry}
        material={materials['Color texture']}
        position={[-83.485, 0, -340.878]}
        rotation={[Math.PI, -0.833, Math.PI]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042989.geometry}
        material={materials['Color texture']}
        position={[-39.418, 0, -327.029]}
        rotation={[Math.PI, -1.52, Math.PI]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20022990.geometry}
        material={materials['Color texture']}
        position={[22.275, 0, -333.324]}
        rotation={[0, 0.248, 0]}
        scale={0.917}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242991.geometry}
        material={materials['Color texture']}
        position={[-38.578, 0, -277.506]}
        rotation={[Math.PI, -0.428, Math.PI]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0252992.geometry}
        material={materials['Color texture']}
        position={[-33.542, 0, -289.257]}
        rotation={[-Math.PI, 1.238, -Math.PI]}
        scale={0.945}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042993.geometry}
        material={materials['Color texture']}
        position={[-136.365, 0, -344.236]}
        rotation={[0, 1.001, 0]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0232994.geometry}
        material={materials['Color texture']}
        position={[-130.069, 0, -363.961]}
        rotation={[Math.PI, -0.43, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042995.geometry}
        material={materials['Color texture']}
        position={[-187.146, 0, -278.765]}
        rotation={[Math.PI, -0.416, Math.PI]}
        scale={0.874}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20032996.geometry}
        material={materials['Color texture']}
        position={[-206.871, 0, -304.366]}
        rotation={[-Math.PI, 0.757, -Math.PI]}
        scale={0.99}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0242997.geometry}
        material={materials['Color texture']}
        position={[-181.271, 0, -335.422]}
        rotation={[-Math.PI, 1.518, -Math.PI]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0262998.geometry}
        material={materials['Color texture']}
        position={[-129.65, 0, -253.584]}
        rotation={[-Math.PI, 0.052, -Math.PI]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30042999.geometry}
        material={materials['Color texture']}
        position={[-71.733, 0, -278.765]}
        rotation={[Math.PI, -0.533, Math.PI]}
        scale={0.894}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243000.geometry}
        material={materials['Color texture']}
        position={[-59.982, 0, -261.138]}
        rotation={[0, 0.41, 0]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233001.geometry}
        material={materials['Color texture']}
        position={[-89.78, 0, -355.987]}
        rotation={[0, 0.587, 0]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253002.geometry}
        material={materials['Color texture']}
        position={[-174.136, 0, -260.299]}
        rotation={[-Math.PI, 1.104, -Math.PI]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023003.geometry}
        material={materials['Color texture']}
        position={[-232.052, 0, -291.775]}
        rotation={[0, 0.302, 0]}
        scale={0.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043004.geometry}
        material={materials['Color texture']}
        position={[-279.896, 0, -305.625]}
        rotation={[-Math.PI, 0.475, -Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033005.geometry}
        material={materials['Color texture']}
        position={[-322.813, 0, 185.502]}
        rotation={[0, -0.235, 0]}
        scale={0.873}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043006.geometry}
        material={materials['Color texture']}
        position={[-356.388, 0, 213.621]}
        rotation={[0, 0.301, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023007.geometry}
        material={materials['Color texture']}
        position={[-397.097, 0, 188.021]}
        rotation={[0, 0.465, 0]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023008.geometry}
        material={materials['Color texture']}
        position={[-387.024, 0, 167.036]}
        rotation={[0, -1.292, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023009.geometry}
        material={materials['Color texture']}
        position={[-307.285, 0, 228.73]}
        rotation={[Math.PI, -0.804, Math.PI]}
        scale={0.931}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043010.geometry}
        material={materials['Color texture']}
        position={[-272.871, 0, 263.983]}
        rotation={[Math.PI, -1.53, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243011.geometry}
        material={materials['Color texture']}
        position={[-290.078, 0, 284.967]}
        rotation={[0, 0.508, 0]}
        scale={0.965}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023012.geometry}
        material={materials['Color texture']}
        position={[-310.642, 0, 261.465]}
        rotation={[0, 0.899, 0]}
        scale={0.906}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023013.geometry}
        material={materials['Color texture']}
        position={[-336.243, 0, 249.714]}
        rotation={[-Math.PI, 0.867, -Math.PI]}
        scale={0.846}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243014.geometry}
        material={materials['Color texture']}
        position={[-307.704, 0, 198.513]}
        rotation={[0, -0.841, 0]}
        scale={0.852}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243015.geometry}
        material={materials['Color texture']}
        position={[-232.162, 0, 279.931]}
        rotation={[0, 1.498, 0]}
        scale={0.922}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253016.geometry}
        material={materials['Color texture']}
        position={[-203.203, 0, 273.216]}
        rotation={[0, 1.386, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263017.geometry}
        material={materials['Color texture']}
        position={[-168.789, 0, 313.086]}
        rotation={[Math.PI, -0.242, Math.PI]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043018.geometry}
        material={materials['Color texture']}
        position={[-152.002, 0, 317.283]}
        rotation={[-Math.PI, 0.709, -Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243019.geometry}
        material={materials['Color texture']}
        position={[-122.205, 0, 275.734]}
        rotation={[0, -1.557, 0]}
        scale={0.879}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233020.geometry}
        material={materials['Color texture']}
        position={[-119.687, 0, 239.641]}
        rotation={[Math.PI, -1.286, Math.PI]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043021.geometry}
        material={materials['Color texture']}
        position={[-139.412, 0, 212.782]}
        rotation={[Math.PI, -0.462, Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023022.geometry}
        material={materials['Color texture']}
        position={[-145.287, 0, 196.414]}
        rotation={[Math.PI, -1.24, Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023023.geometry}
        material={materials['Color texture']}
        position={[-170.468, 0, 204.808]}
        rotation={[Math.PI, -1.06, Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243024.geometry}
        material={materials['Color texture']}
        position={[-170.049, 0, 282.449]}
        rotation={[Math.PI, -0.836, Math.PI]}
        scale={0.96}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033025.geometry}
        material={materials['Color texture']}
        position={[-157.458, 0, 299.236]}
        rotation={[0, 0.062, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263026.geometry}
        material={materials['Color texture']}
        position={[-102.899, 0, 300.076]}
        rotation={[-Math.PI, 0.726, -Math.PI]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023027.geometry}
        material={materials['Color texture']}
        position={[-61.351, 0, 278.672]}
        rotation={[0, 1.241, 0]}
        scale={0.932}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023028.geometry}
        material={materials['Color texture']}
        position={[-100.381, 0, 245.517]}
        rotation={[-Math.PI, 0.013, -Math.PI]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043029.geometry}
        material={materials['Color texture']}
        position={[-63.449, 0, 237.963]}
        rotation={[0, 0.277, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263030.geometry}
        material={materials['Color texture']}
        position={[-22.74, 0, 232.507]}
        rotation={[0, -0.362, 0]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023031.geometry}
        material={materials['Color texture']}
        position={[-55.475, 0, 214.461]}
        rotation={[-Math.PI, 0.006, -Math.PI]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233032.geometry}
        material={materials['Color texture']}
        position={[17.55, 0, 296.718]}
        rotation={[-Math.PI, 1.204, -Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263033.geometry}
        material={materials['Color texture']}
        position={[2.021, 0, 287.066]}
        rotation={[Math.PI, -0.464, Math.PI]}
        scale={0.865}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023034.geometry}
        material={materials['Color texture']}
        position={[-34.491, 0, 303.433]}
        rotation={[-Math.PI, 1.207, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043035.geometry}
        material={materials['Color texture']}
        position={[-32.812, 0, 326.516]}
        rotation={[0, 1.32, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263036.geometry}
        material={materials['Color texture']}
        position={[-12.248, 0, 375.619]}
        rotation={[0, 0.422, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043037.geometry}
        material={materials['Color texture']}
        position={[41.472, 0, 337.428]}
        rotation={[Math.PI, -0.517, Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233038.geometry}
        material={materials['Color texture']}
        position={[60.357, 0, 237.123]}
        rotation={[Math.PI, -0.326, Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023039.geometry}
        material={materials['Color texture']}
        position={[-87.371, 0, 275.315]}
        rotation={[0, -1.232, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023040.geometry}
        material={materials['Color texture']}
        position={[-10.569, 0, 400.8]}
        rotation={[0, -1.469, 0]}
        scale={0.936}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243041.geometry}
        material={materials['Color texture']}
        position={[57, 0, 421.784]}
        rotation={[0, 1.12, 0]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033042.geometry}
        material={materials['Color texture']}
        position={[161.081, 0, 294.2]}
        rotation={[0, -0.814, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023043.geometry}
        material={materials['Color texture']}
        position={[234.106, 0, 292.102]}
        rotation={[0, 1.208, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253044.geometry}
        material={materials['Color texture']}
        position={[238.303, 0, 284.128]}
        rotation={[0, -0.595, 0]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233045.geometry}
        material={materials['Color texture']}
        position={[216.06, 0, 333.231]}
        rotation={[Math.PI, -1.007, Math.PI]}
        scale={0.954}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243046.geometry}
        material={materials['Color texture']}
        position={[208.505, 0, 292.522]}
        rotation={[0, 1.363, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023047.geometry}
        material={materials['Color texture']}
        position={[180.387, 0, 299.236]}
        rotation={[0, -0.353, 0]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033048.geometry}
        material={materials['Color texture']}
        position={[162.34, 0, 310.568]}
        rotation={[-Math.PI, 1.554, -Math.PI]}
        scale={0.884}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043049.geometry}
        material={materials['Color texture']}
        position={[124.149, 0, 320.221]}
        rotation={[0, -0.18, 0]}
        scale={0.898}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043050.geometry}
        material={materials['Color texture']}
        position={[124.149, 0, 300.076]}
        rotation={[0, -0.446, 0]}
        scale={0.964}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043051.geometry}
        material={materials['Color texture']}
        position={[256.349, 0, 271.537]}
        rotation={[Math.PI, -1.033, Math.PI]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023052.geometry}
        material={materials['Color texture']}
        position={[266.422, 0, 317.283]}
        rotation={[-Math.PI, 0.683, -Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233053.geometry}
        material={materials['Color texture']}
        position={[250.054, 0, 305.112]}
        rotation={[Math.PI, -0.917, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263054.geometry}
        material={materials['Color texture']}
        position={[88.896, 0, 322.739]}
        rotation={[Math.PI, -0.482, Math.PI]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253055.geometry}
        material={materials['Color texture']}
        position={[89.735, 0, 303.014]}
        rotation={[0, 0.176, 0]}
        scale={0.966}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033056.geometry}
        material={materials['Color texture']}
        position={[117.014, 0, 324.837]}
        rotation={[0, -0.763, 0]}
        scale={0.92}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263057.geometry}
        material={materials['Color texture']}
        position={[84.699, 0, 379.396]}
        rotation={[0, -0.375, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023058.geometry}
        material={materials['Color texture']}
        position={[80.502, 0, 407.515]}
        rotation={[0, -0.403, 0]}
        scale={0.973}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263059.geometry}
        material={materials['Color texture']}
        position={[41.052, 0, 372.261]}
        rotation={[Math.PI, -0.949, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263060.geometry}
        material={materials['Color texture']}
        position={[1.602, 0, 358.831]}
        rotation={[0, 0.699, 0]}
        scale={0.976}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043061.geometry}
        material={materials['Color texture']}
        position={[41.472, 0, 296.718]}
        rotation={[0, 1.507, 0]}
        scale={0.888}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263062.geometry}
        material={materials['Color texture']}
        position={[41.052, 0, 220.336]}
        rotation={[-Math.PI, 0.251, -Math.PI]}
        scale={0.863}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253063.geometry}
        material={materials['Color texture']}
        position={[143.874, 0, 242.579]}
        rotation={[0, -0.771, 0]}
        scale={0.903}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033064.geometry}
        material={materials['Color texture']}
        position={[172.832, 0, 230.408]}
        rotation={[0, -0.935, 0]}
        scale={0.956}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023065.geometry}
        material={materials['Color texture']}
        position={[198.013, 0, 217.818]}
        rotation={[0, -0.755, 0]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033066.geometry}
        material={materials['Color texture']}
        position={[151.848, 0, 256.429]}
        rotation={[0, 0.556, 0]}
        scale={0.969}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033067.geometry}
        material={materials['Color texture']}
        position={[182.485, 0, 277.413]}
        rotation={[0, 1.344, 0]}
        scale={0.843}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253068.geometry}
        material={materials['Color texture']}
        position={[208.505, 0, 267.76]}
        rotation={[0, 1.469, 0]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043069.geometry}
        material={materials['Color texture']}
        position={[19.228, 0, 347.08]}
        rotation={[0, -1.225, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263070.geometry}
        material={materials['Color texture']}
        position={[5.799, 0, 234.186]}
        rotation={[Math.PI, -0.084, Math.PI]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023071.geometry}
        material={materials['Color texture']}
        position={[-66.387, 0, 307.21]}
        rotation={[0, 0.867, 0]}
        scale={0.977}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243072.geometry}
        material={materials['Color texture']}
        position={[-26.097, 0, 392.406]}
        rotation={[Math.PI, -1.479, Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253073.geometry}
        material={materials['Color texture']}
        position={[35.596, 0, 426.4]}
        rotation={[Math.PI, -0.25, Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023074.geometry}
        material={materials['Color texture']}
        position={[98.129, 0, 282.029]}
        rotation={[-Math.PI, 0.627, -Math.PI]}
        scale={0.889}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023075.geometry}
        material={materials['Color texture']}
        position={[-90.728, 0, 216.559]}
        rotation={[Math.PI, -1.509, Math.PI]}
        scale={0.971}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033076.geometry}
        material={materials['Color texture']}
        position={[-135.635, 0, 282.449]}
        rotation={[0, -0.084, 0]}
        scale={0.974}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233077.geometry}
        material={materials['Color texture']}
        position={[-198.167, 0, 217.818]}
        rotation={[Math.PI, -1.429, Math.PI]}
        scale={0.912}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023078.geometry}
        material={materials['Color texture']}
        position={[-203.623, 0, 194.735]}
        rotation={[0, 1.226, 0]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233079.geometry}
        material={materials['Color texture']}
        position={[116.595, 0, 232.507]}
        rotation={[0, 0.708, 0]}
        scale={0.923}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023080.geometry}
        material={materials['Color texture']}
        position={[-363.103, 0, 162.84]}
        rotation={[0, 1.546, 0]}
        scale={0.95}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243081.geometry}
        material={materials['Color texture']}
        position={[-336.243, 0, 192.637]}
        rotation={[-Math.PI, 1.389, -Math.PI]}
        scale={0.911}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043082.geometry}
        material={materials['Color texture']}
        position={[-269.729, 0, 53.439]}
        rotation={[Math.PI, -0.712, Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233083.geometry}
        material={materials['Color texture']}
        position={[70.054, 0, 82.58]}
        rotation={[Math.PI, -0.17, Math.PI]}
        scale={0.901}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233084.geometry}
        material={materials['Color texture']}
        position={[-113.534, 0, 161.843]}
        rotation={[0, 0.578, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023085.geometry}
        material={materials['Color texture']}
        position={[-188.717, 0, 95.402]}
        rotation={[0, 1.256, 0]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253086.geometry}
        material={materials['Color texture']}
        position={[109.685, 0, 157.18]}
        rotation={[0, 0.445, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253087.geometry}
        material={materials['Color texture']}
        position={[-21.449, 0, 90.739]}
        rotation={[-Math.PI, 0.577, -Math.PI]}
        scale={0.926}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243088.geometry}
        material={materials['Color texture']}
        position={[-26.111, 0, 199.143]}
        rotation={[-Math.PI, 1.401, -Math.PI]}
        scale={0.937}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263089.geometry}
        material={materials['Color texture']}
        position={[11.772, 0, 49.942]}
        rotation={[-Math.PI, 1.193, -Math.PI]}
        scale={0.864}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243090.geometry}
        material={materials['Color texture']}
        position={[-230.097, 0, 183.99]}
        rotation={[0, 0.866, 0]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023091.geometry}
        material={materials['Color texture']}
        position={[46.741, 0, 188.652]}
        rotation={[-Math.PI, 1.037, -Math.PI]}
        scale={0.904}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263092.geometry}
        material={materials['Color texture']}
        position={[-183.472, 0, 46.445]}
        rotation={[Math.PI, -0.513, Math.PI]}
        scale={0.994}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243093.geometry}
        material={materials['Color texture']}
        position={[-301.784, 0, 127.457]}
        rotation={[0, 0.339, 0]}
        scale={0.959}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253094.geometry}
        material={materials['Color texture']}
        position={[-154.331, 0, 174.665]}
        rotation={[Math.PI, -0.876, Math.PI]}
        scale={0.996}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033095.geometry}
        material={materials['Color texture']}
        position={[-28.442, 0, 129.205]}
        rotation={[Math.PI, -1.08, Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023096.geometry}
        material={materials['Color texture']}
        position={[-86.141, 0, 45.279]}
        rotation={[0, 1.492, 0]}
        scale={0.899}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043097.geometry}
        material={materials['Color texture']}
        position={[-138.595, 0, 70.34]}
        rotation={[0, -1.374, 0]}
        scale={0.842}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023098.geometry}
        material={materials['Color texture']}
        position={[-142.675, 0, 125.708]}
        rotation={[0, -1.513, 0]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253099.geometry}
        material={materials['Color texture']}
        position={[-21.303, 0, 200.309]}
        rotation={[Math.PI, -1.429, Math.PI]}
        scale={0.893}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253100.geometry}
        material={materials['Color texture']}
        position={[-272.497, 0, 131.391]}
        rotation={[-Math.PI, 0.531, -Math.PI]}
        scale={0.983}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023101.geometry}
        material={materials['Color texture']}
        position={[-28.297, 0, 94.09]}
        rotation={[Math.PI, -0.832, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263102.geometry}
        material={materials['Color texture']}
        position={[134.403, 0, 101.877]}
        rotation={[-Math.PI, 0.157, -Math.PI]}
        scale={0.992}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263103.geometry}
        material={materials['Color texture']}
        position={[-186.532, 0, 131.682]}
        rotation={[Math.PI, -1.08, Math.PI]}
        scale={0.943}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253104.geometry}
        material={materials['Color texture']}
        position={[-193.817, 0, 96.421]}
        rotation={[0, 1.339, 0]}
        scale={0.88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263105.geometry}
        material={materials['Color texture']}
        position={[53.567, 0, 140.285]}
        rotation={[0, -0.254, 0]}
        scale={0.897}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023106.geometry}
        material={materials['Color texture']}
        position={[14.444, 0, 51.613]}
        rotation={[0, 1.563, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263107.geometry}
        material={materials['Color texture']}
        position={[-64.14, 0, 171.314]}
        rotation={[Math.PI, -0.526, Math.PI]}
        scale={0.902}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243108.geometry}
        material={materials['Color texture']}
        position={[96.135, 0, 164.903]}
        rotation={[-Math.PI, 0.819, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253109.geometry}
        material={materials['Color texture']}
        position={[-230.243, 0, 167.234]}
        rotation={[0, 1.192, 0]}
        scale={0.961}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043110.geometry}
        material={materials['Color texture']}
        position={[-287.274, 0, 92.941]}
        rotation={[0, -1.473, 0]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023111.geometry}
        material={materials['Color texture']}
        position={[121.362, 0, 96.2]}
        rotation={[0, -0.651, 0]}
        scale={0.989}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233112.geometry}
        material={materials['Color texture']}
        position={[-279.014, 0, 88.011]}
        rotation={[0, -1.173, 0]}
        scale={0.949}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033113.geometry}
        material={materials['Color texture']}
        position={[-118.863, 0, 53.888]}
        rotation={[0, -1.218, 0]}
        scale={0.928}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243114.geometry}
        material={materials['Color texture']}
        position={[27.638, 0, 118.039]}
        rotation={[-Math.PI, 0.966, -Math.PI]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253115.geometry}
        material={materials['Color texture']}
        position={[-93.84, 0, 189.015]}
        rotation={[0, -0.372, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043116.geometry}
        material={materials['Color texture']}
        position={[-56.077, 0, 153.527]}
        rotation={[0, -0.706, 0]}
        scale={0.988}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253117.geometry}
        material={materials['Color texture']}
        position={[-61.2, 0, 191.081]}
        rotation={[-Math.PI, 0.666, -Math.PI]}
        scale={0.859}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023118.geometry}
        material={materials['Color texture']}
        position={[-189.503, 0, 125.11]}
        rotation={[-Math.PI, 0.202, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023119.geometry}
        material={materials['Color texture']}
        position={[-262.84, 0, 108.555]}
        rotation={[0, -0.176, 0]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033120.geometry}
        material={materials['Color texture']}
        position={[-16.963, 0, 121.007]}
        rotation={[Math.PI, -0.605, Math.PI]}
        scale={0.957}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243121.geometry}
        material={materials['Color texture']}
        position={[35.498, 0, 70.645]}
        rotation={[-Math.PI, 1.2, -Math.PI]}
        scale={0.887}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023122.geometry}
        material={materials['Color texture']}
        position={[-135.733, 0, 167.172]}
        rotation={[Math.PI, -1.506, Math.PI]}
        scale={0.958}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253123.geometry}
        material={materials['Color texture']}
        position={[-155.458, 0, 63.51]}
        rotation={[0, -0.099, 0]}
        scale={0.909}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033124.geometry}
        material={materials['Color texture']}
        position={[-238.975, 0, 135.276]}
        rotation={[0, -1.24, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243125.geometry}
        material={materials['Color texture']}
        position={[57.741, 0, 179.343]}
        rotation={[0, -0.456, 0]}
        scale={0.978}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243126.geometry}
        material={materials['Color texture']}
        position={[-267.513, 0, 72.743]}
        rotation={[-Math.PI, 0.764, -Math.PI]}
        scale={0.986}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033127.geometry}
        material={materials['Color texture']}
        position={[11.212, 0, 127.441]}
        rotation={[Math.PI, -0.053, Math.PI]}
        scale={0.86}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243128.geometry}
        material={materials['Color texture']}
        position={[-46.284, 0, 47.281]}
        rotation={[-Math.PI, 1.147, -Math.PI]}
        scale={0.921}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233129.geometry}
        material={materials['Color texture']}
        position={[-153.36, 0, 99.603]}
        rotation={[Math.PI, -0.826, Math.PI]}
        scale={0.896}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263130.geometry}
        material={materials['Color texture']}
        position={[-42.144, 0, 183.959]}
        rotation={[0, 1.511, 0]}
        scale={0.947}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043131.geometry}
        material={materials['Color texture']}
        position={[103.906, 0, 90.37]}
        rotation={[Math.PI, -0.531, Math.PI]}
        scale={0.905}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263132.geometry}
        material={materials['Color texture']}
        position={[-314.898, 0, 303.188]}
        rotation={[0, 0.292, 0]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043133.geometry}
        material={materials['Color texture']}
        position={[-334.204, 0, 291.018]}
        rotation={[-Math.PI, 0.9, -Math.PI]}
        scale={0.9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043134.geometry}
        material={materials['Color texture']}
        position={[-259.08, 0, 322.494]}
        rotation={[-Math.PI, 1.174, -Math.PI]}
        scale={0.876}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253135.geometry}
        material={materials['Color texture']}
        position={[-234.739, 0, 316.199]}
        rotation={[-Math.PI, 0.928, -Math.PI]}
        scale={0.907}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043136.geometry}
        material={materials['Color texture']}
        position={[-169.688, 0, 335.084]}
        rotation={[0, -1.067, 0]}
        scale={0.895}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023137.geometry}
        material={materials['Color texture']}
        position={[-104.637, 0, 328.789]}
        rotation={[0, -0.684, 0]}
        scale={0.867}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023138.geometry}
        material={materials['Color texture']}
        position={[-90.788, 0, 353.55]}
        rotation={[0, 0.636, 0]}
        scale={0.866}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253139.geometry}
        material={materials['Color texture']}
        position={[-384.146, 0, 251.567]}
        rotation={[-Math.PI, 1.242, -Math.PI]}
        scale={0.882}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043140.geometry}
        material={materials['Color texture']}
        position={[-401.773, 0, 212.957]}
        rotation={[0, 1.116, 0]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033141.geometry}
        material={materials['Color texture']}
        position={[-420.658, 0, 237.718]}
        rotation={[-Math.PI, 1.09, -Math.PI]}
        scale={0.942}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253142.geometry}
        material={materials['Color texture']}
        position={[-206.62, 0, 303.188]}
        rotation={[0, 0.72, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023143.geometry}
        material={materials['Color texture']}
        position={[-212.915, 0, 338.022]}
        rotation={[0, -0.931, 0]}
        scale={0.967}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243144.geometry}
        material={materials['Color texture']}
        position={[331.725, 21.636, -147.836]}
        rotation={[0, 0.237, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033145.geometry}
        material={materials['Color texture']}
        position={[146.753, 7.357, -147.551]}
        rotation={[-Math.PI, 0.412, -Math.PI]}
        scale={0.935}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023146.geometry}
        material={materials['Color texture']}
        position={[236.518, 21.723, -37.73]}
        rotation={[-Math.PI, 0.646, -Math.PI]}
        scale={0.999}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043147.geometry}
        material={materials['Color texture']}
        position={[244.096, 9.684, -185.103]}
        rotation={[0, -0.803, 0]}
        scale={0.875}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023148.geometry}
        material={materials['Color texture']}
        position={[230.959, 37.95, -101.498]}
        rotation={[Math.PI, -1.117, Math.PI]}
        scale={0.98}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233149.geometry}
        material={materials['Color texture']}
        position={[377.096, 7.96, -201.317]}
        rotation={[0, 1.259, 0]}
        scale={0.878}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023150.geometry}
        material={materials['Color texture']}
        position={[401.754, 0, -24.121]}
        rotation={[Math.PI, -0.116, Math.PI]}
        scale={0.868}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243151.geometry}
        material={materials['Color texture']}
        position={[396.928, 0, -24.121]}
        rotation={[0, -0.986, 0]}
        scale={0.972}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253152.geometry}
        material={materials['Color texture']}
        position={[399.132, 0, -28.003]}
        rotation={[0, 1.321, 0]}
        scale={0.934}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243153.geometry}
        material={materials['Color texture']}
        position={[448.255, 0, -32.564]}
        rotation={[Math.PI, -0.923, Math.PI]}
        scale={0.877}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243154.geometry}
        material={materials['Color texture']}
        position={[414.695, 0, -3.463]}
        rotation={[0, -1.563, 0]}
        scale={0.891}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243155.geometry}
        material={materials['Color texture']}
        position={[444.469, 0, 38.925]}
        rotation={[-Math.PI, 0.516, -Math.PI]}
        scale={0.938}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023156.geometry}
        material={materials['Color texture']}
        position={[439.643, 0, 38.925]}
        rotation={[-Math.PI, 1.037, -Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20033157.geometry}
        material={materials['Color texture']}
        position={[441.846, 0, 35.043]}
        rotation={[0, 0.754, 0]}
        scale={0.854}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233158.geometry}
        material={materials['Color texture']}
        position={[335.048, 0, -37.97]}
        rotation={[0, -0.716, 0]}
        scale={0.946}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253159.geometry}
        material={materials['Color texture']}
        position={[429.319, 0, -283.892]}
        rotation={[0, 1.016, 0]}
        scale={0.85}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023160.geometry}
        material={materials['Color texture']}
        position={[499.406, 0, -354.818]}
        rotation={[Math.PI, -1.242, Math.PI]}
        scale={0.97}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree20023161.geometry}
        material={materials['Color texture']}
        position={[514.095, 0, -309.073]}
        rotation={[0, -0.755, 0]}
        scale={0.919}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233162.geometry}
        material={materials['Color texture']}
        position={[446.946, 0, -327.119]}
        rotation={[-Math.PI, 0.889, -Math.PI]}
        scale={0.94}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0243163.geometry}
        material={materials['Color texture']}
        position={[477.163, 0, -255.773]}
        rotation={[-Math.PI, 0.382, -Math.PI]}
        scale={0.975}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023164.geometry}
        material={materials['Color texture']}
        position={[153.583, 20.806, -53.045]}
        rotation={[-Math.PI, 0.853, -Math.PI]}
        scale={0.883}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043165.geometry}
        material={materials['Color texture']}
        position={[488.914, 0, -218.002]}
        rotation={[0, -1.346, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263166.geometry}
        material={materials['Color texture']}
        position={[-259.38, 0, 85.848]}
        rotation={[0, -0.948, 0]}
        scale={0.855}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0253167.geometry}
        material={materials['Color texture']}
        position={[-570.365, 0, 163.909]}
        rotation={[0, 1.288, 0]}
        scale={0.998}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0263168.geometry}
        material={materials['Color texture']}
        position={[-600.163, 0, 142.506]}
        rotation={[0, -0.109, 0]}
        scale={0.851}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree0233169.geometry}
        material={materials['Color texture']}
        position={[156.038, 0, 332.219]}
        rotation={[0, 0.394, 0]}
        scale={0.908}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30043170.geometry}
        material={materials['Color texture']}
        position={[206.819, 0, 317.53]}
        rotation={[0, -1.162, 0]}
        scale={0.981}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree30023171.geometry}
        material={materials['Color texture']}
        position={[195.068, 0, 341.452]}
        rotation={[-Math.PI, 0.066, -Math.PI]}
        scale={0.943}
      /> */}
    </group>
  )
}

useGLTF.preload('/map4.glb')
