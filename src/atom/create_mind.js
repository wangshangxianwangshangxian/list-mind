import generate_address from "@/utils/generate_address"
import get_time from "@/utils/get_time"
import generate_key from "@/utils/generate_key"
import create_block from "./create_block"

export default () => {
  const key    = generate_key()
  const data = {
    address    : generate_address(key),
    nonce      : 1,
    create_time: get_time(),
    update_time: get_time(),
    mind       : create_block()
  }
  data.mind.content = '请在这里输入标题'
  const chapter     = create_block(data.mind.id)
  chapter.content   = '章节'
  data.mind.children.push(chapter)

  const child       = create_block(chapter.id)
  child.content     = '内容1'
  chapter.children.push(child)

  const child2      = create_block(chapter.id)
  child2.content    = '内容2'
  chapter.children.push(child2)
  
  return [data, key]
}