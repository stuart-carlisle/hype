'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Parallax } from '@react-spring/parallax'
import Header from '../src/components/header/Header'
import HypeLightsWall from '../src/components/landingpage/HypeLightsWall3'
import Arrow from '../src/components/landingpage/Arrow'
import SlidingPanels from '../src/components/landingpage/SlidingPanels'
import AboutPage from '../src/components/landingpage/AboutPage'
import useDimensions from '../src/hooks/useDimensions'
import SciFiPage from '../src/components/landingpage/SciFiPage'
import MetallicPage from '../src/components/landingpage/MetallicPage'
import CustomPage from '../src/components/landingpage/CustomPage'
import VideoPage from '../src/components/landingpage/VideoPage'

import state from '../src/state/stateLandingPage'
import { data, images } from '../src/utils/images'

const App = () => {
  const parallax = useRef(null)
  const [ref, dimensions] = useDimensions()

  useEffect(() => {
    if (typeof dimensions.width === 'number') {
      state.width = dimensions.width
    }
  }, [dimensions.width])

  const [isLoading, setIsLoading] = useState(true)

  const cacheImages = async (srcObj) => {
    const promises = await Object.values(srcObj).map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve()
        img.onerror = reject()
      })
    })

    await Promise.all(promises)
    setIsLoading(false)
  }

  useEffect(() => {
    cacheImages(images)
  }, [])

  const url = (name, wrap = false) =>
    `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

  return (
    <div ref={ref} style={{ height: '100%', width: '100%', backgroundColor: '#000' }}>
      {isLoading ? (
        <div
          style={{
            fontSize: '50px',
            color: '#ddd',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          loading
        </div>
      ) : (
        <>
          <div style={{ zIndex: 2, position: 'absolute', left: 0, top: 0 }}>
            <Header parallaxRef={parallax} landingPage={true} />
          </div>
          <Arrow parallaxRef={parallax} />
          <Parallax ref={parallax} pages={6} horizontal className='main'>
            <HypeLightsWall />
            <AboutPage data={data} />
            <SlidingPanels right={true} />
            <SlidingPanels right={false} />
            <SciFiPage data={data} images={images} />
            <MetallicPage data={data} images={images} />
            <VideoPage />
            <CustomPage images={images} />
          </Parallax>
        </>
      )}
    </div>
  )
}

export default App
