export default (x1, y1, x2, y2) => {
  const dx    = x2 - x1
  const dy    = y2 - y1
  const theta = Math.atan2(dy, dx)
  const angle = theta * (180 / Math.PI)
  return angle
}