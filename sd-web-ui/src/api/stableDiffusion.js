import axios from "../utils/http/axios"

const text2Image = async (params) => {
  const res = await axios.post("/stable-diffusion/text-to-image", params)
  return res
}

export default {
  text2Image
}