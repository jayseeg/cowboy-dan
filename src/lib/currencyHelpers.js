export const formatAmount = value => {
  const amount = (Math.round(value * 100) / 100).toFixed(2)
  const rawDecimal = '' + (Math.round((amount % 1) * 100))
  const decimal = rawDecimal.length === 2
    ? rawDecimal
    : `${rawDecimal}0`
  const amountFloor = Math.floor(amount)
  const localizedAmount = amountFloor.toLocaleString()

  return `${localizedAmount}.${decimal}`
}

export const presentAmount = ({symbol}, amount) => {
  return `${symbol}${formatAmount(amount)}`
}
