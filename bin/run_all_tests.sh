#!/usr/bin/env bash
function server_pid {
  echo $(lsof -i:4002 | grep beam | awk '{ print $2 }')
}

set -e
npm run test-server
npm run test-client-unit

# Recovering from an arror; is there a server running?
if [ -n $(server_pid) ]; then
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
fi

npm run test-e2e

kill $(server_pid)
