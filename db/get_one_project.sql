-- SELECT * FROM persproj_projects
-- JOIN persproj_users ON persproj_users.id = persproj_projects.user_id
-- WHERE persproj_projects.id = $1

SELECT * FROM persproj_projects
WHERE id = $1
