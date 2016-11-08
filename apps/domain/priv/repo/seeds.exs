# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Interface.Repo.insert!(%Interface.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Domain.Repo
alias Domain.User

Repo.insert!(%User{
  name: "Demo User",
  email: "demo@example.com",
  password_hash: "$2b$12$hnuEjNt8FpFOK92oBlOwJ.gzG2JxaXX3Ae.MZeCj6GDpURmoFbmf6"
})
