import { valida } from "./validaciones.js";

//selecciona todos los input regresa arreglo
const inputs = document.querySelectorAll("input");

//agregar addEventListener cuando salga de foco
inputs.forEach( input => {
    input.addEventListener('blur',(input) => {
        valida(input.target);
    });
});