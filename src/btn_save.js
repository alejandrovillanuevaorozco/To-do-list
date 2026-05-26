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