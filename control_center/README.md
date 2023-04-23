# control_center

## api 与任务调度中心

## QuickStart

node 要求16以上
### Development
推荐使用yarn
```bash
$ yarn
$ yarn dev
$ open http://localhost:31106/
```
config 文件在app 同级的config 目录下，区分了local 还是prod 详细配置可以参照egg.js 官网 https://www.eggjs.org/zh-CN/intro/quickstart

### Deploy

```bash
$ yarn start
$ yarn stop
```





### docker build 生成镜像部署 (前提是你机器得装docker)

1. windows 下 跑build_save.ps1 tag(tag 镜像的tag)
   mac/ linux build_save.sh tag
2. docker load -i ./build/sd_control_center-youTag.tgz
3. docker-compose up -d (默认的docker-compose.yml 的tag 是dev 如果你要生了别的tag 请别忘了改镜像名称 )

