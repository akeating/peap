defmodule PeapDemo.PageControllerTest do
  use PeapDemo.ConnCase

  # Any url returns the SPA
  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello PeapDemo!"
  end

  # Any url returns the SPA
  test "GET /login", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello PeapDemo!"
  end

  # Any url returns the SPA
  test "GET /meaningless_url", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello PeapDemo!"
  end
end
