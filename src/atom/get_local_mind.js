export default address => {
  try {
    const tmp = localStorage.getItem(`mind_${address}`)
    return JSON.parse(tmp)
  }
  catch (e) {
    return null
  }
}