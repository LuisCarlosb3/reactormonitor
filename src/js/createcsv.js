const { dialog } = require('electron').remote
const Swal = require('sweetalert2')
const createCSV = require('csv-writer').createObjectCsvWriter

export default async function generateCSV (data) {
  var options = {
    title: 'Save file',
    defaultPath: 'report.csv',
    buttonLabel: 'Save'
  }
  var savePath = await dialog.showSaveDialog(options)
  if (!savePath.canceled) {
    const columns = [
      { id: 'time', title: 'Time in seconds' },
      { id: 'temperature', title: 'Temperature' }
    ]
    const csvWriter = createCSV({
      path: savePath.filePath,
      header: columns,
      fieldDelimiter: ';'
    })
    const csvData = data.map(item => {
      let time = item.time.toLocaleString('pt-BR', { timeZone: 'America/Manaus', dateStyle: 'short', timeStyle: 'medium' })
      time = time.split(' ')[1]
      return { time, temperature: item.value }
    })
    csvWriter.writeRecords(csvData).then(() => {})
    Swal.fire({ title: 'Aviso', text: 'Arquivo salvo com sucesso', icon: 'info', confirmButtonText: 'OK' })
  }
}
