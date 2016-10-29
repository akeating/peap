defmodule Interface.Fixtures do

  alias Domain.Repo
  alias Domain.User
  alias Comeonin.Bcrypt

  def with_user(name, email, password) do
    Repo.insert!(%User{
      name: name,
      email: email,
      password_hash: hash(password)
    })
  end

  def hash(val) do
    Bcrypt.hashpwsalt(val)
  end

  def token_for(user) do
    { :ok, jwt, _full_claims } = Guardian.encode_and_sign(user, :token)
    jwt
  end
end
