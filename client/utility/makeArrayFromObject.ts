export function makeArrayFromObject<K extends Key, V> (object: {[key in K]: V}): V[] {
  const newArray = []
  for (const x in object) {
    newArray.push(object[x])
  }

  return newArray
}

type Key = string | number
