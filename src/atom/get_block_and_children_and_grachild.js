import get_block from "./get_block"

// 包含自己的
export default (mind, id, include_self = true) => {
  const target = get_block(mind, id)
  if (!target)
    return []
  const blocks = include_self ? [target] : []
  const handle = children => {
    children.forEach(c => {
      blocks.push(c)
      handle(c.children)
    })
  }

  handle(target.children)
  return blocks
}