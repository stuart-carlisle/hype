'use client'

import React, { useRef, useMemo, Suspense, useState, useCallback } from 'react'
import {
  OrbitControls,
  Preload,
  useCursor,
  Html,
  Float,
  useGLTF,
  Billboard,
  Text,
  Environment,
} from '@react-three/drei'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'
import { useSnapshot } from 'valtio'
import state from '../../state/stateLandingPage'
import { Sky } from 'three/examples/jsm/objects/Sky'
import Loader from './Loader'
import { ParallaxLayer } from '@react-spring/parallax'
import { Glitch, EffectComposer, Scanline, Bloom } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode, KernelSize, Resolution } from 'postprocessing'

const options = {
  length: 400,
  width: 20,
  roadWidth: 9,
  islandWidth: 2,
  nPairs: 50,
  roadSections: 3,
  //distortion: myCustomDistortion,
}

let speedUpTarget = 0
let speedUp = 0
let timeOffset = 0
let fovTarget = 90

function lerpTwo(current, target, speed = 0.1, limit = 0.001) {
  let change = (target - current) * speed
  if (Math.abs(change) < limit) {
    change = target - current
  }
  return change
}

const SkyBackground = () => {
  const { scene, size, gl } = useThree()
  let sky
  let sun
  useMemo(() => {
    sky = new Sky()
    sky.scale.setScalar(450000)
    sun = new THREE.Vector3()

    const uniforms = sky.material.uniforms
    uniforms['turbidity'].value = 14.5
    uniforms['rayleigh'].value = 3
    uniforms['mieCoefficient'].value = 0.015
    uniforms['mieDirectionalG'].value = 0.7

    const phi = THREE.MathUtils.degToRad(90)
    const theta = THREE.MathUtils.degToRad(36.9)
    sun.setFromSphericalCoords(1, phi, theta)
    uniforms['sunPosition'].value.copy(sun)
    gl.toneMappingExposure = 0.6

    scene.add(sky)
  }, [size.width, size.height])

  return null
}

const Lights = ({ mouse }) => {
  const light = useRef()
  const directionalLight = useRef()
  const directionalLight2 = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  useFrame(() => {
    light.current.position.set(mouse.current[0] * 100, mouse.current[1] / (aspect * 2), 20)
  })
  return (
    <>
      <ambientLight intensity={4} color={0xffffff} />
      <directionalLight ref={directionalLight} intensity={2} position={[-20, 20, 30]} color={0xffffff} />
      <directionalLight ref={directionalLight2} intensity={3} position={[20, 12, 20]} color={0xffffff} />
      <pointLight ref={light} radius={20} intensity={10} color={0xf6b4e6} />
    </>
  )
}

