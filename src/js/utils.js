export function donwloadCSV (data, filename) {
  const formatRow = (values) =>
    values.map((v) => `"${v.replace('"', '\\"')}"`).join(',') + '\n'
  const download = (csvData) => {
    const anchor = document.createElement('a')
    anchor.setAttribute('download', filename)
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    anchor.setAttribute('href', url)
    anchor.click()
    URL.revokeObjectURL(url)
  }
  const headers = formatRow(Object.keys(data[0]))
  const body = data.map((object) => formatRow(Object.values(object))).join('')
  const csvData = [headers, body].join('')
  download(csvData)
}
