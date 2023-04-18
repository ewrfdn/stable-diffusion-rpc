/* eslint-disable no-bitwise */
'use strict';
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

module.exports = {
  parseString,
};
