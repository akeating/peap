#!/usr/bin/env bash
set -e
npm run test-server
npm run test-client-unit
npm run test-e2e
