defmodule Interface.UserSocket do
  use Phoenix.Socket

  channel "rooms:*", Interface.RoomChannel

  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      { :ok, claims } ->
        case Guardian.serializer.from_token(claims["sub"]) do
          { :ok, user } -> {:ok, assign(socket, :user_id, user.id)}
          { :error, _reason } -> :error
        end
      { :error, _reason } -> :error
    end
  end

  def connect(_, _socket), do: :error

  def id(socket), do: "users_socket:#{socket.assigns.user_id}"
end
