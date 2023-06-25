/**
 * Esta función se ejecuta cuando se carga la pagina, se encarga de dibujar las lineas del canvas
 * @method load
 * @param {string} load - Este parámetro no se usa
 * @return {void} - No retorna nada
 */
window.addEventListener("load", () => {
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";
  ctx.stroke();
});

/**
 * Esta función se encarga de graficar la trayectoria del proyectil en el canvas, no recibe parámetros interactua con los inputs del html y los usa para calcular la trayectoria
 * @method graficar
 * @param none
 * @return {void} - No retorna nada
 */
function graficar() {
  // Obtener el canvas y el contexto
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");

  // Obtener los valores de los inputs
  const velocidad = document.getElementById("velocidad-input").value;
  const angulo = document.getElementById("angulo-input").value;

  if (angulo == "") {
    limpiarInputs();
    alert("No se puede graficar sin un ángulo");
    return;
  }
  if (velocidad == "") {
    limpiarInputs();
    alert("No se puede graficar sin una velocidad");
    return;
  }
  if (velocidad < 0) {
    limpiarInputs();
    alert("La velocidad no puede ser negativa");
    return;
  }
  if (angulo < 0) {
    limpiarInputs();
    alert("El ángulo no puede ser negativo");
    return;
  }

  /**
   * Esta funcion se encarga de limpiar los inputs
   * @method limpiarInputs
   * @param none
   * @return {void} - No retorna nada
   */

  function limpiarInputs() {
    document.getElementById("velocidad-input").value = "";
    document.getElementById("angulo-input").value = "";
  }

  // Obtener las labels donde se mostrarán los resultados
  let alturaMaximaLabel = document.getElementById("altura-maxima");
  let alcanceMaximoLabel = document.getElementById("alcance-maximo");

  // Convertir el ángulo de grados a radianes
  const anguloRad = angulo * (Math.PI / 180);

  // Calcular la trayectoria del proyectil
  const tiempoTotal = (2 * velocidad * Math.sin(anguloRad)) / 9.8;
  const alcanceMaximo = (velocidad ** 2 * Math.sin(2 * anguloRad)) / 9.8;
  const alturaMaxima = (velocidad ** 2 * Math.sin(anguloRad) ** 2) / (2 * 9.8);

  // Mostrar los resultados en las labels con 3 decimales
  alturaMaximaLabel.innerHTML = alturaMaxima.toFixed(3);
  alcanceMaximoLabel.innerHTML = alcanceMaximo.toFixed(3);

  // Configurar el canvas para dibujar la trayectoria
  ctx.beginPath();
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = "#000";
  ctx.moveTo(0, canvas.height);

  let t = 0;
  //set interval se encarga de dibujar la trayectoria en el canvas progresivamente
  const interval = setInterval(() => {
    if (t > tiempoTotal) {
      // Si se alcanzo el tiempo total, detener el intervalo
      clearInterval(interval);
      return;
    }

    const x = velocidad * Math.cos(anguloRad) * t;
    const y =
      canvas.height -
      (velocidad * Math.sin(anguloRad) * t - 0.5 * 9.8 * t ** 2);
    ctx.lineTo(x, y);
    ctx.stroke();

    t += 0.01;
  }, 5); // 5 milisegundos de intervalo
}

/**
 * Esta funcion se encarga de limpiar el canvas y los valores de las labels que muestran los resultados
 * @method limpiarGrafico
 * @param none
 * @return {void} - No retorna nada
 */

function limpiarGrafico() {
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");
  let alturaMaximaLabel = document.getElementById("altura-maxima");
  let alcanceMaximoLabel = document.getElementById("alcance-maximo");

  //limpiar los valores de las labels
  alturaMaximaLabel.innerHTML = "-";
  alcanceMaximoLabel.innerHTML = "-";
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar las líneas del borde izquierdo y de abajo
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);

  // Establecer el grosor y el color de las líneas
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";

  // Dibujar las líneas
  ctx.stroke();
}

/**
 * Esta funcion se encarga de mostrar el popup con la informacion del proyecto
 * @method showPopUp
 * @param none
 * @return {void} - No retorna nada
 */

function showPopUp() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
}

/**
 * Esta funcion se encarga de cerrar el popup con la informacion del proyecto
 * @method showPopUp
 * @param none
 * @return {void} - No retorna nada
 */

function closePopUp() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}
