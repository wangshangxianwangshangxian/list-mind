import generate_key from "@/utils/generate_key"
import get_bg_color from "@/utils/get_bg_color"

export default (pid, o = {}) => {
  const data = Object.assign({
    pid     : pid,
    id      : generate_key().slice(-10),
    expand  : true,
    visible : true, // 显示不显示当前 block 内容
    editable: true,
    content : '',
    show    : true, // 显示不显示当前 block
    children: [],
    addition: {
      link  : '',
      img64 : ''
    },
    style: {
      backgroundColor: get_bg_color()
    }
  }, o)
  return data
}