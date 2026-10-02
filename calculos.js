// Cálculos con funciones de orden superior (map, reduce, filter, sort).
const NOTA_APROBACION = 55;

const promedio = (lista) => lista.reduce((suma, n) => suma + n, 0) / lista.length;

const promediosAlumnos = (notas) => notas.map(promedio);

const promedioCertamen = (notas, col) => promedio(notas.map((fila) => fila[col]));

const promediosCertamenes = (notas) => [0, 1, 2].map((col) => promedioCertamen(notas, col));

const promedioGeneral = (promedios) => promedio(promedios);

const contarAprobados = (promedios) => promedios.filter((p) => p >= NOTA_APROBACION).length;

const contarReprobados = (promedios) => promedios.filter((p) => p < NOTA_APROBACION).length;

// Devuelve [{nombre, promedio}] ordenado de mayor a menor promedio.
const ordenarPorPromedio = (nombres, promedios) =>
  nombres
    .map((nombre, i) => ({ nombre, promedio: promedios[i] }))
    .sort((a, b) => b.promedio - a.promedio);
