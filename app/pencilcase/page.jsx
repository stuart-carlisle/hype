'use client'
import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useGLTF, OrbitControls, Preload, ContactShadows, Environment, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useSnapshot } from 'valtio'
import * as THREE from 'three'

import { useAnimations } from '../../src/hooks/useAnimations'
import getAnimation from '../../src/utils/getAnimation'
import useClicks from '../../src/hooks/useClicks'
import Menu from '../../src/components/pencilcase/Menu'
import state from '../../src/state/state'
import Logo from '../../src/components/pencilcase/LogoStatic2'
import InformationTab from '../../src/components/pencilcase/InformationTab4'
import InformationMenu from '../../src/components/pencilcase/InformationMenu'
import Header from '../../src/components/header/Header'
import ModeToggle from '../../src/components/pencilcase/ModeToggle'

const directory = 'https://res.cloudinary.com/drixmykpt/image/upload/v1659789925/hype'

const Dolly = () => {
  const { camera } = useThree()
  const snap = useSnapshot(state)

  //zoom position when doing highlighted actions
  const zoomPosition = new THREE.Vector3(-0.5, 1.3, 3.4)

  //zoom position when doing lid open action
  const lidZoomPosition = new THREE.Vector3(-0.3, 2, 2)

  //update camera positions when doing zoom animations
  useFrame(() => {
    if (snap.zoom) {
      camera.position.lerp(zoomPosition, 0.06)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    if (snap.lidZoom) {
      camera.position.lerp(lidZoomPosition, 0.06)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
  })
  return null
}

const Main = () => {
  const snap = useSnapshot(state)

  //model import
  const { nodes, animations } = useGLTF(`${directory}/models/pencilcase-model3.glb`)

  //

  /*const { nodes, animations } = useGLTF(
    "https://s3.amazonaws.com/model.foo/bar.glb"
  ); for remote*/

  //get clips from the model
  const { mixer, clips, ref: animationsRef } = useAnimations(animations)

  //setup refs for animated meshes
  const tray = useRef()
  const lid = useRef()
  const button1 = useRef()
  const button2 = useRef()
  const button3 = useRef()
  const button4 = useRef()
  const logoPlate = useRef()
  const calculator = useRef()
  const sharpenerBase = useRef()
  const sharpener = useRef()
  const rubberTray = useRef()
  const rubber = useRef()
  const clasp = useRef()
  const calculatorButtons = useRef()
  const calculatorScreen = useRef()
  const hypeLogoRubber = useRef()

  //refs object so they can be shared easily to other components
  const refs = {
    hypeLogoRubber,
    calculatorScreen,
    calculatorButtons,
    tray,
    lid,
    button1,
    button2,
    button3,
    button4,
    logoPlate,
    calculator,
    sharpenerBase,
    sharpener,
    rubberTray,
    rubber,
    clasp,
  }

  //set up animation mixers array
  const mixers = []
  for (let i = 0; i < clips.length; i++) {
    mixers.push(new THREE.AnimationMixer())
  }

  //update mixers
  useFrame((_, delta) => {
    Object.keys(mixers).forEach((mixer) => {
      mixers[mixer].update(delta)
    })
  })

  // Cursor showing current color
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const displayName = !!snap.items[hovered] ? snap.items[hovered].Main.displayName : null
    const displayColor1 = !!snap.items[hovered] ? snap.items[hovered].Main.displayColor : null
    const displayColor2 = !!snap.items[hovered]
      ? snap.items[hovered].Secondary
        ? snap.items[hovered].Secondary.displayColor
        : snap.items[hovered].Main.displayColor
      : null
    const cursor = `<svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="url(#gradient)"/></g><circle cx="13" cy="11" r="4" fill='#000' ></circle><text stroke="#444" stroke-width="0.2px" fill="#ccc" style="white-space:pre" font-family="roadrage, sans-serif" font-size="9.5" letter-spacing="-0.01em" textAnchor="middle" x="28" y="63">${displayName}</text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><linearGradient id="gradient" x1="0%" y1="0%" x2="150%" y2="0%" gradientTransform="rotate(45)"><stop offset="50%" stop-color='${displayColor1}' /><stop offset="50%" stop-color='${displayColor2}' /></linearGradient></defs></svg>`
    const auto = `<svg width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><circle cx="13" cy="11" r="4" fill='#000' ></circle></svg>` //<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  useEffect(() => {
    if (snap.highlightAction === 'RubberHighlight') {
      playHighlightAnimation('RubberHighlight')
      return
    }
    if (snap.highlightAction === 'RubberHighlightReturn') {
      playHighlightAnimation('RubberHighlightReturn')
      return
    }
    if (snap.highlightAction === 'CalculatorHighlight') {
      playHighlightAnimation('CalculatorHighlight')
      return
    }
    if (snap.highlightAction === 'CalculatorHighlightReturn') {
      playHighlightAnimation('CalculatorHighlightReturn')
      return
    }
    if (snap.highlightAction === 'SharpenerHighlight') {
      playHighlightAnimation('SharpenerHighlight')
      return
    }
    if (snap.highlightAction === 'SharpenerHighlightReturn') {
      playHighlightAnimation('SharpenerHighlightReturn')
      return
    }
  }, [snap.highlightAction])

  useEffect(() => {
    if (snap.pencilHighlight === true && snap.lidOpen === false) {
      playAnimation({ material: { name: 'LogoPlate' } }) //quickfix - when selecting pencil in menu open the lid if not done already
    }
  }, [snap.pencilHighlight])

  //needs refactoring - couldn't do it more generically due to the way the mixers work
  const playAnimation = (object) => {
    state.current = null
    let objectName
    if (object.material.name === 'Buttons') {
      if (object.geometry.id === snap.items.Button1.id) {
        objectName = 'Button1'
      } else if (object.geometry.id === snap.items.Button2.id) {
        objectName = 'Button2'
      } else if (object.geometry.id === snap.items.Button3.id) {
        objectName = 'Button3'
      } else if (object.geometry.id === snap.items.Button4.id) {
        objectName = 'Button4'
      }
    } else {
      objectName = object.material.name
    }
    const delay = 300 //set delay before button press action is triggered i.e. button is pressed then after delay the object opens up
    //PLAY ON DOUBLE CLICK
    //-------------------------------- BUTTON1 -> Opens Tray - if already open just play button animation
    if (objectName === 'Button1' && snap.zoom === false) {
      //get actions -> returns { action, duration } or null if not found
      const action1 = getAnimation({
        clipName: 'ButtonAction1',
        mixers,
        clips,
        objectRef: button1.current,
      })
      const action2 =
        !snap.trayOpen &&
        getAnimation({
          clipName: 'TrayOpenAction',
          mixers,
          clips,
          objectRef: tray.current,
        })
      //if the action was found play it - use setTimeouts to control animation order and lengths
      if (!!action1) {
        //set animating to true to stop reassignment of current material and halting the animations prematurely
        state.animating = true
        action1.action.play()
        const totalDuration = !snap.trayOpen ? delay + action2.duration : action1.duration
        setTimeout(() => {
          !!action2 && action2.action.play()
        }, delay)
        setTimeout(() => {
          state.trayOpen = true

          state.animating = false
        }, totalDuration)
      }
      return
    }

    //--------------------------------TRAY -> closes tray when open
    if (objectName === 'Tray' && snap.zoom === false) {
      const action =
        snap.trayOpen &&
        getAnimation({
          clipName: 'TrayCloseAction',
          mixers,
          clips,
          objectRef: tray.current,
        })
      if (!!action) {
        state.animating = true
        action.action.play()
        setTimeout(() => {
          state.trayOpen = false
          state.animating = false
        }, action.duration) //or short curcuit evaluation instead of ? assignment operator
      }
      return
    }

    //-------------------------------- BUTTON2 -> Opens RubberTray
    if (objectName === 'Button2' && snap.zoom === false) {
      const action1 = getAnimation({
        clipName: 'ButtonAction2',
        mixers,
        clips,
        objectRef: button2.current,
      })
      const action2 =
        !snap.rubberOpen &&
        getAnimation({
          clipName: 'RubberOpenAction',
          mixers,
          clips,
          objectRef: rubberTray.current,
        })

      if (!!action1) {
        state.animating = true
        action1.action.play()
        const totalDuration = !snap.rubberOpen ? delay + action2.duration : action1.duration
        setTimeout(() => {
          !!action2 && action2.action.play()
        }, delay)
        setTimeout(() => {
          state.rubberOpen = true

          state.animating = false
        }, totalDuration)
      }
      return
    }

    //-------------------------------- RUBBER TRAY -> closes tray when open
    if (objectName === 'RubberTray' || (objectName === 'Rubber' && snap.zoom === false)) {
      const action =
        snap.rubberOpen &&
        getAnimation({
          clipName: 'RubberCloseAction',
          mixers,
          clips,
          objectRef: rubberTray.current,
        })
      if (!!action) {
        state.animating = true
        action.action.play()
        setTimeout(() => {
          state.rubberOpen = false

          state.animating = false
        }, action.duration || 0)
      }
      return
    }

    //--------------------------------BUTTON3 -> releases the calculator
    if (objectName === 'Button3' && snap.zoom === false) {
      const action1 = getAnimation({
        clipName: 'ButtonAction3',
        mixers,
        clips,
        objectRef: button3.current,
      })
      const action2 =
        !snap.calculatorReleased &&
        getAnimation({
          clipName: 'CalculatorReleaseAction',
          mixers,
          clips,
          objectRef: calculator.current,
        })

      if (!!action1) {
        state.animating = true
        action1.action.play()
        const totalDuration = !snap.calculatorReleased ? delay + action2.duration : action1.duration
        setTimeout(() => {
          !!action2 && action2.action.play()
        }, delay)
        setTimeout(() => {
          state.calculatorReleased = true

          state.animating = false
        }, totalDuration)
      }
      return
    }

    // --------------------------------Calculator -> returns the calculator

    if (
      objectName === 'Calculator' ||
      objectName === 'CalculatorRim' ||
      objectName === 'CalculatorButtons' ||
      (objectName === 'CalculatorScreen' && snap.zoom === false)
    ) {
      const action =
        snap.calculatorReleased &&
        getAnimation({
          clipName: 'CalculatorReturnAction',
          mixers,
          clips,
          objectRef: calculator.current,
        })
      if (!!action) {
        state.animating = true
        action.action.play()
        setTimeout(() => {
          state.calculatorReleased = false

          state.animating = false
        }, action.duration || 0)
      }
      return
    }

    //--------------------------------Button4 -> lifts sharpener

    if (objectName === 'Button4' && snap.zoom === false) {
      const action1 = getAnimation({
        clipName: 'ButtonAction4',
        mixers,
        clips,
        objectRef: button4.current,
      })
      const action2 =
        !snap.sharpenerLifted &&
        getAnimation({
          clipName: 'SharpenerLiftAction',
          mixers,
          clips,
          objectRef: sharpenerBase.current,
        })

      if (!!action1) {
        state.animating = true
        action1.action.play()
        const totalDuration = !snap.sharpenerLifted ? delay + action2.duration : action1.duration
        setTimeout(() => {
          !!action2 && action2.action.play()
        }, delay)
        setTimeout(() => {
          state.sharpenerLifted = true

          state.animating = false
        }, totalDuration)
      }
      return
    }

    //--------------------------------Sharpener -> drops the sharpener

    if (
      objectName === 'SharpenerHolder' ||
      objectName === 'Sharpener' ||
      objectName === 'SharpenerClips' ||
      (objectName === 'SharpenerBase' && snap.zoom === false)
    ) {
      const action =
        snap.sharpenerLifted &&
        getAnimation({
          clipName: 'SharpenerFallAction',
          mixers,
          clips,
          objectRef: sharpenerBase.current,
        })
      if (!!action) {
        state.animating = true
        action.action.play()
        setTimeout(() => {
          state.sharpenerLifted = false

          state.animating = false
        }, action.duration || 0)
      }
      return
    }

    //--------------------------------LogoPlate -> opens lid
    if ((objectName === 'LogoPlate' || objectName.match(/^LogoPlateDecal/)) && snap.zoom === false) {
      const action1 = getAnimation({
        clipName: 'LogoAction',
        mixers,
        clips,
        objectRef: logoPlate.current,
      })
      const action2 =
        !snap.lidOpen &&
        getAnimation({
          clipName: 'ClipOpenAction_BottomClip',
          mixers,
          clips,
          objectRef: clasp.current,
        })
      const action3 =
        !snap.lidOpen &&
        getAnimation({
          clipName: 'LidOpenAction',
          mixers,
          clips,
          objectRef: lid.current,
        })

      if (!!action1) {
        state.animating = true
        action1.action.play()
        const totalDuration = !snap.lidOpen ? delay + action2.duration + action3.duration : action1.duration
        setTimeout(() => {
          !!action2 && action2.action.play()
        }, delay)
        setTimeout(() => {
          !!action3 && action3.action.play()
          state.lidZoom = true
        }, 300)
        setTimeout(() => {
          state.lidOpen = true

          state.animating = false
          state.pencilHighlight = false
          state.lidZoom = false
        }, totalDuration + 1000)
      }
      return
    }

    //--------------------------------Lid -> closes the lid

    if ((objectName === 'Lid' || objectName === 'ClaspAndHinges' || objectName === 'LidRim') && snap.zoom === false) {
      const action1 =
        snap.lidOpen &&
        getAnimation({
          clipName: 'LidCloseAction',
          mixers,
          clips,
          objectRef: lid.current,
        })
      const action2 =
        snap.lidOpen &&
        getAnimation({
          clipName: 'ClipCloseAction_BottomClip',
          mixers,
          clips,
          objectRef: clasp.current,
        })
      if (!!action1 && !!action2) {
        state.animating = true
        action1.action.play()
        !!action2 && action2.action.play()
        setTimeout(
          () => {
            state.lidOpen = false

            state.animating = false
          },
          action1.duration + action2.duration + 2000,
        )
      }
      return
    }
  }

  const playHighlightAnimation = (actionName) => {
    //--------------------------rubber highlight
    if (actionName === 'RubberHighlight') {
      const action1 = getAnimation({
        clipName: 'RubberHighlight_Rubber',
        mixers,
        clips,
        objectRef: rubber.current,
      })
      if (!snap.rubberOpen) {
        const action2 = getAnimation({
          clipName: 'RubberOpenAction_Rubber',
          mixers,
          clips,
          objectRef: rubberTray.current,
        })

        state.animating = true
        !!action2 && action2.action.play()
        setTimeout(() => {
          !!action1 && action1.action.play()
        }, action2.duration)
        setTimeout(() => {
          state.zoom = true
        }, action1.duration + action2.duration)
        setTimeout(
          () => {
            state.rubberOpen = true
            state.zoom = false

            state.animating = false
          },
          action1.duration + action2.duration + 2000,
        )
        return
      }

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.zoom = true
      }, action1.duration)
      setTimeout(() => {
        state.zoom = false

        state.animating = false
      }, action1.duration + 2000)
      return
    }
    //-------------------------rubber return
    if (actionName === 'RubberHighlightReturn') {
      const action1 = getAnimation({
        clipName: 'RubberHighlightReturn_Rubber',
        mixers,
        clips,
        objectRef: rubber.current,
      })

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.highlightAction = null

        state.animating = false
      }, action1.duration)
    }

    //--------------------------calculator highlight
    if (actionName === 'CalculatorHighlight') {
      const action1 = getAnimation({
        clipName: 'CalculatorHighlight',
        mixers,
        clips,
        objectRef: calculator.current,
      })
      if (!snap.calculatorReleased) {
        const action2 = getAnimation({
          clipName: 'CalculatorReleaseAction',
          mixers,
          clips,
          objectRef: calculator.current,
        })

        state.animating = true
        !!action2 && action2.action.play()
        setTimeout(() => {
          !!action1 && action1.action.play()
        }, action2.duration)
        setTimeout(() => {
          state.zoom = true
        }, action1.duration + action2.duration)
        setTimeout(
          () => {
            state.calculatorReleased = true
            state.zoom = false

            state.animating = false
          },
          action1.duration + action2.duration + 2000,
        )
        return
      }

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.zoom = true
      }, action1.duration)
      setTimeout(() => {
        state.zoom = false

        state.animating = false
      }, action1.duration + 2000)
      return
    }
    //-------------------------Calculator return
    if (actionName === 'CalculatorHighlightReturn') {
      const action1 = getAnimation({
        clipName: 'CalculatorHighlightReturn',
        mixers,
        clips,
        objectRef: calculator.current,
      })

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.highlightAction = null

        state.animating = false
        //state.current=null
      }, action1.duration)
    }
    //--------------------------sharpener highlight
    if (actionName === 'SharpenerHighlight') {
      const action1 = getAnimation({
        clipName: 'SharpenerHighlight_Sharpener',
        mixers,
        clips,
        objectRef: sharpener.current,
      })
      if (!snap.sharpenerLifted) {
        const action2 = getAnimation({
          clipName: 'SharpenerLiftAction',
          mixers,
          clips,
          objectRef: sharpenerBase.current,
        })

        state.animating = false
        !!action2 && action2.action.play()
        setTimeout(() => {
          !!action1 && action1.action.play()
        }, action2.duration)
        setTimeout(() => {
          state.zoom = true
        }, action1.duration + action2.duration)
        setTimeout(
          () => {
            state.sharpenerLifted = true
            //state.current='Sharpener'
            state.zoom = false
            state.animating = false
          },
          action1.duration + action2.duration + 1000,
        )
        return
      }

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.zoom = true
      }, action1.duration)
      setTimeout(() => {
        //state.current='Sharpener'
        state.zoom = false

        state.animating = false
      }, action1.duration + 2000)
      return
    }
    //-------------------------Sharpener return
    if (actionName === 'SharpenerHighlightReturn') {
      const action1 = getAnimation({
        clipName: 'SharpenerHighlightReturn_Sharpener',
        mixers,
        clips,
        objectRef: sharpener.current,
      })

      state.animating = true
      !!action1 && action1.action.play()
      setTimeout(() => {
        state.highlightAction = null

        state.animating = false
      }, action1.duration)
    }

    //-----------------------------------end
    return
  }
  //path="/cube/" files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]} ground={{height: 15, radius: 60}}
  //files={'https://res.cloudinary.com/drixmykpt/raw/upload/v1661526365/hype/hdri/u78fhltnjuyj5vzzmqiz.hdr'}
  return (
    <>
      <PencilCase
        animationsRef={animationsRef}
        playAnimation={playAnimation}
        setHovered={setHovered}
        refs={refs}
        nodes={nodes}
      />
      <Environment files={`https://res.cloudinary.com/drixmykpt/image/upload/v1724673854/hype/hdri/studio.jpg`} />
      <ContactShadows
        opacity={0.8}
        blur={1.5}
        position={[0, -0.6, 0]}
        width={10}
        height={5}
        far={20}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <CubeBackground />
    </>
  )
}

