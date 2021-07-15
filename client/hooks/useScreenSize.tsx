import useMediaQuery from 'react-responsive'

export const useScreenSize = (): ScreenSize => {
  const isPhone = useMediaQuery({ maxWidth: 500 })
  const isTablet = useMediaQuery({ maxWidth: 1024 })

  if (isPhone) {
    return 'phone'
  }

  if (isTablet) {
    return 'tablet'
  }

  return 'fullscreen'
}

type ScreenSize = 'phone' | 'tablet' | 'fullscreen'
