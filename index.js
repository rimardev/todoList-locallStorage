const input = document.getElementById('entradaTarea');
const boton = document.getElementById('btnAgregar');
const tabla = document.getElementById('tabla');

//trae el Array del local storage || o crea uno vacio
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];

renderizarTareas();

function renderizarTareas() {
  let html = "";
  for(let item of arrayTareas){
    html += `<tr>
      <td>${item.tarea}</td>
      <td>${item.estado}</td>
      <td>
        <button>X</button>
      </td>
    </tr>`    
  };
  tabla.innerHTML = html;  
};




function agregarTarea(dataTarea) {
  let data = {
    tarea: dataTarea,
    estado: false
  };
  arrayTareas.push(data);
  console.log(arrayTareas);

  //almacena Array en local storage
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));
  renderizarTareas();
  input.value = "";
};

boton.addEventListener('click', () => {
  agregarTarea(input.value);

});