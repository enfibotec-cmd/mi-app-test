/**
 * utils.js
 * Funciones de utilidad para la aplicación móvil.
 *
 * Uso recomendado:
 * Utils.obtenerElemento("#estado");
 * Utils.mostrarEstado(elemento, "Todo listo", "ok");
 */

const Utils = {
  /**
   * Busca un elemento del DOM usando un selector CSS.
   * Ejemplo: Utils.obtenerElemento("#lista")
   */
  obtenerElemento(selector) {
    const elemento = document.querySelector(selector);

    if (!elemento) {
      console.warn(`[utils] No se encontró el elemento: ${selector}`);
    }

    return elemento;
  },

  /**
   * Crea un elemento HTML de forma rápida.
   * Ejemplo: Utils.crearElemento("li", "item", "Texto")
   */
  crearElemento(etiqueta = "div", clase = "", texto = "") {
    const elemento = document.createElement(etiqueta);

    if (clase) {
      elemento.className = clase;
    }

    if (texto) {
      elemento.textContent = texto;
    }

    return elemento;
  },

  /**
   * Limpia el contenido interno de un elemento.
   * Ejemplo: Utils.limpiarElemento(lista)
   */
  limpiarElemento(elemento) {
    if (elemento) {
      elemento.innerHTML = "";
    }
  },

  /**
   * Muestra un mensaje de estado en un elemento.
   * Tipos recomendados: ok, error, aviso.
   */
  mostrarEstado(elemento, mensaje, tipo = "ok") {
    if (!elemento) {
      return;
    }

    elemento.textContent = mensaje;
    elemento.className = `status ${tipo}`;
  },

  /**
   * Valida que una lista sea un arreglo y tenga elementos.
   */
  validarLista(lista) {
    return Array.isArray(lista) && lista.length > 0;
  },

  /**
   * Normaliza texto para búsquedas:
   * quita acentos, mayúsculas y espacios innecesarios.
   */
  normalizarTexto(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "")
      .toLowerCase()
      .trim();
  },

  /**
   * Filtra una lista de objetos según una búsqueda.
   *
   * Ejemplo:
   * Utils.filtrarPorTexto(DATOS, "movil", ["titulo", "detalle"]);
   */
  filtrarPorTexto(lista, consulta, claves = []) {
    const consultaNormalizada = this.normalizarTexto(consulta);

    if (!consultaNormalizada) {
      return lista;
    }

    return lista.filter((item) => {
      return claves.some((clave) => {
        const valor = item?.[clave];
        return this.normalizarTexto(valor).includes(consultaNormalizada);
      });
    });
  },

  /**
   * Formatea una fecha en español.
   * Ejemplo: Utils.formatearFecha("2026-09-11")
   */
  formatearFecha(fecha) {
    try {
      const objetoFecha = new Date(fecha);

      if (Number.isNaN(objetoFecha.getTime())) {
        return "";
      }

      return new Intl.DateTimeFormat("es", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(objetoFecha);
    } catch {
      return "";
    }
  },

  /**
   * Vibra suavemente si el dispositivo lo permite.
   */
  vibrar(milisegundos = 30) {
    if ("vibrate" in navigator) {
      navigator.vibrate(milisegundos);
    }
  },

  /**
   * Guarda datos en localStorage.
   */
  guardarLocal(clave, datos) {
    try {
      localStorage.setItem(clave, JSON.stringify(datos ?? null));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Lee datos desde localStorage.
   */
  leerLocal(clave, valorPorDefecto = []) {
    try {
      const dato = localStorage.getItem(clave);

      if (dato === null) {
        return valorPorDefecto;
      }

      return JSON.parse(dato);
    } catch {
      return valorPorDefecto;
    }
  },

  /**
   * Espera antes de ejecutar una función.
   * Útil para buscadores o eventos de escritura.
   */
  debounce(funcion, espera = 200) {
    let temporizador;

    return function (...args) {
      clearTimeout(temporizador);

      temporizador = setTimeout(() => {
        funcion.apply(this, args);
      }, espera);
    };
  }
};

Object.freeze(Utils);