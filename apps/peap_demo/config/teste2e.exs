use Mix.Config

config :peap_demo, PeapDemo.Endpoint,
  http: [port: 4002]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :peap_demo, PeapDemo.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "peap_demo_test_e2e",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
