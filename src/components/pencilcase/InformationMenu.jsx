'use client'

import React from 'react'
import { Grid } from 'mauerwerk'
import { dataInfoMenu } from '../../utils/data'
import styles from './InformationMenu.module.scss'

const InformationMenu = ({ open, setOpen }) => {
  return (
    <>
      <div className={!open ? styles.menu : styles.menuOpen}>
        <Grid
          className={styles.grid}
          data={dataInfoMenu}
          keys={(d) => d.name}
          heights={(d) => d.height}
          columns={1}
          margin={6}
          lockScroll={true}
        >
          {(data, maximized, toggle) => {
            return (
              <div
                className={maximized ? styles.cellMaximized : styles.cell}
                // style={{ height: '100%'}}
                id={data.name}
                onClick={() => {
                  toggle()
                }}
              >
                {maximized && (
                  <div id='item' className={styles.infoItem}>
                    <div className={styles.fontTitleMaximized}>{data.name}</div>
                    <div className={styles.fontMaximized}>{data.text}</div>
                    <div className={styles.gifImageContainer}>
                      <img className={styles.gifImage} src={data.gif} alt='' width={250} height={100} />
                    </div>
                  </div>
                )}
                {!maximized && (
                  <>
                    {
                      <div className={styles.container}>
                        <div className={styles.font}>{data.name}</div>
                        <div className={styles[`menuImage${data.suffix}`]}></div>
                      </div>
                    }
                  </>
                )}
              </div>
            )
          }}
        </Grid>
        <div className={styles.longPanelOuterContainer}>
          <svg
            onClick={(e) => {
              if (open === false) {
                setOpen(true)
                return
              }
              setOpen(false)
            }}
            className={styles.longPanelContainer}
            width='30'
            height='324'
            viewBox='0 0 30 324'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <linearGradient id='gradient' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor='#070707' />
                <stop offset='100%' stopColor='#333' />
              </linearGradient>
            </defs>
            <g className={open ? styles.longPanel : styles.longPanelOpen}>
              <rect width='30' height='324' fill='url(#gradient)' />
              <path
                d='M23.6153 150.045C22.3625 148.875 10.1948 137.177 9.4787 136.539C8.7626 135.9 7.7724 135.788 6.95627 136.52C6.14015 137.253 6.04089 138.519 6.4852 139.367C6.92951 140.214 18.4171 151.273 18.7391 151.592C19.0611 151.911 19.3651 152.23 19.3621 152.652C19.359 153.074 19.0504 153.389 18.7238 153.703C18.3972 154.017 6.75059 164.909 6.29405 165.75C5.8375 166.591 5.91842 167.858 6.72384 168.603C7.52926 169.347 8.52099 169.249 9.24626 168.621C9.97153 167.993 22.2165 156.578 23.577 155.321C24.9375 154.065 24.8681 151.215 23.6153 150.045Z'
                fill='url(#gold-light)'
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}

export default InformationMenu
