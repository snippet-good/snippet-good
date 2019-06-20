import moment from 'moment'

export const checkIfAllDataExists = (...args) => {
  for (let i = 0; i < args.length; ++i) {
    if (!args[i]) {
      return false
    } else if (Array.isArray(args[i])) {
      if (!args[i].length) return false
    } else if (!args[i].id) {
      return false
    }
  }
  return true
}

export const generateFlashMessageId = (messages, type) => {
  const currentMessageIds = messages
    .filter(fm => fm.id.includes(type))
    .map(fm => fm.id.split('-')[0])
  return `${
    currentMessageIds.length ? Math.max(...currentMessageIds) + 1 : '0'
  }-${type}`
}

export const parseDateTime = datetime => {
  const localDateTime = moment.utc(datetime).local()
  const hour = localDateTime.hour()
  const suffix = hour <= 12 ? 'AM' : 'PM'
  return `Scheduled for ${
    hour <= 12 ? hour : hour - 12
  }:${localDateTime.minute()} ${suffix} on ${
    localDateTime.format('LL').split(',')[0]
  }`
}
