defmodule PeapDemo.Mixfile do
  use Mix.Project

  def project do
    [app: :peap_demo,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {PeapDemo, []},
     applications: [:phoenix, :phoenix_html, :cowboy, :logger, :gettext,
      :phoenix_ecto, :postgrex, :comeonin, :plug_graphql, :phoenix_pubsub]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(:teste2e), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.2"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_ecto, "~> 3.0"},
     {:phoenix_html, "~> 2.4"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:postgrex, ">= 0.0.0"},
     {:gettext, "~> 0.9"},
     {:cowboy, "~> 1.0"},
     {:joken, "~> 1.2.1"},
     {:guardian, "~> 0.12.0"},
     {:comeonin, "~> 2.4"},
     {:plug_graphql, "~> 0.2"},
     {:exrm, "~> 1.0"}]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"],
     "s": ["phoenix.server"]]
  end
end
