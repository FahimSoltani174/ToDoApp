// add task
// remove task
// eidt task
// delete selected tasks
// switch to light and dark


// ✎ ✅ 📅 🗑 ✓ 🌙 ☀️
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const deleteSelectedButton = document.getElementById("deleteSelectedButton");
const themeButton = document.getElementById("themeButton");
const toastContainer = document.getElementById("toastContainer");


// console.log(taskInput);
// console.log(addButton);
// console.log(taskList);
// console.log(deleteSelectedButton);
// console.log(themeButton);
// console.log(toastContainer);

// Task that is being edited
let editingTask = null;

// Step 1: add event the button
addButton.addEventListener('click' , addOrUpdateTast);

// Step 2: add task with Enter
taskInput.addEventListener("keydown",  e =>{
    if(e.key === "Enter"){
        addOrUpdateTast();
    }
})

//Step 3: add or update funciton
function addOrUpdateTast(){
    const text = taskInput.value.trim();

    // Step 4: check if it is empy
    if(text === ""){
        alert("Please enter a task.");
        return;
    }
    

    // Update Task
    if(editingTask !== null){
        const title = editingTask.querySelector(".task-title");
        title.textContent = text;

        editingTask = null;

        addButton.textContent = " + Add Task";

        showToast("✅ Task updated successfully" , "success");

    } else {
        //adding task
        createTask(text);

        showToast("✅ Task added successfully" , "success");
    }

    // clear task
    taskInput.value = '';
    
}

// Step 5: create task
function createTask(text){

    // Main task
    const task = document.createElement("div");
    task.className = "task";

    // checkbox
    const chekcbox = document.createElement("input");
    chekcbox.type = "checkbox";
    chekcbox.className = "task checkbox";


    // task info
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";


    // Task title
    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = text;

    // Date
    const date = document.createElement("div");

    date.className = "task-date";
    date.textContent = "📅 Today"

    // add title and date
    taskInfo.appendChild(title);
    taskInfo.appendChild(date);


    // Buttons
    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    // edit button
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "✎";



    // delete button
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";
    deleteButton.textContent = "🗑";


    // add buttons to the button div
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    // add everything to task
    task.appendChild(chekcbox)
    task.appendChild(taskInfo)
    task.appendChild(buttons)

    // add task to page
    taskList.appendChild(task);



    // CheckBox
    chekcbox.addEventListener("change" ,()=>{
        
        if(chekcbox.checked){
            task.classList.add("selected");
        } else {
            task.classList.remove("selected")
        }
        

        updateDeleteButton();
    });


    // delete single task
    deleteButton.addEventListener("click" , e =>{
        e.target.parentElement.parentElement.remove();
        updateDeleteButton();
        showToast("🗑 Task deleted successfully" , "info");
        
    })

    // Edit task
    editButton.addEventListener("click" , () =>{
        // put task text inside input
        taskInput.value = title.textContent;

        // Save this task
        editingTask = task;


        // change button text
        addButton.textContent = "✓ Update Task"

        // Focus input
        taskInput.focus();
    })


}


 




// add event for multi delete
deleteSelectedButton.addEventListener("click" , deleteSelectedTask);

// delete function
function deleteSelectedTask(){
    const selectedTasks = document.querySelectorAll(".selected");

    const count = selectedTasks.length;

    // delete sected tasks
    selectedTasks.forEach(task =>{
        task.remove();
    })

    updateDeleteButton();

    if(count > 0){
        showToast("🗑 " + count + " tasks deleted" , "info")
    }

}


// Update delete button function
function updateDeleteButton(){
    const selectedTasks =  document.querySelectorAll(".selected");

    if(selectedTasks.length > 0){
        deleteSelectedButton.style.display = "block";
    } else {
        deleteSelectedButton.style.display = "none";
    }
}

// Dark mode light mode

themeButton.addEventListener("click" , ()=>{
    document.body.classList.toggle("dark");

     

    if(document.body.classList.contains("dark")){
        themeButton.textContent = "🌙";
    } else {
        themeButton.textContent = "☀️";
    }
})


// show toast
function showToast(message, type){
    const toast = document.createElement("div");

    toast.className = " toast " + (type || "info");

    toast.textContent = message;
    toastContainer.appendChild(toast);

    // show toast
    toast.classList.add("show");

    // remve after 3 second

    setTimeout(()=>{
        toast.remove();
    } , 3000);
}
