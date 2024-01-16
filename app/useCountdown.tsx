import { useEffect, useState } from 'react'

export default function useCountdown(startValue: number) {
  const [value, setValue] = useState(startValue)
  useEffect(() => {
    if (value > 0) {
      setTimeout(() => {
        setValue(Math.round(10 * value - 1) / 10)
      }, 100)
    }
  }, [value])
  return value
}