const CubeBackground = () => {
  const { nodes } = useGLTF(`${directory}/models/cube-model.glb`)
  const snap = useSnapshot(state)
  useMemo(() => {
    for (const node in nodes) {
      nodes[node].pos = Object.values(nodes[node]?.position) //?. in case position is lower in the hierarchy
    }
  }, [nodes])

  //textures for the lettering on the back wall
  const plasticAO = useTexture(`${directory}/textures/plastic-scuffed-ao.png`)
  const plasticNormal = useTexture(`${directory}/textures/plastic-scuffed-normal.png`)
  const wallColor = snap.darkMode ? '#070707' : '#eee'
  return (
    <>
      <group position={[0, 0, -65]}>
        <mesh
          position={nodes.Wall1.pos}
          geometry={nodes.Wall1.geometry}
          material={nodes.Wall1.material}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Wall2.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={wallColor}
          />
        </mesh>
        <mesh
          position={nodes.Wall2.pos}
          geometry={nodes.Wall2.geometry}
          material={nodes.Wall2.material}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Wall2.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={wallColor}
          />
        </mesh>
        <mesh
          position={nodes.Wall3.pos}
          geometry={nodes.Wall3.geometry}
          material={nodes.Wall3.material}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Wall2.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={wallColor}
          />
        </mesh>
        <mesh
          position={nodes.Wall4.pos}
          geometry={nodes.Wall4.geometry}
          material={nodes.Wall4.material}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Wall2.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={wallColor}
          />
        </mesh>
        <mesh
          position={nodes.Wall5.pos}
          geometry={nodes.Wall5.geometry}
          material={nodes.Wall5.material}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Wall2.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={wallColor}
          />
        </mesh>
        <mesh position={nodes.Hype.pos} geometry={nodes.Hype.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.Hype.material}
            roughness={0.05}
            metalness={0.3}
            aoMap={plasticAO}
            normalMap={plasticNormal}
            normalScale={0.5}
            color={wallColor}
          />
        </mesh>
        <mesh position={nodes.LeftOuter.pos} geometry={nodes.LeftOuter.geometry} receiveShadow castShadow>
          <meshStandardMaterial attach='material' {...nodes.LeftOuter.material} color={'#9C823A'} />
        </mesh>
        <mesh position={nodes.RightOuter.pos} geometry={nodes.RightOuter.geometry} receiveShadow castShadow>
          <meshStandardMaterial attach='material' {...nodes.RightOuter.material} color={'#9C823A'} />
        </mesh>
        <mesh position={nodes.TextLeft.pos} geometry={nodes.TextLeft.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.TextLeft.material}
            roughness={0.1}
            metalness={0.9}
            color={'#9C823A'}
          />
        </mesh>
        <group position={[0, 0, 0]}>
          <mesh position={nodes.TextRight.pos} geometry={nodes.TextRight.geometry} receiveShadow castShadow>
            <meshStandardMaterial
              attach='material'
              {...nodes.TextRight.material}
              roughness={0.1}
              metalness={0.9}
              color={'#9C823A'}
            />
          </mesh>
        </group>
      </group>
    </>
  )
}

