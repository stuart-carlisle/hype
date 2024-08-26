'use client'
import React, { useState } from 'react'
import HImage from './images/Selection.svg'
import { useSpring, a } from '@react-spring/web'
import { useRouter } from 'next/navigation'
import styles from './Header.module.scss'
import { useSnapshot } from 'valtio'
import state from './stateLandingPage'

const Footer = ({ landingPage = true, parallaxRef }) => {
  const navigate = useRouter()
  const snap = useSnapshot(state)
  //headings
  const [hovered1, set1] = useState(false)
  const [hovered2, set2] = useState(false)
  const [hovered3, set3] = useState(false)
  const [hovered4, set4] = useState(false)
  const [hovered5, set5] = useState(false)
  //logo
  const [clicked, setClicked] = useState(false)
  const [headerGroupClass, setHeaderGroupClass] = useState('headerGroupClosed')
  const [mobileHeaderGroupClass, setMobileHeaderGroupClass] = useState('mobileClosed')
  const [hovered, set] = useState(false)
  //animated styles for headings
  const styles1 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
  })
  const styles2 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 100,
  })
  const styles3 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 200,
  })
  const styles4 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 300,
  })
  const styles5 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 400,
  })
  const styles6 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 500,
  })
  const styles7 = useSpring({
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 0,
  })
  const styles8 = useSpring({
    transformOrigin: 'top',
    transform: `scaleX(${clicked ? 1 : 0}) `,
    config:
      snap.width < 500
        ? { mass: 5, tension: 800, friction: 100, velocity: 0.0 }
        : { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 0,
  })
  //animated styles for headings with active hover
  const stylesLine1 = useSpring({ transform: `scaleY(${hovered1 && clicked ? 1 : 0})`, transformOrigin: 'bottom' })
  const stylesLine2 = useSpring({ transform: `scaleY(${hovered2 && clicked ? 1 : 0})`, transformOrigin: 'bottom' })
  const stylesLine3 = useSpring({ transform: `scaleY(${hovered3 && clicked ? 1 : 0})`, transformOrigin: 'bottom' })
  const stylesLine4 = useSpring({ transform: `scaleY(${hovered4 && clicked ? 1 : 0})`, transformOrigin: 'bottom' })
  const stylesLine5 = useSpring({ transform: `scaleY(${hovered5 && clicked ? 1 : 0})`, transformOrigin: 'bottom' })
  //animated styles for the logo
  const styles9 = useSpring({
    transform: `scale(${clicked ? 0.7 : 1})`,
    config: { mass: 10, tension: 800, friction: 100, velocity: 0.0 },
    delay: 0,
  })
  const styles10 = useSpring({
    width: '3px',
    height: '30px',
    background: '#A30303',
    transform: `scaleX(${clicked ? 1 : 0})`,
    transformOrigin: 'right',
    position: 'absolute',
    top: '78px',
    left: `${clicked ? '56px' : '300px'}`,
    config: { mass: 5, tension: 400, friction: 70, velocity: 0.0 },
    delay: 0,
  })

  const mobileBreakPoint = 600
  const smallMobileBreakPoint = 500
  const tabletBreakPoint = 700

  const Main = () => (
    <svg
      className={styles[headerGroupClass]}
      width={
        snap && snap.width > tabletBreakPoint
          ? 750
          : snap.width > mobileBreakPoint
            ? 600
            : snap.width > smallMobileBreakPoint
              ? 500
              : snap.width * 0.95
      }
      height='79'
      viewBox='0 0 750 79'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        onPointerLeave={() => {
          set1(false)
          set2(false)
          set3(false)
          set4(false)
          set5(false)
        }}
      >
        <a.text
          onPointerOver={() => {
            set1(true)
          }}
          onPointerLeave={() => {
            set1(false)
          }}
          onClick={() => {
            parallaxRef.current.scrollTo(0)
          }}
          style={styles1}
          x='100'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          HOME
        </a.text>
        <a.text
          onClick={() => {
            parallaxRef.current.scrollTo(1)
          }}
          onPointerOver={() => {
            set2(true)
          }}
          onPointerLeave={() => {
            set2(false)
          }}
          style={styles2}
          x='195'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          ABOUT
        </a.text>
        <a.text
          onClick={() => {
            parallaxRef.current.scrollTo(2)
          }}
          onPointerOver={() => {
            set3(true)
          }}
          onPointerLeave={() => {
            set3(false)
          }}
          style={styles3}
          x='290'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          HYPE 2.0
        </a.text>
        <a.text
          onClick={() => {
            parallaxRef.current.scrollTo(3)
          }}
          onPointerOver={() => {
            set4(true)
          }}
          onPointerLeave={() => {
            set4(false)
          }}
          style={styles4}
          x='415'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          METALLIC
        </a.text>
        <a.text
          onClick={() => {
            parallaxRef.current.scrollTo(5)
          }}
          onPointerOver={() => {
            set5(true)
          }}
          onPointerLeave={() => {
            set5(false)
          }}
          className='heading'
          style={styles5}
          x='540'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          CUSTOMISE
        </a.text>
        <a.path style={stylesLine1} x='100' y='50' id='Vector 7' d='M100 58H165' stroke='#A30303' strokeWidth='2' />
        <a.path style={stylesLine2} id='Vector 8' d='M193 58H265' stroke='#A30303' strokeWidth='2' />
        <a.path style={stylesLine3} id='Vector 9' d='M286 58H390' stroke='#A30303' strokeWidth='2' />
        <a.path style={stylesLine4} id='Vector 10' d='M412 58H520' stroke='#A30303' strokeWidth='2' />
        <a.path style={stylesLine5} id='Vector 11' d='M536 58H670' stroke='#A30303' strokeWidth='2' />
      </g>
    </svg>
  )

  const Mobile = () => (
    <svg
      className={styles[mobileHeaderGroupClass]}
      width={snap.width}
      height={cellHeight * menuArray.length}
      viewBox={`0 0 ${snap.width} ${cellHeight * menuArray.length}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <filter id='bevel-mobile' filterUnits='objectBoundingBox' x='-10%' y='-10%' width='150%' height='150%'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='2' result='blur' />
          <feSpecularLighting
            in='blur'
            surfaceScale='1'
            specularConstant='1'
            specularExponent='16'
            result='specOut'
            lightingColor='white'
          >
            <fePointLight x='-5000' y='-10000' z='200' />
          </feSpecularLighting>
          <feComposite in='specOut' in2='SourceAlpha' operator='in' result='specOut2' />
          <feComposite
            in='SourceGraphic'
            in2='specOut2'
            operator='arithmetic'
            k1='0'
            k2='1'
            k3='1'
            k4='0'
            result='litPaint'
          />
        </filter>
        <filter id={'shadow-mobile'}>
          <feDropShadow dx='3' dy='3' stdDeviation='2' floodColor='#000' />
        </filter>
      </defs>
      {menuArray.map((item, i) => {
        return (
          <a.g
            onClick={() => {
              setClicked(!clicked)
              if (headerGroupClass === 'headerGroupClosed') {
                setHeaderGroupClass('headerGroupOpen')
                setMobileHeaderGroupClass('mobileOpen')
              } else {
                setTimeout(() => {
                  setHeaderGroupClass('headerGroupClosed')
                  setMobileHeaderGroupClass('mobileClosed')
                }, 1000)
              }
              if (i !== 0) {
                i === 5 ? parallaxRef.current.scrollTo(6) : parallaxRef.current.scrollTo(i - 1)
              }
            }}
            key={i}
            className={styles.mobileCells}
            style={stylesArray[i]}
          >
            {i + 1 === menuArray.length ? (
              <path
                d={`M0,${cellHeight * i} h${snap.width} v${cellHeight - 10} q0,10 -10,10 h${-snap.width + 20} q-10,0 -10,-10 z`}
                fill='#000'
                filter={'url(#bevel-mobile)'}
              ></path>
            ) : (
              <rect
                x={0}
                y={cellHeight * i}
                width={'100%'}
                height={cellHeight}
                fill={'#000'}
                filter={'url(#bevel-mobile)'}
              />
            )}
            <text
              filter={'url(#shadow-mobile)'}
              fill='#fff'
              x='50%'
              y={cellHeight * i + 32}
              dominantBaseline={'middle'}
              fontSize='28px'
              textAnchor='middle'
              fontFamily='Abel'
            >
              {item}
            </text>
          </a.g>
        )
      })}
    </svg>
  )

  const Customise = () => (
    <svg
      className={styles[headerGroupClass]}
      width='500'
      height='79'
      viewBox='0 0 579 79'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <a.text
          onPointerOver={() => {
            set1(true)
          }}
          onPointerLeave={() => {
            set1(false)
          }}
          onClick={() => {
            navigate('/')
          }}
          style={styles1}
          x='100'
          y='50'
          fontSize='28px'
          textAnchor='center'
          fill='white'
          fontFamily='Abel'
        >
          HOME
        </a.text>
        <a.path style={stylesLine1} x='100' y='50' id='Vector 7' d='M100 58H165' stroke='#A30303' strokeWidth='2' />
      </g>
    </svg>
  )

  const cellHeight = 60
  const menuArray = ['\u25c0', 'HOME', 'ABOUT', 'HYPE 2.0', 'METALLIC', 'CUSTOMISE']
  const stylesArray = [styles1, styles2, styles3, styles4, styles5, styles6]
  return (
    <div style={{ margin: 'auto', height: 79, width: 'max-content' }}>
      {landingPage && snap.width <= smallMobileBreakPoint ? <Mobile /> : landingPage ? <Main /> : <Customise />}
      <div
        onClick={() => {
          setClicked(!clicked)
          if (headerGroupClass === 'headerGroupClosed') {
            setHeaderGroupClass('headerGroupOpen')
            setMobileHeaderGroupClass('mobileOpen')
          } else {
            setTimeout(() => {
              setHeaderGroupClass('headerGroupClosed')
              setMobileHeaderGroupClass('mobileClosed')
            }, 1000)
          }
        }}
        onPointerOver={() => {
          set(true)
        }}
        onPointerLeave={() => {
          set(false)
        }}
        className={styles.glitchContainer}
      >
        <div className={styles.flex}>
          <div className={clicked ? styles.glitchClicked : hovered ? styles.glitch : styles.glitchNone}>
            <a.img alt='' src={HImage} style={styles9} />
          </div>
          <a.div style={styles10}></a.div>
        </div>
      </div>
    </div>
  )
}

export default Footer
