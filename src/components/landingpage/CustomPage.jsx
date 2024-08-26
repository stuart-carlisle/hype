import React from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import { useRouter } from 'next/navigation'
import styles from './CustomPage.module.scss'

const CustomPage = ({ images }) => {
  const navigate = useRouter()

  return (
    <>
      <ParallaxLayer horizontal offset={5} speed={0.7} style={{ width: '100vw' }}>
        <div className={styles.background}></div>
        <div className={styles.scanlines}></div>
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={5.5} speed={2.2} style={{ width: 'max-content', height: '0' }}>
        <img alt='' id='custom-sun-logo' className={styles.sun} src={images.layerThreeC} />
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={5.5} speed={2.9} style={{ width: 'max-content', height: '0' }}>
        <img alt='' id='custom-custom-logo' className={styles.customTitle} src={images.layerOneC} />
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={5.5} speed={3.4} style={{ width: 'max-content', height: '0' }}>
        <img alt='' id='custom-hype-logo' className={styles.hypeTitle} src={images.layerTwoC} />
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={4.99} speed={1.8} style={{ width: '60vw' }}>
        <div className={styles.border}></div>
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={5} speed={1.6} style={{ pointerEvents: 'none', height: '0' }}>
        <div className={styles.customFont}>
          CLICK ON THE PRODUCT YOU WISH TO CUSTOMISE AND USE OUR 3D DESIGN APP TO CREATE YOUR PERFECT STATIONARY
        </div>
      </ParallaxLayer>
      {/*metallicimage*/}
      <ParallaxLayer horizontal offset={5.5} speed={3.5} style={{ height: '0' }}>
        <div onClick={() => navigate.push('/pencilcase')} className={styles.customMetallicImage}>
          <img alt='' src={images.titleMetallic} className={styles.metallicSmallText} />
          <div className={styles.customFontMetallic}>PRESTIGE SERIES</div>
          <div className={styles.bevel}></div>
        </div>
        {/*hype2.0image*/}
      </ParallaxLayer>
      <ParallaxLayer horizontal offset={5.5} speed={4.5} style={{ width: '100%', height: '0' }}>
        <div className={styles.customScifiImage}>
          <div className={styles.customFontMetallic}>FUTURE SERIES</div>
          <img alt='' src={images.titleSciFi} className={styles.scifiSmallText} />
          <div className={styles.scanlines}></div>
          <div className={styles.bevel}></div>
          <div className={styles.customFontSoon}>coming soon</div>
          <div className={styles.fontSoonContainer}></div>
        </div>
      </ParallaxLayer>
    </>
  )
}

export { CustomPage as default }
