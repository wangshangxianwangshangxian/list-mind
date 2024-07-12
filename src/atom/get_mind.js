export default address => {
  const temp = localStorage.getItem(`mind_${address}`)
  if (!temp)
    return null
  return JSON.parse(temp)
}