
# PEAP - Phoenix Elixir Angular Postgres
A proof-of-concept implementation of phoenix with angular2, webpack, graphql, jwt,
typescript, scss, postgres, and a few other things.

Following the spirit of "phoenix is not your application", the original poc was refactored
into an umbrella structure with two applications; interface and domain.

Requires `elixir`, `node` and `postgres`, e.g.
```
brew install elixir
brew install n
brew install postgres
```

Optionally use `yarn` for node package management.

To get setup
```
postgres -D /usr/local/var/postgres/
npm install
```

Start
```
mix phoenix.server
```

The seed user is `demo@example.com` and password is `foo`.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Review the configs in `/config`, including `secret_key_base` in `config.exs`.

Run the tests
```
npm test
```

Notes about the interface app
-----------------------------

* phoenixframework
* webpack with watcher
* managed static assets with watcher
* a common module and app module
* global and encapsulated styles
* `priv/static` is deleted before each build

Static assets are in `web/static`. These are copied over to `priv/static` and changes are watched.

Put everything related to webpack in `web/modules`. The webpack bundles are placed in `priv/static/bundles`.

WARNING: all files in `priv/static` are deleted with each build. Place everything you need copied into `web/static`.
