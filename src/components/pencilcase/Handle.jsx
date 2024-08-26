'use client'

import { useProgress } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../../state/state'
import styles from './Handle.module.scss'

const Handle = ({ onClick }) => {
  const snap = useSnapshot(state)
  const { loaded } = useProgress()

  return (
    loaded > 23 && (
      <div id='handle' style={{ display: 'flex', transform: 'translateY(2px)' }}>
        <div className={styles.outer}>
          <svg
            className={styles.handleGlow}
            width={218}
            height={18}
            viewBox={'0 0 218 18'}
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <filter id='bevel2' filterUnits='objectBoundingBox' x='-10%' y='-10%' width='150%' height='150%'>
                <feGaussianBlur in='SourceAlpha' stdDeviation='2' result='blur' />
                <feSpecularLighting
                  in='blur'
                  surfaceScale='1'
                  specularConstant='1'
                  specularExponent='8'
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
              <filter id='shadow2'>
                <feFlood floodColor='black' />
                <feComposite operator='xor' in2='SourceGraphic' />
                <feGaussianBlur stdDeviation='1' />
                <feComposite operator='in' in2='SourceGraphic' result='map' />
                <feDiffuseLighting lightingColor='white' surfaceScale='2' diffuseConstant='4'>
                  <feSpotLight x='-30' y='-30' z='30' />
                </feDiffuseLighting>
                <feBlend mode='multiply' in='SourceGraphic' />
                <feComposite operator='in' in2='SourceGraphic' />
              </filter>
            </defs>
            <path
              onClick={onClick}
              style={{ cursor: 'pointer' }}
              filter='url(#bevel3)'
              d='M1 17C1 17 2 1 17 1C17 1 185 1 199 1C214 1 217 17 217 17H1Z'
              fill={snap.darkMode ? '#070707' : '#eee'}
              stroke='#9C823A'
              strokeWidth='2'
            />
            <path
              filter='url(#shadow2)'
              className={'handle-ridges'}
              d='M44 8.5H168M44 4.5H168M44 12.5H168'
              stroke='black'
              strokeWidth='0.2'
            />
          </svg>
        </div>
      </div>
    )
  )
}

export default Handle
