export function codificar(texto){
    let usados = new Set();
    let partes = [];
    for(let char of texto){
        let numero = +char;
        if(!usados.has(numero)){
            partes.push(char);
            usados.add(numero);
        }
        else{
            let distancia = 1;
            let reemplazo = null;
            while(reemplazo == null){
                let candidatoIzq = numero - distancia;
                let candidatoDer = numero + distancia;
                if(!usados.has(candidatoIzq)){
                    reemplazo = candidatoIzq;
                    var distanciaUsada = -distancia;
                }
                else if(!usados.has(candidatoDer)){
                    reemplazo = candidatoDer;
                    var distanciaUsada = distancia;
                }
                else{
                    distancia++;
                }
            }
            partes.push(`[${reemplazo}:d${distanciaUsada >= 0 ? '+' : ''}${distanciaUsada}]`);
            usados.add(reemplazo);
        }
    }
    return partes.join("");
}

export function decodificar(texto){
    let resultado = [];
    let i = 0
    while(i<texto.length){
        if(texto[i] == "["){
            let cierre = texto.indexOf("]",i);
            let contenido = texto.slice(i+1,cierre);
            let partes = contenido.split(":d");
            let valor = +partes[0];
            let distancia = +partes[1];
            let original = valor - distancia;
            resultado.push(original.toString());
            i = cierre + 1;
        }
        else if(isDigit(texto[i]) || (texto[i]== "-" && i+1<texto.length && isDigit(texto[i+1]))){
            let numStr = "";
            while(i<texto.length &&  (isDigit(texto[i]) || texto[i] == "-")){
                numStr += texto[i];
                i++;
            }
            resultado.push(numStr);
        }
        else{
            i++;
        }
    }
    return resultado.join("");
}

export function isDigit(char){
       return /^-?\d+$/.test(char);
}

export function isCodified(str) {
  const regex =  /^(?:\d|\[-?\d+:d[+-]\d+\])+$/;
  return regex.test(str);
}

export function limpiarNombre(nombre) {
  return nombre
    .replace(/_codificado\d+/gi, "")
    .replace(/_decodificado\d+/gi, "");
}
