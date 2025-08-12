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
  console.log(id);
  let index = arrayTareas.findIndex(item => item.id == id);
  console.log(index);
  if (index !== -1) {
    arrayTareas.splice(index, 1);
  }
  console.log(arrayTareas);
  almacenarTareas(arrayTareas);
};

function asignarEventosBorrar() {
  borrar = document.querySelectorAll('.btnBorrar');
  borrar.forEach(boton => {
    //evento borrar tarea.
    boton.addEventListener('click', () => {
      console.log("click en " + boton.id);
      eliminarTarea(boton.id);
    });  
  });  
}

renderizarTareas();//Renderizacion Inicial

//Evento agregar tarea.
const btnAdd = document.getElementById('btnAgregar');
btnAdd.addEventListener('click', () => {
  agregarTarea(input.value);
});