function CarLights({ lane = 'right', color = 0xff102a, speed = 60 }) {
  const distortion_vertex = `
#define PI 3.14159265358979
  uniform vec2 uDistortionX;
  uniform vec2 uDistortionY;

    float nsin(float val){
    return sin(val) * 0.5+0.5;
    }
  vec3 getDistortion(float progress){
        progress = clamp(progress, 0.,1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
            xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
            yAmp * nsin(progress * PI * yFreq - PI / 2.  ) ,
            0.
        );
    }
`
  const myCustomDistortion = {
    getDistortion: distortion_vertex,
  }

  let aOffset = []
  let aMetrics = []
  useMemo(() => {
    let sectionWidth = options.roadWidth / options.roadSections
    for (let i = 0; i < options.nPairs; i++) {
      let radius = Math.random() * 0.1 + 0.1
      let length = Math.random() * options.length * 0.08 + options.length * 0.02
      // 1a. Get it's lane index
      // Instead of random, keep lights per lane consistent
      let section = i % 3

      // 1b. Get its lane's centered position
      let sectionX = section * sectionWidth - options.roadWidth / 2 + sectionWidth / 2
      let carWidth = 0.5 * sectionWidth
      let offsetX = 0.5 * Math.random()

      let offsetY = radius * 1.3

      let offsetZ = Math.random() * options.length

      aOffset.push(sectionX - carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aOffset.push(sectionX + carWidth / 2 + offsetX)
      aOffset.push(offsetY)
      aOffset.push(-offsetZ)

      aMetrics.push(radius)
      aMetrics.push(length)

      aMetrics.push(radius)
      aMetrics.push(length)
    }
  }, [])

  const meshRef = useRef()
  const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1))
  const uniforms = useRef({
    uColor: { value: new THREE.Color(color) },
    uTravelLength: { value: options.length },
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uDistortionX: { value: new THREE.Vector2(80, 3) },
    uDistortionY: { value: new THREE.Vector2(-40, 2.5) },
  })
  let time, fovChange, lerpT
  const coefficient = -60 * Math.log2(1 - 0.1)
  useFrame(({ camera, clock }, delta) => {
    lerpT = Math.exp(-coefficient * delta)
    speedUp = speedUp + lerpTwo(speedUp, speedUpTarget, 0.03, 0.0001)
    timeOffset = timeOffset + speedUp * delta
    time = clock.getElapsedTime() + timeOffset
    uniforms.current.uTime.value = time
    fovChange = lerpTwo(camera.fov, fovTarget, 0.03)
    if (fovChange !== 0) {
      camera.fov = camera.fov + fovChange * delta * 6
      camera.updateProjectionMatrix()
    }
  })

  const vshader = `
  attribute vec3 aOffset;
  attribute vec2 aMetrics;
  uniform float uTime;
  uniform float uTravelLength;
  uniform float uSpeed;
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    // GLSL reserves length name
    float len = aMetrics.g;
    transformed.xy *= radius; 
    transformed.z *= len;
    float zOffset = uTime * uSpeed + aOffset.z;
    zOffset = len - mod(zOffset, uTravelLength);
  
  
    //float zOffset = uTime + aOffset.z;
	  transformed.z = transformed.z + zOffset;
    transformed.xy += aOffset.xy;
    
    //distortion
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);


    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
	}
`
  const fshader = `
  uniform vec3 uColor;
    void main() {
        vec3 color = vec3(uColor);
        gl_FragColor = vec4(color,0);
    }
  `
  const posX =
    lane === 'right'
      ? options.roadWidth / 2 + options.islandWidth / 2
      : -options.roadWidth / 2 - options.islandWidth / 2
  const from = `#include <getDistortion_vertex>`
  const to = myCustomDistortion.getDistortion
  const onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(from, to)
  }

  const oBC = useCallback(onBeforeCompile)
  return (
    <instancedMesh
      position={[posX, 100, 0]}
      frustumCulled={false}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={meshRef}
      args={[null, null, options.nPairs * 2]}
    >
      <tubeGeometry attach='geometry' args={[curve, 25, 1, 8, false]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'aOffset']}
          args={[Float32Array.from(aOffset), 3, false]}
        />
        <instancedBufferAttribute
          attachObject={['attributes', 'aMetrics']}
          args={[Float32Array.from(aMetrics), 2, false]}
        />
      </tubeGeometry>

      <shaderMaterial
        attach='material'
        onBeforeCompile={oBC}
        uniforms={uniforms.current}
        fragmentShader={fshader}
        vertexShader={vshader}
      />
    </instancedMesh>
  )
}

const MainLights = ({ colorArray = [0xfa0471, 0xfafafa, 0x56abff, 0x11f2a6] }) => {
  const lightsGroup = useRef()
  return (
    <>
      <CarLights lane={'left'} color={colorArray[0]} speed={60} />
      <CarLights lane={'right'} color={colorArray[1]} speed={-60} />
      <group ref={lightsGroup} position={[30, 0, 0]}>
        <CarLights lane={'left'} color={colorArray[2]} speed={20} />
        <CarLights lane={'right'} color={colorArray[4]} speed={-20} />
      </group>
      <group position={[-30, 0, 0]}>
        <CarLights lane={'left'} color={colorArray[4]} speed={40} />
        <CarLights lane={'right'} color={colorArray[1]} speed={-40} />
      </group>
      <group position={[-60, 0, 0]}>
        <CarLights lane={'left'} color={colorArray[0]} speed={70} />
        <CarLights lane={'right'} color={colorArray[2]} speed={-80} />
      </group>
      <group position={[60, 0, 0]}>
        <CarLights lane={'left'} color={colorArray[0]} speed={70} />
        <CarLights lane={'right'} color={colorArray[4]} speed={-80} />
      </group>
    </>
  )
}

