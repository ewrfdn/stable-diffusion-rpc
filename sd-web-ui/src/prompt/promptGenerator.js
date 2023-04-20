import propmt from "./prompt"
const getRandomPrompt = (dict, count) => {
  const list = []
  const res = []
  for (const key in dict) {
    list.push(key)
  }
  if (count >= list.length) {
    return list
  }
  for (let i = 0; i < count; i++) {
    const index = ~~(Math.random() * list.length)
    const items = list.splice(index, 1)
    res.push(items[0])
  }
  return res
}
export const generatePromopt = () => {
  let res = []
  console.log(propmt)
  for (const key in propmt) {
    const { count, value } = propmt[key]
    const items = getRandomPrompt(value, count)
    res = [...res, ...items]
  }
  return res.join(",")
}
