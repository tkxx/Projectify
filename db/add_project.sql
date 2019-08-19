INSERT INTO persproj_projects (
    user_id, title, bool, description
    )

    VALUES (
        $1, $2, $3, $4
    )
   returning *