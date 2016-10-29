use Mix.Config

config :logger, :console, format: "[$level] $message\n"

config :domain, Interface.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "interface_test_e2e",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
