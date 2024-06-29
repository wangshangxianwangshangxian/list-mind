import MindStore from "@/stores/MindStore";

export default (id, blocks = MindStore().blocks) => {
  return blocks.find(a => a.id === id)
}