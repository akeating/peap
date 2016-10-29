defmodule Domain.User do
  use Ecto.Schema

  # import Ecto
  import Ecto.Changeset
  # import Ecto.Query

  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    timestamps
  end

  @required_fields ~w(name email password_hash)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
