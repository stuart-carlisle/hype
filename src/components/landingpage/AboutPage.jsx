import React from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import ParallaxPageImage from './ParallaxPageImage'
import styles from './AboutPage.module.scss'

const AboutPage = ({data}) => (
    <>
            <ParallaxPageImage dataArray={data.aboutPage} className={styles.image} />
            <ParallaxLayer horizontal offset={1} speed={1.7} style={{ pointerEvents: 'none' }}>
              <div className={styles.title} >
                About
              </div>
            </ParallaxLayer>
            <ParallaxLayer horizontal offset={1} speed={1.6} style={{ pointerEvents: 'none' }}>
              <div className={styles.text} >
                This is a load of text about the hype brand
                Nulla arcu elit, vestibulum sed ipsum ac, faucibus maximus ipsum. Sed blandit vestibulum congue. Nam porta hendrerit fermentum. Proin odio dui, egestas at vulputate vel, cursus a elit. Suspendisse cursus nunc sed nulla elementum, ut faucibus ligula faucibus. Nulla ut tortor nisi. Ut vel enim eleifend, scelerisque sem sed
              </div>
            </ParallaxLayer>
    </>
)

export { AboutPage as default }