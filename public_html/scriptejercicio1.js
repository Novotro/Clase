/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

fecha = document.getElementById("fecha");
altura = document.getElementById("altura");
peso = document.getElementById("peso");
sexo = document.getElementById("sexo");
f = new Date();
resultEdad = 0;
imc = 0;
diag = null;


function inicio() {
    boton = document.getElementById("calcular");
    boton.setAttribute("onclick", "calcula()");
}

function calcula() {
    correcto = true;
    fs = document.getElementById("fecha").value;

    //Validacion nombre
    resultado = validarNombre();
    if (resultado == false) {
        alert("El nombre es un campo obligatorio");
        correcto = false;
    }

    //Validacion de fecha
    resultado2 = validarFecha(fs);
    if (resultado2 == false) {
        alert("La fecha introducida no es correcta");
        correcto = false;
    }
    //Validacion altura
    if (document.getElementById("altura").value == "null" || document.getElementById("altura").value <= 0 || isNaN(document.getElementById("altura").value)) {
        alert("Altura incorrecta");
        correcto = false;
    }

//Validar Edad
    resultado3 = validarEdad(f);
    if (resultado3 == false) {
        alert("Solo se puede calcular el IMC de mayores a 10 años");
        correcto = false;
    }
    //Comprobacion de sexo
    if (document.getElementById("sexo").value == null || document.getElementById("sexo").value != "H" && document.getElementById("sexo").value != "M") {
        alert("Sexo Incorrecto");
        correcto = false;
    }


    if (correcto == true) {        
        imc= parseInt(document.getElementById("peso").value) / ((parseInt(document.getElementById("altura").value/100)*2));
        
        diag = diagnostico(imc, document.getElementById("sexo").value);
        document.getElementById("texto").innerHTML = "Edad: " + resultEdad + "<p> IMC: " + imc + "<p> Diagnostico: " + diag;
    }
}




function validarFecha(fec) {
    var fecha_correcta = true;

    var separador1 = fec.substring(2, 3);
    var separador2 = fec.substring(5, 6);
    var d = parseInt(fec.substring(0, 2));
    var m = parseInt(fec.substring(3, 5));
    var a = parseInt(fec.substring(6, 10));
    f = new Date(a, m - 1, d);

    if (separador1 !== "/" || separador2 !== "/") {
        fecha_correcta = false;
    }

    if (m < 1 || m > 12) {
        fecha_correcta = false;
        ;
    }

    if (d < 1 || d > 31) {
        fecha_correcta = false;
    }

    if ((m === 4 || m === 6 || m === 9 || m === 11) && d === 31) {
        fecha_correcta = false;
    }

    if (m === 2) {
        var bisiesto = (a % 4 === 0 && (a % 100 !== 0 || a % 400 === 0));
        if (d > 29 || (d === 29 && !bisiesto)) {
            fecha_correcta = false;
        }
    }
    return fecha_correcta;
}

function validarEdad(intro) {

    resultEdad = (new Date()).getFullYear() - intro.getFullYear();

    if (resultEdad >= 10) {
        return true;
    } else {
        return false;
    }

}


function validarNombre() {
    if (document.getElementById("nombre").value == "null" || document.getElementById("nombre").value == "") {
        return false;
    } else {
        return true;
    }

}

function diagnostico(masa, sexo) {
//niños menores de 16
    if (resultEdad < 16 && masa <= 13) {
        return "desnutricion";
    } else {
        if (resultEdad < 16 && masa > 13 || masa <= 14) {
            return "bajo peso";
        } else {
            if (resultEdad < 16 && masa > 14 || masa <= 19) {
                return "normal";

            } else {
                if (resultEdad < 16 && masa >= 19) {
                    return "sobrepeso";
                }
            }
        }
    }


    switch (sexo) {
        case "H":
            //hombres
            if (resultEdad > 16 && masa <= 18) {
                return "desnutricion";
            } else {
                if (resultEdad > 16 && masa >= 18 || masa <= 21) {
                    return "bajo peso";
                } else {
                    if (resultEdad > 16 && masa >= 21 || masa <= 26) {
                        return "normal";
                    } else {
                        if (resultEdad > 16 && masa >= 26) {
                            return "sobrepeso";
                        }
                    }
                }
            }
            break;

        case "M":

            //Mujeres
            if (resultEdad > 16 && masa <= 18) {
                return "desnutricion";
            } else {
                if (resultEdad > 16 && masa >= 18 || masa <= 21) {
                    return "bajo peso";
                } else {
                    if (resultEdad > 16 && masa >= 21 || masa <= 26) {
                        return "normal";
                    } else {
                        if (resultEdad > 16 && masa >= 26) {
                            return "sobrepeso";
                        }

                    }
                }
            }
            break;
    }



}



window.addEventListener("load", inicio, false);