const PencilCase = ({ playAnimation, setHovered, refs, nodes }) => {
  const snap = useSnapshot(state)

  //decalTextures
  const decalDiffuse = useTexture(`${directory}/textures/HypeLogoDiffuse.png`)
  const decalLogoDiffuse = useTexture(`${directory}/textures/HypeLogoDecalBWDiffuse.png`)
  const decalButtonsDiffuse = useTexture(`${directory}/textures/CalculatorNumbers.png`)
  const decalScreen = useTexture(`${directory}/textures/digitaldisplay.png`)

  //Normal Maps
  const plasticNormal = useTexture(`${directory}/textures/plastic-scuffed-normal.png`)
  const sciFiNormal = useTexture(`${directory}/textures/space-cruiser-panels2_normal-ogl.png`)
  const stripesNormal = useTexture(`${directory}/textures/Stripe_Normal.png`)
  const sunburstNormal = useTexture(`${directory}/textures/Sunburst_Normal.png`)
  const rubberNormal = useTexture(`${directory}/textures/synth-rubber-normal.png`)

  useMemo(() => {
    if (!!decalDiffuse) decalDiffuse.anisotropy = 16
    if (!!decalLogoDiffuse) decalLogoDiffuse.anisotropy = 16
    if (!!decalButtonsDiffuse) decalButtonsDiffuse.anisotropy = 16
    if (!!decalScreen) decalScreen.anisotropy = 16
  }, [decalDiffuse, decalLogoDiffuse, decalScreen, decalButtonsDiffuse])

  const {
    hypeLogoRubber,
    calculatorScreen,
    calculatorButtons,
    tray,
    lid,
    button1,
    button2,
    button3,
    button4,
    logoPlate,
    calculator,
    sharpenerBase,
    sharpener,
    rubberTray,
    rubber,
    clasp,
  } = refs
  useMemo(() => {
    //texture maps given max anisotropy to stop looking degraded when zoomed out
    nodes.HypeLogoRubber.material.map.anisotropy = 16
    nodes.DigitalDisplay.material.map.anisotropy = 16
    nodes.CalculatorNumbers.material.map.anisotropy = 16
    nodes.LogoPlateDecalBlack.material.map.anisotropy = 16
    nodes.LogoPlateDecalWhite.material.map.anisotropy = 16
    nodes.LogoPlateDecalGold.material.map.anisotropy = 16
    nodes.PencilWoods.material.map.anisotropy = 16
    for (const node in nodes) {
      //converting position and rotation objects into arrays for use in the meshes
      nodes[node].pos = Object.values(nodes[node]?.position) //?. in case position is lower in the hierarchy
      nodes[node].rot = Object.values(nodes[node]?.rotation).slice(1, 4) //sliced to get just x y z
      //set ids for buttons so they can be animated as individuals but materials still changed as a collection
      if (node === 'Button1') {
        state.items.Button1.id = nodes[node].geometry.id
      }
      if (node === 'Button2') {
        state.items.Button2.id = nodes[node].geometry.id
      }
      if (node === 'Button3') {
        state.items.Button3.id = nodes[node].geometry.id
      }
      if (node === 'Button4') {
        state.items.Button4.id = nodes[node].geometry.id
      }
    }
  }, [nodes])

  const { handleClick, handleDoubleClick } = useClicks({
    onClick: (e) => {
      e.stopPropagation()
      if (!snap.animating && snap.highlightAction === null) {
        if (
          e.intersections[0].object.material.name === 'CalculatorTrim' ||
          e.intersections[0].object.material.name === 'CalculatorNumbers' ||
          e.intersections[0].object.material.name === 'CalculatorScreen' ||
          e.intersections[0].object.material.name === 'DigitalDisplay'
        ) {
          state.current = 'Calculator'
          return
        }
        if (
          e.intersections[0].object.material.name === 'Graphite' ||
          e.intersections[0].object.material.name === 'PencilWoods'
        ) {
          state.current = 'Pencils'
          return
        }
        if (
          e.intersections[0].object.material.name === 'SharpenerBlade' ||
          e.intersections[0].object.material.name === 'SharpenerHolder' ||
          e.intersections[0].object.material.name === 'SharpenerBase'
        ) {
          state.current = 'TopPlate'
          return
        }
        if (e.intersections[0].object.material.name === 'RubberTray') {
          state.current = 'Base'
          return
        }
        if (e.intersections[0].object.material.name.match(/^LogoPlateDecal/)) {
          state.current = 'Logo'
          return
        }

        state.current = e.intersections[0].object.material.name
      }
    },

    onDoubleClick: (e) => {
      e.stopPropagation()
      if (!snap.animating) {
        if (snap.highlightAction !== null) {
          return
        }

        playAnimation(e.intersections[0].object)
      }
    },
  })
  const [lidMaterial, setLidMaterial] = useState(null)

  useEffect(() => {
    //can't change textures dynamically like with color? - so I've had to change the whole material
    switch (snap.items.LidTexture.Main.textureName) {
      case 'NO PATTERN':
        setLidMaterial(
          <meshStandardMaterial
            attach='material'
            {...nodes.Lid.material}
            metalness={snap.items.Lid.Main.metalness}
            normalMap={plasticNormal}
            normalScale={snap.items.LidTexture.Main.normalScale}
            color={snap.items.Lid.Main.color}
          />,
        )
        break
      case 'SUNBURST':
        setLidMaterial(
          <meshStandardMaterial
            attach='material'
            {...nodes.Lid.material}
            metalness={snap.items.Lid.Main.metalness}
            normalMap={sunburstNormal}
            normalScale={snap.items.LidTexture.Main.normalScale}
            color={snap.items.Lid.Main.color}
          />,
        )
        break
      case 'STRIPES':
        setLidMaterial(
          <meshStandardMaterial
            attach='material'
            {...nodes.Lid.material}
            metalness={snap.items.Lid.Main.metalness}
            normalMap={stripesNormal}
            normalScale={snap.items.LidTexture.Main.normalScale}
            color={snap.items.Lid.Main.color}
          />,
        )
        break
      case 'SCI-FI':
        setLidMaterial(
          <meshStandardMaterial
            attach='material'
            {...nodes.Lid.material}
            metalness={snap.items.Lid.Main.metalness}
            normalMap={sciFiNormal}
            normalScale={snap.items.LidTexture.Main.normalScale}
            color={snap.items.Lid.Main.color}
          />,
        )
        break
      default:
        setLidMaterial(
          <meshStandardMaterial
            attach='material'
            {...nodes.Lid.material}
            metalness={snap.items.Lid.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Lid.Main.color}
          />,
        )
    }
  }, [snap.items.LidTexture.Main.textureName, snap.items.Lid.Main.color, snap.items.LidTexture.Main.normalScale])

  const checkHovered = (name = null) => {
    //if hovered on the following - set the appropriate objects to change
    switch (name) {
      case 'CalculatorNumbers':
        setHovered('Calculator')
        break
      case 'CalculatorScreen':
        setHovered('Calculator')
        break
      case 'DigitalDisplay':
        setHovered('Calculator')
        break
      case 'LogoPlateDecalBlack':
        setHovered('Logo')
        break
      case 'LogoPlateDecalWhite':
        setHovered('Logo')
        break
      case 'LogoPlateDecalGold':
        setHovered('Logo')
        break
      case 'LogoPlateDecalSilver':
        setHovered('Logo')
        break
      case 'PencilWoods':
        setHovered('Pencils')
        break
      case 'Graphite':
        setHovered('Pencils')
        break
      case 'RubberTray':
        setHovered('Base')
        break
      default:
        setHovered(name)
    }
  }

  //outline states for highlighted ring around double clickable meshes that cause animations
  const [outlineOne, setOutlineOne] = useState(false)
  const [outlineTwo, setOutlineTwo] = useState(false)
  const [outlineThree, setOutlineThree] = useState(false)
  const [outlineFour, setOutlineFour] = useState(false)
  const [outlinePlate, setOutlinePlate] = useState(false)
  //spring to change opacity of the outline meshes
  const props = useSpring({
    opacityOne: outlineOne ? 1 : 0,
    opacityTwo: outlineTwo ? 1 : 0,
    opacityThree: outlineThree ? 1 : 0,
    opacityFour: outlineFour ? 1 : 0,
    opacityPlate: outlinePlate ? 1 : 0,
    config: { friction: 30, mass: 10 },
  })

  //pencil case meshes
  return (
    <group
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), !snap.animating && checkHovered(e.object.material.name))}
      onPointerOut={(e) => !snap.animating && e.intersections.length === 0 && setHovered(null)}
      onPointerMissed={() => {
        if (!snap.animating) state.current = null
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <mesh position={nodes.Base.pos} rotation={nodes.Base.rot} geometry={nodes.Base.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.Base.material}
          roughness={0.05}
          metalness={snap.items.Base.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.Base.Main.color}
        />
      </mesh>
      <mesh ref={tray} name='Tray' position={nodes.Tray.pos} geometry={nodes.Tray.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.Tray.material}
          roughness={0.05}
          metalness={snap.items.Tray.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.Tray.Main.color}
        />
        <mesh
          position={nodes.Graphite.pos}
          geometry={nodes.Graphite.geometry}
          material={nodes.Graphite.material}
          receiveShadow
          castShadow
        />
        <mesh position={nodes.PencilWoods.pos} geometry={nodes.PencilWoods.geometry} receiveShadow castShadow>
          <meshStandardMaterial attach='material' {...nodes.PencilWoods.material} metalness={0.8} roughness={0.5} />
        </mesh>
        <mesh position={nodes.PencilBodies.pos} geometry={nodes.PencilBodies.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.PencilBodies.material}
            roughness={0.05}
            metalness={snap.items.Pencils.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Pencils.Main.color}
          />
        </mesh>
        <mesh position={nodes.PencilTrims.pos} geometry={nodes.PencilTrims.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.PencilTrims.material}
            roughness={0}
            metalness={snap.items.Pencils.Secondary.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Pencils.Secondary.color}
          />
        </mesh>
      </mesh>
      <mesh
        ref={lid}
        name='Lid'
        position={nodes.Lid.pos}
        rotation={nodes.Lid.rot}
        geometry={nodes.Lid.geometry}
        receiveShadow
        castShadow
      >
        {lidMaterial}
        <mesh
          position={nodes.LidRim.pos}
          rotation={nodes.LidRim.rot}
          geometry={nodes.LidRim.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.LidRim.material}
            metalness={snap.items.LidRim.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.LidRim.Main.color}
          />
        </mesh>
        <mesh
          ref={clasp}
          name='BottomClip'
          position={nodes.BottomClip.pos}
          rotation={nodes.BottomClip.rot}
          geometry={nodes.BottomClip.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.BottomClip.material}
            metalness={snap.items.ClaspAndHinges.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.ClaspAndHinges.Main.color}
          />
        </mesh>
        <mesh position={nodes.HingesT.pos} geometry={nodes.HingesT.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.HingesT.material}
            metalness={snap.items.ClaspAndHinges.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.ClaspAndHinges.Main.color}
          />
        </mesh>
        <mesh
          position={nodes.TopClip.pos}
          rotation={nodes.TopClip.rot}
          geometry={nodes.TopClip.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.TopClip.material}
            metalness={snap.items.ClaspAndHinges.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.ClaspAndHinges.Main.color}
          />
        </mesh>
      </mesh>
      <mesh position={nodes.HingesB.pos} geometry={nodes.HingesB.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.HingesB.material}
          metalness={snap.items.ClaspAndHinges.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.ClaspAndHinges.Main.color}
        />
      </mesh>
      <mesh position={nodes.TopPlate.pos} geometry={nodes.TopPlate.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.TopPlate.material}
          roughness={0.05}
          metalness={snap.items.TopPlate.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.TopPlate.Main.color}
        />
      </mesh>
      <group ref={button1} name='Button1' position={nodes.Button1.pos}>
        <mesh
          onPointerOver={() => {
            setOutlineOne(true)
          }}
          onPointerOut={() => {
            setOutlineOne(false)
          }}
          geometry={nodes.Button1.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Button1.material}
            metalness={snap.items.Buttons.Main.metalness}
            color={snap.items.Buttons.Main.color}
          />
        </mesh>
        <mesh
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0.01, 0]}
          geometry={nodes.Button1.geometry}
          receiveShadow
          castShadow
        >
          <a.meshBasicMaterial
            attach='material'
            transparent={true}
            opacity={props.opacityOne}
            color={'#fa0471'}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      <group ref={button2} name='Button2' position={nodes.Button2.pos}>
        <mesh
          onPointerOver={() => {
            setOutlineTwo(true)
          }}
          onPointerOut={() => {
            setOutlineTwo(false)
          }}
          geometry={nodes.Button2.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Button2.material}
            metalness={snap.items.Buttons.Main.metalness}
            color={snap.items.Buttons.Main.color}
          />
        </mesh>
        <mesh
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0.01, 0]}
          geometry={nodes.Button2.geometry}
          receiveShadow
          castShadow
        >
          <a.meshBasicMaterial
            attach='material'
            transparent={true}
            opacity={props.opacityTwo}
            color={'#fa0471'}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      <group ref={button3} name='Button3' position={nodes.Button3.pos}>
        <mesh
          onPointerOver={() => {
            setOutlineThree(true)
          }}
          onPointerOut={() => {
            setOutlineThree(false)
          }}
          geometry={nodes.Button3.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Button3.material}
            metalness={snap.items.Buttons.Main.metalness}
            color={snap.items.Buttons.Main.color}
          />
        </mesh>
        <mesh
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0.01, 0]}
          geometry={nodes.Button3.geometry}
          receiveShadow
          castShadow
        >
          <a.meshBasicMaterial
            attach='material'
            transparent={true}
            opacity={props.opacityThree}
            color={'#fa0471'}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      <group ref={button4} name='Button4' position={nodes.Button4.pos}>
        <mesh
          onPointerOver={() => {
            setOutlineFour(true)
          }}
          onPointerOut={() => {
            setOutlineFour(false)
          }}
          geometry={nodes.Button4.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Button4.material}
            metalness={snap.items.Buttons.Main.metalness}
            color={snap.items.Buttons.Main.color}
          />
        </mesh>
        <mesh
          scale={[1.05, 1.05, 1.05]}
          position={[0, 0.01, 0]}
          geometry={nodes.Button4.geometry}
          receiveShadow
          castShadow
        >
          <a.meshBasicMaterial
            attach='material'
            transparent={true}
            opacity={props.opacityFour}
            color={'#fa0471'}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      <group ref={logoPlate} name='LogoPlate' position={nodes.LogoPlate.pos}>
        <mesh
          onPointerOver={() => {
            setOutlinePlate(true)
          }}
          onPointerOut={() => {
            setOutlinePlate(false)
          }}
          geometry={nodes.LogoPlate.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.LogoPlate.material}
            metalness={snap.items.LogoPlate.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.LogoPlate.Main.color}
          />
          <mesh
            position={nodes.LogoPlateDecalBlack.pos}
            rotation={nodes.LogoPlateDecalBlack.rot}
            geometry={nodes.LogoPlateDecalBlack.geometry}
          >
            <meshStandardMaterial
              attach='material'
              {...nodes[snap.items.Logo.Main.materialName].material}
              metalness={snap.items.Logo.Main.metalness}
            />
          </mesh>
        </mesh>
        <mesh
          scale={[1.05, 1.05, 1.03]}
          position={[0, 0.014, 0]}
          geometry={nodes.LogoPlate.geometry}
          receiveShadow
          castShadow
        >
          <a.meshBasicMaterial
            attach='material'
            transparent={true}
            opacity={props.opacityPlate}
            color={'#fa0471'}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      <mesh
        ref={sharpenerBase}
        name='SharpenerBase'
        position={nodes.SharpenerBase.pos}
        geometry={nodes.SharpenerBase.geometry}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          attach='material'
          {...nodes.SharpenerBase.material}
          roughness={0.05}
          metalness={snap.items.TopPlate.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.TopPlate.Main.color}
        />
        <mesh position={nodes.SharpenerClips.pos} geometry={nodes.SharpenerClips.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.SharpenerClips.material}
            roughness={0.05}
            metalness={snap.items.SharpenerClips.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.SharpenerClips.Main.color}
          />
        </mesh>
        <mesh
          ref={sharpener}
          name='Sharpener'
          position={nodes.Sharpener.pos}
          geometry={nodes.Sharpener.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Sharpener.material}
            roughness={0.05}
            metalness={snap.items.Sharpener.Main.metalness}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Sharpener.Main.color}
          />
          <mesh position={nodes.SharpenerBlade.pos} geometry={nodes.SharpenerBlade.geometry} receiveShadow castShadow>
            <meshStandardMaterial
              attach='material'
              {...nodes.SharpenerBlade.material}
              roughness={0}
              metalness={1}
              color={snap.items.Sharpener.Secondary.color}
            />
          </mesh>
        </mesh>
      </mesh>
      <mesh position={nodes.SharpenerHolder.pos} geometry={nodes.SharpenerHolder.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.SharpenerHolder.material}
          roughness={0.05}
          metalness={snap.items.TopPlate.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.TopPlate.Main.color}
        />
      </mesh>
      <mesh position={nodes.CalculatorTray.pos} geometry={nodes.CalculatorTray.geometry} receiveShadow castShadow>
        <meshStandardMaterial
          attach='material'
          {...nodes.CalculatorTray.material}
          roughness={0}
          metalness={snap.items.CalculatorTray.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.CalculatorTray.Main.color}
        />
      </mesh>
      <mesh
        ref={calculator}
        name='Calculator'
        position={nodes.Calculator.pos}
        geometry={nodes.Calculator.geometry}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          attach='material'
          {...nodes.Calculator.material}
          roughness={0.05}
          metalness={snap.items.Calculator.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.Calculator.Main.color}
        />
        <mesh
          ref={calculatorScreen}
          name='CalculatorScreen'
          position={nodes.CalculatorScreen.pos}
          geometry={nodes.CalculatorScreen.geometry}
          material={nodes.CalculatorScreen.material}
          receiveShadow
          castShadow
        >
          <mesh
            position={nodes.DigitalDisplay.pos}
            geometry={nodes.DigitalDisplay.geometry}
            material={nodes.DigitalDisplay.material}
            receiveShadow
            castShadow
          />
        </mesh>
        <mesh position={nodes.CalculatorTrim.pos} geometry={nodes.CalculatorTrim.geometry} receiveShadow castShadow>
          <meshStandardMaterial
            attach='material'
            {...nodes.CalculatorTrim.material}
            roughness={0}
            metalness={1}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Calculator.Secondary.color}
          />
        </mesh>
        <mesh
          ref={calculatorButtons}
          name='CalculatorButtons'
          position={nodes.CalculatorButtons.pos}
          geometry={nodes.CalculatorButtons.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.CalculatorButtons.material}
            roughness={0.4}
            metalness={0.9}
            normalMap={plasticNormal}
            normalScale={0.1}
            color={snap.items.Calculator.Secondary.color}
          />
          <mesh
            position={nodes.CalculatorNumbers.pos}
            geometry={nodes.CalculatorNumbers.geometry}
            material={nodes.CalculatorNumbers.material}
            receiveShadow
            castShadow
          />
        </mesh>
      </mesh>
      <mesh
        ref={rubberTray}
        name='RubberTray'
        position={nodes.RubberTray.pos}
        geometry={nodes.RubberTray.geometry}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          attach='material'
          {...nodes.RubberTray.material}
          roughness={0.05}
          metalness={snap.items.Base.Main.metalness}
          normalMap={plasticNormal}
          normalScale={0.1}
          color={snap.items.Base.Main.color}
        />
        <mesh
          ref={rubber}
          name='Rubber'
          position={nodes.Rubber.pos}
          geometry={nodes.Rubber.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            attach='material'
            {...nodes.Rubber.material}
            roughness={0.3}
            metalness={0.8}
            normalMap={rubberNormal}
            normalScale={0.1}
            color={snap.items.Rubber.Main.color}
          />
          <mesh
            ref={hypeLogoRubber}
            Name='HypeLogoRubber'
            position={nodes.HypeLogoRubber.pos}
            geometry={nodes.HypeLogoRubber.geometry}
            material={nodes.HypeLogoRubber.material}
            receiveShadow
            castShadow
          />
        </mesh>
      </mesh>
      <Preload all />
    </group>
  )
}

