import MindStore from "@/stores/MindStore";

export default (mind = MindStore().mind) => {
  mind.children.forEach(b => {
    b.visible  = true
    b.editable = false
    b.expand   = false
  })
}