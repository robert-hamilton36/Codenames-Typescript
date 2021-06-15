import useMediaQuery from 'react-responsive'

export const useScreenSize: () => string = () => {
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
