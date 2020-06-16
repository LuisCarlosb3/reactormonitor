import { addData } from './live-chart.js'
let durationTime
let timerInterval
let minutes = 0
let duration = 0
const initial = new Date()
export function setActualHour (element) {
  setInterval(() => {
    let actualTimeFormated = new Date().toLocaleString('pt-BR', { timeZone: 'America/Manaus', dateStyle: 'short', timeStyle: 'short' })
    actualTimeFormated = actualTimeFormated.split(' ')[1]
    element.innerText = actualTimeFormated
  }, 1000)
}
export function startChartRandom (tempField) {
  durationTime = setInterval(() => {
    const data = (Math.random() * (300 - 0) + 0).toFixed(2)
    tempField.innerText = data + ' °C'
    addData({ time: new Date(initial), value: data })
    initial.setSeconds(initial.getSeconds() + 1)
  }, 1000)
}
export function startTimer (element) {
  timerInterval = setInterval(() => {
    if (minutes < 10) {
      if (duration < 10) {
        element.innerText = '0' + minutes + ':0' + duration
      } else if (duration >= 10 && duration < 60) {
        element.innerText = '0' + minutes + ':' + duration
      } else {
        minutes += 1
        duration = 0
        element.innerText = '0' + minutes + ':0' + duration
      }
    } else {
      if (duration < 10) {
        element.innerText = minutes + ':0' + duration
      } else if (duration > 10 && duration < 60) {
        element.innerText = minutes + ':' + duration
      } else {
        minutes += 1
        duration = 0
        element.innerText = minutes + ':0' + duration
      }
    }
    duration += 1
  }, 1000)
}
export function pause () {
  clearInterval(durationTime)
  clearInterval(timerInterval)
}
export function resetOperation (durationField, tempField) {
  pause()
  durationField.innerText = '00:00'
  tempField.innerText = '0 °C'
  duration = 0
  minutes = 0
}
