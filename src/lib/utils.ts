import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDataTime(str: string) {
  if (!str) return ''
  const d = new Date(str)
  const date = ('0' + d.getDate()).slice(-2)
  const month = ('0'+(d.getMonth()+1)).slice(-2)
  const year = d.getFullYear()
  const hour = ('0' + d.getHours()).slice(-2)
  const minute = ('0' + d.getMinutes()).slice(-2)
  return `${year}-${month}-${date} ${hour}:${minute}`
}

export function goGithub() {
  location.href = 'https://github.com/gxr404/github-activity'
}

export function goChromeStore() {
  location.href = 'https://chromewebstore.google.com/detail/github-activity/oniblhabpoedbigijdfkmogeieamlbkk'
}
