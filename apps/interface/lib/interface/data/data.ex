defmodule Interface.Data do

  alias Interface.Data.Api
  alias Domain.User

  def schema do
    %GraphQL.Schema{
      query: %GraphQL.Type.ObjectType{
        name: "RootQueryType",
        fields: %{
          whoami: %{
            description: "Who am I?",
            args: %{},
            resolve: {Api, :whoami},
            type: %GraphQL.Type.ObjectType{
              name: "User",
              description: "A User",
              fields: %{
                id: %{type: %GraphQL.Type.Int{}},
                name: %{type: %GraphQL.Type.String{}},
                email: %{type: %GraphQL.Type.String{}}
              }
            }
          }
        }
      },
      mutation: %GraphQL.Type.ObjectType{
        name: "Mutation",
        fields: %{
          increment: %{
            description: "Increment the counter",
            args: %{ by: %{ type: %GraphQL.Type.Int{} }},
            resolve: {Api, :increment_counter},
            type: %GraphQL.Type.ObjectType{
              name: "NumberHolder",
              fields: %{
                current_value: %{type: %GraphQL.Type.Int{}}
              }
            }
          }
        }
      }
    }
  end

  def root_value(conn = %Plug.Conn{}) do
    user = Guardian.Plug.current_resource(conn)
    root_value(user)
  end

  def root_value(user = %User{}) do
    %{ user: user }
  end

  def execute(query, conn = %Plug.Conn{}) do
    execute(query, root_value(conn))
  end

  def execute(query, user = %User{}) do
    execute(query, root_value(user))
  end

  def execute(query, root_value) do
    GraphQL.execute(
      schema,
      query,
      root_value
    )
  end
end
