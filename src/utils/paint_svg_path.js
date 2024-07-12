/**
 * anchorX anchorY 相对于左上角的svg画布偏移量
 */
export default (start_x, start_y, end_x, end_y, anchorX = 0, anchorY = 0) => {
  start_x += anchorX
  start_y += anchorY
  end_x   += anchorX
  end_y   += anchorY
  const path = `M ${start_x} ${start_y}
                L ${start_x + (end_x - start_x) / 2} ${start_y}
                L ${start_x + (end_x - start_x) / 2} ${end_y}
                L ${end_x} ${end_y}`
  return path
}