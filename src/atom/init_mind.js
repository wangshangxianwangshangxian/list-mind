import MindStore from "@/stores/MindStore"

const handler = children => {
  children.forEach(c => {
    MindStore().blocks.push(c)
    MindStore().blocks.push(...c.children)
    c.children.forEach(tmp => handler(tmp.children))
  })
}

export default mind => {
  MindStore().mind          = mind
  MindStore().blocks.length = 0
  handler(mind.children)
}