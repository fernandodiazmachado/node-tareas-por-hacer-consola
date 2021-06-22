const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data )=>{
  fs.writeFileSync(archivo,JSON.stringify(data));
}

const leerDB = ()=>{
  if ( !fs.existsSync(archivo) ){
    return null;
  }
  const info = fs.readFileSync( archivo, {encoding: 'utf-8'} );
  //como info regresa como string lo parseo a JSON
  const data = JSON.parse(info);
  console.log(data);
  return data;
}

module.exports = {
  guardarDB,
  leerDB
}