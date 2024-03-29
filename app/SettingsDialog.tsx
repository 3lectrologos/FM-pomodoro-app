import { useSettings, useSettingsDispatch } from "@/app/SettingsContext"
import { colorSchemes, Duration, fontSchemes, Settings } from "@/app/types"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export default function SettingsDialog({
  className = "",
  onClose,
}: {
  className?: string
  onClose: () => void
}) {
  const contextSettings = useSettings()
  const [settings, setSettings] = useState<Settings>(contextSettings)
  const dispatch = useSettingsDispatch()

  useEffect(() => {
    setSettings(contextSettings)
  }, [contextSettings])

  function closeDialog() {
    colorSchemes.map((c) => c.name).indexOf(settings.colorScheme.name)
    setSettings(contextSettings)
    onClose()
  }

  function applySettings() {
    dispatch({ type: "SET", settings: settings })
    localStorage.setItem("POMODORO_SETTINGS", JSON.stringify(settings))
    onClose()
  }

  return (
    <div
      className={twMerge(
        `absolute z-20 flex flex-col w-full h-full px-6 bg-darkblur text-offblack`,
        `tablet:items-center`,
        `${className}`,
      )}
    >
      <div
        className={twMerge(
          `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] flex flex-col bg-white rounded-[15px]`,
          `tablet:w-[540px]`,
        )}
      >
        <SettingsTitle className={`mb-6`} onCloseClick={closeDialog} />
        <TimeSettings
          className={`mb-6`}
          durations={settings.duration}
          onChange={(type: string, value: number) =>
            setSettings({
              ...settings,
              duration: { ...settings.duration, [type]: value },
            })
          }
        />
        <FontSettings
          className={`mb-6`}
          selected={fontSchemes.indexOf(settings.fontScheme)}
          onSelect={(idx: number) =>
            setSettings({ ...settings, fontScheme: fontSchemes[idx] })
          }
        />
        <ColorSettings
          className={`mb-2`}
          selected={colorSchemes
            .map((c) => c.name)
            .indexOf(settings.colorScheme.name)}
          onSelect={(idx: number) =>
            setSettings({ ...settings, colorScheme: colorSchemes[idx] })
          }
        />
        <ApplyButton
          className={`self-center transform translate-y-1/2`}
          onClick={applySettings}
        />
      </div>
    </div>
  )
}

function SettingsTitle({
  className = "",
  onCloseClick,
}: {
  className?: string
  onCloseClick: () => void
}) {
  return (
    <div className={`${className}`}>
      <div
        className={`flex flex-row px-6 pt-6 mb-6 items-center tablet:pt-8 tablet:mb-8 tablet:px-10`}
      >
        <span className={`textstyle-h2`}>Settings</span>
        <CloseButton className={`ml-auto`} onClick={onCloseClick} />
      </div>
      <div className={`w-full h-px bg-lightgray`} />
    </div>
  )
}

function TimeSettings({
  className = "",
  durations,
  onChange,
}: {
  className?: string
  durations: Duration
  onChange: (_type: string, _value: number) => void
}) {
  function onIncrease(type: "pomodoro" | "shortBreak" | "longBreak") {
    if (durations[type] < 99) {
      onChange(type, durations[type] + 1)
    }
  }

  // Refactor this into a type (already present in Timer.tsx)
  function onDecrease(type: "pomodoro" | "shortBreak" | "longBreak") {
    if (durations[type] <= 1) return
    onChange(type, durations[type] - 1)
  }

  const labels = ["pomodoro", "short break", "long break"]
  const names: ("pomodoro" | "shortBreak" | "longBreak")[] = [
    "pomodoro",
    "shortBreak",
    "longBreak",
  ]

  return (
    <div className={twMerge(`flex flex-col px-6 tablet:px-10`, `${className}`)}>
      <div className={`flex flex-col`}>
        <span
          className={`textstyle-h4 self-center mb-[18px] tablet:self-start tablet:mb-6`}
        >
          time (minutes)
        </span>
        <div
          className={`flex flex-col gap-y-2 mb-6 tablet:flex-row tablet:gap-x-[20px]`}
        >
          {names.map((name, idx) => (
            <TimeSetting
              key={idx}
              label={labels[idx]}
              value={durations[name]}
              onIncrease={() => onIncrease(name)}
              onDecrease={() => onDecrease(name)}
            />
          ))}
        </div>
      </div>
      <div className={`w-full h-px bg-lightgray`} />
    </div>
  )
}

