import React from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import state from '../../state/stateLandingPage'
import { useSnapshot } from 'valtio'
import styles from './SlidingPanels.module.scss'

const SlidingPanels = ({ right = true }) => {
  const snap = useSnapshot(state)
  return (
    <>
      {right ? (
        <>
          <ParallaxLayer horizontal offset={0.84} speed={0.6}>
            <div
              className={styles.rightPanel}
              style={{
                background: 'linear-gradient(to right, #00CED1 0%, #ddd 100%)',
                transform: `skewX(-20deg) ${snap.width < 800 ? 'translate(30%)' : 'translate(0)'}`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer horizontal offset={0.92} speed={0.89}>
            <div
              className={styles.rightPanel}
              style={{
                background: 'linear-gradient(to right, hotpink 0%, #ddd 100%)',
                transform: `skewX(-20deg) ${snap.width < 800 ? 'translate(30%)' : 'translate(0)'}`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer horizontal offset={0.98} speed={0.6}>
            <div
              className={styles.rightPanel}
              style={{
                background: 'linear-gradient(to right, skyblue 0%, #ddd 100%)',
                transform: `skewX(-20deg) ${snap.width < 800 ? 'translate(30%)' : 'translate(0)'}`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer horizontal offset={0.99} speed={0.8}>
            <div
              className={styles.rightPanel}
              style={{
                width: '40vw',
                background: 'linear-gradient(to right, #111 0%, #000 90%)',
                transform: `skewX(-20deg) ${snap.width < 800 ? 'translate(37%)' : 'translate(14%)'}`,
              }}
            ></div>
          </ParallaxLayer>
        </>
      ) : (
        <>
          <ParallaxLayer horizontal offset={0} speed={0.2} style={{ width: '0' }}>
            <div
              className={styles.leftPanel}
              style={{
                background: 'linear-gradient(to left, #00CED1 0%, black 150%)',
                transform: `skewX(20deg) ${snap.width < 800 ? 'translate(-50%)' : 'translate(-20%)'}`,
              }}
            ></div>
          </ParallaxLayer>

          <ParallaxLayer horizontal offset={0} speed={0.8} style={{ width: '0' }}>
            <div
              className={styles.leftPanel}
              style={{
                background: 'linear-gradient(to left, hotpink 0%, #ddd  100%)',
                transform: `skewX(20deg) ${snap.width < 800 ? 'translate(-90%)' : 'translate(-60%)'}`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer horizontal offset={0} speed={0.4} style={{ width: '0' }}>
            <div
              className={styles.leftPanel}
              style={{
                background: 'linear-gradient(to left, skyblue 0%, #ddd  100%)',
                transform: `skewX(20deg) ${snap.width < 800 ? 'translate(-120%)' : 'translate(-90%)'}`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer horizontal offset={0} speed={0.2} style={{ width: '0' }}>
            <div
              className={styles.leftPanel}
              style={{
                background: 'linear-gradient(to left, #111 0%, #000 50%)',
                transform: `skewX(20deg) ${snap.width < 800 ? 'translate(-165%)' : 'translate(-120%)'}`,
              }}
            ></div>
          </ParallaxLayer>
        </>
      )}
    </>
  )
}

export { SlidingPanels as default }
