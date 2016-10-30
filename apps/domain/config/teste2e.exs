use Mix.Config

config :logger, :console, format: "[$level] $message\n"

config :domain, Domain.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "domain_test_e2e",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
