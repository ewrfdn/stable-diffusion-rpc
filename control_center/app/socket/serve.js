/* eslint-disable no-bitwise */
'use strict';
const { nanoid } = require('nanoid');

const net = require('net');
const { TaskManager } = require('./taskManage');
const { TaskResponseStatus, TaskStatus, SocketStatus } = require('./contrast');
const { parseString } = require('./utils');

class Server {
  constructor(port) {
    this.port = port;
    this.server = null;
    this.socketMap = {};
    this.taskChangedCallbackMap = {};
    this.taskFinishedCallbackMap = {};
    this.isRunning = false;
    this.isPosting = false;
    this.taskManager = new TaskManager();

  }
  sendMessage(data, socket) {
    const message = JSON.stringify(data);
    try {
      const b64Str = Buffer.from(message);
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
    if (dataObj) {
      const { data, action } = dataObj;
      console.log(action);
      if (action === 'heartbeat') {
        if (this.socketMap[socket.id]) {
          this.socketMap[socket.id].gpu = data.gpu;
        } else {
          this.socketMap[socket.id] = { id: socket.id, taskMap: {}, socket, socketStatus: SocketStatus.AVAILABLE, machineId: data.machineId, gpu: data.gpu };
        }
        this.postQueue();
      } else if (action === 'taskResponse') {
        const taskId = data.id;
        const callback = this.taskChangedCallbackMap[taskId];
        if (callback) {
          callback(data);
        }
        if (data.status === TaskResponseStatus.Success || data.status === TaskResponseStatus.Failed) {
          const callback = this.taskFinishedCallbackMap[taskId];
          try {
            if (callback) {
              const taskData = this.taskManager.getTask(taskId);
              callback(data, taskData);
              delete this.taskFinishedCallbackMap[taskId];
            }
            delete this.taskChangedCallbackMap[taskId];
          } catch (e) {
            console.log(e);
          }
          this.taskManager.finishTask(taskId);
          this.releaseClient(socket);
          this.postQueue();
        }
      }
    }
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
        const client = this.socketMap[socket.id];
        for (const key in client.taskMap) {
          this.taskManager.unshiftTask(key);
        }
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
    return this.taskManager.createTask(taskType, payload);
  }

  async pushTask(taskId) {
    this.taskManager.pushTask(taskId);
    this.postQueue();
  }

  allocClient() {
    try {
      for (const key in this.socketMap) {
        const socket = this.socketMap[key];
        if (socket.socketStatus === SocketStatus.AVAILABLE) {
          socket.socketStatus = SocketStatus.ALLOCATE;
          return socket;
        }
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  releaseAllocedClient() {
    try {
      for (const key in this.socketMap) {
        const socket = this.socketMap[key];
        console.log(socket.socketStatus);
        if (socket.socketStatus === SocketStatus.ALLOCATE) {
          console.log('release---------------releaseAllocedClient ', socket.socketStatus);
          socket.socketStatus = SocketStatus.AVAILABLE;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async releaseClient(socket, taskId) {
    const client = this.socketMap[socket.id];
    delete client.taskMap[taskId];
    client.socketStatus = SocketStatus.AVAILABLE;
  }

  async postQueue() {
    if (this.isPosting) {
      return;
    }
    let client = this.allocClient();
    let taskCount = this.taskManager.getPaddingTaskCount();
    while (client && taskCount > 0) {
      this.isPosting = true;
      const task = this.taskManager.topTask();
      const { payload } = task;
      task.postTime = new Date().getTime();
      try {
        this.sendMessage(payload, client.socket);
        task.status = TaskStatus.POST;
        task.socketId = client.id;
        this.taskManager.shiftTask();
        client.socketStatus = SocketStatus.USED;
        client.taskMap[task.id] = task;
      } catch (e) {
        console.log(e);
      }
      client = this.allocClient();
      taskCount = this.taskManager.getPaddingTaskCount();

    }
    this.isPosting = false;
    this.releaseAllocedClient();
    console.log('posting-success', this.isPosting);
  }

  listenTaskQueue() {

  }


  onTaskStatusChange(taskId, callBack) {
    this.taskChangedCallbackMap[taskId] = callBack;
  }

  onTaskEnd(taskId, callBack) {
    this.taskFinishedCallbackMap[taskId] = callBack;
  }

  getAllClient(params) {
    const res = [];
    for (const key in this.socketMap) {
      const { socketStatus, machineId, id, gpu } = this.socketMap[key];
      res.push({ id, machineId, socketStatus, gpu });
    }
    return res;
  }

}

module.exports = {
  Server,
};
