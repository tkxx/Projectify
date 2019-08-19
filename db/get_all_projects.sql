-- SELECT * FROM persproj_projects
-- JOIN persproj_users ON persproj_projects.user_id = persproj_users.id
-- WHERE user_id = $1

SELECT persproj_projects.id, persproj_projects.title, persproj_projects.bool, persproj_projects.description FROM persproj_projects
JOIN persproj_users ON persproj_projects.user_id = persproj_users.id
WHERE user_id = $1

