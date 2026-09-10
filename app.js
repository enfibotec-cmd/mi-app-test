document.addEventListener("DOMContentLoaded", () => {
  const tituloApp = document.getElementById("titulo-app");
  const subtitulo = document.getElementById("subtitulo");
  const estado = document.getElementById("estado");
  const lista = document.getElementById("lista");
  const botonRecargar = document.getElementById("boton-recargar");

  function actualizarTitulo() {
    if (typeof APP !== "undefined" && APP.nombre) {
      tituloApp.textContent = APP.nombre;
      document.title = APP.nombre;

      subtitulo.textContent =
        APP.descripcion || `Versión ${APP.version || "1.0.0"}`;
    }
  }

  function mostrarEstado(mensaje, tipo = "ok") {
    estado.textContent = mensaje;
    estado.className = `status ${tipo}`;
  }

  function crearItem(item) {
    const li = document.createElement("li");
    li.className = "item";

    const titulo = document.createElement("h2");
    titulo.className = "item-titulo";
    titulo.textContent = item.titulo || "Sin título";

    const detalle = document.createElement("p");
    detalle.className = "item-detalle";
    detalle.textContent = item.detalle || "Sin detalle.";

    const meta = document.createElement("span");
    meta.className = "item-meta";
    meta.textContent = `ID: ${item.id ?? "-"}`;

    li.appendChild(titulo);
    li.appendChild(detalle);
    li.appendChild(meta);

    return li;
  }

  function renderizarLista() {
    lista.innerHTML = "";

    if (typeof DATOS === "undefined" || !Array.isArray(DATOS)) {
      mostrarEstado("No se encontró la lista DATOS en data.js.", "error");
      return;
    }

    if (DATOS.length === 0) {
      mostrarEstado("La lista está vacía.", "aviso");
      return;
    }

    DATOS.forEach((item) => {
      lista.appendChild(crearItem(item));
    });

    mostrarEstado(`${DATOS.length} elementos cargados.`, "ok");
  }

  botonRecargar.addEventListener("click", () => {
    renderizarLista();

    if ("vibrate" in navigator) {
      navigator.vibrate(30);
    }
  });

  actualizarTitulo();
  renderizarLista();
});