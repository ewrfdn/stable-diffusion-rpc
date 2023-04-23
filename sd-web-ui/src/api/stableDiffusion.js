import axios from "../utils/http/axios"

const text2Image = async (params) => {
  const res = await axios.post("/stable-diffusion/text-to-image", params)
  return res
}

const getAllTask = async (params) => {
  const res = await axios.get("/task-manager/getall", params)
  return res
}

const getAllWorker = async (params) => {
  const res = await axios.get("/worker/getall", params)
  return res
}

export default {
  text2Image,
  getAllTask,
  getAllWorker
}