import { onMounted, onBeforeUnmount } from "vue"

export default (target, event, callback) => {
  onMounted      (() => target.addEventListener   (event, callback, true))
  onBeforeUnmount(() => target.removeEventListener(event, callback, true))
}
