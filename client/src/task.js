'use strict';
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
  get status() {
    return this._status;
  }
  async changStatus(value) {
    if (value !== TaskStatus.Exit) {
      await this.sendTaskInfo();
    }
    this._status = value;
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
    this.taskConfig = taskConfig;
    this.resultFile = [];
    this.resultData = {};
    this._taskPercentage = 0;
  }

  async checkCreated() {
    await this.changStatus(TaskStatus.Pending);
  }

  async sendTaskInfo() {
    const sendData = {
      createdTime: this.createdTime,
      startTime: this.startTime,
      percentage: this._taskPercentage,
      endTime: this.endTime,
      id: this.id,
      status: this.status,
      result: this.resultData,
      error: this.error,
    };
    try {
      if (this.socket) {
        await this.socket.sendMessage(sendData);
        if (this.status === TaskStatus.Success || this.status === TaskStatus.Failed) {
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
    this.status = TaskStatus.cancel;
  }

  async handleError(error) {
    console.log(error);
  }

  async execute() {
    return;
  }

  async running() {
    if (this.TaskStatus !== TaskStatus.Pending) {
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
      await this.changStatus(TaskStatus.error);
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

module.exports = {
  RequestTask,
};
