export function daysToMilliseconds(days: number): number {
    const millisecondsInADay = 24 * 60 * 60 * 1000; // 1 день = 24 часа * 60 минут * 60 секунд * 1000 миллисекунд
    return days * millisecondsInADay;
  }