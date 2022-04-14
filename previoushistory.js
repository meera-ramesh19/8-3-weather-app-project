

// On app load, get all tasks from localStorage
currentList.querySelectorAll('*').forEach(node => {node.remove()});
dailyForecast.querySelectorAll('*').forEach(node => {node.remove()});

// /'<li class="tagBlocks"><a href="#" rel="' + value + '">' + key + '</a></li>'
https://stackoverflow.com/questions/2566249/getting-value-from-key-pair-value-into-appended-property-using-jquery

const loadTasks = () => {
  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${city}</a>
          <i class="fa fa-trash" onclick="removelink(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}
function addTask() {
   
    const list = document.querySelector("ul");
    // return if task is empty
    
    // check is task already exist
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // task already exist
    tasks.forEach(todo => {
      if (todo.task === task.value) {
        alert("Task already exist!");
        task.value = "";
        return;
      }
    });
  
    // add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
  
    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
        <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    // clear input
    task.value = "";
  }





function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem(&quot;tasks&quot;)));
    tasks.forEach(task =&gt; {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem(&quot;tasks&quot;, JSON.stringify(tasks));
    event.parentElement.remove();
  }