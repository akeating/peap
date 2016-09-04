defmodule PeapDemo.SecureApiController do
  use PeapDemo.Web, :controller

  alias PeapDemo.Data

  def whoami(conn, _params) do
    query = "{whoami { id, name, email }}"
    { :ok, result } = Data.execute(query, conn)
    json conn, result
  end
end
