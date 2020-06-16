import { startChartRandom, startTimer, pause, setActualHour, resetOperation } from './time-events.js'
import { clearChart, getData } from './live-chart.js'
import { storeSettings, initializeConfiguration, readSettings } from './user-config.js'
import generateCSV from './createcsv.js'
const Swal = require('sweetalert2')
let isRunning = false

const btGenerateCsv = document.getElementById('bt-create-csv')
const buttonPlayPauseImage = document.getElementById('btn-action-img')
const buttonPlayPause = document.getElementById('btn-action')
const buttonStopImage = document.getElementById('btn-action-stop-img')
const buttonStop = document.getElementById('btn-action-stop')
const buttonSaveData = document.getElementById('bt-save-config')
const buttonCancelData = document.getElementById('bt-cancel-config')
const buttonOpenSettings = document.getElementById('bt-open-settings')
const durationField = document.getElementById('duration-time')
const toolTipElementPlayPause = document.getElementById('tooltip-play-pause')
const actualHour = document.getElementById('hora')
const temperatureField = document.getElementById('temperature')
const modal = document.getElementById('myModal')

buttonPlayPause.addEventListener('click', () => {
  if (!isRunning) {
    startChartRandom(temperatureField)
    startTimer(durationField)
    toolTipElementPlayPause.innerText = 'Pause'
    buttonPlayPauseImage.setAttribute('src', 'src/img/pause.svg')
  }
  if (isRunning) {
    pause()
    toolTipElementPlayPause.innerText = 'Play'
    buttonPlayPauseImage.setAttribute('src', 'src/img/play.svg')
  }
  isRunning = !isRunning
})
buttonStop.addEventListener('click', () => {
  Swal.fire({
    title: 'Aviso',
    text: 'Isso irá limpar todos os dados da operação, deseja continuar?',
    icon: 'warning',
    confirmButtonText: 'OK',
    showCancelButton: true,
    cancelButtonText: 'CANCEL'
  }).then((result) => {
    if (result.value) {
      clearChart()
      resetOperation(durationField, temperatureField)
      // para a execução no arduino
    }
  })
})
btGenerateCsv.addEventListener('click', async () => {
  await generateCSV(getData())
})

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal()
  }
}
async function openModal () {
  const config = readSettings()
  const portInput = document.getElementById('input-port')
  const baudRateInput = document.getElementById('input-baudrate')
  portInput.setAttribute('value', config.port || '')
  baudRateInput.setAttribute('value', config.baudRate || '')
  modal.style.display = 'block'
}
function closeModal () {
  modal.style.display = 'none'
}
function saveConfiguration () {
  try {
    storeSettings({ port: '/dev/ttyACM0', baudRate: 9600 })
    Swal.fire({ title: 'Aviso', text: 'Configurações salvas', icon: 'info', confirmButtonText: 'OK' }).then(() => {
      closeModal()
    })
  } catch (error) {
    console.log(error)
  }
}
function initializeEvents () {
  durationField.innerText = '00:00'
  setActualHour(actualHour)
  buttonPlayPauseImage.setAttribute('src', 'src/img/play.svg')
  buttonStopImage.setAttribute('src', 'src/img/stop.svg')
  buttonOpenSettings.addEventListener('click', openModal)
  buttonCancelData.addEventListener('click', closeModal)
  buttonSaveData.addEventListener('click', saveConfiguration)
  toolTipElementPlayPause.innerText = 'Play'
  initializeConfiguration()
}
initializeEvents()
