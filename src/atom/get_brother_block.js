import get_block from "./get_block"

export default (mind, id, offset = 0) => {
  const block  = get_block(mind, id)
  if (!block) return null
  const parent = get_block(mind, block.pid)
  let   index  = parent.children.findIndex(a => a.id === block.id)
        index  += offset
  return parent.children[index]
}