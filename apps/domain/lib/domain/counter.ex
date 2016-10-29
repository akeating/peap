defmodule Domain.Counter do
  use GenServer

  ## Client Callbacks

  def start_link do
    GenServer.start_link(__MODULE__, :ok, [name: :sup_counter])
  end

  def increment(by) do
    GenServer.call(:sup_counter, {:increment, by})
  end

  ## Server Callbacks

  def init(:ok) do
    {:ok, 0}
  end

  # request, _from pid, state
  def handle_call({:increment, by}, _from, counter) do
    newCounter = counter + by

    # {:reply, reply, new_state}
    {:reply, newCounter, newCounter}
  end

end
