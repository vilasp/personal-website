import {useState} from 'react'
import {FiSun} from 'react-icons/fi'
import {BsMoonStars} from 'react-icons/bs'

type supportedThemes = 'dark' | 'light' | 'system'

function getSystemTheme() {
  if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function setThemeLocalStorage(theme: supportedThemes) {
  localStorage.theme = theme
}

function setThemeTailwind(theme: supportedThemes) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function Theme() {
  const [theme, setThemeLocal] = useState<supportedThemes>(() => {
    if (localStorage.theme === 'system' || !('theme' in localStorage)) {
      const systemTheme = getSystemTheme()
      setThemeTailwind(systemTheme)
      setThemeLocalStorage('system')
      return systemTheme
    } else if (localStorage.theme === 'dark') {
      setThemeTailwind('dark')
      setThemeLocalStorage('dark')
      return 'dark'
    } else {
      setThemeTailwind('light')
      setThemeLocalStorage('light')
      return 'light'
    }
  })

  const setTheme = (theme: supportedThemes) => {
    setThemeTailwind(theme)
    setThemeLocalStorage(theme)
    setThemeLocal(theme)
  }

  return theme === 'dark' ? (
    <button onClick={() => setTheme('light')}>
      <FiSun
        size="1.5em"
        title="light mode"
        className="hover:text-highlight transition-color animate-pop"
      />
    </button>
  ) : (
    <button onClick={() => setTheme('dark')}>
      <BsMoonStars
        size="1.5em"
        title="dark mode"
        className="hover:text-highlight transition-color animate-pop"
      />
    </button>
  )
}

function ThemeFallback() {
  return (
    <button>
      <BsMoonStars
        size="1.5em"
        title="dark mode"
        className="setThemeLocalStorage"
      />
    </button>
  )
}

export {Theme, ThemeFallback}
