
export const NOTA_MIN = 0;
export const NOTA_MAX = 100;

export function validarNombre(valor) {
    const nombre = valor.trim();
    if (nombre === "") {
        return "El nombre no puede estar vacío.";
    }
    return "";
}

export function validarNota(valor) {
    const num = Number(valor);
    if (valor === "" || isNaN(num) || num < NOTA_MIN || num > NOTA_MAX) {
        return `La nota debe ser un número entre ${NOTA_MIN} y ${NOTA_MAX}.`;
    }
    return "";
}