const Font2 = ({ green, nodes = undefined }) => {
  const fontGroup = useRef()

  const [clicked, setClicked] = useState(false)

  const props = useSpring({
    rotation: clicked ? [0, 0, 0] : [0, Math.PI * 4, 0],
    config: { mass: 1, tension: 900, friction: 400, precision: 0.00001 },
  })

  const propsLayer1 = useSpring({
    loop: { reverse: true },
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, -8 * Math.random() - 4] },
    delay: 600 * Math.random(),
  })

  const propsLayer2 = useSpring({
    loop: { reverse: true },
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, -8 * Math.random() - 4] },
    delay: 600 * Math.random(),
  })

  const propsLayer3 = useSpring({
    loop: { reverse: true },
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, -8 * Math.random() - 4] },
    delay: 600 * Math.random(),
  })

  const propsLayer4 = useSpring({
    loop: { reverse: true },
    from: { position: [0, 0, 0] },
    to: { position: [0, 0, -12 * Math.random()] },
    delay: 600 * Math.random(),
  })
  useMemo(() => {
    for (const node in nodes) {
      nodes[node].pos = Object.values(nodes[node]?.position) //?. in case position is lower in the hierarchy
    }
  }, [nodes])

  // const [hovered, setHovered] = useState(false)
  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime()
    const delta = Math.sin(time * 2)
    // fontGroup.current.position.y = (2 * Math.sin(delta)) + 3
    // camera.lookAt(fontGroup.current.position)
    // camera.updateProjectionMatrix()
  })
  // useCursor(hovered)
  return (
    <>
      {nodes && (
        <a.group
          // onPointerOver={() => setHovered(true)}
          // onPointerOut={() => setHovered(false)}
          ref={fontGroup}
          scale={[0.4, 0.4, 0.4]}
          position={[0, 6, 0]}
          rotation={props.rotation}
          onClick={() => {
            setClicked(!clicked)
          }}
        >
          {/* onPointerEnter={()=>{setHovered(true)}} onPointerLeave={()=>{setHovered(false)}} */}
          <group position={[15, 0, 0]}>
            <a.group position={propsLayer1.position}>
              <mesh rotation={nodes.layer1.rotation} geometry={nodes.layer1.geometry}>
                <meshStandardMaterial attach='material' {...nodes.layer1.material} metallic={1} roughness={0} />
              </mesh>
              <mesh
                layers={0}
                position={nodes.layer2.pos}
                rotation={nodes.layer2.rotation}
                geometry={nodes.layer2.geometry}
              >
                <meshStandardMaterial
                  attach='material'
                  {...nodes.layer2.material}
                  emissive={nodes.layer2.material.color}
                  emissiveIntensity={0.1}
                />
              </mesh>
            </a.group>
            <a.group position={propsLayer2.position}>
              <mesh
                ref={green}
                position={nodes.layer3.pos}
                rotation={nodes.layer3.rotation}
                geometry={nodes.layer3.geometry}
              >
                <meshStandardMaterial
                  attach='material'
                  {...nodes.layer3.material}
                  emissive={nodes.layer3.material.color}
                  emissiveIntensity={0.1}
                />
              </mesh>
            </a.group>
            <a.group position={propsLayer3.position}>
              <mesh position={nodes.layer4.pos} rotation={nodes.layer4.rotation} geometry={nodes.layer4.geometry}>
                <meshStandardMaterial
                  attach='material'
                  {...nodes.layer4.material}
                  emissive={nodes.layer4.material.color}
                  emissiveIntensity={0.1}
                />
              </mesh>
            </a.group>
            <a.group position={propsLayer4.position}>
              <mesh position={nodes.layer5.pos} rotation={nodes.layer5.rotation} geometry={nodes.layer5.geometry}>
                <meshStandardMaterial
                  attach='material'
                  {...nodes.layer5.material}
                  emissive={nodes.layer5.material.color}
                  emissiveIntensity={0.1}
                />
              </mesh>
            </a.group>
          </group>
        </a.group>
      )}
    </>
  )
}

