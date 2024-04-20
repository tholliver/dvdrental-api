import { GroupByType } from "../typos"

export const timeLapseConverter = (time: string, lapse: number) => {
  const splitedDate = dateLapseParser(time, lapse)
  return splitedDate?.toISOString().split('T')[0]
}
// To get some date ago given a lapse 
function dateLapseParser(time: string, lapse: number) {
  const currentNowDate = new Date()
  // CASE LAST N [YEARS] AGO

  if (time === 'y')
    return new Date(
      currentNowDate.getFullYear() - lapse,
      currentNowDate.getMonth(),
      currentNowDate.getDate()
    )
  // CASE LAST N MONTHS AGO

  if (time === 'm') {
    return new Date(
      currentNowDate.getFullYear(),
      currentNowDate.getMonth() - lapse,
      currentNowDate.getDate()
    )
  }
  // CASE LAST N DAYS AGO

  if (time === 'd') {
    return new Date(
      currentNowDate.getFullYear(),
      currentNowDate.getMonth(),
      currentNowDate.getDate() - lapse
    )
  }
}


export function getGroupByKey(key: keyof GroupByType) {
  const groupByEnums = {
    day: { spec: 'day', format: 'YYYY-MM-DD' },
    month: { spec: 'month', format: 'YYYY-MM' },
    year: { spec: 'year', format: 'YYYY' },
  }
  return groupByEnums[key];
}
