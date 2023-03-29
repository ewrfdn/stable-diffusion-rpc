/* eslint-disable no-bitwise */
'use strict';
const net = require('net');
const { nanoid } = require('nanoid');
const { machineIdSync } = require('node-machine-id');

const parseString = (string, res = []) => {
  if (string.length < 4) {
    return res;
  }
  const lenData = string.slice(0, 4);
  const content = string.slice(4);
  let len = 0;
  for (let i = 0; i < lenData.length; i++) {
    len += lenData[i] << 8 * i;
  }
  let text = content.slice(0, len);
  text = text.toString();
  res.push(text);
  parseString(content.slice(len), res);
  return res;
};

class Socket {
  constructor({ host, port, uniKey, priority }) {
    this.host = host;
    this.port = port;
    this.socket = null;
    this.priority = priority || 1;
    this.id = nanoid();
    this.machineId = machineIdSync();
    this.uniKey = uniKey || this.machineId;
    this.sendMessageHandleMap = {};
    this.handleMessage = null;
  }

  handleError() {

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
  async sendMessage(data) {
    return new Promise((resolve, reject) => {
      const sendData = {
        id: nanoid(),
        data,
      };
      const dataString = JSON.stringify(sendData);
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
      this.sendMessageHandleMap[sendData.id] = data => {
        resolve(data);
      };
    });

  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.socket = net.createConnection({
        host: this.host,
        port: this.port,
      }, function() {
        resolve();
        console.log('Connected to server');
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

      this.socket.on('end', function() {
        console.log('Server disconnected');
      });

    });

  }
}

module.exports = {
  Socket,
};
