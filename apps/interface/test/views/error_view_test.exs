defmodule Interface.ErrorViewTest do
  use Interface.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 401.json" do
    assert render(Interface.ErrorView, "401.json", []) ==
           %{errors: %{message: "Requires Authentication"}}
  end

  test "render 404.json" do
    assert render(Interface.ErrorView, "404.json", []) ==
           %{errors: %{message: "Not Found"}}
  end

  test "render 500.json" do
    assert render(Interface.ErrorView, "500.json", []) ==
           %{errors: %{message: "Server Error"}}
  end

  test "render any other" do
    assert render(Interface.ErrorView, "505.json", []) ==
           %{errors: %{message: "Server Error"}}
  end
end
