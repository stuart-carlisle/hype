import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import styles from './ParallaxPageImage.module.scss'

export default ({ dataArray, style, zIndex=0, ...rest }) => {
    const offset = dataArray.offset
    return dataArray.imagesArray.map(({image, speed},index)=>{
      return(
          <ParallaxLayer key={index} horizontal offset={offset} speed={speed} style={{ zIndex: zIndex,pointerEvents: 'none' }} >
            <img src={image} style={style} className={rest.className}/>
          </ParallaxLayer>
      )
    })
  }