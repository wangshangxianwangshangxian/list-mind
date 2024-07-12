import delete_block from "./delete_block"
import get_block from "./get_block"

export default (mind, pid, id, index) => {
  const block       = get_block(mind, id)
  const pblock      = get_block(mind, block.pid)
  const new_pblock  = get_block(mind, pid)
  // 队内移动
  if (pblock === new_pblock) {
    const curr_i    = pblock.children.findIndex(a => a.id === id)
    if (index <= curr_i) {
      delete_block(mind, id)
      pblock.children.splice(index, 0, block)
    }
    else {
      const temp      = { id: '-11111111' }
      pblock.children.splice(index, 0, temp)
      delete_block(mind, id)
      const new_index = pblock.children.findIndex(a => a.id === temp.id)
      pblock.children.splice(new_index, 1, block)
    }
  }
  else {
    delete_block(mind, id)
    block.pid = new_pblock.id
    new_pblock.children.splice(index, 0, block)
  }
}