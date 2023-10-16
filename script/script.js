let operando1 = "", operando2 = "", acumulador = "", operador = "";
let resultado = document.getElementById("visor");
let n1, n2;

const acumular = (id) => {
    if(isOperator(id.value)){
        if(operador == "") {  //realizar apenas uma operação por vez
            if(possoAcumular(id.value) && operando1.slice(-1) != "." && acumulador != ""){
                operador = id.value;
                memoria(id.value);
            }
        }
    }else if(noPoint(id.value)) memoria(id.value);
} 

const memoria = (dado) => {
    acumulador += dado;
    if(operador == "") operando1 += dado;
    else operando2 += dado;
    resultado.value = acumulador;
}

// Permite guardar apenas um ponto por operando
const noPoint = (dado) => {
    if(dado == "."){
        if((operando1.split(".").length) - 1 != 0 && (operador=="")) return false;
        else if((operando2.split(".").length-1) != 0) return false;
    } 
    return true;
}

//verifica se o valor digitado no momento é um operador
const isOperator = (dado) => {
    let operadores = ["+", "-", "X", "/"];
    for(let operador in operadores){
        if (dado == operadores[operador]) return true;
    }
    return false;
}

// Não permitir que o usuário digite uma sequencia de operadores seguidos
const possoAcumular = (dado) => {
    let operadores = ["+", "-", "X", "/"];
    for(let operador in operadores){
        if((acumulador.slice(-1) == operadores[operador])) 
           return false; 
    }
    return true;
}

// Guardo o segundo operando
const guardarSegundoOperando = () => {
    if(operador != ""){
        operando2 = acumulador.slice(operando1.length+1);
        if(operando2 != "" && operando2.slice(-1) != "."){
           calcular();
        }
    }
}

const calcular = () => {
    n1 = parseFloat(operando1);
    n2 = parseFloat(operando2);
    if(operador == "+") acumulador = n1 + n2;
    else if(operador == "-") acumulador = n1 - n2;
    else if(operador == "X") acumulador = n1 * n2;
    else if(operador == "/") n2 != 0 ? acumulador = n1 / n2 : acumulador = 0;
    acumulador = acumulador.toString();
    resultado.value = acumulador;
    resetarVariaveis();
}

const resetarVariaveis = () => {
    operando2 = "";
    operando1 = acumulador;
    operador = "";
}

const limpar = () => {
    acumulador = ""; 
    operando1 = "";
    resultado.value = "0";
    operador = "";
}

const remover = () => {
    acumulador = acumulador.toString().slice(0, -1);

    if(acumulador=="") resultado.value = "0";
    else resultado.value = acumulador;

    if(operando2 == ""){
        if(operador != "") operador = "";
        else operando1 = acumulador;
    }else operando2 = operando2.slice(0, -1);
}
