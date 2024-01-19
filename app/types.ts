interface ColorScheme {
  bgColor: string,
  hexColor: string
}

export const colorSchemeRed = {
  name: 'red',
  bgColor: 'bg-primary_red',
  hexColor: '#F87070'
}

export const colorSchemeCyan = {
  name: 'cyan',
  bgColor: 'bg-primary_cyan',
  hexColor: '#70F3F8'
}

export const colorSchemePurple = {
  name: 'purple',
  bgColor: 'bg-primary_purple',
  hexColor: '#D881F8'
}

export const colorSchemes: ColorScheme[] = [colorSchemeRed, colorSchemeCyan, colorSchemePurple]

export type Settings = {
  //pomodoro: number,
  //shortBreak: number,
  //longBreak: number,
  //font: 0|1|2,
  colorScheme: ColorScheme
}