import {useState} from 'react'
import {FiSun} from 'react-icons/fi'
import {BsMoonStars} from 'react-icons/bs'

type supportedThemes = 'dark' | 'light' | 'system'

function Theme() {
  const [theme, setThemeLocal] = useState<supportedThemes>(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
      return 'dark'
    } else if (
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
      return 'system'
    } else {
      document.documentElement.classList.remove('dark')
      return 'light'
    }
  })

  const setTheme = (theme: supportedThemes) => {
    localStorage.theme = theme
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
