// Presentación: lectura del formulario y dibujo de resultados.
const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toFixed(2);
const claseEstado = (p) => (p >= NOTA_APROBACION ? "aprobado" : "reprobado");
const textoEstado = (p) => (p >= NOTA_APROBACION ? "Aprobado" : "Reprobado");

function el(tag, clase, texto) {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto !== undefined) nodo.textContent = texto;
  return nodo;
}

function mostrarErrores(errores) {
  Object.entries(errores).forEach(([campo, msg]) => {
    $("e-" + campo).textContent = msg;
    $(campo).classList.toggle("invalido", msg !== "");
  });
}

function mostrarMensaje(texto, tipo) {
  const m = $("mensaje");
  m.textContent = texto;
  m.className = "mensaje " + (tipo || "");
}

function actualizarContador(cantidad, max) {
  $("contador").textContent = `${cantidad} de ${max} alumnos`;
  const lleno = cantidad >= max;
  $("btn-agregar").disabled = lleno;
  if (lleno) mostrarMensaje("Curso completo: ya registraste los 10 alumnos.", "info");
}

function dibujarTabla(nombres, notas, promedios) {
  const cuerpo = $("tabla-alumnos");
  cuerpo.replaceChildren();
  nombres.forEach((nombre, i) => {
    const tr = el("tr");
    tr.append(el("td", "nombre", nombre));
    notas[i].forEach((n) => tr.append(el("td", "num", String(n))));
    tr.append(el("td", "num fuerte", fmt(promedios[i])));
    const td = el("td");
    td.append(el("span", "chip " + claseEstado(promedios[i]), textoEstado(promedios[i])));
    tr.append(td);
    cuerpo.append(tr);
  });
}

function dibujarResumen(porCertamen, general, aprobados, reprobados) {
  const cont = $("resumen");
  cont.replaceChildren();
  const dato = (etiqueta, valor, extra) => {
    const d = el("div", "dato " + (extra || ""));
    d.append(el("span", "dato-valor", valor), el("span", "dato-etiqueta", etiqueta));
    return d;
  };
  porCertamen.forEach((p, i) => cont.append(dato(`Promedio C${i + 1}`, fmt(p))));
  cont.append(dato("Promedio final del curso", fmt(general), "destacado"));
  cont.append(dato("Aprobados", String(aprobados), "ok"));
  cont.append(dato("Reprobados", String(reprobados), "mal"));
}

function dibujarRanking(ordenados) {
  const lista = $("ranking");
  lista.replaceChildren();
  ordenados.forEach(({ nombre, promedio }) => {
    const li = el("li", "rank-item");
    const top = el("div", "rank-top");
    top.append(el("span", "rank-nombre", nombre), el("span", "rank-prom", fmt(promedio)));
    const barra = el("div", "barra");
    const relleno = el("div", "relleno " + claseEstado(promedio));
    relleno.style.width = Math.min(promedio, 100) + "%";
    barra.append(relleno, el("span", "marca"));
    li.append(top, barra);
    lista.append(li);
  });
}