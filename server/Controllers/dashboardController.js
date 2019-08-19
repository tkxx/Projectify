module.exports = {
  //GET ALL PROJECTS
  allProjects(req, res, next) {
    console.log("hitting?");
    const db = req.app.get("db");
    // const { id } = req.params;
    console.log(req.session.user);
    db.get_all_projects(req.session.user.id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => console.log(err));
  },

  //POST NEW PROJECT
  newProject(req, res, next) {
    const db = req.app.get("db");
    const { user_id, title, isComplete, description } = req.body;
    db.add_project(user_id, title, isComplete, description)
      .then(response => {
        res.json(response);
      })
      .catch(err => console.log(err));
  },

  //GET INDIVIDUAL PROJECT
  oneProject(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db.get_one_project(id)
      .then(response => res.status(200).json(response))
      .catch(err => console.log(err));
  },

  //DELETE ENTIRE PROJECT
  async deleteProject(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log(req.params);
    await db.delete_all_tasks([id]).catch(err => {
      console.log(err);
    });
    await db.delete_project([id]).catch(err => console.log(err));
    let projects = await db
      .get_all_projects(req.session.user.id)
      .catch(err => console.log(err));
    res.status(200).json(projects);
  },

  //EDIT PROJECT
  editProject(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    const { title, isComplete, description } = req.body;
    db.edit_project_status(id, title, isComplete, description).catch(err =>
      console.log(err)
    );
    res.sendStatus(200);
  }
};
