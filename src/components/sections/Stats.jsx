import React, { useEffect, useRef, useState } from 'react'

const StatsCard = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  const animateCounter = (target, duration = 2000) => {
    let start = 0
    const increment = target / (duration / 16)
    
    const counter = () => {
      start += increment
      if (start < target) {
        setCount(Math.ceil(start))
        requestAnimationFrame(counter)
      } else {
        setCount(target)
      }
    }
    
    counter()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              const targetValue = parseInt(value.replace(/\D/g, ''))
              animateCounter(targetValue)
              setHasAnimated(true)
            }, delay)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [value, delay, hasAnimated])

  const displayValue = value.includes('+') ? `${count}+` : 
                       value.includes('%') ? `${count}%` : count

  return (
    <div ref={elementRef} className="card-hover">
      <div className="stats-counter">{displayValue}</div>
      <p className="text-gray-600 font-semibold">{label}</p>
    </div>
  )
}

const Stats = () => {
  const statsData = [
    { value: "[عدد الطلاب]+", label: "طالب وطالبة", delay: 0 },
    { value: "[سنوات الخبرة]+", label: "سنة خبرة", delay: 200 },
    { value: "[عدد التخصصات]", label: "تخصصات مميزة", delay: 400 },
    { value: "100%", label: "معادلة مضمونة", delay: 600 }
  ]

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats