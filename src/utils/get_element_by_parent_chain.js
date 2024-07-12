export default (el, target_id) => {
  if (el.id.startsWith(target_id))
    return el

  const max_count  = 10000
  let   curr_count = 0
  let   p          = el.parentNode
  while(curr_count <= max_count) {
    if (!p) {
      return null
    }
    if (p.id && p.id.startsWith(target_id)) {
      return p
    }
    p = p.parentNode
    curr_count++
  }
}