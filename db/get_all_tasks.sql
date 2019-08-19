SELECT * FROM persproj_tasks
WHERE proj_id = $1;


-- SELECT * FROM persproj_tasks
-- JOIN persproj_projects ON persproj_tasks.proj_id = persproj_projects.id
-- WHERE proj_id = $1 

-- SELECT persproj_projects.id, persproj_projects.title, persproj_projects.bool FROM persproj_projects
-- JOIN persproj_users ON persproj_projects.user_id = persproj_users.id
-- WHERE user_id = $1
