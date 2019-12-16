function addNestedKeysToObject (obj, keys, i = 0) {
  if (i > keys.length - 1) return

  const key = keys[i]

  if (!obj[key]) {
    obj[key] = {}
  }

  addNestedKeysToObject(obj[key], keys, i + 1)
}

module.exports = {
  addNestedKeysToObject
}
