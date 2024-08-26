import { useRef, useEffect, useCallback, useMemo } from 'react'

//custom hooks
const useScrollPosition = (ref) => { 
    const position= useRef() 
    const handleScroll = () => {
        if(ref.current){
            position.current = ref.current.current
        }
    }
    useEffect(()=>{
        const container = document.querySelector('.parallax-scroll')
        container.addEventListener('scroll', handleScroll)
        return () => {
          container.removeEventListener('scroll', handleScroll)
        }
    },[])
    return position
} 
            

export { useScrollPosition as default}