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
    console.log('taskConfig', taskConfig);
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
      console.log('res--------11111-');
      const res = await this.execute();
      console.log('res--------11111-', res);
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
    console.log(this.taskConfig, 'success');
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
      const response = await axios(`http://${host}:${port}/file=${filepath}`);

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
      fn_index: 85,
      data: [
        `task(${this.id})`, // taskId
        'masterpiece,best quality,extremely detailed CG unity 8K wallpaper,1girl,light smile,glint <lora:AnyaForger_v10:1>  pink hair\n', // 正tag
        'Lowres,Bad anatomy,Bad hands,Text,Error,multi-legged,Missing fingers,Extra digit,Fewer digits,Cropped,Worst quality,Low quality,Normal quality,Jpeg artifacts, Signature,Watermark,Username,Blurry,Missing arms,Missing legs,Bad arms,Bad legs,Bad animal ears,(mutated hands and fingers:1.5 ),(mutation, poorly drawn :1.2), (long body :1.3), (mutation, poorly drawn :1.2),(breasts:1.4), liquid body, text font ui, long neck, uncoordinated body,fused ears,huge,ugly,', // 反tag
        [],
        30, // sampling
        'Euler a', // sampling method
        false, // restore face
        false, // tiling
        1, // batch count
        1, // batchSize
        6.5, // cgf scale
        3854399300, // seed
        -1, // variation seed
        0, // variatiuon streng=
        0, // resize seed from height
        0, // resize seed from width
        false, // extra
        800, // height
        512, // width
        false, // hires fix
        0.7, // denoising
        2, // upscale BY
        'Latent', // upscaler
        0, // hires steps
        0, // resize width to
        0, // resize hight to
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

}

class AiDrawTask extends StableDiffusionRunTask {
  async execute() {
    const { port, host } = this.params;
    const res = await this.text2Image(host, port, {});
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
