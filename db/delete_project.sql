DELETE FROM persproj_tasks
WHERE proj_id = $1;

DELETE FROM persproj_projects
WHERE id = $1
returning *