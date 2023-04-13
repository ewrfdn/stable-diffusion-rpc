#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: sd/control_center:$tag"

mkdir build

docker build --no-cache -t sd/control_center:$tag .
docker tag sd/control_center:$tag
docker save -o ./build/sd_control_center-$tag.tgz sd/control_center:$tag
