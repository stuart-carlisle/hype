import { useCallback, useRef } from 'react';

function useClicks({ onClick, onDoubleClick }) {
  const timer = useRef
  const cancelPendingClick = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [timer])

  const handleClick = useCallback((e) => {
    cancelPendingClick()
    timer.current = setTimeout(() => {
      timer.current = null
      onClick(e)
    }, 600)
  }, [timer, cancelPendingClick, onClick])

  const handleDoubleClick = useCallback((e) => {
    cancelPendingClick()
    onDoubleClick(e)
  }, [timer, cancelPendingClick, onDoubleClick])

  return {  handleClick, handleDoubleClick }
}

export default useClicks