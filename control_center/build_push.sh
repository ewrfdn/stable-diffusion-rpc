#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: tinystar/mt_poster:$tag"

docker build --no-cache -t tinystar/mt_poster:$tag .
docker tag tinystar/mt_poster:$tag swr.cn-north-4.myhuaweicloud.com/meinenghua/tinystar/mt_poster:$tag
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/tinystar/mt_poster:$tag
