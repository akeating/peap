defmodule Interface.Router do
  use Interface.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :secure_api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.EnsureAuthenticated
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Interface do
    pipe_through :api
    post "/token", ApiController, :create_token
    get "/send_message", ApiController, :send_broadcast
  end

  scope "/api", Interface do
    pipe_through :secure_api

    get "/whoami", SecureApiController, :whoami
  end

  scope "/api" do
    pipe_through :secure_api

    forward "/graphql", GraphQL.Plug.Endpoint,
      schema: {Interface.Data, :schema},
      root_value: {Interface.Data, :root_value}
  end

  scope "/", Interface do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
