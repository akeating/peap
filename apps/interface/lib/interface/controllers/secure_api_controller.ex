defmodule Interface.SecureApiController do
  use Interface.Web, :controller

  alias Interface.Data

  def whoami(conn, _params) do
    query = "{whoami { id, name, email }}"
    { :ok, result } = Data.execute(query, conn)
    json conn, result
  end
end
