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
