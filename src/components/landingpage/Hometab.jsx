"use client"
import React from 'react'
import { useProgress } from '@react-three/drei'
import styles from './Homepage.module.scss'

const HomeTab = () => {
  const { loaded } = useProgress()
  return (
    loaded > 23 &&
    <svg
      className={styles.infoHome}
      width="472"
      height="434"
      viewBox="0 0 472 434"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect filter={"url(#bevel4)"} id="box-home" rx="12" width="472" height="434" fill="#070707" />
      <rect fill="url(#gold-light-2)" filter={"url(#bevel4)"} id="box-home" width="100" height="434" />
      <g id="home" >
        <path fill="url(#gold-light-2)" filter={"url(#bevel4)"} d="M162.906 223.029V355.382C162.906 358.471 165.996 362 169.086 362H255.602V289.647C255.602 284.794 260.016 280.382 264.871 280.382H303.273C307.688 280.382 313.426 284.794 313.426 290.088V362H398.176C401.707 362 406.121 358.029 406.121 354.5V223.029L288.266 118.471L162.906 223.029Z"/>
        <path fill="url(#gold-light-2)" filter={"url(#bevel4)"} d="M289.148 62C289.148 62 125.387 205.824 117 213.324C122.738 222.588 135.539 227.441 153.195 212C170.852 196.559 289.148 96.8529 289.148 96.8529C289.148 96.8529 396.151 192.588 415.391 209.794C434.631 227 451.145 221.706 456 212.882C446.289 203.618 289.148 62 289.148 62Z"/>
        <path fill="url(#gold-light-2)" filter={"url(#bevel4)"} d="M416.273 164.794L382.727 136.559V96.4118L416.273 96.8529V164.794Z"/>
      </g>
      <defs>
        <pattern id={'gold-light-2'} width="1" height="1">
          <image href={'/Golden/goldlight.jpg'} x="0" y="0" width='500' />
        </pattern>
        <filter
          id='bevel4'
          filterUnits='objectBoundingBox'
          x='-10%'
          y='-10%'
          width='150%'
          height='150%'
        >
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='0.5'
            result='blur'
          />
          <feSpecularLighting
            in='blur'
            surfaceScale='6'
            specularConstant='0.1'
            specularExponent='8'
            result='specOut'
            lightingColor='white'
          >
            <fePointLight x='-5000' y='-10000' z='600' />
          </feSpecularLighting>
          <feComposite
            in='specOut'
            in2='SourceAlpha'
            operator='in'
            result='specOut2'
          />
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
      </defs>
    </svg>
  )
}

export default HomeTab