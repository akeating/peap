#!/usr/bin/env bash

set -eux -o pipefail
npm run test-server
npm run test-client-unit
npm run test-e2e
