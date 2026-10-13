// Estado y control del programa.
import { validarNombre, validarNota } from './validacion.js';
import { $, mostrarResumen } from './reto.js';

const MAX_ALUMNOS = 10;
const nombres = new Array(MAX_ALUMNOS).fill("");                              // arreglo de 10 nombres
const notas = Array.from({ length: MAX_ALUMNOS }, () => new Array(3).fill(null)); // matriz 10 x 3
let cantidad = 0;

document.addEventListener("DOMContentLoaded", () => {
    mostrarResumen(nombres, notas, cantidad);
    actualizarContador();

    const form = $("form-alumno");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            agregarAlumno();
        });
    }

    const btnBorrar = $("btn-borrar");
    if (btnBorrar) {
        btnBorrar.addEventListener("click", () => {
            reiniciarSistema();
        });
    }
});

function actualizarContador() {
    const contadorEl = $("contador-alumnos");
    if (contadorEl) {
        contadorEl.textContent = `${cantidad} de ${MAX_ALUMNOS} alumnos`;
    }
}

function agregarAlumno() {
    if (cantidad >= MAX_ALUMNOS) {
        alert("Has alcanzado el límite máximo de 10 alumnos.");
        return;
    }

    const valNombre = $("nombre").value;
    const valC1 = $("c1").value;
    const valC2 = $("c2").value;
    const valC3 = $("c3").value;

    const errorNombre = validarNombre(valNombre);
    const errorC1 = validarNota(valC1);
    const errorC2 = validarNota(valC2);
    const errorC3 = validarNota(valC3);

    if (errorNombre || errorC1 || errorC2 || errorC3) {
        alert("Error en los datos:\n" + 
              (errorNombre ? "- " + errorNombre + "\n" : "") +
              (errorC1 ? "- C1: " + errorC1 + "\n" : "") +
              (errorC2 ? "- C2: " + errorC2 + "\n" : "") +
              (errorC3 ? "- C3: " + errorC3 + "\n" : ""));
        return;
    }

    
    nombres[cantidad] = valNombre.trim();
    notas[cantidad][0] = Number(valC1);
    notas[cantidad][1] = Number(valC2);
    notas[cantidad][2] = Number(valC3);
    cantidad++;

    
    actualizarContador();
    mostrarResumen(nombres, notas, cantidad);
    $("form-alumno").reset();
    $("nombre").focus();
}

function reiniciarSistema() {
    cantidad = 0;
    nombres.fill("");
    notas.forEach(fila => fila.fill(null));
    actualizarContador();
    mostrarResumen(nombres, notas, cantidad);
    $("form-alumno").reset();
}