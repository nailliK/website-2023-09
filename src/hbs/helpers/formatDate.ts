export default function (date: string) {
  const [year, month, day] = date
    .split('-')
    .map((n, i) => (i === 1 ? parseInt(n) - 1 : parseInt(n)))
  const options = { year: 'numeric', month: 'long' }
  return new Date(year, month, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}
