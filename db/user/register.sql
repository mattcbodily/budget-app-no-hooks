insert into budget_users (
    email,
    password
) values (
    $1,
    $2,
)
returning *;