function TimeSetting({
  className = "",
  label,
  value,
  onIncrease,
  onDecrease,
}: {
  className?: string
  label: string
  value: number
  onIncrease: () => void
  onDecrease: () => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-row items-center tablet:flex-col tablet:gap-y-2 tablet:items-start`,
        `${className}`,
      )}
    >
      <span className={`textstyle-form-small opacity-40 select-none`}>
        {label}
      </span>
      <DurationField
        value={value}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </div>
  )
}

function DurationField({
  value,
  onIncrease,
  onDecrease,
}: {
  value: number
  onIncrease: () => void
  onDecrease: () => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-row items-center h-10 w-[140px] ml-auto bg-offwhite textstyle-form-medium rounded-[10px]`,
        `tablet:h-12`,
      )}
    >
      <span className={`select-none pl-4 py-2`}>{value}</span>
      <div className={`w-px grow`} />
      <div className={`flex flex-col w-10 items-center h-full`}>
        <div
          className={`flex flex-col w-full h-1/2 items-end justify-end pb-1 pr-4 group`}
          role="button"
          aria-pressed="false"
          aria-label="Increase duration"
          tabIndex={0}
          onClick={onIncrease}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="7"
              className={`stroke-background opacity-25 group-active:opacity-100 group-hover:opacity-100 stroke-2`}
            >
              <path fill="none" d="M1 6l6-4 6 4" />
            </svg>
          </div>
        </div>
        <div
          className={`flex flex-col w-full h-1/2 items-end justify-start pt-1 pr-4 group`}
          role="button"
          aria-pressed="false"
          aria-label="Decrease duration"
          tabIndex={0}
          onClick={onDecrease}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="7"
              className={`stroke-background opacity-25 group-active:opacity-100 group-hover:opacity-100 stroke-2`}
            >
              <path fill="none" d="M1 1l6 4 6-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function FontSettings({
  className = "",
  selected,
  onSelect,
}: {
  className?: string
  selected: number
  onSelect: (_idx: number) => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-col px-6 items-center tablet:px-10`,
        `${className}`,
      )}
    >
      <div
        className={`flex flex-col items-center mb-6 tablet:w-full tablet:flex-row tablet:justify-between`}
      >
        <span className={`textstyle-h4 mb-[18px] tablet:mb-0`}>font</span>
        <div className={`flex flex-row gap-x-4 tablet:items-center`}>
          {fontSchemes.map((fontScheme, idx) => (
            <FontSetting
              key={idx}
              className={`${fontScheme}`}
              selected={selected === idx}
              onClick={() => onSelect(idx)}
            />
          ))}
        </div>
      </div>
      <div className={`w-full h-px bg-lightgray`} />
    </div>
  )
}

function FontSetting({
  className = "",
  selected,
  onClick,
}: {
  className?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-col items-center justify-center w-10 h-10 p-4 rounded-full bg-offwhite textstyle-selection`,
        `${selected ? "bg-offblack text-white" : ""}`,
        `${!selected && "hover:outline hover:outline-1 hover:outline-offwhite hover:outline-offset-4"}`,
        `${className}`,
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

function ColorSettings({
  className = "",
  selected,
  onSelect,
}: {
  className?: string
  selected: number
  onSelect: (_idx: number) => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-col px-6 items-center tablet:px-10`,
        `${className}`,
      )}
    >
      <div
        className={`flex flex-col items-center mb-6 tablet:w-full tablet:flex-row tablet:justify-between`}
      >
        <span className={`textstyle-h4 mb-[18px] tablet:mb-0`}>color</span>
        <div className={`flex flex-row gap-x-4`}>
          {colorSchemes.map((colorScheme, idx) => (
            <ColorSetting
              key={idx}
              color={colorScheme.bgColor}
              selected={selected === idx}
              onClick={() => onSelect(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ColorSetting({
  color,
  selected,
  onClick,
}: {
  color: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <div
      className={twMerge(
        `flex flex-col items-center justify-center w-10 h-10 p-3 rounded-full ${color}`,
        `${!selected && "hover:outline hover:outline-1 hover:outline-offwhite hover:outline-offset-4"}`,
      )}
      role="button"
      aria-pressed="false"
      tabIndex={0}
      onClick={onClick}
    >
      {selected && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 11" fill="none">
          <path
            d="M1 5.5L4.95263 9.45263L13.4053 1"
            stroke="#161932"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  )
}

function CloseButton({
  className = "",
  onClick,
}: {
  className?: string
  onClick: () => void
}) {
  return (
    <div
      className={twMerge(
        `w-7 h-7 flex flex-col items-center justify-center group`,
        `${className}`,
      )}
      role="button"
      aria-pressed="false"
      aria-label="Close"
      tabIndex={0}
      onClick={onClick}
    >
      <div className={`flex flex-col w-[14px] h-[14px]`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          className={`opacity-50 group-hover:opacity-100 group-active:opacity-100`}
        >
          <path
            fill="1E213F"
            fillRule="evenodd"
            d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
          />
        </svg>
      </div>
    </div>
  )
}

function ApplyButton({
  className = "",
  onClick,
}: {
  className?: string
  onClick: () => void
}) {
  return (
    <div
      className={twMerge(
        `flex w-[140px] h-[52px] -mt-[26px] items-center justify-center text-white textstyle-button rounded-[26.5px] bg-primary_red transition-colors`,
        `hover:transition-colors hover:bg-primary_red_hover active:bg-primary_red_hover`,
        `${className}`,
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
