#!/usr/bin/env bash
function server_pid {
  echo $(lsof -i:4002 | grep beam | awk '{ print $2 }')
}
function start_server {
  echo "Starting server..."
  # Is there a server already running?
  if [ -z $(server_pid) ]; then
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
  fi
}
function stop_server {
  trap - TERM ERR EXIT
  echo "Stopping server..."
  PID=$(server_pid)
  if [ -z PID ]; then
    kill "$PID"
  fi
}

set -e
trap stop_server TERM ERR EXIT
export MIX_ENV=teste2e
echo "Recreating database..."
node_modules/.bin/webpack --config webpack-test-e2e.config.js
mix ecto.drop --quiet
mix ecto.create --quiet
mix ecto.migrate --quiet
mix run priv/repo/seeds.exs > /dev/null # potentially seeds-e2e.exs
start_server
node_modules/protractor/bin/webdriver-manager update
node_modules/.bin/protractor
