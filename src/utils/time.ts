export const toMongoHour = (hour: number, meridiem: string): number | null => {
  if (meridiem === 'am') {
    if (hour === 12) {
      return 0;
    }

    return hour;
  } else if (meridiem === 'pm') {
    if (hour === 12) {
      return hour;
    }

    return 12 + hour;
  }

  return null;
}
