#!/usr/bin/env bash
set -e
node_modules/.bin/webpack --config webpack-test.config.js
BLUEBIRD_WARNINGS=0 node_modules/.bin/karma start --single-run
