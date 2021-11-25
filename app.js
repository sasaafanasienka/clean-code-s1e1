//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".new-task__input"); //Add a new task.
const addButton = document.querySelector(".new-task__btn"); //first button
const incompleteTaskHolder = document.querySelector(".incompleted"); //ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".completed"); //completed-tasks

//New task list item
const createNewTaskElement = function(taskString) {

  const task = document.createElement("li");
  task.classList.add("task");

  //input (checkbox)
  const checkBox = document.createElement("input");
  checkBox.classList.add("task__checkbox");
  checkBox.type = "checkbox";
  //label
  const label = document.createElement("label");
  label.classList.add("task__label");
  label.textContent = taskString;
  //input (text)
  const editInput = document.createElement("input");
  editInput.classList.add("task__input");
  editInput.type = "text";
  //button.edit
  const editButton = document.createElement("button");
  editButton.className = "task__edit-btn";
  editButton.textContent = "Edit";
  //button.delete
  const deleteButton = document.createElement("button");
  deleteButton.className = "task__delete-btn";
  //button.delete.icon
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.className = "task__delete-icon";
  deleteButtonImg.src="./remove.svg";

  deleteButton.append(deleteButtonImg);

  task.append(checkBox, label, editInput, editButton, deleteButton);

  return task;
}

const addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".task__edit-btn");
  const containsClass = listItem.classList.contains(".task_edit");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.textContent = editInput.value;
    editBtn.textContent = "Edit";
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("task_edit");
};


//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
//select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__edit-btn");
  const deleteButton = taskListItem.querySelector(".task__delete-btn");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.