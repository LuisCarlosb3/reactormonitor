/* eslint-disable no-undef */
let chart
let data = []
am4core.ready(function () {
  am4core.useTheme(am4themes_animated)
  chart = am4core.create('chartdiv', am4charts.XYChart)
  chart.background.fill = '#ffffff'
  chart.background.opacity = 1
  // data no chart
  chart.hiddenState.properties.opacity = 0
  chart.padding(0, 0, 0, 0)
  chart.zoomOutButton.disabled = true

  chart.data = data
  // create X
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
  dateAxis.dataFields.category = 'Tempo'
  dateAxis.title.text = 'Tempo de execução'

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  valueAxis.dataFields.category = 'Temperatura'
  valueAxis.title.text = 'Temperatura'
  valueAxis.interpolationDuration = 500
  valueAxis.rangeChangeDuration = 500
  valueAxis.renderer.inside = true

  var series = chart.series.push(new am4charts.LineSeries())
  series.dataFields.dateX = 'time'
  series.dataFields.valueY = 'value'
  series.minBulletDistance = 10
  series.stroke = am4core.color('blue')
  series.strokeWidth = 2
  series.tensionX = 0.77

  const bullet = series.bullets.push(new am4charts.Bullet())
  bullet.tooltipText = 'Temperature: [bold]{valueY}[/]'
  bullet.adapter.add('fill', function (fill, target) {
    return am4core.color('#0f23ca')
  })
  var scrollbarX = new am4charts.XYChartScrollbar()
  scrollbarX.series.push(series)
  chart.scrollbarX = scrollbarX
  chart.scrollbarX = new am4charts.XYChartScrollbar()
  chart.cursor = new am4charts.XYCursor()
  chart.cursor.xAxis = dateAxis
  chart.cursor.snapToSeries = series

  chart.legend = new am4charts.Legend()
  chart.events.on('ready', function () {
    dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true)
  })

  dateAxis.interpolationDuration = 500
  dateAxis.rangeChangeDuration = 500
})

export function getData () {
  return data
}
export function addData (data) {
  chart.addData(data)
}
export function clearChart () {
  chart.data = []
  data = []
}
