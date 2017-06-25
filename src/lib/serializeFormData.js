export default formData => {
  const entries = []
  for (let entry of formData.entries()) {
    entries.push(entry)
  }

  return entries.reduce((accum, entry, i) => {
    accum[entry[0]] = entry[1]

    return accum
  }, {})
}
