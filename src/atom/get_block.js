import MindStore from "@/stores/MindStore";

const handle = (children, id) => {
  let target
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.id === id)
      return child
    target = handle(child.children)
  }
  return target
}

export default (id, mind = MindStore().mind) => {
  if (mind.id === id)
    return mind
  return handle(mind.children)
}