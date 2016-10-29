defmodule Interface.Data.Api do

  def whoami(%{ user: _user1 }, _input, %{ root_value: %{ user: user2 }}) do
    user2
  end

  def increment_counter(_source, %{ by: by }, _context) do
    IO.puts "increment_counter by: #{by}"
    current_value = Domain.Counter.increment(by)
    if (by != 0), do: Interface.Endpoint.broadcast "rooms:lobby", "current_count", %{body: current_value}
    %{ current_value: current_value }
  end

end
