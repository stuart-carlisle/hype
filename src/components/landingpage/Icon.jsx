import ColorIcon from './ColorIcon'
import React, { useState } from 'react'

const lidColorOptions = [
  { color1: '#9C823A', color2: '#070707', name: 'BLACK / GOLD' },
  { color1: '#9C823A', color2: '#dadbe0', name: 'WHITE / GOLD' },
  { color1: '#ad0c0c', color2: '#dadbe0', name: 'WHITE / RED' },
  { color1: '#9fa0a6', color2: '#0f2699', name: 'BLUE / SILVER' },
  { color1: '#ad0c0c', color2: '#dadbe0', name: 'WHITE / RED' },
  { color1: '#0f2699', color2: '#0f2699', name: 'BLUE' },
  { color1: '#0f2699', color2: '#0f2699', name: 'BLUE' },
]

const Icon = () => {
  const [object, setObject] = useState(null)
  const arrayOfElements = lidColorOptions.map((option, index) => {
    return (
      <div
        key={index}
        id={index}
        onClick={(e) => setObject(lidColorOptions[index].name)}
        className={object == lidColorOptions[index].name ? 'item bg-closed' : 'item bg-down'}
      >
        <div className='icon-container'>
          <ColorIcon
            className={object == lidColorOptions[index].name ? 'icon' : 'icon--down'}
            down={object == lidColorOptions[index].name}
            color1={option.color1}
            color2={option.color2}
          />
          <div className='icon-font-container'>
            <div className='icon-font'>{option.name}</div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div
      onClick={() => {
        console.log('go back')
      }}
      className={'grid-container'}
    >
      <div
        className='grid'
        style={{
          '--items':
            lidColorOptions.length % 2 === 0 ? lidColorOptions.length / 2 + 1 : (lidColorOptions.length + 1) / 2 + 1,
        }}
      >
        <div className='item image-grid-item'>
          <div className='icon-container' style={{ justifyContent: 'center' }}>
            <img
              src='LayoutImages/base-image.png'
              width={150}
              height={50}
              alt=''
              style={{ filter: 'drop-shadow(0 1px 1px black)' }}
            />
            <div className='icon-font-container'>
              <div className='icon-font' style={{ fontSize: 30 }}>
                BASE
              </div>
            </div>
          </div>
        </div>
        {arrayOfElements}
      </div>
    </div>
  )
}

export default Icon
