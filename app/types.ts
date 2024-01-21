type ColorScheme = {
  name: string,
  bgColor: string,
  textColor: string,
  hexColor: string
}

export const colorSchemeRed = {
  name: 'red',
  bgColor: 'bg-primary_red',
  textColor: 'desktop:peer-hover:group-[]:text-primary_red',
  hexColor: '#F87070'
}

export const colorSchemeCyan = {
  name: 'cyan',
  bgColor: 'bg-primary_cyan',
  textColor: 'desktop:peer-hover:group-[]:text-primary_cyan',
  hexColor: '#70F3F8'
}

export const colorSchemePurple = {
  name: 'purple',
  bgColor: 'bg-primary_purple',
  textColor: 'desktop:peer-hover:group-[]:text-primary_purple',
  hexColor: '#D881F8'
}

export const colorSchemes: ColorScheme[] = [colorSchemeRed, colorSchemeCyan, colorSchemePurple]

export type FontScheme = 'font-sans' | 'font-serif' | 'font-mono'
export const fontSchemes: FontScheme[] = ['font-sans', 'font-serif', 'font-mono']

export type Duration = {
  pomodoro: number,
  shortBreak: number,
  longBreak: number
}

export type Settings = {
  duration: Duration,
  colorScheme: ColorScheme
  fontScheme: FontScheme
}