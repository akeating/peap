defmodule Domain.Mixfile do
  use Mix.Project

  def project do
    [app: :domain,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger, :ecto, :postgrex],
     mod: {Domain, []}]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:myapp, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:ecto, "~> 2.0.0"},
      {:postgrex, ">= 0.0.0"}
    ]
  end

  defp aliases do
    seeds = __DIR__ <> "/priv/repo/seeds.exs"
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run " <> seeds],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.reset --quiet", "ecto.migrate", "test"],
     "s": ["phoenix.server"]]
  end

end
