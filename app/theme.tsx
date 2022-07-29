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

function setThemelocalStorage(theme: supportedThemes) {
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
      setThemelocalStorage('system')
      return systemTheme
    } else if (localStorage.theme === 'dark') {
      setThemeTailwind('dark')
      setThemelocalStorage('dark')
      return 'dark'
    } else {
      setThemeTailwind('light')
      setThemelocalStorage('light')
      return 'light'
    }
  })

  const setTheme = (theme: supportedThemes) => {
    setThemeTailwind(theme)
    setThemelocalStorage(theme)
    setThemeLocal(theme)
  }

  return (
    <>
      {theme === 'dark' ? (
        <FiSun
          size="1.5em"
          title="light mode"
          className="hover:text-highlight transition-color"
          onClick={() => setTheme('light')}
        />
      ) : (
        <BsMoonStars
          size="1.5em"
          title="dark mode"
          className="hover:text-highlight transition-color"
          onClick={() => setTheme('dark')}
        />
      )}
    </>
  )
}

function ThemeFallback() {
  return <BsMoonStars size="1.5em" title="dark mode" />
}

export {Theme, ThemeFallback}
