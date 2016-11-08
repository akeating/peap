#!/usr/bin/env bash

set -e
DIR=$(pwd -P)
mix deps.get && mix compile
cd "$DIR/apps/interface"
npm install
node_modules/protractor/bin/webdriver-manager update
