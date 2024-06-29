export default (rows, data) => {
  const options = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: rows
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: data,
        itemStyle: {
          color: 'green'
        }
      }
    ]
  }
  return options
}