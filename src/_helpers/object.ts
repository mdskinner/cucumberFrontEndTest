export const removeNullValues = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v === null ? a : ((a[k] = v), a)), {})
