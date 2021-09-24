export const capitalize = (string: string): string => {
  const lowercaseString = string.toLowerCase()
  const firstLetter = string.charAt(0).toUpperCase()
  const restOfWord = lowercaseString.slice(1)
  return firstLetter + restOfWord
}
