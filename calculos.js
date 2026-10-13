
export const NOTA_APROBACION = 55;

export const promedio = (lista) => lista.reduce((suma, n) => suma + n, 0) / lista.length;

export const promediosAlumnos = (notas) => notas.map(promedio);