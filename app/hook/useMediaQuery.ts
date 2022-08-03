import {useState, useEffect, useCallback, useMemo} from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  const mediaQueryList = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query)
    }

    return false
  }, [query])

  const handleChange = useCallback(function (
    this: MediaQueryList,
    ev: MediaQueryListEvent,
  ) {
    setMatches(this.matches)
  },
  [])

  useEffect(() => {
    if (!mediaQueryList) {
      return
    }

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', handleChange)

    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [mediaQueryList, handleChange])

  return matches
}

export default useMediaQuery
