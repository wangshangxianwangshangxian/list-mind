import create_block from "./create_block"
import get_block from "./get_block"

export default (mind, pid) => {
  const block = get_block(mind, pid)
  const child = create_block(pid)
  block.children.push(child)
  return child
}