'use client'

import { twJoin, twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'

enum MenuItem {
  Pomodoro,
  ShortBreak,
  LongBreak,
}

function Logo({ className='' }: { className?: string }) {
  return (
    <div className={twMerge(
      `flex w-full h-6 justify-center`,
      `${className}`,
    )}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 153 32'>
        <path fill="#D7E0FF"
              d="M4.578 31.813v-9.36a7.383 7.383 0 004.984 1.86c1.47 0 2.777-.352 3.922-1.055 1.146-.703 2.047-1.667 2.704-2.89.656-1.225.984-2.618.984-4.18 0-1.563-.328-2.956-.985-4.18-.656-1.224-1.557-2.188-2.703-2.89-1.145-.704-2.453-1.056-3.921-1.056-1.01 0-1.954.175-2.829.524a6.985 6.985 0 00-2.296 1.476l-.11-1.687H.078v23.438h4.5zm3.969-11.407c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm18.844 3.907c1.604 0 3.03-.352 4.28-1.055a7.85 7.85 0 002.962-2.89c.724-1.225 1.086-2.618 1.086-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.281-1.056-1.605 0-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.969 2.89c1.255.704 2.684 1.055 4.289 1.055zm0-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203c1.145 0 2.093.4 2.843 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.843 1.203zM43.188 24v-8.297c0-1.24.286-2.172.859-2.797s1.266-.937 2.078-.937c.802 0 1.487.302 2.055.906.567.604.851 1.51.851 2.719V24h4.5v-8.297c0-1.24.287-2.172.86-2.797s1.265-.937 2.078-.937c.802 0 1.487.302 2.054.906.568.604.852 1.51.852 2.719V24h4.5v-8.406c0-2.365-.526-4.211-1.578-5.54-1.052-1.327-2.526-1.992-4.422-1.992-1.198 0-2.24.266-3.125.797-.885.532-1.589 1.292-2.11 2.282-1-2.052-2.703-3.079-5.109-3.079-1.885 0-3.38.657-4.484 1.97l-.11-1.657h-4.25V24h4.5zm31.687.313c1.604 0 3.031-.352 4.281-1.055a7.85 7.85 0 002.961-2.89c.724-1.225 1.086-2.618 1.086-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.96-2.89c-1.25-.704-2.678-1.056-4.282-1.056s-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.969 2.89c1.255.704 2.685 1.055 4.289 1.055zm0-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm17.813 3.907c1.02 0 1.966-.175 2.835-.524a7.005 7.005 0 002.29-1.477L97.921 24h4.25V.562h-4.5v9.36a7.383 7.383 0 00-4.984-1.86c-1.459 0-2.764.352-3.915 1.055a7.433 7.433 0 00-2.71 2.89c-.657 1.225-.985 2.618-.985 4.18 0 1.563.328 2.956.984 4.18a7.433 7.433 0 002.711 2.89c1.151.704 2.456 1.055 3.915 1.055zm1.015-3.907c-1.146 0-2.094-.4-2.844-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203 2.094.4 2.844 1.203c.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zm19.781 3.907c1.605 0 3.032-.352 4.282-1.055a7.85 7.85 0 002.96-2.89c.725-1.225 1.087-2.618 1.087-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.282-1.056-1.604 0-3.033.352-4.289 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.968 2.89c1.256.704 2.685 1.055 4.29 1.055zm0-3.907c-1.145 0-2.093-.4-2.843-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.843-1.203c1.146 0 2.094.4 2.844 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203zM129.281 24v-6.89c0-1.646.37-2.915 1.11-3.805.74-.89 1.713-1.336 2.922-1.336a5.7 5.7 0 011.78.297l.626-3.891a7.505 7.505 0 00-2.094-.313c-1.99 0-3.552.85-4.688 2.547l-.218-2.234h-3.938V24h4.5zm15.406.313c1.605 0 3.032-.352 4.282-1.055a7.85 7.85 0 002.96-2.89c.725-1.225 1.087-2.618 1.087-4.18 0-1.563-.362-2.956-1.086-4.18a7.85 7.85 0 00-2.961-2.89c-1.25-.704-2.677-1.056-4.281-1.056-1.605 0-3.034.352-4.29 1.055a7.834 7.834 0 00-2.968 2.89c-.724 1.225-1.086 2.618-1.086 4.18 0 1.563.362 2.956 1.086 4.18a7.834 7.834 0 002.968 2.89c1.256.704 2.685 1.055 4.29 1.055zm0-3.907c-1.145 0-2.093-.4-2.843-1.203-.75-.802-1.125-1.807-1.125-3.015 0-1.209.375-2.214 1.125-3.016s1.698-1.203 2.844-1.203c1.145 0 2.093.4 2.843 1.203.75.802 1.125 1.807 1.125 3.015 0 1.209-.375 2.214-1.125 3.016s-1.698 1.203-2.844 1.203z"/>
      </svg>
    </div>
  )
}

function Menu({ active, onClick, className='' }: { active: MenuItem, onClick: (_n: number) => void, className?: string }) {
  const menuItems = ['pomodoro', 'short break', 'long break']

  return (
    <nav className={`z-10`}>
      <ul className={twMerge(
        `flex flex-row w-full h-16 bg-offblack rounded-full items-center justify-center`,
        `${className}`,
      )}>
        { menuItems.map((item, index) =>
          <li key={index}
              className={twJoin(
                `transition flex flex-col w-[105px] h-12 items-center justify-center rounded-full`,
                `${(active === index) ? 'text-background bg-primary_red' : ''}`
              )}
              role='button'
              aria-pressed='false'
              tabIndex={0}
              onClick={() => onClick(index)}
          >
            <span className={twJoin(
              `text-body1`,
              `${(active === index) ? 'opacity-100 text-background' : 'text-lightblue opacity-40'}`
            )}>
              {item}
            </span>
          </li>
        )}
      </ul>
    </nav>
  )
}

function Timer({ durationSeconds, className='' }: { durationSeconds: number, className?: string }) {
  const [startTime, setStartTime] = useState<number|null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
  const [currentDuration, setCurrentDuration] = useState(durationSeconds)

  function isPaused() {
    return startTime === null
  }

  function setPaused() {
    setStartTime(null)
  }

  function isFinished() {
    return remainingSeconds === 0
  }

  function onTimerClick() {
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
    if (startTime !== null && remainingSeconds > 0) {
      setTimeout(() => {
        setRemainingSeconds(Math.max(0, currentDuration - (Date.now() - startTime) / 1000))
      }, 50)
    }
  }, [currentDuration, remainingSeconds, startTime])

  function getTimeString(seconds: number) {
    console.log(seconds)
    const roundedSeconds = Math.ceil(seconds)
    const min = String(Math.floor(roundedSeconds / 60)).padStart(2, '0')
    const sec = String(roundedSeconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div className={twMerge(
      `relative flex flex-col shrink-0 w-[300px] h-[300px] rounded-full bg-oval shadow-oval items-center justify-center`,
      `${className}`,
    )}>
      <div className={`absolute top-1/2 transform -translate-y-1/2 w-[248px] h-[248px]`}>
        <ProgressBar percentage={remainingSeconds / durationSeconds} strokeWidth={6.5} />
      </div>
      <div className={`flex flex-col shrink-0 w-[267.7px] h-[267.7px] rounded-full bg-offblack items-center justify-center`}>
        <div className={`relative text-h1 text-lightblue`}>
          { getTimeString(remainingSeconds) }
          { isFinished() && <StartStopButton onClick={onTimerClick} text='restart' /> }
          { isPaused() && <StartStopButton onClick={onTimerClick} text='start' /> }
          { !isFinished() && !isPaused() && <StartStopButton onClick={onTimerClick} text='pause' /> }
        </div>
      </div>
    </div>
  )
}

function StartStopButton({ className='', onClick, text }: { className?: string, onClick: () => void, text: string }) {
  return (
    <button
      className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-h3 text-lightblue`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

function ProgressBar({className = '', percentage, strokeWidth = 6}: {
  className?: string,
  percentage: number,
  strokeWidth?: number
}) {
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
      <path fill="none" stroke="#F87070" strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="10"
            d={`M ${radius} 0 A ${radius} ${radius} 270 ${largeAngleFlag} ${sweepFlag} ${x} ${y}`}/>
    </svg>
  )
}

function OptionsButton({className = '', onClick}: { className?: string, onClick: () => void }) {
  return (
    <div className={twMerge(
      `flex w-[28px] h-[28px] items-center justify-center`,
      `${className}`
    )}
         role="button"
         aria-pressed="false"
         tabIndex={0}
         onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
        <path fill="#D7E0FF"
              d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
              opacity=".5" />
      </svg>
    </div>
  )
}

function CloseButton({className = '', onClick}: { className?: string, onClick: () => void }) {
  return (
    <div className={twMerge(
      `flex w-[14px] h-[14px] items-center justify-center`,
      `${className}`
    )}
         role="button"
         aria-pressed="false"
         tabIndex={0}
         onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
        <path fill="#1E213F" fillRule="evenodd"
              d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
              opacity=".5"/>
      </svg>
    </div>
  )
}

function ApplyButton({className = '', onClick}: { className?: string, onClick: () => void }) {
  return (
    <div className={twMerge(
      `flex w-[140px] h-[52px] -mt-[26px] items-center justify-center bg-primary_red text-white textstyle-button rounded-[26.5px]`,
      `${className}`
    )}
         role="button"
         aria-pressed="false"
         tabIndex={0}
         onClick={onClick}
    >
      Apply
    </div>
  )
}

function SettingsDialog({className = '', onCloseClick}: { className?: string, onCloseClick: () => void }) {
  return (
    <div className={twMerge(
      `absolute z-20 flex flex-col w-full h-full px-6 pt-[46px] bg-darkblur text-offblack`,
      `${className}`
    )}>
      <div className={`flex flex-col bg-white rounded-[15px]`}>
        <SettingsTitle className={`mb-6`} onCloseClick={onCloseClick} />
        <TimeSettings className={`mb-6`} />
        <FontSettings className={`mb-6`} />
        <ColorSettings className={`mb-8`} />
        <ApplyButton className={`self-center transform translate-y-1/2`} onClick={() => {}} />
      </div>
    </div>
  )
}

function SettingsTitle({className = '', onCloseClick}: { className?: string, onCloseClick: () => void }) {
  return (
    <div className={`${className}`}>
      <div className={`flex flex-row px-6 pt-6 mb-6 items-center`}>
        <span className={`text-h2`}>
          Settings
        </span>
        <CloseButton className={`ml-auto`} onClick={onCloseClick}/>
      </div>
      <div className={`w-full h-px bg-lightgray`}/>
    </div>
  )
}

function TimeSettings({className = ''}: { className?: string }) {
  return (
    <div className={twMerge(
      `flex flex-col px-6`,
      `${className}`
    )}>
      <span className={`text-h4 self-center mb-[18px]`}>
        time (minutes)
      </span>
      <div className={`flex flex-col gap-y-2 mb-6`}>
        <TimeSetting label={`pomodoro`}/>
        <TimeSetting label={`short break`}/>
        <TimeSetting label={`long break`}/>
      </div>
      <div className={`w-full h-px bg-lightgray`}/>
    </div>
  )
}

function TimeSetting({className = '', label}: { className?: string, label: string }) {
  return (
    <div className={`flex flex-row items-center`}>
      <span className={`text-form-small opacity-40`}>
        {label}
      </span>
      <input
        className={`h-10 w-[140px] p-4 ml-auto bg-offwhite text-form-medium rounded-[10px]`}
        type='number'
        name={label}
        maxLength={2}
      />
    </div>
  )
}

function FontSettings({className=''}: { className?: string }) {
  const [font, setFont] = useState<0|1|2>(0)

  return (
    <div className={twMerge(
      `flex flex-col px-6 items-center`,
      `${className}`
    )}>
      <span className={`text-h4 mb-[18px]`}>
        font
      </span>
      <div className={`flex flex-row gap-x-4 mb-6`}>
        <FontSetting className={``} selected={font === 0} onClick={() => setFont(0)} />
        <FontSetting className={``} selected={font === 1} onClick={() => setFont(1)} />
        <FontSetting className={``} selected={font === 2} onClick={() => setFont(2)} />
      </div>
      <div className={`w-full h-px bg-lightgray`}/>
    </div>
  )
}

function FontSetting({className='', selected, onClick}: { className?: string, selected: boolean, onClick: () => void }) {
  return (
    <div
      className={twMerge(
        `flex flex-col items-center justify-center w-10 h-10 p-4 rounded-full bg-offwhite textstyle-selection`,
        `${selected ? 'bg-offblack text-white' : ''}`,
        `${className}`
      )}
      role="button"
      aria-pressed="false"
      tabIndex={0}
      onClick={onClick}
    >
      Aa
    </div>
  )
}

function ColorSettings({className = ''}: { className?: string }) {
  const  [color, setColor] = useState<0|1|2>(0)

  return (
    <div className={twMerge(
      `flex flex-col px-6 items-center`,
      `${className}`
    )}>
      <span className={`text-h4 mb-[18px]`}>
        color
      </span>
      <div className={`flex flex-row gap-x-4`}>
        <ColorSetting color={`bg-primary_red`} selected={color === 0} onClick={() => setColor(0)} />
        <ColorSetting color={`bg-primary_cyan`} selected={color === 1} onClick={() => setColor(1)} />
        <ColorSetting color={`bg-primary_purple`} selected={color === 2} onClick={() => setColor(2)} />
      </div>
    </div>
  )
}

function ColorSetting({color, selected, onClick}: { color: string, selected: boolean, onClick: () => void }) {
  return (
    <div className={`flex flex-col items-center justify-center w-10 h-10 p-3 rounded-full ${color}`}
         role="button"
         aria-pressed="false"
         tabIndex={0}
         onClick={onClick}
    >
      {selected &&
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 11" fill="none">
          <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" strokeWidth="2"/>
        </svg>
      }
    </div>
  )
}

export default function Home() {
  const [menuActive, setMenuActive] = useState(MenuItem.Pomodoro)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const durationSeconds = 18 * 60

  return (
    <>
      <SettingsDialog className={`${isSettingsDialogOpen ? 'visible' : 'invisible'}`} onCloseClick={() => setIsSettingsDialogOpen(false)} />
      <div className={twMerge(
        `bg-background min-h-screen min-w-fit`,
        `${isSettingsDialogOpen ? 'opacity-50' : ''}}`
      )}>
        <div className={twMerge(
          `flex flex-col px-6 pt-8 pb-12 max-w-[400px]`,
        )}>
          <div className={twMerge(
            `flex flex-col items-center justify-center`,
            `${isSettingsDialogOpen ? 'opacity-50' : ''}}`
          )}>
            <Logo className={`mb-[45px]`}/>
            <Menu onClick={(index: number) => setMenuActive(index)} active={menuActive} className={`mb-12`}/>
            <Timer durationSeconds={durationSeconds} className={`mb-20`} />
            <OptionsButton onClick={() => {setIsSettingsDialogOpen(true)}} />
          </div>
        </div>
      </div>
    </>
  )
}
