#!/usr/bin/env bash

set -e
DIR=$(pwd -P)
mix deps.get && mix compile

(cd "$DIR/apps/domain"
mix ecto.reset)

(cd "$DIR/apps/interface"
npm install
node_modules/protractor/bin/webdriver-manager update)
