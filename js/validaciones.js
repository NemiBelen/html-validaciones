
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
  
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeError(tipoDeInput, input);
    }
  }

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre:{
        valueMissing:"El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing:"Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing:"Este campo contraseña no puede estar vacio",
        patternMismatch:"Al menos 6 caracteres, una letra miniscula, una letra mayuscula, no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing:"Este campo no puede estar vacío",
        customError:"Debes tener al menos 18 años"
    },
    numero: {
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch: "El formato requido es xxxxxxxxxx 10 números"
    },
    direccion: {
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeError(tipoDeInput,input){
    let mensaje= "";
    tipoErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]; 
        };
    });

    return mensaje;
}
// blur = cuando quitas el foco del objeto

function validarNacimiento(input){
    //recibir la fecha del input
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if(!mayorEdad(fechaCliente)){
        mensaje= "Debes tener al menos 18 años";
    }
    
  //setCustomValidity es lo mismo que en html poner title="mensaje"
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    //fecha del sistema
    const fechaActual = new Date();
    //se le agrega a la fecha 18n años ala fecha introducida si es menor o igual a la fecha actual el efectivamente es mayor
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;

}