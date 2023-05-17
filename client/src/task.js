'use strict';

const { nanoid } = require('nanoid');
const axios = require('axios');
const path = require('path');
const mime = require('mime');
// const _ = require('lodash');

const TaskStatus = {
  Running: 'running',
  Pending: 'pending',
  Success: 'success',
  Failed: 'failed',
  Canceled: 'canceled',
  Exit: 'exit',
};

class BaseTask {
  async changStatus(value) {
    this._status = value;
    if (value !== TaskStatus.Exit) {
      await this.sendTaskInfo();
    }

  }
  get taskPercentage() {
    return this._taskPercentage;
  }

  set taskPercentage(value) {
    this._taskPercentage = value();
  }


  constructor(taskConfig, socket) {
    this.socket = socket;
    this.createdDate = new Date().getDate();
    this.startTime = null;
    this.endTime = null;
    this.error = null;
    this._status = null;
    this.taskConfig = taskConfig;
    this.params = taskConfig.payload;
    this.id = taskConfig.taskId || nanoid();
    this.resultFile = [];
    this.resultData = {};
    this.changStatus(TaskStatus.Pending);
    this._taskPercentage = 0;
  }

  async checkCreated() {
    await this.changStatus(TaskStatus.Pending);
  }

  parseFiles() {
    const res = [];
    for (const file of this.resultFile) {
      const { buffer, ...rest } = file;
      const b64Str = buffer.toString('base64');
      res.push({ b64File: b64Str, ...rest });
    }
    return res;
  }

  async sendTaskInfo() {
    const sendData = {
      createdTime: this.createdTime,
      startTime: this.startTime,
      percentage: this._taskPercentage,
      endTime: this.endTime,
      id: this.id,
      status: this._status,
      result: this.resultData,
      files: this.parseFiles(),
      error: this.error,
    };
    try {
      if (this.socket) {
        await this.socket.sendMessage('taskResponse', sendData);
        if (this._status === TaskStatus.Success || this._status === TaskStatus.Failed) {
          await this.changStatus(TaskStatus.Exit);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async addResultFile(options) {
    const { buffer, mineType, fileName, fileKey } = options;
    this.resultFile.push({ buffer, mineType, fileName, fileKey });
  }

  async prepareFileData() {
    return [];
  }

  toJSON() {
    const jsonData = {
      taskType: this.constructor.name,
      taskConfig: this.taskConfig,
      createdTime: this.createdDate,
    };
    return JSON.stringify(jsonData);
  }
  async cancel() {
    this._status = TaskStatus.cancel;
  }

  async handleError(error) {
    console.log(error);
    this.error = error;
  }

  async execute() {
    return;
  }

  async run() {
    if (this._status !== TaskStatus.Pending) {
      console.log('return');
      return;
    }
    this.startTime = new Date().getTime();
    await this.changStatus(TaskStatus.Running);
    try {
      const res = await this.execute();
      const fileData = await this.prepareFileData();
      this.endTime = new Date().getTime();
      const socketData = {
        data: res,
        files: fileData,
      };
      this.resultData = socketData;
      this.endTime = new Date().getTime();
      await this.changStatus(TaskStatus.Success);
    } catch (e) {
      await this.handleError(e);
      await this.changStatus(TaskStatus.Failed);
    }
  }
}

class RequestTask extends BaseTask {
  // constructor(taskConfig) {
  //   super(taskConfig);
  // }

  async execute() {
    return { message: 'success' };
  }
}

class StableDiffusionRunTask extends BaseTask {
  async runPredict(host, port, params) {
    const { fn_index, data } = params;
    const response = await axios(`http://${host}:${port}/run/predict/`, {
      headers: {
      },
      data: {
        fn_index,
        data,
        // session_hash: '7kbnt0sum9t',
      },
      method: 'POST',
    });
    return response.data;
  }

  async getFile(filepath, host, port) {
    try {
      const fileName = path.basename(filepath);
      const mimtype = mime.getType(filepath);
      const response = await axios.get(`http://${host}:${port}/file=${filepath}`,
        { responseType: 'arraybuffer' }
      );
      const buffer = response.data;
      this.resultFile.push({ fileKey: filepath, mimtype, fileName, buffer });
    } catch (e) {
      console.log(e);
    }

  }

  async getFiles(filePathList, host, port) {
    const promisList = [];
    for (const item of filePathList) {
      promisList.push(this.getFile(item, host, port));
    }
    return await Promise.all(promisList);
  }

  async text2Image(host, port, config = {}) {
    const data = {
      fn_index: 120,
      data: [
        `task(${this.id})`, // taskId
        config.prompt, // 正tag
        config.negativePrompt, // 反tag
        [],
        config.sampling || 20, // sampling
        config.samplingMethod || 'Euler a', // sampling method
        config.restoreFace || false, // restore face
        config.tiling || false, // tiling
        config.batchCount || 1, // batch count
        config.batchSize || 1, // batchSize
        config.cgfScale || 6.5, // cgf scale
        config.seed || -1, // seed
        config.variationSeed || -1, // variation seed
        0, // variatiuon streng=
        config.resizeSeedFromHeight || 0, // resize seed from height
        config.resizeSeedFromWidth || 0, // resize seed from width
        config.extra || false, // extra
        config.height || 512, // height
        config.width || 512, // width
        config.hiresFix || false, // hires fix
        config.denoising || 0.7, // denoising
        config.upscaleBy || 2, // upscale BY
        config.upscaler || 'Latent', // upscaler
        config.hiresSteos || 0, // hires steps
        config.resizeWidthTo || 0, // resize width to
        config.resizeHeightTo || 0, // resize hight to
        [],
        'None',
        '<span>(No stats yet, run benchmark in VRAM Estimator tab)</span>',
        false,
        false,
        'positive',
        'comma',
        0,
        false,
        false,
        '',
        'Seed',
        '',
        'Nothing',
        '',
        'Nothing',
        '',
        true,
        false,
        false,
        false,
        0,
      ],
    };
    const response = await this.runPredict(host, port, data);
    return response.data[0];
  }

  async getCheckPointList(host, port) {
    const data = {
      fn_index: 0,
      data: [],
    };
    const response = await this.runPredict(host, port, data);
    return response.data[0].choices;
  }

  async getCheckPoint(host, port, name) {
    const checkPoints = await this.getCheckPointList(host, port);
    for (const checkPoint of checkPoints) {
      if (checkPoint.includes(name)) {
        return checkPoint;
      }
    }
  }

  async loadCheckPoint(host, port, checkpointName) {
    const data = {
      fn_index: 263,
      data: [
        checkpointName,
      ],
    };
    const response = await this.runPredict(host, port, data);
    console.log(response, data);
    return response.data[0].choices;
  }

  async getDefaultOptions(host, port) {
    const data = {
      fn_index: 232,
      data: [],
    };
    const response = await this.runPredict(host, port, data);
    return response.data;
  }


}

class AiDrawTask extends StableDiffusionRunTask {
  async execute() {
    const { port, host, data } = this.params;
    const { params, checkPoint } = data;
    if (checkPoint) {
      const checkpointName = await this.getCheckPoint(host, port, checkPoint);
      await this.loadCheckPoint(host, port, checkpointName);
    }
    const res = await this.text2Image(host, port, params);
    const fileList = [];
    if (res instanceof Array) {
      for (const item of res) {
        if (item.name) {
          fileList.push(item.name);
        }
      }
    }
    await this.getFiles(fileList, host, port);
    return res;
  }
}

module.exports = {
  RequestTask,
  AiDrawTask,
  StableDiffusionRunTask,
};
