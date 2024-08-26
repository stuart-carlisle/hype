import React from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import ParallaxPageImage from './ParallaxPageImage'
import styles from './MetallicPage.module.scss'

const MetallicPage = ({ data, images }) => (
  <>
    <ParallaxPageImage dataArray={data.metallicPage} zIndex={0} className={styles.image} />
    <ParallaxLayer horizontal offset={3} speed={2.4} style={{ width: '70vw', zIndex: 1 }}>
      <div className={styles.mainPanel}>
      </div>
    </ParallaxLayer>
    <ParallaxLayer horizontal offset={3} speed={3} style={{ zIndex: 1, width: '50vh', height: '40vh' }}>
      <div className={styles.textPanel}>
        <div className={styles.textContainer}>
          <div className={styles.leftBoundary} />
          <div className={styles.rightBoundary} />
          <div style={{ textAlign: 'center', margin: '5px', filter: 'drop-Shadow(1px 1px 3px rgba(0,0,0,.8))' }}>ulla arcu elit, vestibulum sed ipsum ac, faucibus maximus ipsum. Sed blandit vestibulum congue. Nam porta hendrerit fermentum. Proin odio dui, egestas at vulputate vel, cursus a elit. Suspendisse cursus nunc sed nulla elementum, ut faucibus ligula faucibus. Nulla ut tortor nisi. Ut vel enim eleifend, scelerisque semLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo nunc, euismod quis ultrices non, posuere quis ex. Donec congue nisl bibendum neque porttitor commodo. Cras elementum orci at diam porttitor sagittis. </div>
        </div>
      </div>
    </ParallaxLayer>
    <ParallaxLayer horizontal offset={3} speed={2.9} style={{ zIndex: 1, width: 'max-content' }}>
      <img src={images.titleMetallic} className={styles.title} />
    </ParallaxLayer>
  </>
)

export { MetallicPage as default }