/* eslint-disable no-bitwise */
'use strict';
const net = require('net');
const { nanoid } = require('nanoid');
const { machineIdSync } = require('node-machine-id');
const { getGpuStatus } = require('./utils/gpu');

let tempBuffer = null;
let bufferLength = 0;

const parseString = (buffer, res = []) => {
  if (buffer.length < 4) {
    return res;
  }
  let content = null;
  let lenData = null;
  let len = 0;
  if (bufferLength === 0) {
    lenData = buffer.slice(0, 4);
    content = buffer.slice(4);
    for (let i = 0; i < lenData.length; i++) {
      console.log(lenData[i]);
      len += lenData[i] << 8 * i;
    }
    if (len > content.length) {
      bufferLength = len;
      tempBuffer = content;
    } else {
      let text = content.slice(0, len);
      text = text.toString();
      res.push(text);
    }

  } else {
    content = buffer;
    len = bufferLength - tempBuffer.length;
    const text = content.slice(0, len);
    tempBuffer = Buffer.concat([ tempBuffer, text ]);
    if (len <= content.length) {
      const str = tempBuffer.toString();
      res.push(str);
      tempBuffer = null;
      bufferLength = 0;
    }

  }
  parseString(content.slice(len), res);
  return res;
};

class Socket {
  constructor({ host, port, uniKey, priority }) {
    this.host = host;
    this.port = port;
    this.socket = null;
    this.heartbeat = null;
    this.priority = priority || 1;
    this.id = nanoid();
    this.machineId = machineIdSync();
    this.uniKey = uniKey || this.machineId;
    this.sendMessageHandleMap = {};
    this.handleMessage = null;
  }

  handleError() {

  }

  async sendHeartbeat() {
    const gpu = await getGpuStatus();
    await this.sendMessage('heartbeat', { machineId: this.machineId, gpu });
  }

  handleData(data) {
    data = JSON.parse(data.toString('utf-8'));
    if (data.action === 'replySignal') {
      if (this.sendMessageHandleMap[data.id]) {
        this.sendMessageHandleMap[data.id](data);
      }
    } else if (this.handleMessage) {
      this.handleMessage(data);
    }
  }

  async sendMessage(action, data) {
    // return new Promise((resolve, reject) => {
    const sendData = {
      id: nanoid(),
      action,
      data,
    };
    const dataString = JSON.stringify(sendData);
    console.log('sendMessage', dataString);
    try {
      const b64Str = Buffer.from(dataString);
      console.log('len', b64Str.length);
      const lenBuffer = Buffer.alloc(4);
      for (let i = 0; i < 4; i++) {
        const len = b64Str.length;
        const asciiChar = (len >> (8 * i)) % (1 << 8);
        lenBuffer[i] = asciiChar;
      }
      this.socket.write(Buffer.concat([ lenBuffer, b64Str ]));
    } catch (e) {
      console.log(e);
    }
    // this.sendMessageHandleMap[sendData.id] = data => {
    //   resolve(data);
    // };
    // });
  }


  async connect() {
    return new Promise((resolve, reject) => {

      this.socket = net.createConnection({
        host: this.host,
        port: this.port,
      }, async () => {
        resolve();
        console.log('Connected to server');
        this.sendHeartbeat();
        if (this.heartbeat) {
          clearInterval(this.heartbeat);
        }
        this.heartbeat = setInterval(() => {
          this.sendHeartbeat();
        }, 15 * 1000);
      });

      this.socket.on('error', error => {
        reject(error);
        console.error('Connection error');
      });

      this.socket.on('data', data => {
        console.log('Received data: ' + data);
        const resList = parseString(data);
        for (const item of resList) {
          this.handleData(item);
        }
      });
      this.socket.on('close', async () => {
        this.socket = null;
        await this.connect();
      });

      this.socket.on('end', async () => {
        this.socket = null;
        await this.connect();
        console.log('Server disconnected');
        this.connect();
      });

    });

  }
}

module.exports = {
  Socket,
};
