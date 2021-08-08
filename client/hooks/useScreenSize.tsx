// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: 'react-responsive' module causes import error, potentially has messed up type exports?
import { useMediaQuery } from 'react-responsive'

export const useScreenSize = (): ScreenSize => {
  const isPhone = useMediaQuery({ query: '(max-width: 500px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
  const isFullscreen = useMediaQuery({ query: '(min-width: 1024px)' })

  if (isPhone) {
    return 'phone'
  }

  if (isTablet) {
    return 'tablet'
  }

  if (isFullscreen) {
    return 'fullscreen'
  }
}

type ScreenSize = 'phone' | 'tablet' | 'fullscreen'
