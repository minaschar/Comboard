const express = require("express");
const tasksController = require("../controllers/tasksController.js");
const authentication = require("../middleware/authentication.js");

const router = express.Router();

router.post("/api/taskboard", authentication, tasksController.createTaskBoard);

router.get("/api/taskboards", authentication, tasksController.getTaskBoards);

router.get("/api/tasks/dates", authentication, tasksController.getTasksWithDate);

router.get("/api/taskboard", authentication, tasksController.getTaskBoard);

router.put("/api/task/add", authentication, tasksController.addTask);

router.put("/api/tasklist/move", authentication, tasksController.moveTaskList);

router.put("/api/task/move/currlist", authentication, tasksController.moveTaskBetweenCurrList);

router.put("/api/move/task", authentication, tasksController.moveTaskToOtherList);

router.put("/api/tasklist", authentication, tasksController.addTaskList);

router.put("/api/task/update", authentication, tasksController.updateTask);

router.put("/api/taskboard/rename", authentication, tasksController.renameTaskBoard);

router.put("/api/tasklist/rename", authentication, tasksController.renameTaskList);

router.delete("/api/taskboard/delete", authentication, tasksController.deleteTaskBoard);

router.delete("/api/tasklist/delete", authentication, tasksController.deleteTaskList);

router.delete("/api/task/delete", authentication, tasksController.deleteTask);

module.exports = router;
