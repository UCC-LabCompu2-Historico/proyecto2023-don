
window.addEventListener('load', () => {
    
    //generar las lineas de abajo y de la izquierda del canva cuando garga la pagina
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();

  });


  function graficar() {
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    // Obtener los valores de los inputs
    const velocidad = document.getElementById('velocidad-input').value;
    const angulo = document.getElementById('angulo-input').value;
    console.log(velocidad)
    if (angulo == ""){
        alert("No se puede graficar sin un angulo");
        return
    }
    if (velocidad == ""){
        alert("No se puede graficar sin una velocidad");
        return
    }

    let alturaMaximaLabel = document.getElementById('altura-maxima');
    let alcanceMaximoLabel = document.getElementById('alcance-maximo');
   
    //

    // Convertir el ángulo de grados a radianes
    const anguloRad = angulo * (Math.PI / 180);
   
    // Calcular la trayectoria del proyectil
    const tiempoTotal = (2 * velocidad * Math.sin(anguloRad)) / 9.8;
    const alcanceMaximo = (velocidad ** 2 * Math.sin(2 * anguloRad)) / 9.8;
    const alturaMaxima = (velocidad ** 2 * Math.sin(anguloRad) ** 2) / (2 * 9.8);
    

    alturaMaximaLabel.innerHTML = alturaMaxima.toFixed(3);
    alcanceMaximoLabel.innerHTML = alcanceMaximo.toFixed(3);
    //ajustar el tamaño del canva a la altura y alcance maximo
    // Dibujar la trayectoria del proyectil
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.moveTo(0, canvas.height);
    for (let t = 0; t <= tiempoTotal; t += 0.01) {
      const x = velocidad * Math.cos(anguloRad) * t;
      const y = canvas.height - (velocidad * Math.sin(anguloRad) * t - 0.5 * 9.8 * t ** 2);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }
  

  function limpiarGrafico() {
    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");
    let alturaMaximaLabel = document.getElementById('altura-maxima');
    let alcanceMaximoLabel = document.getElementById('alcance-maximo');
   
    //limpiar los valores de las labels 
    alturaMaximaLabel.innerHTML = "-"
    alcanceMaximoLabel.innerHTML = "-"
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Dibujar las líneas del borde izquierdo y de abajo
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
  
    // Establecer el grosor y el color de las líneas
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    
    // Dibujar las líneas
    ctx.stroke();
  }

function showPopUp(){
    const popup = document.getElementById('popup');
    popup.style.display = 'block'
}

function closePopUp(){
    const popup = document.getElementById('popup');
    popup.style.display = 'none'
}