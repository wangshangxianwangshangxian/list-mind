import get_block from "./get_block"

export default (mind, id) => {
  const block   = get_block(mind, id)
  const p_block = get_block(mind, block.pid)
  const index   = p_block.children.findIndex(a => a.id === block.id)
  if (index < 0)
    return null
  p_block.children.splice(index, 1)
  return block
}