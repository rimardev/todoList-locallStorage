const input = document.getElementById('entradaTarea');

const tabla = document.getElementById('tabla');

let id = 0;

//trae el Array del local storage || o crea uno vacio
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];

function almacenarTareas(arrayTareas) {
   localStorage.setItem('tareas', JSON.stringify(arrayTareas));  
};

function renderizarTareas() {
  let html = "";
  for(let item of arrayTareas){
    html += `
    <tr>
      <td>${item.tarea}</td>
      <td>${item.estado}</td>
      <td>
        <button id="${item.id}" class="btnBorrar">X</button>
      </td>
    </tr>`    
  };
  tabla.innerHTML = html;
  
  input.value = "";  
};

function agregarTarea(dataTarea) {

  if(arrayTareas.length == 0){
  id = 1;
  } else {
  id = arrayTareas[0].id + 1;
  }
  //console.log(id)

  let data = {
    id: id,
    tarea: dataTarea,
    estado: false
  };
  arrayTareas.unshift(data);
  //console.log(arrayTareas);
  almacenarTareas(arrayTareas)
  renderizarTareas();
};

function eliminarTarea(id) {
  console.log("borrar " + id);  
}

function cambiarEstado(params) {
  
}

renderizarTareas();

//Esperando acciones *******************************
const btnAdd = document.getElementById('btnAgregar');
btnAdd.addEventListener('click', () => {
  agregarTarea(input.value);
});

const borrar = document.querySelectorAll('.btnBorrar');
borrar.forEach(boton => {
  boton.addEventListener('click', () => {
    //eliminarTarea(boton.id);
    console.log("borrar " + boton.id);
  });
});
