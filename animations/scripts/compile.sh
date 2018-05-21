#!/bin/bash
docker run --rm -it -v "$(cd ..; pwd):/app" --entrypoint=/bin/sh \
alexsimons/node:9.2.0 -c "cd animations; npm run compile"