#!/usr/bin/env bash

set -e

DIR=$(pwd -P)
cd "$DIR/apps/domain"
mix ecto.setup
