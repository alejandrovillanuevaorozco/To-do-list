const btn_save = document.getElementById("btn_save_form");
btn_save.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title_form").value;
  const description = document.getElementById("description_form").value;
  const date = document.getElementById("datatime_form").value;
  const priority = document.querySelector('input[name="priority"]:checked')?.value;
  const status = document.querySelector('input[name="status"]:checked')?.value==="true";


  const newTask = {
    title,
    description,
    date,
    priority,
    status
  };

  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });

    const data = await response.json();
    console.log("Guardado:", data);
  } catch (error) {
    console.error("Error al guardar:", error);
  }
});

const todayContainer = document.getElementById("today_tasks");

async function loadTodayTasks() {
  try {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const tasksToday = tasks.filter(task => task.date.split("T")[0] === today);

    renderTasksToday(tasksToday);
  } catch (error) {
    console.error("Error cargando tareas:", error);
  }
}

function renderTasksToday(tasks) {
  todayContainer.innerHTML = "";

  if (tasks.length === 0) {
    todayContainer.innerHTML = `<p class="text-gray-500">No hay tareas para hoy</p>`;
    return;
  }

  tasks.forEach(task => {
    todayContainer.innerHTML += `
        <div class="flex flex-row items-center justify-between border border-sky-900 rounded-xl p-4 m-4 bg-white shadow">
          <div>
            <h3 class="font-bold text-lg">${task.title}</h3>
            <p class="text-sm">Date: ${task.date}</p>
          </div>   
          <div class="flex flex-row justify-between gap-2 m-2 ">  
            <p class="text-sm">Priority: ${task.priority}</p>
            <p class="text-sm">Status: ${task.status ? "status" : "Pendiente"}</p>
          </div>
          <div class="flex flex-row m-2">
            <button id="btn_see_task" value="default" class="font-serif bg-sky-950 p-3 m-2 text-white rounded hover:bg-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>  
            <button id="btn_completed_task" value="default" class="font-serif bg-sky-950 p-3 m-2 text-white rounded hover:bg-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </button>  
            <button id="btn_edit_task" value="default" class="font-serif bg-sky-950 p-3 m-2 text-white rounded hover:bg-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>          
            <button id="btn_delete_task" value="cancel" class="font-serif bg-sky-950 p-3 m-2 text-white rounded hover:bg-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
    `;
  });
}

loadTodayTasks();