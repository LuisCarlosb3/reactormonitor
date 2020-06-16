const electron = require('electron')
const path = require('path')
const fs = require('fs')

export function storeSettings (data) {
  const filePath = getPath()
  const storedData = JSON.stringify(data)
  fs.writeFileSync(filePath, storedData)
}
export function readSettings () {
  const filePath = getPath()
  const data = fs.readFileSync(filePath, 'utf-8')
  const configuration = JSON.parse(data)
  return configuration
}
export function initializeConfiguration () {
  const filePath = getPath()
  fs.readFile(filePath, (err, data) => {
    if (err) {
      storeSettings({ port: '/dev/ttyACM0', baudRate: 9600 })
    }
  })
}
function getPath () {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  const filePath = path.join(userDataPath, 'settings.json')
  console.log(filePath)
  return filePath
}
