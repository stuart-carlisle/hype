"use client"
import { useState, useEffect, useRef } from 'react'

const useDimensions = () => {
    const ref = useRef()
    const [dimensions, setDimensions] = useState({})
    const onResize = () => {
        setTimeout(() => {
            setDimensions({ 
                width: ref.current.offsetWidth, 
                height: ref.current.scrollHeight,
                top: ref.current.offsetTop,
                left: ref.current.offsetLeft
            })
        },100)
    }

    const options = { passive:true } //note - needed to have options as a variable in order to remove correctly
    useEffect(()=>{
        onResize()
        if(typeof window!=='undefined'){
            window.addEventListener('resize', onResize, options)
        }
        return () => {
            if(typeof window!=='undefined'){
                window.removeEventListener('resize', onResize, options)
           }   
        }
    },[])

    return [ref,dimensions]
}

export default useDimensions