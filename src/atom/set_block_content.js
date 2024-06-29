import MindStore from "@/stores/MindStore";
import get_block from "./get_block";

export default (id, content, mind = MindStore().mind) => {
  const block = get_block(id, mind)
  if (!block) return
  block.content = content
}