import React from 'react'
import styles from './ColorIcon.module.scss'

const ColorIcon = ({color1,color2,className,down,image}) => {
    return(
        <svg className={className} width="100%" height="100%" viewBox="0 0 295 295" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={image} width="1" height="1"> {/* id needs to be unique for each image*/}
            <image href={image&&image} x="0" y="0" width='500' />
          </pattern>
          <filter
            id='bevel'
            filterUnits='objectBoundingBox'
            x='-10%'
            y='-10%'
            width='200%'
            height='200%'
          >
            <feGaussianBlur
              in='SourceAlpha'
              stdDeviation='2'
              result='blur'
            />
            <feSpecularLighting
              in='blur'
              surfaceScale='3.5'
              specularConstant='0.2'
              specularExponent='10'
              result='specOut'
              lightingColor='white'
            >
              <fePointLight x='-5000' y='-10000' z='20000' />
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
          <filter id='shadow'>
            <feFlood floodColor='black' />
            <feComposite operator='xor' in2='SourceGraphic' />
            <feGaussianBlur stdDeviation='1' />
            <feComposite
              operator='in'
              in2='SourceGraphic'
              result='map'
            />
            <feDiffuseLighting
              lightingColor='white'
              surfaceScale='0.2'
              diffuseConstant='3.2'
            >
              <feSpotLight x='-30' y='-30' z='100' />
            </feDiffuseLighting>
            <feBlend mode='multiply' in='SourceGraphic' />
            <feComposite operator='in' in2='SourceGraphic' />
          </filter>
        </defs>
        {!!color2?
          <>
            <path className={down?styles.pathDown:styles.pathBottom} filter='url(#bevel)' id="Intersect" fillRule="evenodd" clipRule="evenodd" d="M246.337 59.9422C267.269 83.3024 280 114.165 280 148C280 220.902 220.902 280 148 280C111.56 280 78.5687 265.234 54.6831 241.359L246.337 59.9422Z" fill={color1}/> 
            <path className={down?styles.pathDown:styles.pathTop} filter='url(#bevel)' id="Intersect_2" fillRule="evenodd" clipRule="evenodd" d="M248.072 61.9173L55.9031 242.563C31.2875 218.585 16 185.078 16 148C16 75.0984 75.0984 16 148 16C188.011 16 223.865 33.8019 248.072 61.9173Z" fill={color2}/>
          </>: 
          <>
            <circle id="InnerRing" filter={image?null:"url(#bevel)"} cx="148" cy="148" r="132" fill={image?`url(#${image})`:color1}/>
          </>
        }
        </svg>
    )
}

export default ColorIcon

