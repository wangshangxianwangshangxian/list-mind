export default (obj) => {
  let bytes = 0

  function size_of(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8
          break
        case 'string':
          bytes += obj.length * 2
          break
        case 'boolean':
          bytes += 4
          break
        case 'object':
          const obj_class = Object.prototype.toString.call(obj).slice(8, -1)
          if (obj_class === 'Object' || obj_class === 'Array') {
            for (const key in obj) {
              if (!obj.hasOwnProperty(key)) continue
              size_of(obj[key])
            }
          } else bytes += obj.toString().length * 2
          break
      }
    }
    return bytes
  }

  return size_of(obj)
}