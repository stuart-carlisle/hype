'use client'

import React, { useEffect, useMemo, useState } from 'react'
import data from '../../utils/data'
import { Grid } from 'mauerwerk'
import Handle from './Handle'
import ColorIcon from './ColorIcon'
import state from '../../state/state'
import { useSnapshot } from 'valtio'
import styles from './Menu.module.scss'

const Menu = ({ animating }) => {
  const [object, setObject] = useState(null)
  const [open, setOpen] = useState(true)
  const onClick = () => setOpen(!open)
  const snap = useSnapshot(state)
  const [gridData, setGridData] = useState(null)

  const columns = useMemo(() => {
    const x = snap.width
    switch (true) {
      case x < 350:
        return 2
      case x < 450:
        return 3
      case x < 700:
        return 4
      case x < 1000:
        return 6
      default:
        return 8
    }
  }, [snap.width])

  useEffect(() => {
    if (snap.current !== null) {
      setOpen(false)
      setGridData(
        data.find((item) => {
          return item.name == snap.current
        }),
      )
    }
  }, [snap.current])

  return (
    <>
      <div
        onPointerLeave={() => {
          setOpen(true), (state.current = null)
        }}
        className={open ? styles.gridContainer : styles.gridContainerOpen}
      >
        <Handle onClick={onClick} color={'#070707'} />
        {snap.current && snap.current !== null && gridData ? (
          <div
            onClickCapture={(e) => {
              if (e.target.id === 'back-button-model') {
                state.current = null
              }
            }}
            className={styles.maximizedCellModel}
            //------------------------------on click model
          >
            <div className={styles.gridContainerTop}>
              <div
                className={styles.stripe}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${snap.items[snap.current].Secondary ? snap.items[snap.current].Secondary.displayColor : '#ddd'}  ,${snap.items[snap.current].Main.displayColor || '#000'} )`,
                }}
              />
              <div className={styles.gridContainerFlex}>
                <div className={styles.gridContainerDescription}>
                  <p className={styles.backButton} id={'back-button-model'}>
                    {'\u2b9c back'}
                  </p>
                  <img className={styles.descriptionImage} src={gridData.image} alt='' />
                  <div className={styles.descriptionText}>
                    <h1>{gridData.displayName}</h1>
                    <p className={styles.descriptionFont}>{snap.items[snap.current].colorName}</p>
                  </div>
                </div>
                <Grid
                  data={gridData.colors}
                  keys={(d) => d.name}
                  heights={100}
                  columns={snap.width < 1000 ? (snap.width < 400 ? 3 : 4) : 5} //gridData.colors.length % 2 === 0 ? (gridData.colors.length / 2) : ((gridData.colors.length + 1) / 2)}
                  margin={6}
                  lockScroll={true}
                >
                  {(data) => (
                    <>
                      <div
                        className={snap.items[snap.current].colorName == data.name ? styles.cellIconDown : styles.cell}
                        onClick={() => {
                          if (!snap.animating) {
                            if (data.material || data.normalScale) {
                              //for logo textures
                              if (data.material) {
                                state.items[snap.current].Main.materialName = data.material
                              } else {
                                //for lid textures although it's impossible to actually click on lid texture on the model
                                state.items[snap.current].Main.textureName = data.name
                                state.items[snap.current].Main.normalScale = data.normalScale
                                state.items[object].Main.image = data.image
                              }
                            } else {
                              //for non textures
                              if (data.color1 && data.color2) {
                                //for secondary colors
                                state.items[snap.current].Secondary.color = data.realColor2
                                state.items[snap.current].Secondary.metalness = data.metalness2
                                state.items[snap.current].Secondary.displayColor = data.color2
                              }
                              state.items[snap.current].Main.color = data.realColor1
                            }
                            state.items[snap.current].Main.metalness = data.metalness1 //for all items
                            state.items[snap.current].colorName = data.name
                            state.items[snap.current].Main.displayColor = data.color1
                          }
                        }}
                      >
                        <div
                          className={
                            snap.items[snap.current].colorName == data.name
                              ? styles.iconContainerDown
                              : styles.iconContainer
                          }
                          style={{ '--bg-color': snap.darkMode ? '#070707' : '#ddd' }}
                        >
                          <div className={styles.ringContainer}>
                            <div
                              className={
                                snap.items[snap.current].colorName == data.name ? styles.ringDown : styles.ring
                              }
                            ></div>
                          </div>
                          <ColorIcon
                            className={snap.items[snap.current].colorName == data.name ? styles.icon : styles.iconDown}
                            down={snap.items[snap.current].colorName == data.name}
                            color1={data.color1}
                            color2={data.color2}
                            image={snap.items[snap.current].Main.image}
                          />
                          <div>
                            <div className={styles.iconFont}>{data.name}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Grid>
              </div>
            </div>
          </div>
        ) : (
          //------------------------------menu grid
          <Grid
            className={styles.mainGrid}
            data={data}
            keys={(d) => d.name}
            heights={(d) => {
              return snap.width < 350 ? 60 : 100 //d.height
            }}
            columns={columns} //data.length % 2 === 0 ? (data.length / 2) : ((data.length + 1) / 2)
            margin={6}
            lockScroll={true}
            onClickCapture={(e) => {
              if (!snap.animating) {
                if (e.target.parentNode.innerText === 'Rubber') {
                  state.highlightAction = 'RubberHighlight'
                } else if (e.target.parentNode.innerText === 'Sharpener') {
                  state.highlightAction = 'SharpenerHighlight'
                  setTimeout(() => {
                    console.log('3 seconds')
                  }, 3000)
                } else if (e.target.parentNode.innerText === 'Calculator') {
                  state.highlightAction = 'CalculatorHighlight'
                } else if (e.target.parentNode.innerText === 'Pencils') {
                  state.pencilHighlight = true
                }
              }
            }}
          >
            {(data, maximized, toggle) => {
              return (
                <div
                  className={styles.maximizedCell}
                  id={data.name}
                  onClickCapture={(e) => {
                    if (!maximized || e.target.id === 'back-button') {
                      if (snap.highlightAction === 'SharpenerHighlight') {
                        state.highlightAction = 'SharpenerHighlightReturn'
                      }
                      if (snap.highlightAction === 'RubberHighlight') {
                        state.highlightAction = 'RubberHighlightReturn'
                      }
                      if (snap.highlightAction === 'CalculatorHighlight') {
                        state.highlightAction = 'CalculatorHighlightReturn'
                      }
                      toggle()
                    }
                    setObject(e.currentTarget.attributes.id.value)
                  }}
                >
                  {maximized && (
                    <div className={styles.gridContainerTop}>
                      <div
                        className={styles.stripe}
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${snap.items[object].Secondary ? snap.items[object].Secondary.displayColor : '#ddd'}  ,${snap.items[object].Main.displayColor || '#000'} )`,
                        }}
                      />
                      <div className={styles.gridContainerFlex}>
                        <div className={styles.gridContainerDescription}>
                          <p className={styles.backButton} id={'back-button'}>
                            {'\u2b9c back'}
                          </p>
                          <img className={styles.descriptionImage} src={data.image} alt='' />
                          <div className={styles.descriptionText}>
                            <h1>{data.displayName}</h1>
                            <p className={styles.descriptionFont}>{snap.items[object].colorName}</p>
                          </div>
                        </div>
                        <Grid //color icons grid
                          data={data.colors}
                          keys={(d) => d.name}
                          heights={100}
                          columns={snap.width < 1000 ? (snap.width < 400 ? 3 : 4) : 5} //data.colors.length % 2 === 0 ? (data.colors.length / 2) : ((data.colors.length + 1) / 2)}
                          margin={6}
                          lockScroll={true}
                          closeDelay={300}
                        >
                          {(data, maximized) => (
                            <div
                              className={styles.cellIconDown}
                              onClick={() => {
                                if (!snap.animating) {
                                  if (data.material || data.normalScale) {
                                    if (data.material) {
                                      //for logo textures
                                      state.items[object].Main.materialName = data.material
                                    } else {
                                      //for lid textures
                                      state.items[object].Main.textureName = data.name
                                      state.items[object].Main.normalScale = data.normalScale
                                      state.items[object].Main.image = data.image
                                    }
                                  } else {
                                    //for non textures
                                    if (data.color1 && data.color2) {
                                      //for secondary colors
                                      state.items[object].Secondary.color = data.realColor2
                                      state.items[object].Secondary.metalness = data.metalness2
                                      state.items[object].Secondary.displayColor = data.color2
                                    }
                                    state.items[object].Main.color = data.realColor1
                                  }
                                  state.items[object].Main.metalness = data.metalness1 //for all items
                                  state.items[object].colorName = data.name
                                  state.items[object].Main.displayColor = data.color1
                                }
                              }}
                            >
                              {!maximized && (
                                <div
                                  className={
                                    snap.items[object].colorName == data.name
                                      ? styles.iconContainerDown
                                      : styles.iconContainer
                                  }
                                  style={{ '--bg-color': snap.darkMode ? '#070707' : '#ddd' }}
                                >
                                  <div className={styles.ringContainer}>
                                    <div
                                      className={
                                        snap.items[object].colorName == data.name ? styles.ringDown : styles.ring
                                      }
                                    ></div>
                                  </div>
                                  <ColorIcon
                                    className={
                                      snap.items[object].colorName == data.name ? styles.icon : styles.iconDown
                                    }
                                    down={snap.items[object].colorName == data.name}
                                    color1={data.color1}
                                    color2={data.color2}
                                    image={data.image}
                                  />
                                  <div>
                                    <div className={styles.iconFont}>{data.name}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Grid>
                      </div>
                    </div>
                  )}
                  {!maximized && (
                    <>
                      {data.image && (
                        <div
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${snap.items[data.name].Secondary ? snap.items[data.name].Secondary.displayColor : snap.items[data.name].Main.displayColor} 50% ,${snap.items[data.name].Main.displayColor || '#000'} 50%)`,
                          }}
                          className={styles.minimizedCellContainer}
                        >
                          {!(snap.width < 350) && (
                            <img
                              src={data.image}
                              className={styles.minimizedCellImage}
                              width={100}
                              height={40}
                              alt=''
                            />
                          )}
                          <div className={styles.minimizedCellFont}>{data.displayName}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            }}
          </Grid>
        )}
      </div>
    </>
  )
}

export default Menu
