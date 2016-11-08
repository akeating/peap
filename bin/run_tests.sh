#!/usr/bin/env bash

set -e

# elixir tests (mix will test each app)
mix test

# interface karma unit tests
DIR=$(pwd -P)
while read line; do
  echo $line
done < <(cd "$DIR/apps/interface" && npm run test-client-unit)

# interface protractor e2e tests
./bin/run_e2e_tests.sh
