export default (mind, block_id) => {
  if (mind.mind.id === block_id)
      return mind.mind

  let target
  const handle = (children) => {
    if (target) {
      return
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.id === block_id) {
        target = child
        break
      }
      if (child.children.length) {
        handle(child.children)
      } 
    }
  }

  handle(mind.mind.children)
  return target
}