import React from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import ParallaxPageImage from './ParallaxPageImage'
import styles from './SciFiPage.module.scss'

const SciFiPage = ({ data, images }) => (
  <>
    <ParallaxLayer horizontal offset={2} speed={0.6} >
              <div className={styles.gradient} />  
            </ParallaxLayer>
            <ParallaxLayer horizontal offset={2} speed={0.6} style={{ width: '100vw' }}>
              <div style={{ background: '#282d2b', width: '100vw', height: '100%' }}>
              </div>
            </ParallaxLayer>
            <ParallaxPageImage dataArray={data.sciFiPage} zIndex={0} className={styles.image}/>
            <ParallaxLayer horizontal offset={2.99999} speed={0.6}>
              <div id='cover' className={styles.backgroundCover} >
              </div>
            </ParallaxLayer>
            <ParallaxLayer horizontal offset={2} speed={2.4} style={{ width: '70vw',zIndex:1 }}>
              <div className={styles.mainPanel}>
                <div className={styles.scanlines}></div>
              </div>
              </ParallaxLayer>
              <ParallaxLayer horizontal offset={2} speed={3} className={styles.textPanelOuter}  style={{ zIndex:1}}>
              <div className={styles.textPanel}>
                <div className={styles.textContainer}>
                  <div className={styles.leftBoundary} ></div>
                  <div className={styles.rightBoundary} ></div>
                  <div className={styles.text}> ulla arcu elit, vestibulum sed ipsum ac, faucibus maximus ipsum. Sed blandit vestibulum congue. Nam porta hendrerit fermentum. Proin odio dui, egestas at vulputate vel, cursus a elit. Suspendisse cursus nunc sed nulla elementum, ut faucibus ligula faucibus. Nulla ut tortor nisi. Ut vel enim eleifend, scelerisque semLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo nunc, euismod quis ultrices non, posuere quis ex. Donec congue nisl bibendum neque porttitor commodo. Cras elementum orci at diam porttitor sagittis. </div>
                </div>
                <div className={styles.scanlines}></div>
              </div>
              </ParallaxLayer>
            <ParallaxLayer horizontal offset={2} speed={3.3} style={{ zIndex: 1,width: 'max-content'}}>
              <img src={images.titleSciFi} className={styles.title} />
            </ParallaxLayer>
              
  </>
)

export { SciFiPage as default }