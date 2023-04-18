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

  shiftTask(id) {
    let task = null;
    if (!id) {
      task = this.taskQueue.shift();
    } else {
      const index = this.taskQueue.findIndex(i => i.id === id);
      if (index !== -1) {
        const res = this.taskQueue.splice(index, 1);
        task = res[0];
      }
    }
    if (task) {
      task.status = TaskStatus.POST;
      this.taskRunningQueue.push(task);
      return task;
    }

  }

  unshiftTask(id) {
    let task = null;
    if (!id) {
      task = this.taskRunningQueue.pop();
    } else {
      const index = this.taskRunningQueue.findIndex(i => i.id === id);
      if (index !== -1) {
        const res = this.taskRunningQueue.splice(index, 1);
        task = res[0];
      }
    }
    if (task) {
      task.status = TaskStatus.ENQUEUE;
      this.taskQueue.unshift(task);
      return task;
    }
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
  getAllTasks() {
    return [ ...this.taskRunningQueue, ...this.taskQueue ];
  }
  getPaddingTasks() {
    return this.taskQueue;
  }
  getRunningTasks() {
    return this.taskRunningQueue;
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
