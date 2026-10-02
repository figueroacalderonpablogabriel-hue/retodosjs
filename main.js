// Estado y control del programa.
const MAX_ALUMNOS = 10;
const nombres = new Array(MAX_ALUMNOS).fill("");                              // arreglo de 10 nombres
const notas = Array.from({ length: MAX_ALUMNOS }, () => new Array(3).fill(null)); // matriz 10 x 3
let cantidad = 0;

function leerFormulario() {
  return { nombre: $("nombre").value, c1: $("c1").value, c2: $("c2").value, c3: $("c3").value };
}

function validarFormulario(datos) {
  return {
    nombre: validarNombre(datos.nombre),
    c1: validarNota(datos.c1),
    c2: validarNota(datos.c2),
    c3: validarNota(datos.c3),
  };
}

function agregarAlumno(datos) {
  nombres[cantidad] = datos.nombre.trim();
  notas[cantidad] = [Number(datos.c1), Number(datos.c2), Number(datos.c3)];
  cantidad++;
}

function actualizarResultados() {
  if (cantidad === 0) { $("resultados").hidden = true; return; }
  const n = nombres.slice(0, cantidad);
  const m = notas.slice(0, cantidad);
  const proms = promediosAlumnos(m);

  dibujarTabla(n, m, proms);
  dibujarResumen(promediosCertamenes(m), promedioGeneral(proms), contarAprobados(proms), contarReprobados(proms));
  dibujarRanking(ordenarPorPromedio(n, proms));
  $("resultados").hidden = false;
}

function alEnviar(evento) {
  evento.preventDefault();
  if (cantidad >= MAX_ALUMNOS) return;
  const datos = leerFormulario();
  const errores = validarFormulario(datos);
  mostrarErrores(errores);
  if (Object.values(errores).some((e) => e !== "")) {
    mostrarMensaje("Revisa los campos marcados antes de agregar al alumno.", "error");
    return;
  }
  agregarAlumno(datos);
  $("formulario").reset();
  $("nombre").focus();
  mostrarMensaje(`${nombres[cantidad - 1]} se agregó al curso.`, "ok");
  actualizarContador(cantidad, MAX_ALUMNOS);
  actualizarResultados();
}

function reiniciar() {
  if (cantidad > 0 && !confirm("¿Borrar todos los alumnos registrados?")) return;
  nombres.fill("");
  notas.forEach((fila) => fila.fill(null));
  cantidad = 0;
  $("formulario").reset();
  mostrarErrores({ nombre: "", c1: "", c2: "", c3: "" });
  mostrarMensaje("");
  actualizarContador(cantidad, MAX_ALUMNOS);
  actualizarResultados();
}

$("formulario").addEventListener("submit", alEnviar);
$("btn-reiniciar").addEventListener("click", reiniciar);
actualizarContador(cantidad, MAX_ALUMNOS);
