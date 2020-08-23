import { addDays, formatISO, subDays } from 'date-fns'

export const dateNowISO = (): string => {
  return convertDateISO(new Date())
}

export const convertDateISO = (dateToConvert: number | Date): string => {
  return formatISO(dateToConvert)
}

export const dateOneDayBefore = (targetDate: number | Date): Date => {
  return subDays(targetDate, 1)
}

export const dateOneDayAfter = (targetDate: number | Date): Date => {
  return addDays(targetDate, 1)
}
