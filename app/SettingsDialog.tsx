import { useSettings, useSettingsDispatch } from '@/app/SettingsContext'
import { colorSchemes, Duration, Settings } from '@/app/types'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function SettingsDialog({className = '', onClose}: { className?: string, onClose: () => void }) {
  const contextSettings = useSettings()
  const [settings, setSettings] = useState<Settings>(contextSettings)
  const dispatch = useSettingsDispatch()

  useEffect(() => {
    setSettings(contextSettings)
  }, [contextSettings]);

  function closeDialog() {
    colorSchemes.map(c => c.name).indexOf(settings.colorScheme.name)
    setSettings(contextSettings)
    onClose()
  }

  function applySettings() {
    dispatch({type: 'SET', settings: settings})
    localStorage.setItem('POMODORO_SETTINGS', JSON.stringify(settings))
    onClose()
  }

  return (
    <div className={twMerge(
      `absolute z-20 flex flex-col w-full h-full px-6 pt-[46px] bg-darkblur text-offblack`,
      `${className}`
    )}>
      <div className={`flex flex-col bg-white rounded-[15px]`}>
        <SettingsTitle
          className={`mb-6`}
          onCloseClick={closeDialog}
        />
        <TimeSettings
          className={`mb-6`}
          durations={settings.duration}
          onChange={(type: string, value: number) => setSettings({...settings, duration: {...settings.duration, [type]: value}})}
        />
        <FontSettings
          className={`mb-6`}
        />
        <ColorSettings
          className={`mb-8`}
          selected={colorSchemes.map(c => c.name).indexOf(settings.colorScheme.name)}
          onSelect={(idx: number) => setSettings({...settings, colorScheme: colorSchemes[idx]})}
        />
        <ApplyButton
          className={`self-center transform translate-y-1/2`}
          onClick={applySettings}
        />
      </div>
    </div>
  )
}

function SettingsTitle({className='', onCloseClick}: { className?: string, onCloseClick: () => void }) {
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

function TimeSettings({className='', durations, onChange }: { className?: string, durations: Duration, onChange: (_type: string, _value: number) => void }) {
  function onIncrease(type: 'pomodoro' | 'shortBreak' | 'longBreak') {
    if (durations[type] < 99) {
      onChange(type, durations[type] + 1)
    }
  }

  function onDecrease(type: 'pomodoro' | 'shortBreak' | 'longBreak') {
    if (durations[type] <= 1) return
    onChange(type, durations[type] - 1)
  }

  const labels = ['pomodoro', 'short break', 'long break']
  const names: ('pomodoro' | 'shortBreak' | 'longBreak')[] = ['pomodoro', 'shortBreak', 'longBreak']

  return (
    <div className={twMerge(
      `flex flex-col px-6`,
      `${className}`
    )}>
      <span className={`text-h4 self-center mb-[18px]`}>
        time (minutes)
      </span>
      <div className={`flex flex-col gap-y-2 mb-6`}>
        { names.map((name, idx) =>
          <TimeSetting
            key={idx}
            label={labels[idx]}
            value={durations[name]}
            onIncrease={() => onIncrease(name)}
            onDecrease={() => onDecrease(name)} />
        )}
      </div>
      <div className={`w-full h-px bg-lightgray`}/>
    </div>
  )
}

function TimeSetting({className='', label, value, onIncrease, onDecrease}: { className?: string, label: string, value: number, onIncrease: () => void, onDecrease: () => void }) {
  return (
    <div className={twMerge(
      `flex flex-row items-center`,
      `${className}`
    )}>
      <span className={`text-form-small opacity-40`}>
        {label}
      </span>
      <DurationField value={value} onIncrease={onIncrease} onDecrease={onDecrease} />
    </div>
  )
}

function DurationField({ value, onIncrease, onDecrease }: { value: number, onIncrease: () => void, onDecrease: () => void }) {
  return (
    <div className={`flex flex-row items-center h-10 w-[140px] px-4 py-2 ml-auto bg-offwhite text-form-medium rounded-[10px]`}>
      <span>
        {value}
      </span>
      <div className={`w-px grow`} />
      <div className={`flex flex-col items-center`}>
        <div
          role="button"
          aria-pressed="false"
          tabIndex={0}
          onClick={onIncrease}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7">
            <path fill="none" stroke="#1E213F" strokeOpacity=".25" strokeWidth="2" d="M1 6l6-4 6 4"/>
          </svg>
        </div>
        <div className={`h-1.5`} />
        <div
          role="button"
          aria-pressed="false"
          tabIndex={0}
          onClick={onDecrease}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7">
            <path fill="none" stroke="#1E213F" strokeOpacity=".25" strokeWidth="2" d="M1 1l6 4 6-4"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function FontSettings({className = ''}: { className?: string }) {
  const [font, setFont] = useState<0 | 1 | 2>(0)

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

function ColorSettings({ className='', selected, onSelect }: { className?: string, selected: number, onSelect: (_idx: number) => void }) {
  return (
    <div className={twMerge(
      `flex flex-col px-6 items-center`,
      `${className}`
    )}>
      <span className={`text-h4 mb-[18px]`}>
        color
      </span>
      <div className={`flex flex-row gap-x-4`}>
        { colorSchemes.map((colorScheme, idx) =>
          <ColorSetting
            key={idx}
            color={colorScheme.bgColor}
            selected={selected === idx}
            onClick={() => onSelect(idx)}
          />
        )}
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

function CloseButton({className='', onClick}: { className?: string, onClick: () => void }) {
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

function ApplyButton({className='', onClick}: { className?: string, onClick: () => void }) {
  return (
    <div className={twMerge(
      `flex w-[140px] h-[52px] -mt-[26px] items-center justify-center text-white textstyle-button rounded-[26.5px] bg-primary_red`,
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