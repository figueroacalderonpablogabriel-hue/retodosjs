import { NOTA_APROBACION } from './calculos.js';


export const $ = (id) => document.getElementById(id);
export const fmt = (n) => n.toFixed(2);
export const claseEstado = (p) => (p >= NOTA_APROBACION ? "aprobado" : "reprobado");
export const textoEstado = (p) => (p >= NOTA_APROBACION ? "Aprobado" : "Reprobado");

export function mostrarResumen(nombres, notas, cantidad) {
    const contenedor = $("resultado");
    if (!contenedor) return;

    if (cantidad === 0) {
        contenedor.innerHTML = "<p style='color: #5b6778; margin: 0;'>No hay alumnos registrados todavía.</p>";
        return;
    }

    let html = "";
    let sumaC1 = 0, sumaC2 = 0, sumaC3 = 0;
    let aprobados = 0;
    let reprobados = 0;

    for (let i = 0; i < cantidad; i++) {
        let c1 = notas[i][0];
        let c2 = notas[i][1];
        let c3 = notas[i][2];
        
        let promAlumno = (c1 + c2 + c3) / 3;

        sumaC1 += c1;
        sumaC2 += c2;
        sumaC3 += c3;

        if (promAlumno >= NOTA_APROBACION) {
            aprobados++;
        } else {
            reprobados++;
        }

        html += `Nombre ${i + 1}: ${nombres[i]}<br>`;
        html += `C1: ${c1}<br>`;
        html += `C2: ${c2}<br>`;
        html += `C3: ${c3}<br>`;
        html += `Promedio: ${fmt(promAlumno)}<br>`;
    }

    let promCursoC1 = sumaC1 / cantidad;
    let promCursoC2 = sumaC2 / cantidad;
    let promCursoC3 = sumaC3 / cantidad;
    let promFinalCurso = (promCursoC1 + promCursoC2 + promCursoC3) / 3;

    html += `<br>`;
    html += `Promedio del curso C1: ${fmt(promCursoC1)}<br>`;
    html += `Promedio del curso C2: ${fmt(promCursoC2)}<br>`;
    html += `Promedio del curso C3: ${fmt(promCursoC3)}<br>`;
    html += `Promedio Final Curso: ${fmt(promFinalCurso)}<br>`;
    html += `Aprobados: ${aprobados}<br>`;
    html += `Reprobados: ${reprobados}<br>`;

    contenedor.innerHTML = html;
}