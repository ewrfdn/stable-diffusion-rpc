#!/bin/bash
$tag = $args[0]
if ([string]::IsNullOrEmpty($tag)) {
  Write-Host "please input the tag"
  exit 1
}


Write-Output "build docker image with tag: sd/control_center:$tag"

if (!(Test-Path -path .\build -PathType Container)) {
  New-Item -ItemType Directory -Path .\build
}

docker build --no-cache -t sd/control_center:$tag .
docker tag sd/control_center:$tag
docker save -o ./build/sd_control_center-$tag.tgz sd/control_center:$tag
 