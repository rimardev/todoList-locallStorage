const input = document.getElementById('entradaTarea');
const tabla = document.getElementById('tabla');
let cambiar = document.querySelectorAll('.checkBox');
let borrar = document.querySelectorAll('.btnBorrar');
let id = 0;


//Trae Array de local storage || o Crea uno vacio
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];

function almacenarTareas(arrayTareas) {
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));
  renderizarTareas();   
};

function renderizarTareas() {
  let html = "";
  for(let item of arrayTareas){

    //Determina estado del Checkbox-------
    let state = ""
    if(item.estado == true){
      state = "checked";
    };
    //------------------------------------

    html += `
    <tr>
      <td class="tarea">${item.tarea}</td>
      <td class="estado">
        <input type="checkbox" id="${item.id}" class="checkBox" ${state}>         
      </td>
      <td>
        <button id="${item.id}" class="btnBorrar">x</button>
      </td>
    </tr>`    
  };
  tabla.innerHTML = html;  
  input.value = "";  

  //asigna escuchador EVENTOS.s  
  asignarEventos();  
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

function cambiarEstado(id) {
  let index = arrayTareas.findIndex(item => item.id == id);
  if(index !== -1) {
    arrayTareas[index].estado = !arrayTareas[index].estado;
  };
  almacenarTareas(arrayTareas);  
};

function eliminarTarea(id) {
  let index = arrayTareas.findIndex(item => item.id == id);
  if (index !== -1) {
    arrayTareas.splice(index, 1);
  };
  almacenarTareas(arrayTareas);
};

function asignarEventos() {
  //Asigna EVENTOS Borrar Tarea.
  borrar = document.querySelectorAll('.btnBorrar');
  borrar.forEach(boton => {
    boton.addEventListener('click', () => {
      eliminarTarea(boton.id);
    });  
  });
  
  //Asigna EVENTOS Cambiar Estado.
  cambiar = document.querySelectorAll('.checkBox');
  cambiar.forEach(check => {      
    check.addEventListener('change', () => {
      cambiarEstado(check.id);      
    });  
  });
};

//Renderizacion Inicial.
renderizarTareas();

//Evento Agregar Tarea.
const btnAdd = document.getElementById('btnAgregar');
btnAdd.addEventListener('click', () => {
  if(input.value == ""){
    alert("Debes escribir una Tarea");
  } else {
    agregarTarea(input.value);
  };
});

