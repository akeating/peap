#!/usr/bin/env bash
function server_pid {
  echo $(lsof -i:4002 | grep beam | awk '{ print $2 }')
}
function start_server {
  echo "Starting server..."

  # Let's wait for the server to start
  exec 3< <(mix s &)
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
}
function stop_server {
  trap - TERM ERR EXIT
  PID=$(server_pid)
  echo "Server PID=$PID"
  if [ -n $PID ]; then
    echo "Stopping server..."
    kill $PID
  fi
}

set -e
trap stop_server TERM ERR EXIT
export MIX_ENV=teste2e
echo "Recreating database..."
node_modules/.bin/webpack --config webpack-test-e2e.config.js
mix ecto.drop
mix ecto.create
mix ecto.migrate --quiet
mix run priv/repo/seeds.exs > /dev/null # potentially seeds-e2e.exs
start_server
node_modules/protractor/bin/webdriver-manager update
node_modules/.bin/protractor