const Main = ({ mouse }) => {
  const { nodes } = useGLTF(`https://res.cloudinary.com/drixmykpt/image/upload/v1724673176/hype/models/hype-font2.glb`)
  const green = useRef()
  return (
    <>
      <Lights mouse={mouse} />
      <fog attach='fog' color={'#aaa'} near={300} far={800} />
      <color attach='background' args={['#000000']} />
      <Suspense fallback={null}>
        <Environment
          files={'https://res.cloudinary.com/drixmykpt/image/upload/v1724673567/hype/hdri/abandonedslipway.jpg'}
        />
        <Preload all />
      </Suspense>
      <EffectComposer>
        <Glitch
          delay={[1.5, 3.5]} // min and max glitch delay
          duration={[0.6, 1.0]} // min and max glitch duration
          strength={[0.3, 1.0]} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85} // Threshold for strong glitches, 0 - no weak
        />

        <Scanline
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={0.8} // scanline density
          opacity={0.1}
        />

        <Bloom
          intensity={0.4} // The bloom intensity.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      </EffectComposer>
      <Float
        position={[0, 1.1, 0]}
        floatingRange={[0, 1]}
        rotation={[0, 0, 0]}
        rotationIntensity={0.8}
        floatIntensity={2}
        speed={5}
      >
        <Suspense fallback={null}>
          <Font2 green={green} nodes={nodes} />
          <Preload all />
        </Suspense>
      </Float>
      <SkyBackground />
      <OrbitControls autoRotate autoRotateSpeed={15} enablePan={false} />
      <Suspense fallback={null}>
        <Billboard position={[0, -20, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text
            textAlign={'center'}
            font={'https://res.cloudinary.com/drixmykpt/raw/upload/v1724677862/hype/fonts/abel'}
            maxWidth={80}
            fillOpacity={1}
            strokeWidth={'2%'}
            lineHeight={1}
            letterSpacing={0.2}
            strokeColor='#ffffff'
            fontSize={4}
          >
            {'FICTIONAL STATIONARY THAT ALWAYS LIVES UP TO THE HYPE'}
          </Text>
        </Billboard>
        <Preload all />
      </Suspense>
    </>
  )
}

const App = () => {
  const mouse = useRef([0, 0])
  const down = useRef(false)
  const onMouseDown = useCallback(() => {
    down.current = true
    speedUpTarget = 2
    fovTarget = 90
  }, [])
  const onMouseUp = useCallback(() => {
    down.current = false
    speedUpTarget = 0
    fovTarget = 90
  }, [])
  const snap = useSnapshot(state)
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => (mouse.current = [x - snap.width / 2, y - window.innerHeight / 2]),
    [],
  )

  return (
    <ParallaxLayer horizontal offset={0} speed={0.2}>
      <div
        style={{ height: '100vh' }}
        // onPointerMove={onMouseMove}
        // onPointerDown={onMouseDown}
        // onPointerUp={onMouseUp}
        id='page-one'
      >
        <Canvas camera={{ position: [0, 20, 40], fov: 90, antialias: false }} legacy={true}>
          <Suspense
            fallback={
              <Html>
                <Loader />
              </Html>
            }
          >
            <Main mouse={mouse} down={down} />
            <group position={[0, -2, -100]} rotation={[-Math.PI / 2, 0, 0]}>
              <MainLights colorArray={[0x56abff, 0x11f2a6, 0xfafafa, 0xfa0471]} />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </ParallaxLayer>
  )
}

export default App
