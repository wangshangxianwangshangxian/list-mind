export default () => {
  const hash = location.hash
  const arrs = hash.split('/')
  const temp = arrs[arrs.length - 1]
  const wenh = temp.split('?')[0]
  return wenh
}