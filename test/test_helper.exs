ExUnit.start

Mix.Task.run "ecto.create", ~w(-r PeapDemo.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r PeapDemo.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(PeapDemo.Repo)

