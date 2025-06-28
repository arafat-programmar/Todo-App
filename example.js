// LocalStorage থেকে টাস্কগুলো লোড করে UI-তে দেখানোর ফাংশন
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // আগে যেগুলো ছিল সব ক্লিয়ার

  tasks.forEach(task => {
    createTaskElement(task.text, task.done);
  });
}

// টাস্ক লিস্টে এলিমেন্ট তৈরি করার ফাংশন (যেখানে done আছে কিনা সেটাও দেওয়া যায়)
function createTaskElement(taskText, done = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (done) li.classList.add('done');

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    li.classList.toggle("done");
    saveTasks(); // ক্লিকের সময় সেভ করো
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks(); // ডিলিটের সময় সেভ করো
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  document.getElementById("taskList").appendChild(li);
}

// টাস্ক অ্যাড করার ফাংশন
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);

  saveTasks(); // নতুন টাস্ক যোগ করার পরে সেভ করো
  taskInput.value = "";
}

// LocalStorage-এ টাস্কগুলো সেভ করার ফাংশন
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,  // টাস্কের লেখা
      done: li.classList.contains('done') // কমপ্লিট হয়েছে কিনা
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// পেজ লোড হওয়ার সময় টাস্কগুলো লোড করো
window.onload = loadTasks;
