import {useMatches, useFetcher} from '@remix-run/react'
import {useState} from 'react'
import {FiSun} from 'react-icons/fi'
import {BsMoonStars} from 'react-icons/bs'
import type {THEMES} from './utils/theme'

function getSystemTheme() {
  if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function setThemeTailwind(theme: keyof typeof THEMES) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export type LoaderData = {
  theme: keyof typeof THEMES | null
}

function Theme() {
  const persistTheme = useFetcher()
  const {theme: loaderTheme} = useMatches()?.[0]?.data as LoaderData
  const [animations, setAntimations] = useState(false)
  const [theme, setThemeLocal] = useState<keyof typeof THEMES>(() => {
    if (loaderTheme === 'system') {
      const systemTheme = getSystemTheme()
      return systemTheme
    } else if (loaderTheme === 'dark') {
      return 'dark'
    } else {
      return 'light'
    }
  })

  const setTheme = (theme: keyof typeof THEMES) => {
    setThemeTailwind(theme)
    setThemeLocal(theme)
    persistTheme.submit({theme}, {action: 'action/theme', method: 'post'})
    setAntimations(true)
  }

  return theme === 'dark' ? (
    <button
      onClick={() => setTheme('light')}
      className="inline-flex items-center px-4"
      // onAnimationEnd={() => setAntimations(false)}
    >
      <FiSun
        size="1.5em"
        title="light mode"
        className={`hover:text-highlight transition-color ${
          animations && 'animate-pop'
        }`}
      />
    </button>
  ) : (
    <button
      onClick={() => setTheme('dark')}
      className="inline-flex items-center px-4"
      // onAnimationEnd={() => setAntimations(false)}
    >
      <BsMoonStars
        size="1.5em"
        title="dark mode"
        className={`hover:text-highlight transition-color ${
          animations && 'animate-pop'
        }`}
      />
    </button>
  )
}

export {Theme}
