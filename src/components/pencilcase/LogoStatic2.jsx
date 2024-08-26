'use client'
import React, { useEffect, useState } from 'react'
import OutlineSVG from './OutlineSVGStatic'
import InnerSVG from './InnerSVG'
import { useProgress } from '@react-three/drei'
import { useSpring, useTransition, a } from '@react-spring/web'
import styles from './LogoStatic2.module.scss'

const Logo = () => {

    const { loaded, active } = useProgress()
    const [toggle, setToggle] = useState(true)
    const [visible, setVisible] = useState('block')

    const props = useSpring({ opacity: toggle ? 1 : 0, config: { duration: 500 } })
    useEffect(() => {
        if (!toggle && active && loaded < 24) {
            setToggle(true)
        }
        if ((toggle && loaded === 24) && !active) {
            setToggle(false)
            setTimeout(() => {
                setVisible('none')
            }, 1000)
        }
    }, [active, loaded])
    const transition = useTransition(toggle, {
        from: { loaded: 0 },
        update: { loaded },
        config: { mass: 100 }
    })

    return transition(
        () =>
        (
            <a.div className={styles.logoBackgroundStatic} style={{ opacity: props.opacity, display: visible }}>
                {/* <img src='https://res.cloudinary.com/drixmykpt/image/upload/v1660215790/hype/images/peaek5fuhka1zby4priz.png' alt='' width={350} className={styles.logoInnerStatic} /> */}
                <InnerSVG />
                <OutlineSVG />
                <div className={styles.logoBackgroundColorsStatic} />
                <div className={styles.loadingFontContainer}>
                    <div className={styles.loadingFont}>LOADING...</div>
                    <div className={styles.loadingBarContainer}>
                        <a.div className={styles.loadingBar} style={{ width:`${(loaded / 24) * 200}px` }}></a.div>
                    </div>
                </div>
            </a.div>
        )
    )
}
export default Logo