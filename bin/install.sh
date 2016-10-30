#!/usr/bin/env bash

set -e
DIR=$(pwd -P)
cd "$DIR/apps/domain"
mix deps.get && mix compile
cd "$DIR/apps/interface"
mix deps.get && mix compile
npm install
