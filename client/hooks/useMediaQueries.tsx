import { useMediaQuery } from 'react-responsive'

export const getScreenSize: () => string = () => {
  const isPhone = useMediaQuery({ maxWidth: 768 })
  const isTablet = useMediaQuery({ maxWidth: 1200 })

  if (isPhone) {
    return 'phone'
  }

  if (isTablet) {
    return 'tablet'
  }

  return 'fullscreen'
}
