import { createContext, Dispatch, useCallback, useContext, useEffect, useReducer } from 'react'
import { colorSchemeRed, Settings } from '@/app/types'

type SettingsActionSet = {
  type: 'SET'
  settings: Settings
}

type SettingsAction = SettingsActionSet

const initialSettings: Settings = {
  colorScheme: colorSchemeRed
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

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, dispatch] =
    useReducer(settingsReducer, initialSettings)

  useEffect(() => {
    const storedSettings = window.localStorage.getItem('POMODORO_SETTINGS')
    if (storedSettings) {
      dispatch({type: 'SET', settings: JSON.parse(storedSettings)})
    }
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}

function settingsReducer(settings: Settings, action: SettingsAction) {
  switch (action.type) {
    case 'SET':
      return action.settings
    default:
      throw new Error(`Unknown action type ${action.type}`)
  }
}