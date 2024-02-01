export const reset = '\x1b[0m'
export const red = '\x1b[31m'
export const green = '\x1b[32m'
export const yellow = '\x1b[33m'

export const errorMessage = (msg: string) => {
  return `${red}${msg}${reset}`
}

export const successMessage = (msg: any) => {
  return `${green}${msg}${reset}`
}

export const warningMessage = (msg: string) => {
  return `${yellow}${msg}${reset}`
}
