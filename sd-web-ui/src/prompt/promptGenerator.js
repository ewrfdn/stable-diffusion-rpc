import chilloutmix from "./chilloutmixPrompt"
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
export const generatePromopt = (model = "chilloutmix") => {
  let promptDict = chilloutmix
  let res = []
  for (const key in promptDict) {
    const { count, value } = promptDict[key]
    const items = getRandomPrompt(value, count)
    res = [...res, ...items]
  }
  return res.join(",")
}
export const preProcessText2ImageParams = (payload) => {
  const { checkPoint, params } = payload
  let { width, height } = params
  let upscaleBy = 1;
  let upscaler = "Latent"
  let hiresFix = false;
  const maxPixSide = Math.max(width, height)
  const maxOriginSize = 768
  if (maxPixSide > maxOriginSize && maxPixSide < maxOriginSize * 2) {
    upscaleBy = 2
    hiresFix = true
  } else if (maxPixSide > maxOriginSize * 2 && maxPixSide < maxOriginSize * 3) {
    upscaleBy = 3
    hiresFix = true
  } else if (maxPixSide > maxOriginSize * 3 && maxPixSide < maxOriginSize * 4) {
    upscaleBy = 4
    hiresFix = true
  }
  width = parseInt(width / upscaleBy)
  height = parseInt(height / upscaleBy)
  return {
    checkPoint,
    params: {
      ...params,
      width,
      height,
      upscaleBy,
      hiresFix,
      upscaler
    }
  }
}
