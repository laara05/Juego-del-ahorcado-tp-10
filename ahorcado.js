
const API_URL = "https://palabra-api.com/word"; // Debes reemplazar esto con una URL de API real
let palabra = "";
let oculta = [];
let cont = 6;
let rand;
const hueco = document.getElementById("palabra");
const buttons = document.getElementsByClassName('letra');
const btnInicio = document.getElementById("reset");



// fetch para obtener palabra aleatoria
async function fetchPalabra() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        palabra = data.word.toUpperCase();
        console.log(palabra);
        inicio();
    } catch (error) {
        console.error("Error fetching word:", error);
    }
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
    oculta = Array(num).fill("_");
    hueco.innerHTML = oculta.join(" ");
}

// Generar abecedario
function generaABC(a, z) {
    document.getElementById("abcdario").innerHTML = "";
    let i = a.charCodeAt(0), j = z.charCodeAt(0);
    for (; i <= j; i++) {
        let letra = String.fromCharCode(i).toUpperCase();
        document.getElementById("abcdario").innerHTML += `<button value='${letra}' onclick='intento("${letra}")' class='letra' id='${letra}'>${letra}</button>`;
        if (i == 110) {
            document.getElementById("abcdario").innerHTML += `<button value='Ñ' onclick='intento("Ñ")' class='letra' id='Ñ'>Ñ</button>`;
        }
    }
}

// Chequear intento
function intento(letra) {
    document.getElementById(letra).disabled = true;
    if (palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) oculta[i] = letra;
        }
        hueco.innerHTML = oculta.join(" ");
        document.getElementById("acierto").innerHTML = "Bien!";
        document.getElementById("acierto").classList.add("verde");
    } else {
        cont--;
        document.getElementById("intentos").innerHTML = cont;
        document.getElementById("acierto").innerHTML = "Fallo!";
        document.getElementById("acierto").classList.add("rojo");
        document.getElementById(`image${cont}`).classList.add("fade-in");
    }
    compruebaFin();
    setTimeout(() => document.getElementById("acierto").className = "", 800);
}

// Obtener pista
function pista() {
    document.getElementById("hueco-pista").innerHTML = "No disponible"; // Aquí podrías obtener una pista de la API
}

// Comprueba si ha finalizado
function compruebaFin() {
    if (!oculta.includes("_")) {
        document.getElementById("msg-final").innerHTML = "Felicidades !!";
        document.getElementById("msg-final").classList.add("zoom-in");
        document.getElementById("palabra").classList.add("encuadre");
        for (let button of buttons) {
            button.disabled = true;
        }
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = () => location.reload();
    } else if (cont === 0) {
        document.getElementById("msg-final").innerHTML = "Game Over";
        document.getElementById("msg-final").classList.add("zoom-in");
        for (let button of buttons) {
            button.disabled = true;
        }
        document.getElementById("reset").innerHTML = "Empezar";
        btnInicio.onclick = () => location.reload();
    }
}

// Restablecer juego
function inicio() {
    pintarGuiones(palabra.length);
    generaABC("a", "z");
    cont = 6;
    document.getElementById("intentos").innerHTML = cont;
}

// Iniciar
window.onload = fetchPalabra;
