defmodule PeapDemo.Endpoint do
  use Phoenix.Endpoint, otp_app: :peap_demo

  socket "/socket", PeapDemo.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: { :peap_demo, "priv/static" },
    gzip: false,
    only: ~w(favicon.ico robots.txt bundles)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_peap_demo_key",
    signing_salt: "2wS/OxI/"

  plug PeapDemo.Router
end
