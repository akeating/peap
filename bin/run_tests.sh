#!/usr/bin/env bash

set -e

DIR=$(pwd -P)
MIX_ENV=test
cd "$DIR/apps/domain"
mix test
cd "$DIR/apps/interface"
npm test
cd "$DIR"
bin/run_e2e_tests.sh
