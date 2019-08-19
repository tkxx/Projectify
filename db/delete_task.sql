DELETE FROM persproj_tasks
WHERE id = $1;

SELECT * FROM persproj_tasks
-- JOIN persproj_projects ON persproj_tasks.proj_id = persproj_projects.id
WHERE proj_id = $2;