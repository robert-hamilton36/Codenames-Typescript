export class NameValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'NameValidationError'
  }
}

export const validateName = (name: string): boolean => {
  if (name === '') {
    throw new NameValidationError('Please enter a name')
  } else if (!/^[A-Z a-z]+$/.test(name)) {
    throw new NameValidationError('Name can only contain letters and spaces')
  } else {
    return true
  }
}
