export default (block, data = {}) => {
  for (let key in data) {
    block[key] = data[key]
  }
}