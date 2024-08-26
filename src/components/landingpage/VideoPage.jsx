"use client"
import React, {useRef} from 'react'
import { ParallaxLayer } from '@react-spring/parallax'
import Video from './Video'
import videoJsOptions from './videoJsOptions'
import styles from './VideoPage.module.scss'

const VideoPage = () => {
    // const playerRef = useRef(null);
    // const handlePlayerReady = (player) => {
    //     playerRef.current = player;
    //     player.on('waiting', () => {
    //       videojs.log('player is waiting');
    //     });
    //     player.setAttribute('muted','')
    //     player.on('dispose', () => {
    //       videojs.log('player will dispose');
    //     })
    // }
    return (
        <>
            <ParallaxLayer horizontal offset={4} speed={1} style={{ display: "flex", flexDirection: "column", justifyContent:"center"}}>
                <Video options={videoJsOptions} />
            </ParallaxLayer>
            <ParallaxLayer horizontal offset={4} speed={0.7} style={{ width: '40vw' }}>
                <div className={styles.border}></div>
            </ParallaxLayer>
        </>
    )
}

export { VideoPage as default }