import dayjs from "dayjs"

export function formatDate(timestamp: number) {
  const targetDate = dayjs(timestamp)

  return targetDate.format("MMM D, YYYY [@] hh:mm A")
}