#!/bin/bash
docker run --rm -v "$(pwd):/app" alexsimons/nodebuild run compile
