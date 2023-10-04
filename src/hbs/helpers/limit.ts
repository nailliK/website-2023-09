export default function (arr: any[], limit: number) {
  if (!Array.isArray(arr)) {
    return []
  }
  return arr.slice(0, limit)
}
