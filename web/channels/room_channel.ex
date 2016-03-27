defmodule PeapDemo.RoomChannel do
  use Phoenix.Channel
  alias PeapDemo.User
  alias PeapDemo.Repo
  alias PeapDemo.Data

  def join("rooms:lobby", _message, socket) do
    IO.puts "User##{socket.assigns.user_id} joined rooms:lobby"
    { :ok, socket }
  end

  def join("rooms:" <> _private_room_id, _params, _socket) do
    { :error, %{ reason: "unauthorized" }}
  end

  def handle_in("graphql", %{"body" => %{"query" => query }}, socket) do
    user = Repo.get(User, socket.assigns.user_id)
    { :ok, result } = Data.executeForUser(query, user)
    { :reply, { :ok, %{ body: result }}, socket }
  end

  def handle_out(name, payload, socket) do
    push socket, name, payload
    {:noreply, socket}
  end
end
