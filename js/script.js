const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const historialBtn = document.getElementById("historial");
const porcentajeBtn = document.getElementById("porcentaje");

// Historial de operaciones
let historial = [];

// Función para agregar operación al historial
function agregarHistorial(operacion) {
    if (historial.length >= 5) {
        historial.shift();
    }
    historial.push(operacion);
    actualizarHistorial();
}

// Función para mostrar el historial
function actualizarHistorial() {
    const ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventanaEmergente';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const title = document.createElement('h3');
    title.textContent = 'Historial';
    
    const historialList = document.createElement('div');
    historialList.className = 'historial-list';
    
    historial.forEach((op) => {
        const historialItem = document.createElement('div');
        historialItem.className = 'historial-item';
        historialItem.textContent = op;
        historialList.appendChild(historialItem);
    });
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.textContent = 'Cerrar';
    
    modalContent.appendChild(title);
    modalContent.appendChild(historialList);
    modalContent.appendChild(closeButton);
    
    ventanaEmergente.appendChild(modalContent);
    document.body.appendChild(ventanaEmergente);
    
    closeButton.addEventListener('click', () => {
        ventanaEmergente.remove();
    });
    
    ventanaEmergente.addEventListener('click', (e) => {
        if (e.target === ventanaEmergente) {
            ventanaEmergente.remove();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.contains(ventanaEmergente)) {
            ventanaEmergente.remove();
        }
    });
}

// Sonido al presionar botones
function reproducirSonido() {
    const audio = new Audio('audio/click.mp3');
    audio.play();
}

// Función para calcular el porcentaje
function calcularPorcentaje() {
    const valorActual = pantalla.textContent;
    const numero = parseFloat(valorActual);
    // Solo calcular si hay un número válido
    if (!isNaN(numero) && valorActual.trim() !== "") {
        const resultado = numero / 100;
        pantalla.textContent = resultado;
        agregarHistorial(`${numero}% = ${resultado}`);
    }
    // Si no hay número válido, no hacer nada (no cambiar la pantalla)
}

// Manejador para los botones
botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;
        reproducirSonido();
        
        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }
        
        if (boton.id === "borrar") {
            pantalla.textContent = 
                pantalla.textContent.length === 1 || pantalla.textContent === "Error!"
                    ? "0"
                    : pantalla.textContent.slice(0, -1);
            return;
        }
        
        if (boton.id === "igual") {
            try {
                const resultado = eval(pantalla.textContent);
                pantalla.textContent = resultado;
                agregarHistorial(`${pantalla.textContent} = ${resultado}`);
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        if (boton.id === "porcentaje") {
            console.log("Clic en botón de porcentaje detectado"); // Para depuración
            calcularPorcentaje();
            return;
        }

        pantalla.textContent = 
            pantalla.textContent === "0" || pantalla.textContent === "Error!"
                ? botonApretado
                : pantalla.textContent + botonApretado;
    });
});

// Manejador del teclado
window.addEventListener('keydown', (e) => {
    const tecla = e.key;
    
    if (tecla === '%') {
        reproducirSonido();
        calcularPorcentaje();
        e.preventDefault();
        return;
    }
    
    if (tecla === 'Enter' || tecla === '=') {
        document.getElementById('igual').click();
        e.preventDefault();
        return;
    }
    
    if (tecla === 'Backspace') {
        document.getElementById('borrar').click();
        e.preventDefault();
        return;
    }
    
    if (tecla === 'Escape') {
        document.getElementById('c').click();
        e.preventDefault();
        return;
    }
    
    const caracteresValidos = '0123456789+-*/.';
    if (caracteresValidos.includes(tecla)) {
        const boton = Array.from(botones).find(b => b.textContent === tecla);
        if (boton) {
            boton.click();
        }
        e.preventDefault();
    }
});

// Evento para el botón de historial
historialBtn.addEventListener('click', () => {
    reproducirSonido();
    actualizarHistorial();
});

// Modo oscuro/claro
const modo = document.getElementById("nightMode");
modo.addEventListener("click", () => {
    reproducirSonido();
    if (modo.classList.contains("nightMode")) {
        modo.classList.remove("nightMode");
        modo.classList.add("lightMode");
        document.body.classList.remove("nightMode");
        document.body.classList.add("lightModebody");
        document.querySelector(".icon_mode").textContent = "light_mode";
    } else if (modo.classList.contains("lightMode")) {
        modo.classList.add("nightMode");
        modo.classList.remove("lightMode");
        document.body.classList.remove("lightModebody");
        document.body.classList.add("nightMode");
        document.querySelector(".icon_mode").textContent = "dark_mode";
    }
});