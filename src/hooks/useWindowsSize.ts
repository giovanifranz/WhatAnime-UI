import { useEffect, useState } from 'react'

export function useWindowsSize() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    function updateSize() {
      setWidth(globalThis.innerWidth)
    }
    globalThis.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return { width }
}
