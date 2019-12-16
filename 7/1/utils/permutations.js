/**
 * Returns all the possible permutations
 * @param {Array} items - array of items to permute
 * @returns {Array} 
 */
function permutations (items) {
  if (items.length === 0) return items
  if (items.length === 1) return [items]

  const first = items[0]
  const rest = items.slice(1)

  return permutations(rest).reduce((perms, perm) => {
    for (let i = 0; i < items.length; i++) {
      const left = perm.slice(0, i)
      const right = perm.slice(i)
      const newPerm = [...left, first, ...right]

      perms.push(newPerm)
    }

    return perms
  }, [])
}

module.exports = permutations
