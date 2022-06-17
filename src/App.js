import { VRCanvas, RayGrab, DefaultXRControllers } from "@react-three/xr";
import { OrbitControls, Sky, Text } from "@react-three/drei";
import "./App.css";

function Box({ size, scale, children, position }) {
  return (
    <RayGrab>
      <mesh scale={scale} position={position} castShadow>
        <boxBufferGeometry attach="geometry" args={size} />
        <meshNormalMaterial />
        {children}
      </mesh>
    </RayGrab>
  );
}

function Floor() {
  return (
    <mesh receiveShadow rotation-x={Math.PI * -0.5}>
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial
        attach="material"
        color="#fff"
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <VRCanvas vr="true" shadowmap="true">
        <Sky />
        <ambientLight intensity={0.4} castShadow />
        <spotLight
          position={[1, 8, 1]}
          angle={0.3}
          penumbra={0.7}
          intensity={0.8}
          castShadow
        />
        <Floor />
        <DefaultXRControllers />
        {[...Array(4)].map((_, i) => (
          <Box key={i} size={[0.4, 0.4, 0.4]} position={[0, i / 1.5 + 1, -2]}>
            <Text
              position={[0, 0, 0.21]}
              fontSize={0.07}
              color="#000"
              anchorX="center"
              anchorY="middle"
            >
              Move Me
            </Text>
          </Box>
        ))}
        <OrbitControls />
      </VRCanvas>
    </>
  );
}
