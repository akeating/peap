#!/usr/bin/env bash

set -e
npm run test-server
npm run test-client-unit

# Let's wait for the server to start
exec 3< <(MIX_ENV=teste2e mix s &)
while read line; do
   case "$line" in
   *Running*)
      break
      ;;
   *)
      ;;
   esac
done <&3
exec 3<&-

npm run test-e2e

# Find the pid of the running server, then kill it
kill $(lsof -i:4002 | grep beam | awk '{ print $2 }')
