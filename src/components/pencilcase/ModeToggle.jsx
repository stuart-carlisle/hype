'use client'
import React from 'react'
import { useSpring, a } from '@react-spring/web'
import { useSnapshot } from 'valtio'
import state from '../../state/state'
import styles from './ModeToggle.module.scss'

const ModeToggle = () => {
    const snap = useSnapshot(state)
    const stylesButton = useSpring({
        position: 'relative', 
        left: '-3.5px', 
        top: '-3.5px', 
        width: '18px', 
        height: '18px', 
        borderRadius: '50%', 
        border: '#9C823A 2px solid', 
        background: snap.darkMode?'#555':'#fff',
        transform: `translateX(${snap.darkMode?25:0}px)`,
        boxShadow: 'inset 0px 0px 2px 1px rgba(0,0,0,0.5)',
        config: { bounce: true, mass: 4, tension: 400, friction: 50 }
    })
    const stylesSlider = useSpring({
        width: '40px',
        height: '15px',
        borderRadius: '30px',
        background: snap.darkMode?'#555':'#fff',
        filter: `drop-shadow(1px 1px 3px rgba(0,0,0,0.5))`,
        boxShadow: `inset 0px 0px 3px 1px rgba(0,0,0,0.5)`,
        border: '#9C823A 2px solid',
        config: { bounce: true, mass: 4, tension: 400, friction: 50 }
    })

    return (
        <div className={styles.toggle}>
            <div onClick={() => {
                state.darkMode = !snap.darkMode
            }} className={styles.container} style={{ color: snap.darkMode ? '#fff' : '#000'}}>
                <div className={styles.left}>LIGHT</div>
                <a.div style={stylesSlider}>
                    <a.div style={stylesButton}></a.div>
                </a.div>
                <div className={styles.right}>DARK</div>
            </div>
        </div>
    )
}

export { ModeToggle as default }