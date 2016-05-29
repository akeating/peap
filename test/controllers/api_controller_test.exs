defmodule PeapDemo.ApiControllerTest do
  use PeapDemo.ConnCase
  alias PeapDemo.Fixtures

  test "POST /api/token fails", %{conn: conn} do
    user = Fixtures.with_user("Demo User 1", "demo1@example.com", "foo")
    result = conn
    |> put_req_header("content-type", "application/json")
    |> put_req_header("accept", "application/json")
    |> post("/api/token", %{email: user.email, password: "not valid"})
    |> json_response(401)
    assert result == %{ "error" => "Unauthorized" }
  end

  test "POST /api/token successful", %{conn: conn} do
    _user = Fixtures.with_user("Demo User 2", "demo2@example.com", "foo")
    result = conn
    |> put_req_header("content-type", "application/json")
    |> put_req_header("accept", "application/json")
    |> post("/api/token", %{email: "demo2@example.com", password: "foo"})
    |> json_response(200)
    %{ "token" => token } = result
    assert token != nil
  end

end
