import React, { useEffect } from 'react'

import { useToaster } from '../contexts/ToasterContext'

export const Toaster: React.FC = () => {
  const { toaster, setToaster } = useToaster()

  const handleClick = () => {
    setToaster(null)
  }

  useEffect(() => {
    if (toaster) {
      setTimeout(() => {
        setToaster(null)
      }, 5000)
    }
  }, [])

  if (toaster) {
    return (
      <div className='toaster' data-testid='toasterDiv'>
        <div className='toaster__header'>
          <strong data-testid='toasterTypeHeader'>{toaster.type}</strong>
          <button onClick={handleClick} className='toaster__close-btn' data-testid='toasterCloseButton'><span>&times;</span></button>
        </div>
        <div className='toaster__body' data-testid='toasterMessageBody'>
          {toaster.message}
        </div>
      </div>
    )
  }

  return null
}
