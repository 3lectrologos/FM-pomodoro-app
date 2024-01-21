'use client'

import { twJoin, twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { SettingsProvider, useSettings, useSettingsDispatch } from '@/app/SettingsContext'
import SettingsDialog from '@/app/SettingsDialog'
import Timer from '@/app/Timer'

enum MenuItem {
  Pomodoro,
  ShortBreak,
  LongBreak,
}

const menuItems = ['pomodoro', 'short break', 'long break']

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
  const bgColor = useSettings().colorScheme.bgColor

  return (
    <nav className={`z-10`}>
      <ul className={twMerge(
        `flex flex-row w-full h-16 px-2 bg-offblack rounded-full items-center justify-center`,
        `${className}`,
      )}>
        { menuItems.map((item, index) =>
          <li key={index}
              className={twJoin(
                `transition flex flex-col w-[105px] h-12 items-center justify-center rounded-full group`,
                `${(active === index) ? `text-background ${bgColor}` : ''}`,
              )}
              role='button'
              aria-pressed='false'
              tabIndex={0}
              onClick={() => onClick(index)}
          >
            <span className={twMerge(
              `textstyle-body1`,
              `${(active === index) ? 'opacity-100 text-background' : 'text-lightblue opacity-40'}`,
              `desktop:group-hover:opacity-100`
            )}>
              {item}
            </span>
          </li>
        )}
      </ul>
    </nav>
  )
}

function SettingsButton({className = '', onClick}: { className?: string, onClick: () => void }) {
  return (
    <div className={twMerge(
      `flex w-[28px] h-[28px] items-center justify-center cursor-pointer`,
      `${className}`
    )}
         role="button"
         aria-pressed="false"
         tabIndex={0}
         onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={`fill-lightblue opacity-50 desktop:hover:opacity-100`}>
        <path
          d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
        />
      </svg>
    </div>
  )
}

function Main() {
  const [menuActive, setMenuActive] = useState(MenuItem.Pomodoro)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const settings = useSettings()

  function onMenuClick(index: number) {
    setMenuActive(index)
  }

  return (
    <div className={`${settings.fontScheme}`}>
      <SettingsDialog
        className={`${isSettingsDialogOpen ? 'visible' : 'invisible'}`}
        onClose={() => setIsSettingsDialogOpen(false)}
      />
      <div className={twMerge(
        `flex bg-background min-h-screen min-w-fit justify-center`,
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
            <Menu onClick={onMenuClick} active={menuActive} className={`mb-12`}/>
            { menuActive === MenuItem.Pomodoro &&  <Timer type={'pomodoro'} className={`mb-20`} /> }
            { menuActive === MenuItem.ShortBreak &&  <Timer type={'shortBreak'} className={`mb-20`} /> }
            { menuActive === MenuItem.LongBreak &&  <Timer type={'longBreak'} className={`mb-20`} /> }
            <SettingsButton onClick={() => {setIsSettingsDialogOpen(true)}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <SettingsProvider>
      <Main />
    </SettingsProvider>
  )
}
