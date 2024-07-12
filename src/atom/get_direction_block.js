import { DIRECTION } from "@/utils/constant"
import get_block from "./get_block"
import block_is_root from "./block_is_root"

export default (mind, id, direction) => {
  if (direction === DIRECTION.LEFT) {
    const block = get_block(mind, id)
    const p_block = get_block(mind, block.pid)
    return p_block ? p_block : block
  }
  
  if (direction === DIRECTION.RIGHT) {
    const block = get_block(mind, id)
    if (!block?.children?.length)
      return null
    const index = Math.floor(block.children.length / 2)
    return block.children[index]
  }

  if (direction === DIRECTION.UP) {
    let block   = get_block(mind, id)
    let p_block, index

    while(1) {
      p_block = get_block(mind, block.pid)
      index   = p_block.children.indexOf(block)
      if (block_is_root(mind, p_block.id) && index === 0) {
        return block
      }

      if (index !== 0) {
        return p_block.children[index - 1]
      }

      block = p_block
    }
  }

  if (direction === DIRECTION.DOWN) {
    let block   = get_block(mind, id)
    let p_block, index

    while(1) {
      p_block = get_block(mind, block.pid)
      index   = p_block.children.indexOf(block)
      if (block_is_root(mind, p_block.id) && index === p_block.children.length - 1) {
        return block
      }

      if (index !== p_block.children.length - 1) {
        return p_block.children[index + 1]
      }

      block = p_block
    }
  }
}