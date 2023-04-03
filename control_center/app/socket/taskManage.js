'use strict';
const { nanoid } = require('nanoid');
const { TaskStatus } = require('./contrast');

class TaskManager {
  constructor() {
    this.taskQueue = [];
    this.taskPayloadMap = {};
    this.taskRunningQueue = [];
  }
  getPaddingTaskCount() {
    return this.taskQueue.length;
  }

  getRuningTaskCount() {
    return this.taskRunningQueue.length;
  }

  createTask(taskType, payload) {
    const taskId = nanoid();
    this.taskPayloadMap[taskId] = { action: 'createTask', data: { taskType, params: { payload, taskId } } };
    return taskId;
  }

  pushTask(taskId) {
    const taskData = this.taskPayloadMap[taskId];
    if (!taskData) {
      throw new Error(`taskId: ${taskId} does not Exist `);
    }
    const queueData = { id: taskId, payload: taskData, status: TaskStatus.ENQUEUE, enqueueTime: new Date().getTime() };
    this.taskQueue.push(queueData);
  }

  topTask() {
    return this.taskQueue[0];
  }

  shiftTask() {
    const task = this.taskQueue.shift();
    task.status = TaskStatus.POST;
    this.taskRunningQueue.push(task);
    return task;
  }

  getTask(taskId) {
    let index = this.taskQueue.findIndex(i => i.id === taskId);
    if (index !== -1) {
      return this.taskQueue[index];
    }
    index = this.taskRunningQueue.findIndex(i => i.id === taskId);
    if (index !== -1) {
      return this.taskRunningQueue[index];
    }
  }

  finishTask(taskId) {
    const index = this.taskRunningQueue.findIndex(i => i.id === taskId);
    if (index !== -1) {
      const res = this.taskRunningQueue.splice(index, 1);
      return res[0];
    }
  }
}

module.exports = {
  TaskManager,
};
