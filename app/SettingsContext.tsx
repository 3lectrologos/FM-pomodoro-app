import { createContext, Dispatch, useCallback, useContext, useEffect, useReducer } from 'react'
import { colorSchemeRed, Settings } from '@/app/types'

type SettingsActionSet = {
  type: 'SET'
  settings: Settings
}

type SettingsAction = SettingsActionSet
type MaybeSettings = Settings | null

const initialSettings: Settings = {
  duration: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  },
  colorScheme: colorSchemeRed,
  fontScheme: 'font-mono'
}

// NOTE: This works as long as the default values are not accessed anywhere outside the corresponding Provider.
export const SettingsContext = createContext({} as Settings)
export const SettingsDispatchContext = createContext({} as Dispatch<SettingsAction>)

export function useSettings() {
  return useContext(SettingsContext)
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext)
}

function Loading() {
  return (
    <div className={`bg-background min-h-screen min-w-fit`}>
    </div>
  )
}

export function SettingsProvider({children}: { children: React.ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, null)

  useEffect(() => {
    const storedSettings = localStorage.getItem('POMODORO_SETTINGS')
    if (storedSettings) {
      dispatch({type: 'SET', settings: JSON.parse(storedSettings)})
    } else {
      dispatch({type: 'SET', settings: initialSettings})
    }
  }, []);

  if (!settings) {
    return <Loading/>
  } else {
    return (
      <SettingsContext.Provider value={settings}>
        <SettingsDispatchContext.Provider value={dispatch}>
          {children}
        </SettingsDispatchContext.Provider>
      </SettingsContext.Provider>
    )
  }
}

function settingsReducer(settings: MaybeSettings, action: SettingsAction): MaybeSettings {
  switch (action.type) {
    case 'SET':
      return action.settings
    default:
      throw new Error(`Unknown action type ${action.type}`)
  }
}