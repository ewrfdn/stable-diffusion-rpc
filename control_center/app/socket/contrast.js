'use strict';
const TaskResponseStatus = {
  Running: 'running',
  Pending: 'pending',
  Success: 'success',
  Failed: 'failed',
  Canceled: 'canceled',
  Exit: 'exit',
};


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

module.exports = {
  TaskResponseStatus,
  TaskStatus,
  SocketStatus,
};
