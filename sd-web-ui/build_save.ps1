#!/bin/bash
$tag = $args[0]
if ([string]::IsNullOrEmpty($tag)) {
  Write-Host "please input the tag"
  exit 1
}

yarn build

Write-Output "build docker image with tag: sd/ui:$tag"

if (!(Test-Path -path .\build -PathType Container)) {
  New-Item -ItemType Directory -Path .\build
}

docker build --no-cache -t sd/ui:$tag .
docker tag sd/ui:$tag
docker save -o ./build/sd_ui-$tag.tgz sd/ui:$tag
 