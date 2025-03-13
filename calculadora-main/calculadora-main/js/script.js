

const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;
    
    /* Boton para reiniciar la cuenta */
    if (boton.id === "c") {
      pantalla.textContent = "0";
      return;
    }
    
    /* Boton para borrar (la flechita) */
    if (boton.id === "borrar") {
      pantalla.textContent =
        pantalla.textContent.length === 1 || pantalla.textContent === "Error!"
          ? "0"
          : pantalla.textContent.slice(0, -1);
      return;
    }
    /* Boton de = */
    if (boton.id === "igual") {
      try {
        pantalla.textContent = eval(pantalla.textContent);
      } catch {
        pantalla.textContent = "Error!";
      }
      return;
    }

    /* por si sale algun error */
    pantalla.textContent =
      pantalla.textContent === "0" || pantalla.textContent === "Error!"
        ? botonApretado
        : pantalla.textContent + botonApretado;
  });
});

document.onkeypress = function (e) {
  e = e || window.event;
};
const modo = document.getElementById("nightMode");

/* Para poder cambiar el modo oscuro y claro */
modo.addEventListener("click", () => {
  if (modo.classList.contains("nightMode")) {
    modo.classList.remove("nightMode");
    modo.classList.add("lightMode");
    document.body.classList.remove("nightMode");
    document.body.classList.add("lightModebody");
    document.querySelector(".icon_mode").textContent="light_mode"

  } else if (modo.classList.contains("lightMode")) {
    modo.classList.add("nightMode");
    modo.classList.remove("lightMode");
    document.body.classList.remove("lightModebody");
    document.body.classList.add("nightMode");
    document.querySelector(".icon_mode").textContent="dark_mode"
  }
});