const Controls = () => {
  const snap = useSnapshot(state)
  //allow controls to be turned off when automatic zoom animations occur
  return (
    <>
      <OrbitControls
        enabled={!snap.zoom || !snap.lidZoom}
        maxDistance={12}
        minDistance={2.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        enableDamping={true}
        dampingFactor={0.03}
        enablePan={false}
      />
    </>
  )
}

const Dimensions = () => {
  const { size } = useThree()
  state.width = size.width
  return null
}

function ToneMapping() {
  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }))
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.5
    scene.traverse((object) => {
      if (object.material) {
        object.material.needsUpdate = true
      }
    })
  }, [gl, scene])
  return <></>
}

const App = () => {
  const snap = useSnapshot(state)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(snap.items))
  }, [snap.items])
  return (
    <>
      <Canvas camera={{ position: [0, 0.5, 4], fov: 60 }} legacy={true}>
        <fog attach='fog' color={snap.darkMode ? '#aaa' : '#eee'} far={120} near={10} />
        <ambientLight intensity={1.5} />
        <spotLight intensity={0.3} position={[5, 20, 20]} />
        <Dolly />
        <ToneMapping />
        <Suspense fallback={null}>
          <Main />
        </Suspense>
        <Controls />
        <Dimensions />
      </Canvas>
      <Menu />
      <Logo />
      <InformationTab open={open} setOpen={setOpen} />
      <InformationMenu open={open} setOpen={setOpen} />
      <ModeToggle />
      <div style={{ zIndex: 2, position: 'absolute', left: 0, top: 0 }}>
        <Header landingPage={false} />
      </div>
    </>
  )
}

export { App as default }
