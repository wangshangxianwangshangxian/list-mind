export default () => {
  const temp = localStorage.getItem('key')
  if (!temp) {
    localStorage.setItem('key', '[]')
  }
}