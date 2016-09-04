defmodule PeapDemo.Repo.Migrations.AddIndexToUserEmail do
  use Ecto.Migration

  def change do
    create index(:users, [:email])
  end
end
