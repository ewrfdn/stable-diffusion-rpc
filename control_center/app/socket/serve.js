/* eslint-disable no-bitwise */
'use strict';
const { nanoid } = require('nanoid');

const net = require('net');

const TaskStatus = {
  ENQUEUE: 'enqueue',
  POST: 'post',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const SocketStatus = {
  AVAILABLE: 'available',
  ALLOCATE: 'allocate',
  USED: 'used',
};

const parseString = (string, res = []) => {
  if (string.length < 4) {
    return res;
  }
  const lenData = string.slice(0, 4);
  const content = string.slice(4);
  let len = 0;
  for (let i = 0; i < lenData.length; i++) {
    console.log(lenData[i]);
    len += lenData[i] << 8 * i;
  }
  let text = content.slice(0, len);
  text = text.toString();
  res.push(text);
  parseString(content.slice(len), res);
  return res;
};

class Server {
  constructor(port) {
    this.port = port;
    this.server = null;
    this.socketMap = {};
    this.taskQueue = [];
    this.taskPayloadMap = {};
    this.isRunning = false;

  }
  sendMessage(data, socket) {
    const message = JSON.stringify(data);
    try {
      const b64Str = Buffer.from(message);
      console.log('len', b64Str.length);
      const lenBuffer = Buffer.alloc(4);
      for (let i = 0; i < 4; i++) {
        const len = b64Str.length;
        const asciiChar = (len >> (8 * i)) % (1 << 8);
        lenBuffer[i] = asciiChar;
      }
      socket.write(Buffer.concat([ lenBuffer, b64Str ]));
    } catch (e) {
      console.log(e);
    }
  }

  // eslint-disable-next-line no-unused-vars
  async handleData(data, socket) {

    const dataObj = JSON.parse(data);
    if (dataObj) { console.log(dataObj); }
  }

  listen() {
    this.server = net.createServer(socket => {
      socket.id = nanoid();
      socket.on('data', data => {
        const resList = parseString(data);

        for (const item of resList) {
          this.handleData(item, socket);
        }
      });

      socket.on('close', () => {
        console.log('Client disconnected');
        delete this.socketMap[socket.id];
      });
      socket.on('error', err => {
        console.log(err);
      });
    });

    this.server.listen(this.port, () => {
      console.log('Server started');
    });
  }

  async createTask(taskType, payload) {
    const taskId = nanoid();
    this.taskPayloadMap[taskId] = { action: 'createTask', data: { taskType, params: { payload, taskId } } };
    return taskId;
  }

  async postTask(taskId) {
    const taskData = this.taskPayloadMap[taskId];
    if (!taskData) {
      throw new Error(`taskId: ${taskId} does not Exist `);
    }
    const queueData = { id: taskId, payload: taskData, status: TaskStatus.ENQUEUE, enqueueTime: new Date().getTime() };
    // if(){

    // }
    this.taskQueue.push(queueData);
    this.postQueue();
  }

  async allocClient() {
    for (const key of this.socketMap) {
      const socket = this.socketMap[key];
      if (socket.socketStatus === SocketStatus.AVAILABLE) {
        socket.socketStatus = SocketStatus.ALLOCATE;
        return socket;
      }
    }
    return null;
  }

  async postQueue() {
    let client = this.allocClient();
    while (client && this.taskQueue.length > 0) {
      const queueData = this.taskQueue[0];
      const { payload } = queueData;
      queueData.postTime = new Date().getTime();
      try {
        await this.sendMessage(payload);
        queueData.status = TaskStatus.POST;
        client.socketStatus = SocketStatus.USED;
        this.taskQueue.shift();
      } catch (e) {
        console.log(e);
      }
      client = this.allocClient();
    }
  }

  listenTaskQueue() {

  }


  onTaskStatusChange(taskId, callBack) {

  }

  onTaskEnd(taskId, callBack) {

  }

}

module.exports = {
  Server,
};
