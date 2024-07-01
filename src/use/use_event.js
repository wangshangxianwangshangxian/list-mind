import { onBeforeMount, onMounted } from "vue"

export default (target, event, callback) => {
  onMounted    (() => target.addEventListener   (event, callback))
  onBeforeMount(() => target.removeEventListener(event, callback))
}