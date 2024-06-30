export default () => {
  const userAgent = navigator.userAgent || window.opera
  if (/windows phone/i.test(userAgent) ||
      /android/i.test(userAgent) ||
      /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return false
  }

  return true
}