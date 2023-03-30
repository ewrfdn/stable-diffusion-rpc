'use strict'
const { nanoid } = require('nanoid');

const net = require('net');

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
    this.server = null
    this.socketMap = {}
  }
  sendMessage(data, socket) {
    const message = JSON.stringify(data)
    try {
      const b64Str = Buffer.from(message);
      console.log('len', b64Str.length);
      const lenBuffer = Buffer.alloc(4);
      for (let i = 0; i < 4; i++) {
        const len = b64Str.length;
        const asciiChar = (len >> (8 * i)) % (1 << 8);
        lenBuffer[i] = asciiChar;
      }
      socket.write(Buffer.concat([lenBuffer, b64Str]));
    } catch (e) {
      console.log(e);
    }
  }
  async handleData(data, socket) {
    const dataObj = JSON.parse(data);
    console.log(dataObj, "data-------")
    this.sendMessage({ id: dataObj.id, action: "replySignal" }, socket)
  }

  listen() {
    this.server = net.createServer((socket) => {
      socket.id = nanoid()
      this.socketMap[socket.id] = { socket }
      console.log(this.socketMap)
      this.sendMessage({ action: "createTask", data: { taskType: "aiDrawTask", params: { taskId: "1234", it: "hello" } } }, socket)

      socket.on('data', (data) => {
        const resList = parseString(data);
        for (const item of resList) {
          this.handleData(item, socket)
        }
      });

      socket.on('close', () => {
        console.log('Client disconnected');
        delete this.socketMap[socket.id]
      });
      socket.on("error", (err) => {
        console.log(err)
      })
    });

    this.server.listen(this.port, () => {
      console.log('Server started');
    });
  }
}

module.exports = {
  Server
}