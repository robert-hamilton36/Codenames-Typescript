export interface User {
  name: string,
  uid: string,
  host?: boolean,
  spymaster?: boolean,
  team?: TeamColour
}

export type TeamColour = 'red' | 'blue'
