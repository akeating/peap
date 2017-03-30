defmodule Domain.User do
  use Ecto.Schema

  # import Ecto
  import Ecto.Changeset
  # import Ecto.Query

  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :password_hash])
    |> validate_required([:name, :email, :password_hash])
    |> unique_constraint(:email)
  end

end
