defmodule PeapDemo.Data do

  alias PeapDemo.Data.Api

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

  def root_value_from_conn(conn) do
    root_value_from_user(Guardian.Plug.current_resource(conn))
  end

  def root_value_from_user(user) do
    %{ user: user }
  end

  def executeForConn(conn, query) do
    execute(query, root_value_from_conn(conn))
  end

  def executeForUser(query, user) do
    execute(query, root_value_from_user(user))
  end

  def execute(query, root_value) do
    GraphQL.execute(
      schema,
      query,
      root_value
    )
  end
end
