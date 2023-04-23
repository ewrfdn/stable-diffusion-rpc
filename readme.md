# stable diffusion rpc(让你没有gpu 服务器也可以将stable diffusion 部署到公网)
这个项目主要目的是让降低stable diffusion 的部署成本，可以让任意一台计算机成为stable diffusion 的计算节点，部署在公网的服务器只负责任务分发，降低部署的成本，也可以让更多的人接触到ai 绘画
在线demo 地址 http://123.60.53.33/ （连接的是我的本地计算机，可能不一定时刻在线），

## 项目目录
* client/ 客户端程序 负责执行中控下发的是ai 绘画任务，执行完成后将执行结果发送给中控
* conterol_center ai 绘画后端api, 任务的控制中心，负责将任务分发给每个客户端，并接收返回的结果
* sd-web-ui 一个简易的ai 绘画的ui 后端连接control center
  
## 项目愿景
这个项目还在初步阶段，也希望更多的人可以加入这个项目
1. 这个项目一是希望 让stable diffusion 有个更好用的的ui，降低使用成本 
2. 让更多人可以分享自己的算力，可以让更多的人接触ai 绘画
   
   