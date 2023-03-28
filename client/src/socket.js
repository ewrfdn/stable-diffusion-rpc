'use strict';
const net = require('net');
const { nanoid } = require('nanoid');
const { machineIdSync } = require('node-machine-id');

class Socket {
  constructor({ host, port, uniKey, priority }) {
    this.host = host;
    this.port = port;
    this.socket = null;
    this.priority = priority || 1;
    this.id = nanoid();
    this.machineId = machineIdSync();
    this.uniKey = uniKey || this.machineId;
  }

  handleError() {

  }

  handleData(data) {
    console.log(data);
  }

  sendMessage(data) {
    const dataString = JSON.stringify(data);
    this.socket.write(dataString);
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

      this.socket.on('data', function(data) {
        console.log('Received data: ' + data);
        this.handleData(data);
      });

      this.socket.on('end', function() {
        console.log('Server disconnected');
      });

    });

  }
}

module.export = {
  Socket,
};
