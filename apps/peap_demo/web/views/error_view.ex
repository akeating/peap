defmodule PeapDemo.ErrorView do
  use PeapDemo.Web, :view

  def render("401.json", _assigns) do
    %{errors: %{message: "Requires Authentication"}}
  end

  def render("404.json", _assigns) do
    %{errors: %{message: "Not Found"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{message: "Server Error"}}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.json", assigns
  end
end
