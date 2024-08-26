"use client"
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../state/stateLandingPage'
import styles from './Arrow.module.scss'

const Arrow = ({ parallaxRef }) => {
  const snap = useSnapshot(state)
  // super hacky scroll handling - when scrolling to the last page the right arrow disappears, first page left arrow disappears
  const[end,setEnd] = useState(true)
  const[start,setStart] = useState(true)

  const handleScroll = () => {
    const sectionWidth = parallaxRef.current.container.current.clientWidth
    if (parallaxRef.current) {
      if(parallaxRef.current.current > 4.8*sectionWidth){
        setEnd(true);
        setStart(false)
        return
      }
      if(parallaxRef.current.current < 0.8*sectionWidth){
        setStart(true)
        setEnd(false)
        return
      }
      setStart(false)
      setEnd(false)
    }
  }
  
  let container = null

  useEffect(() => {
    setTimeout(()=>{
      handleScroll()
      container = document.querySelector('.main')
      container.addEventListener('scroll', handleScroll)   
    })//set timeout is used as the container does not exist initially with sync so has been changed to async
    return () => {
      container&&container.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const onClickLeft = () =>{
    const sectionWidth = parallaxRef.current.container.current.clientWidth
    if(parallaxRef.current.current<=1*sectionWidth){
      parallaxRef.current.scrollTo(0)
      return
    }
    if(parallaxRef.current.current<=2*sectionWidth){
      parallaxRef.current.scrollTo(1)
      return
    }
    if(parallaxRef.current.current<=3*sectionWidth){
      parallaxRef.current.scrollTo(2)
      return
    }
    if(parallaxRef.current.current<=4*sectionWidth){
      parallaxRef.current.scrollTo(3)
      return
    }
    if(parallaxRef.current.current<=5*sectionWidth){
      parallaxRef.current.scrollTo(4)
      return
    }
  }
  const onClickRight = () =>{
    const sectionWidth = parallaxRef.current.container.current.clientWidth
    if(parallaxRef.current.current<1*sectionWidth){
      parallaxRef.current.scrollTo(1)
      return
    }
    if(parallaxRef.current.current<2*sectionWidth){
      parallaxRef.current.scrollTo(2)
      return
    }
    if(parallaxRef.current.current<3*sectionWidth){
      parallaxRef.current.scrollTo(3)
      return
    }
    if(parallaxRef.current.current<4*sectionWidth){
      parallaxRef.current.scrollTo(4)
      return
    }
    if(parallaxRef.current.current<5*sectionWidth){
      parallaxRef.current.scrollTo(5)
      return
    }
    if(parallaxRef.current.current<6*sectionWidth){
      parallaxRef.current.scrollTo(6)
      return
    }
  }

  return (
    <>
      <div id="right-arrow" className={styles.arrowOuterContainer} style={{ right: 0 }}>
        <div className={styles.arrowInnerContainer} >
          <svg className={end?styles.arrowSvgHidden:styles.arrowSvg} onClick={onClickRight} width={snap.width<600?24:32} viewBox="0 0 68 119" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={styles.arrowPath2} filter={"url(#bevel3)"} d="M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z"  fill="#fff" />
              <path className={styles.arrowPath} filter={"url(#bevel3)"} d="M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z"  fill="#fff" />
          </svg> 
        </div>
      </div>
      <div id="left-arrow" className={styles.arrowOuterContainer} style={{ left: 0 }}>
      <div className={styles.arrowInnerContainer} >
        <svg className={start?styles.arrowSvgHidden:styles.arrowSvg} onClick={onClickLeft} width={snap.width<600?24:32} viewBox="0 0 68 119" style={{transform: 'rotateZ(0)', marginRight: 0, marginLeft: '10px' }} fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path className={styles.arrowPath2} filter={"url(#bevel3)"} d="M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z"  fill="#fff" />
            <path className={styles.arrowPath} filter={"url(#bevel3)"} d="M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z"  fill="#fff" />
        </svg> 
      </div>
    </div>
  </>
  )
}

export default Arrow

