INSERT INTO persproj_tasks (
    proj_id, task, bool
    )

    VALUES (
        $1, $2, $3
        );
        SELECT * FROM persproj_tasks WHERE proj_id = $1