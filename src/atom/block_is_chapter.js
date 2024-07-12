export default (mind, id) => {
  return mind.mind.children.find(a => a.id === id)
}