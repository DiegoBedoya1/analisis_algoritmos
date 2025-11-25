"use strict";

let fileInput = document.getElementById("file-input");
let fileArea = document.getElementById("file-area");
let dropArea = document.getElementById("drop-area");
const btnCodificar = document.getElementById("btn-encode");
const btnDecodificar = document.getElementById("btn-decode");

fileInput.addEventListener("change",actualizarArchivo);
dropArea.addEventListener("dragover",(event) => event.preventDefault());
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    fileInput.files = event.dataTransfer.files;
    actualizarArchivo();
});


function actualizarArchivo(){
    const archivo = fileInput.files[0];
    if(!archivo){
        return;
    }
    fileArea.innerHTML = `
      <div class="flex items-center justify-between w-full p-6 border-2 border-cyan-500 bg-cyan-50/30 rounded-xl">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-cyan-100 rounded-lg">
            <svg class="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-gray-900">${archivo.name}</p>
            <p class="text-sm text-gray-500">${(archivo.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>

        <button id="clear-file" class="p-2 hover:bg-red-50 rounded-lg transition-colors group">
          <svg class="w-5 h-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;

    document.getElementById("clear-file").addEventListener("click", resetFileLoader);
    const nombre = archivo.name.toLowerCase();
    if(nombre.includes("decodificado")){
        activarBoton(btnCodificar);
    }
    else if(nombre.includes("codificado")) {
        activarBoton(btnDecodificar);
    }
    else{
        activarBoton(btnCodificar);
    }
    
}

function resetFileLoader() {
    fileArea.innerHTML = `
      <label id="drop-area"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 border-gray-300 hover:border-cyan-500 hover:bg-cyan-50/50"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg id="upload-icon" class="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <p class="mb-2 text-sm font-semibold text-gray-900">
            <span>Haz clic para seleccionar</span> o arrastra un archivo
          </p>
          <p class="text-xs text-gray-500">Solo archivos de texto</p>
        </div>

        <input type="file" id="file-input" accept=".txt" class="hidden">
      </label>
    `;
     fileInput = document.getElementById("file-input");
     fileInput.value = "";
     fileInput.addEventListener("change", actualizarArchivo);
     dropArea = document.getElementById("drop-area");

    dropArea.addEventListener("dragover", (event) => event.preventDefault());
    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        fileInput.files = event.dataTransfer.files;
        actualizarArchivo();
    });
    desactivarBoton(btnCodificar);
    desactivarBoton(btnDecodificar);
}

function desactivarBoton(boton){
    boton.disabled = true;
    boton.style.pointerEvents = "none";
    boton.classList.add("opacity-50");
}

function activarBoton(boton){
    boton.disabled = false;
    boton.style.pointerEvents = "auto";
    boton.classList.remove("opacity-50");
}

btnCodificar.addEventListener("click", () => alert("codificado"));
btnDecodificar.addEventListener("click", () => alert("decodificado"));