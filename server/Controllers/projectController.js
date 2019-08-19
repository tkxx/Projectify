module.exports = {
  //GET ALL TASKS
  allTasks(req, res) {
    console.log("tasks list work?");
    const db = req.app.get("db");
    const { id } = req.params;
    db.get_all_tasks(id)
      .then(allTasks => {
        res.json(allTasks);
      })
      .catch(err => console.log(err));
  },

  //ADD NEW TASK
  addTask(req, res, next) {
    console.log(req.body);
    const db = req.app.get("db");
    const { proj_id, input, isComplete } = req.body;
    db.add_task([proj_id, input, isComplete])
      .then(addTask => {
        res.json(addTask);
      })
      .catch(err => console.log(err));
  },

  //EDIT TASK
  editTask(req, res, next) {
    console.log(req.body);
    const db = req.app.get("db");
    const { input, isComplete } = req.body;
    db.edit_task([input, isComplete])
      .then(editTask => {
        res.json(editTask);
      })
      .catch(err => console.log(err));
  },

  //DELETE TASK
  async deleteTask(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    const { task_id } = req.body;
    console.log(id);
    let tasks = await db
      .delete_task([task_id, id])
      .catch(err => console.log(err));
    console.log(tasks);
    res.send(tasks);
  }
};
