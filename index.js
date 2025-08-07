const input = document.getElementById('entradaTarea');
const boton = document.getElementById('btnAgregar');

//trae el Array del local storage || o crea uno vacio
let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];


function agregarTarea(dataTarea) {
  let data = {
    tarea: dataTarea,
    estado: false
  };
  arrayTareas.push(data);
  console.log(arrayTareas);

  //almacena Array en local storage
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));
};

boton.addEventListener('click', () => {
  agregarTarea(input.value);

});