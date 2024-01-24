import { useSettings } from '@/app/SettingsContext'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type durationName = 'pomodoro' | 'shortBreak' | 'longBreak'

export default function Timer({type, className = ''}: { type: durationName, className?: string }) {
  const textColor = useSettings().colorScheme.textColor
  const durationSeconds = useSettings().duration[type] * 60
  const [startTime, setStartTime] = useState<number | null>(null)
  const [fullDuration, setFullDuration] = useState(durationSeconds)
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
  const [currentDuration, setCurrentDuration] = useState(durationSeconds)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  function isPaused() {
    return startTime === null
  }

  function setPaused() {
    setStartTime(null)
  }

  function isFinished() {
    return remainingSeconds === 0
  }

  function onTimerClick(event: React.MouseEvent | React.KeyboardEvent) {
    if (isFinished()) {
      setCurrentDuration(durationSeconds)
      setRemainingSeconds(durationSeconds)
      setStartTime(Date.now())
    } else if (isPaused()) {
      setCurrentDuration(remainingSeconds)
      setStartTime(Date.now())
    } else {
      setPaused()
    }
  }

  useEffect(() => {
    if (fullDuration !== durationSeconds) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
      setFullDuration(durationSeconds)
      setCurrentDuration(durationSeconds)
      setRemainingSeconds(durationSeconds)
      setPaused()
    } else if (startTime !== null && remainingSeconds > 0) {
      const id = setTimeout(() => {
        setRemainingSeconds(Math.max(0, currentDuration - (Date.now() - startTime) / 1000))
      }, 50)
      setTimeoutId(id)
    }
  }, [currentDuration, fullDuration, remainingSeconds, startTime, durationSeconds])

  function getTimeString(seconds: number) {
    const roundedSeconds = Math.ceil(seconds)
    const min = String(Math.floor(roundedSeconds / 60)).padStart(2, '0')
    const sec = String(roundedSeconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div className={twMerge(
      `relative flex flex-col shrink-0 w-[300px] h-[300px] rounded-full bg-oval shadow-oval items-center justify-center`,
      `tablet:w-[410px] tablet:h-[410px]`,
      `${className}`
    )}>
      <div
        className={twMerge(
          `absolute top-1/2 transform -translate-y-1/2 w-[248px] h-[248px] cursor-pointer peer`,
          `tablet:w-[339px] tablet:h-[339px]`
        )}
        role="button"
        aria-pressed="false"
        tabIndex={0}
        onClick={onTimerClick}
      >
        <ProgressBar percentage={remainingSeconds / durationSeconds} strokeWidth={6.5}/>
      </div>
      <div className={twMerge(
        `flex flex-col shrink-0 w-[267.7px] h-[267.7px] rounded-full bg-offblack items-center justify-center pointer-events-none group`,
        `tablet:w-[366px] tablet:h-[366px]`
      )}>
        <div className={`relative textstyle-h1 text-lightblue`}>
          <div className={twMerge(
            `w-[205px] pl-1.5`,
            `tablet:w-[280px] tablet:pl-3`
          )}>
            {getTimeString(remainingSeconds)}
          </div>
          <span className={twMerge(
            `absolute -bottom-7 left-1/2 transform -translate-x-1/2 textstyle-h3 text-lightblue transition-colors ${textColor}`,
            `tablet:-bottom-10`
          )}>
            {isFinished() && 'restart'}
            {isPaused() && 'start'}
            {!isFinished() && !isPaused() && 'pause'}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({percentage, strokeWidth = 6}: {
  className?: string,
  percentage: number,
  strokeWidth?: number
}) {
  const hexColor = useSettings().colorScheme.hexColor

  if (percentage === 1) {
    percentage = 0.99999
  }
  const angle = percentage * 2 * Math.PI

  const largeAngleFlag = (angle > Math.PI) ? 1 : 0
  const sweepFlag = (angle > 0) ? 1 : 0
  const radius = 100

  function dot([[a, b], [c, d]]: number[][], [x, y]: number[]) {
    return [a * x + b * y, c * x + d * y]
  }

  function rotationMatrix(angle: number) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [[cos, -sin], [sin, cos]]
  }

  function addVectors([ax, ay]: number[], [bx, by]: number[]) {
    return [ax + bx, ay + by]
  }

  const rotation = rotationMatrix(angle)
  const [x, y] = addVectors(
    dot(rotation, [0, -radius]), [radius, radius])

  return (
    angle !== 0 &&
    <svg
      viewBox={`${-0.5 * strokeWidth} ${-0.5 * strokeWidth} ${2 * radius + strokeWidth} ${2 * radius + strokeWidth}`}>
      <path fill="none" stroke={hexColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10"
            d={`M ${radius} 0 A ${radius} ${radius} 270 ${largeAngleFlag} ${sweepFlag} ${x} ${y}`}/>
    </svg>
  )
}