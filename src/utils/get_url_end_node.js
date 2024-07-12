export default () => {
  const arrs = location.pathname.split('/')
  return arrs[arrs.length - 1]
}