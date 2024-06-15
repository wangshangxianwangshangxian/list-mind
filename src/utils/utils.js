const get_time = (time_stamp = Date.now(), format = 'YYYY-MM-DD hh:mm:ss.ms') => {
  const d       = new Date(time_stamp)
  const year    = String(d.getFullYear())    .padStart(4, '0')
  const month   = String(d.getMonth() + 1)   .padStart(2, '0')
  const date    = String(d.getDate())        .padStart(2, '0')
  const hours   = String(d.getHours())       .padStart(2, '0')
  const minutes = String(d.getMinutes())     .padStart(2, '0')
  const seconds = String(d.getSeconds())     .padStart(2, '0')
  const millsec = String(d.getMilliseconds()).padEnd(3, '0')

  const date_str = format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('ms', millsec)
  return date_str
}

const get_url_end_node = () => {
  const hash = location.hash
  const arrs = hash.split('/')
  const temp = arrs[arrs.length - 1]
  const wenh = temp.split('?')[0]
  return wenh
}

export default {
  get_time,
  get_url_end_node
}