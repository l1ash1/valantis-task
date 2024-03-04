type validationType = 'number' | 'string';

export const doUniqueIds = (arr: string[]): string[] => Array.from(new Set(arr))

export const doUniqueProducts = <T>(arr: T[], key: Function): T[] => Object.values(Object.fromEntries(arr.map((item: T) => [key(item), item])))

export const ucFirst = (str: string): string => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

export const validateFunction = (type: validationType, value: string) => {
  switch (type) {
    case 'number':
      const isValidNumber = Number.isFinite(+value)
      if (isValidNumber) {
        return 'success'
      } else {
        return 'Пожалуйста, введите число'
      }

    case 'string':
      const reg = /^[аa-яz\s&]+$/
      const isValidString = reg.test(value.toLocaleLowerCase())
      if (isValidString) {
        return 'success'
      } else {
        return 'Пожалуйста, используйте только кириллицу или латиницу'
      }

  }
}

export const paginateArray = (arr: any[], size:number) => {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, [])
}
