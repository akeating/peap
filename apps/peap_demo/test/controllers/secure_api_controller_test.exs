defmodule PeapDemo.SecureApiControllerTest do
  use PeapDemo.ConnCase
  alias PeapDemo.Fixtures

  test "GET /api/whoami without token", %{conn: conn} do
    result = conn
    |> put_req_header("content-type", "application/json")
    |> put_req_header("accept", "application/json")
    |> get("/api/whoami")
    |> json_response(401)
    assert result == %{ "errors" => ["Unauthenticated"] }
  end

  test "GET /api/whoami with token", %{conn: conn} do
    user = Fixtures.with_user("Demo User 2", "demo2@example.com", "foo")
    token = Fixtures.token_for(user)
    result = conn
    |> put_req_header("content-type", "application/json")
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", "Bearer #{token}")
    |> get("/api/whoami")
    |> json_response(200)
    assert result == %{ "data" => %{"whoami" => %{ "id" => user.id, "name" => user.name, "email" => user.email }}}
  end

end
