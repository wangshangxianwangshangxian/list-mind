import { MODE } from "@/utils/constant"
import get_block_and_children_and_grachild from "./get_block_and_children_and_grachild"

export default (mind, mode) => {
  const blocks = get_block_and_children_and_grachild(mind, mind.mind.id)
  if (mode === MODE.COMMON) {
    blocks.forEach(a => {
      a.visible  = true
      a.expand   = true
      a.editable = true
      a.show     = true
    })
  }
  else if (mode === MODE.READER) {
    blocks.forEach(a => {
      a.visible  = true
      a.expand   = true
      a.editable = false
      a.show     = true
    })
  }
  else if (mode === MODE.EXAM) {
    blocks.forEach(a => {
      a.visible  = false
      a.expand   = true
      a.editable = false
      a.show     = true
    })
  }
}