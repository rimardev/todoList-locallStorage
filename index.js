const input = document.getElementById('entradaTarea');
const tabla = document.getElementById('tabla');
let borrar = document.querySelectorAll('.btnBorrar');
let id = 0;

//trae el Array del local storage || o crea uno vacio
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];

function almacenarTareas(arrayTareas) {
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));
  renderizarTareas();   
};

function renderizarTareas() {
  let html = "";
  for(let item of arrayTareas){
    let state = "checked"
    html += `
    <tr>
      <td class="tarea">${item.tarea}</td>
      <td class="estado">
        <input type="checkbox" class="checkbox" ${state}>         
      </td>
      <td>
        <button id="${item.id}" class="btnBorrar">x</button>
      </td>
    </tr>`    
  };
  tabla.innerHTML = html;  
  input.value = "";  
  //asigna escuchador eventos a botones borrar renderizados  
  asignarEventosBorrar();
};

function agregarTarea(dataTarea) {
  //crea id incremental a partir del existente.
  if(arrayTareas.length == 0){
  id = 1;
  } else {
  id = arrayTareas[0].id + 1;
  }
  //crea Objeto tarea para guardar.
  let data = {
    id: id,
    tarea: dataTarea,
    estado: false
  };
  //agrega Objeto tarea al array.
  arrayTareas.unshift(data);
  almacenarTareas(arrayTareas)
};

function eliminarTarea(id) {
  let index = arrayTareas.findIndex(item => item.id == id);
  if (index !== -1) {
    arrayTareas.splice(index, 1);
  };
  almacenarTareas(arrayTareas);
};

function asignarEventosBorrar() {
  borrar = document.querySelectorAll('.btnBorrar');
  borrar.forEach(boton => {
    //evento borrar tarea.
    boton.addEventListener('click', () => {
      eliminarTarea(boton.id);
    });  
  });  
};

renderizarTareas();//Renderizacion Inicial

//Evento agregar tarea.
const btnAdd = document.getElementById('btnAgregar');
btnAdd.addEventListener('click', () => {
  if(input.value == ""){
    alert("Debes escribir una Tarea");
  } else {
    agregarTarea(input.value);
  };
});
