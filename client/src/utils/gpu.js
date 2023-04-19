
'use strict';

const smi = require('node-nvidia-smi');

const getGpuInfo = () => {
  return new Promise((resolve, reject) => {
    smi(function(err, data) {
      if (err) {
        console.warn(err);
        reject(err);
      }
      if (data) {
        const { nvidia_smi_log } = data;
        resolve(nvidia_smi_log);
      }
    });
  });
};
const getGpuStatus = async () => {
  const res = {};
  const gpuInfo = await getGpuInfo();
  const { gpu, driver_version, cuda_version } = gpuInfo;
  const { fb_memory_usage, utilization } = gpu;
  res.gpuName = gpu.product_name;
  res.gpuId = gpu.uuid;
  res.driverVersion = driver_version;
  res.cudaVersion = cuda_version;
  res.totalMem = fb_memory_usage.total;
  res.usedMem = fb_memory_usage.used;
  res.freeMem = fb_memory_usage.free;
  res.gpuUtil = utilization.gpu_util;
  return res;
};
module.exports = {
  getGpuInfo,
  getGpuStatus,
};
