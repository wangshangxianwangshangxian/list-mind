export default (start_timestamp, time_format) => {
  const time_difference = Date.now() - start_timestamp

  const milliseconds_in_second = 1000
  const milliseconds_in_minute = milliseconds_in_second * 60
  const milliseconds_in_hour   = milliseconds_in_minute * 60
  const milliseconds_in_day    = milliseconds_in_hour * 24

  const hours   = Math.floor((time_difference % milliseconds_in_day) / milliseconds_in_hour)
  const minutes = Math.floor((time_difference % milliseconds_in_hour) / milliseconds_in_minute)
  const seconds = Math.floor((time_difference % milliseconds_in_minute) / milliseconds_in_second)

  const format_map = {
      'hh'  : String(hours)  .padStart(2, '0'),
      'mm'  : String(minutes).padStart(2, '0'),
      'ss'  : String(seconds).padStart(2, '0')
  }

  let formatted_time = time_format
  for (const [key, value] of Object.entries(format_map)) {
      formatted_time = formatted_time.replace(key, value)
  }

  return formatted_time
}
