const btnAddTask = document.getElementById("add_task");
const taskModal = document.getElementById("task_modal");

btnAddTask.addEventListener("click", () => {
  taskModal.showModal();
});