export default () => {
  const list = JSON.parse(localStorage.getItem('key')) || []
  return list
}