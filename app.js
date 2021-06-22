require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  await pausa();

  if ( tareasDB){
    //Cargo las tareas almacenadas en el JSON
    tareas.cargarTareasFromArray( tareasDB );
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput( 'Descripción: ');
        tareas.crearTarea( desc );
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case '3'://Listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case'4'://listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case'5'://completado | pendiente
        const ids = await mostrarListadoChecklist( tareas.listadoArr );
        tareas.toggleCompletadas( ids );
        break;
      case'6': //borrar
        const id = await listadoTareasBorrar( tareas.listadoArr );
        if ( id !== '0'){
          const ok = await confirmar('¿Esta seguro de borrar?');
          if ( ok ) {
            tareas.borrarTarea( id );
            console.log('Tarea Borrada');
          }
        }


        break;

    }

    guardarDB( tareas.listadoArr );

    await pausa();
  } while (opt !== "0");
};

main();
