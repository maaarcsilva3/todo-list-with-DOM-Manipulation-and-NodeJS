const express = require ('express');
const router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


var myArr= [];

router.post("/postTask", (request,response) => {
    try {
        var z= request.body;

        myArr.push(request.body);
       
        console.log("asdasdddd");
        localStorage.setItem("todoList",JSON.stringify(myArr));
        console.log(myArr);


        response.status(200).json({
            message: "success"
        });
    }

    catch {
        response.status(500).json({
            message: "failed"
        });
    }
})


router.delete("/deleteTask/:itemId", (request, response) => {
    try {
      const itemId = parseInt(request.params.itemId);
      myArr = myArr.filter((item) => item.id !== itemId);
      localStorage.setItem("todoList", JSON.stringify(myArr));
      console.log(myArr);
      console.log("new array contents");
      response.status(200).json({
    message: `Task with ID ${itemId} has been deleted from storage`,

        
      });
    } catch {
      response.status(500).json({
        message: "Failed to delete task from storage",
      });
    }
});

router.put("/editTask/:id", (request, response) => {
    try {
        const taskId = parseInt(request.params.id);
        const task = request.body;
  
        // find the task with the given id in myArr
        const taskToUpdate = myArr.find((task) => task.id === taskId);
  
        // update the task in myArr
        taskToUpdate.task = task.task;
        taskToUpdate.description = task.description;
        taskToUpdate.id = taskId;
  
        // update the localStorage
        localStorage.setItem("todoList", JSON.stringify(myArr));
  
        response.status(200).json({
            message: "success",
        });

    } catch {
        response.status(500).json({
            message: "failed",
        });
    }
});

module.exports = router;