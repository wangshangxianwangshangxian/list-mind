import get_text_color from "@/utils/get_text_color"

// 生成彩色字，并用于v-html中
// @params {string} text
export default text => {
  let str = ''
  text.split('').forEach(a => {
    if (a === ' ') {
      str += '&nbsp;'
    }
    else {
      str += `<span class="${get_text_color()}">${a}</span>`
    }
  })
  return str
}