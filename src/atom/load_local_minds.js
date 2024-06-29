export default () => {
  const list = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.startsWith('mind_'))
      continue
    try {
      const mind = JSON.parse(localStorage.getItem(key))
      list.push(mind)
    }
    catch(e) {
      continue
    }
  }
}