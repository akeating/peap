defmodule PeapDemo.SecureApiController do
  use PeapDemo.Web, :controller

  alias PeapDemo.Data

  def whoami(conn, _params) do
    query = "{whoami { id, name, email }}"
    { :ok, result } = Data.executeForConn(conn, query)
    json conn, result
  end
end
