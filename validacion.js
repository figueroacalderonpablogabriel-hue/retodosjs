// Validaciones de entrada. Devuelven un texto de error o "" si el dato es válido.
const NOTA_MIN = 0;
const NOTA_MAX = 100;

function validarNombre(valor) {
  const nombre = valor.trim();
  if (nombre === "") return "Escribe el nombre del alumno.";
  if (nombre.length < 2) return "El nombre debe tener al menos 2 letras.";
  if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(nombre)) return "Usa solo letras y espacios en el nombre.";
  return "";
}

function validarNota(valor) {
  if (valor.trim() === "") return "Ingresa una nota.";
  const n = Number(valor);
  if (Number.isNaN(n)) return "La nota debe ser un número.";
  if (n < NOTA_MIN || n > NOTA_MAX) return `La nota debe estar entre ${NOTA_MIN} y ${NOTA_MAX}.`;
  return "";
}
