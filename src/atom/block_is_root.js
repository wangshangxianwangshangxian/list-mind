import get_block from "./get_block"

export default (mind, id) => {
  const block = get_block(mind, id)
  return block.id === mind.mind.id
}