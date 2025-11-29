export function leerArchivo(archivo){
    return new Promise((resolve,reject) => {
      const lector = new FileReader();
      lector.onload = () => resolve(lector.result);
      lector.onerror = () => reject(lector.error);
      lector.readAsText(archivo);
    })
}
export function descargarArchivo(nombre,contenido){
  const blob = new Blob([contenido],{type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(url);
}