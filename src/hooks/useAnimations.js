import { useState, useEffect } from 'react'

export const useCounter = (target, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const startAnimation = () => {
    if (hasAnimated) return

    setTimeout(() => {
      const targetValue = parseInt(target.toString().replace(/\D/g, ''))
      let start = 0
      const increment = targetValue / (duration / 16)
      
      const counter = () => {
        start += increment
        if (start < targetValue) {
          setCount(Math.ceil(start))
          requestAnimationFrame(counter)
        } else {
          setCount(targetValue)
        }
      }
      
      counter()
      setHasAnimated(true)
    }, delay)
  }

  return { count, startAnimation, hasAnimated }
}

export const useIntersectionObserver = (callback, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    })

    return observer
  }, [callback, options])
}