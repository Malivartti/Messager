export function getTime(time) {
  const date = time ? new Date(time) : new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  minutes = (minutes < 10) ? '0' + minutes : minutes
  hours = (hours < 10) ? '0' + hours : hours
  return hours + ':' + minutes
}