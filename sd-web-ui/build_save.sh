#!/bin/bash

tag=$1
if [ -z $tag ]; then
  echo "please input the tag"
  exit 1
fi

echo "build docker image with tag: sd/ui:$tag"
yarn build
mkdir build

docker build --no-cache -t sd/ui:$tag .
docker tag sd/ui:$tag
docker save -o ./build/sd_ui-$tag.tgz sd/ui:$tag
